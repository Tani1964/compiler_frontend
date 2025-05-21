import { useContext } from "react";
import { DataContext } from "../contexts/DataContext";

const IntermediateCode = () => {
  const { data } = useContext(DataContext);
  
  // Check if intermediate code data exists and is accessible
  const hasIntermediateCode = data && data[2] && data[2][1] && Array.isArray(data[2][1]);
  const intermediateCode = hasIntermediateCode ? data[2][1] : [];
  
  return (
    <div className="bg-gray-50 border border-gray-200 rounded-xl shadow-sm p-4 mb-4">
      <div className="flex justify-between items-center mb-3">
        <h3 className="text-lg font-medium text-gray-800">Intermediate Code Output</h3>
        {hasIntermediateCode && intermediateCode.length > 0 && (
          <div className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
            {intermediateCode.length} {intermediateCode.length === 1 ? "instruction" : "instructions"}
          </div>
        )}
      </div>
      
      {hasIntermediateCode && intermediateCode.length > 0 ? (
        <div className="bg-gray-900 rounded-md p-3 overflow-y-auto max-h-64">
          <table className="w-full">
            <thead>
              <tr className="text-gray-400 text-xs border-b border-gray-700">
                <th className="py-2 px-4 text-left w-16">#</th>
                <th className="py-2 px-4 text-left">Instruction</th>
              </tr>
            </thead>
            <tbody>
              {intermediateCode.map((code, index) => (
                <tr key={index} className="hover:bg-gray-800">
                  <td className="py-2 px-4 text-gray-500 font-mono text-sm">
                    {index.toString().padStart(2, '0')}
                  </td>
                  <td className="py-2 px-4 text-green-400 font-mono">
                    {code}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="bg-gray-100 rounded-md p-4 text-gray-500 text-center">
          No intermediate code available
        </div>
      )}
      
      {hasIntermediateCode && intermediateCode.length > 0 && (
        <div className="mt-2 text-xs text-gray-500 flex items-center justify-end">
          <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
          </svg>
          Triple code or TAC representation
        </div>
      )}
    </div>
  );
};

export default IntermediateCode;