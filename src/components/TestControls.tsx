import React from 'react';

interface TestControlsProps {
  onSimulateLoading: () => void;
  onSimulateError: () => void;
  onClearData: () => void;
  onResetData: () => void;
}

export const TestControls = ({ 
  onSimulateLoading, 
  onSimulateError, 
  onClearData, 
  onResetData 
}: TestControlsProps) => {
  return (
    <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4 mb-6">
      <h3 className="text-lg font-medium text-yellow-800 dark:text-yellow-200 mb-3">
        🧪 Controles de Teste
      </h3>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <button
          onClick={onSimulateLoading}
          className="px-3 py-2 bg-blue-600 text-white text-sm rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Simular Loading
        </button>
        <button
          onClick={onSimulateError}
          className="px-3 py-2 bg-red-600 text-white text-sm rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500"
        >
          Simular Erro
        </button>
        <button
          onClick={onClearData}
          className="px-3 py-2 bg-gray-600 text-white text-sm rounded-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500"
        >
          Limpar Dados
        </button>
        <button
          onClick={onResetData}
          className="px-3 py-2 bg-green-600 text-white text-sm rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500"
        >
          Resetar Dados
        </button>
      </div>
      <p className="text-sm text-yellow-700 dark:text-yellow-300 mt-2">
        Use estes controles para testar os diferentes estados da aplicação: loading, erro, dados vazios e performance com 100 leads. A paginação limita a 10 leads por página para melhor performance.
      </p>
    </div>
  );
};
