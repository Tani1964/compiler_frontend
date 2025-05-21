import { useContext } from "react";
import { DataContext } from "../contexts/DataContext";

const Lexemes = () => {
  const { data } = useContext(DataContext);
  
  const hasLexemes = data && data[0] && data[0][1] && Array.isArray(data[0][1]);
  const lexemes = hasLexemes ? data[0][1] : [];

  return (
    <div className="bg-gray-50 border border-gray-200 rounded-xl shadow-sm p-4 mb-4">
      <h3 className="text-lg font-medium text-gray-800 mb-2">Lexical Analyzer Input (Lexemes)</h3>
      
      <div className="bg-gray-900 rounded-md p-3 overflow-x-auto">
        {hasLexemes ? (
          <div className="flex flex-wrap gap-2 items-center">
            <span className="text-white">[</span>
            {lexemes.map((lexeme, index) => (
              <div key={index} className="flex items-center">
                <div className="bg-gray-800 rounded-md px-2 py-1">
                  <span className="text-green-400 font-mono">
                    {`[${lexeme[0]} : ${lexeme[1]}]`}
                  </span>
                </div>
                {index < lexemes.length - 1 && (
                  <span className="text-gray-400 mx-1">,</span>
                )}
              </div>
            ))}
            <span className="text-white">]</span>
          </div>
        ) : (
          <div className="text-yellow-400 font-mono">No lexemes data available</div>
        )}
      </div>
      
      {hasLexemes && (
        <div className="mt-3 text-sm text-gray-600">
          {lexemes.length} {lexemes.length === 1 ? "lexeme" : "lexemes"} found
        </div>
      )}
    </div>
  );
};

export default Lexemes;