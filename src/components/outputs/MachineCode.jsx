import { useContext } from "react";
import { DataContext } from "../contexts/DataContext";

const MachineCode = () => {
  const { data } = useContext(DataContext);
  
  // Check if machine code data exists and is accessible
  const hasMachineCode = data && data[3] && data[3][1];
  const machineCode = hasMachineCode ? data[3][1] : null;
  
  return (
    <div className="bg-gray-50 border border-gray-200 rounded-xl shadow-sm p-4 mb-4">
      <div className="flex justify-between items-center mb-3">
        <h3 className="text-lg font-medium text-gray-800">Machine Code Output</h3>
        {hasMachineCode && (
          <div className="bg-purple-100 text-purple-800 text-xs px-2 py-1 rounded-full">
            Assembly
          </div>
        )}
      </div>
      
      {hasMachineCode ? (
        <div className="bg-gray-900 rounded-md p-3 overflow-x-auto font-mono">
          {typeof machineCode === 'string' ? (
            // If machine code is a string, split by newline and render each line
            machineCode.split('\n').map((line, index) => (
              <div key={index} className="text-green-400">
                {line}
              </div>
            ))
          ) : Array.isArray(machineCode) ? (
            // If machine code is an array, render each item
            machineCode.map((line, index) => (
              <div key={index} className="text-green-400">
                {line}
              </div>
            ))
          ) : (
            // Fallback for object or other types
            <pre className="text-green-400 whitespace-pre-wrap">
              {JSON.stringify(machineCode, null, 2)}
            </pre>
          )}
        </div>
      ) : (
        <div className="bg-gray-100 rounded-md p-4 text-gray-500 text-center">
          No machine code available
        </div>
      )}
      
      {hasMachineCode && (
        <div className="mt-2 text-xs text-gray-500 flex items-center justify-end">
          <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"></path>
          </svg>
          Low-level representation
        </div>
      )}
    </div>
  );
};

export default MachineCode;