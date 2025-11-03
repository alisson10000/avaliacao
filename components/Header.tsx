
import React from 'react';

export const Header: React.FC = () => {
  return (
    <header className="bg-white dark:bg-gray-800 shadow-md">
      <div className="container mx-auto px-4 py-6">
        <h1 className="text-3xl font-bold text-center text-blue-600 dark:text-blue-400">
          Analisador de Feedback de Alunos
        </h1>
      </div>
    </header>
  );
};
