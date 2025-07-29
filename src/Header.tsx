import React from 'react';
import { CheckSquareIcon } from '@heroicons/react/24/outline';

const Header = () => {
  return (
    <header className="text-center mb-8">
      <div className="flex items-center justify-center gap-3 mb-4">
        <div className="bg-blue-500 p-3 rounded-xl">
          <CheckSquareIcon className="w-8 h-8 text-white" />
        </div>
        <h1 className="text-4xl font-bold text-gray-800">Task Manager</h1>
      </div>
      <p className="text-gray-600 text-lg">
        Organize your tasks efficiently and boost your productivity
      </p>
    </header>
  );
};

export default Header;