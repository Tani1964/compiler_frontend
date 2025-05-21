import { useEffect, useRef, useContext, useState } from "react";
import * as d3 from "d3";
import { DataContext } from "../contexts/DataContext";

const Tree = () => {
  const { data } = useContext(DataContext);
  const [treeData, setTreeData] = useState(null);
  const [error, setError] = useState(null);
  const svgRef = useRef(null);
  const containerRef = useRef(null);
  
  // Parse and validate tree data
  useEffect(() => {
    try {
      if (data && data[1] && data[1][1]) {
        setTreeData(data[1][1]);
        setError(null);
      } else if (data) {
        setError("Invalid tree data structure");
      }
    } catch (err) {
      setError("Error processing tree data");
      console.error("Tree data processing error:", err);
    }
  }, [data]);

  // Render the tree using D3
  useEffect(() => {
    if (!treeData || !svgRef.current) return;
    
    try {
      // Clear previous content
      const svg = d3.select(svgRef.current);
      svg.selectAll("*").remove();
      
      // Get container dimensions for responsive sizing
      const containerWidth = containerRef.current?.clientWidth || 800;
      const containerHeight = containerRef.current?.clientHeight || 500;
      
      // Set tree dimensions
      const width = Math.max(containerWidth - 40, 600);
      const height = Math.max(containerHeight - 40, 400);
      
      // Update SVG dimensions
      svg
        .attr("width", width)
        .attr("height", height)
        .attr("viewBox", [0, 0, width, height]);
      
      // Create a group for zoom/pan functionality
      const g = svg.append("g");
      
      // Create a zoom behavior
      const zoom = d3.zoom()
        .scaleExtent([0.5, 3])
        .on("zoom", (event) => {
          g.attr("transform", event.transform);
        });
      
      // Apply zoom behavior to SVG
      svg.call(zoom);
      
      // Create the tree layout with dynamic sizing
      const treeLayout = d3.tree()
        .size([width * 0.8, height * 0.7]);
      
      // Process the tree data
      const root = d3.hierarchy(treeData, (d) => 
        d.operator ? [d.left, d.right].filter(Boolean) : null
      );
      
      // Generate the tree layout
      const tree = treeLayout(root);
      
      // Position the tree in the center
      g.attr("transform", `translate(${width * 0.1}, 40)`);
      
      // Draw links with smooth curves
      g.selectAll(".link")
        .data(tree.links())
        .join("path")
        .attr("class", "link")
        .attr("d", d3.linkVertical()
          .x(d => d.x)
          .y(d => d.y)
        )
        .style("fill", "none")
        .style("stroke", "#a0aec0")
        .style("stroke-width", 1.5);
      
      // Create node groups
      const nodes = g.selectAll(".node")
        .data(tree.descendants())
        .join("g")
        .attr("class", "node")
        .attr("transform", d => `translate(${d.x}, ${d.y})`)
        .attr("cursor", "pointer")
        .on("mouseover", function() {
          d3.select(this).select("circle").style("fill", "#4299e1");
          d3.select(this).select("text").style("font-weight", "bold");
        })
        .on("mouseout", function() {
          d3.select(this).select("circle").style("fill", d => 
            d.data.operator ? "#f687b3" : "#68d391"
          );
          d3.select(this).select("text").style("font-weight", "normal");
        });
      
      // Draw node circles
      nodes.append("circle")
        .attr("r", d => d.data.operator ? 8 : 6)
        .style("fill", d => d.data.operator ? "#f687b3" : "#68d391")
        .style("stroke", "#4a5568")
        .style("stroke-width", 1);
      
      // Add node labels
      nodes.append("text")
        .attr("dy", d => d.children ? -15 : 20)
        .attr("text-anchor", "middle")
        .attr("font-size", "14px")
        .attr("font-family", "sans-serif")
        .style("fill", "#fff")
        .text(d => d.data.operator ? d.data.operator : d.data);
      
      // Add a subtle initial animation
      svg.transition()
        .duration(750)
        .call(zoom.transform, d3.zoomIdentity.translate(0, 0).scale(0.9));
        
    } catch (err) {
      setError("Error rendering tree");
      console.error("Tree rendering error:", err);
    }
  }, [treeData]);

  return (
    <div ref={containerRef} className="w-full h-full relative">
      {error ? (
        <div className="flex flex-col items-center justify-center h-full">
          <div className="text-red-500 mb-2">
            <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path>
            </svg>
          </div>
          <div className="text-gray-700 text-center">
            {error}
          </div>
        </div>
      ) : !treeData ? (
        <div className="flex flex-col items-center justify-center h-full">
          <div className="text-gray-400 mb-2">
            <svg className="w-10 h-10 animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 17V7m0 10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h2a2 2 0 012 2m0 10a2 2 0 002 2h2a2 2 0 002-2M9 7a2 2 0 012-2h2a2 2 0 012 2m0 10V7m0 10a2 2 0 002 2h2a2 2 0 002-2V7a2 2 0 00-2-2h-2a2 2 0 00-2 2"></path>
            </svg>
          </div>
          <div className="text-gray-500">
            No parse tree data available
          </div>
        </div>
      ) : (
        <svg 
          ref={svgRef} 
          className="w-full h-full"
          style={{ minHeight: "300px" }} 
        />
      )}
    </div>
  );
};

export default Tree;