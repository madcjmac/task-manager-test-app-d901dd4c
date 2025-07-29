import React from 'react';
import { CheckCircleIcon, ClockIcon, ExclamationCircleIcon } from '@heroicons/react/24/outline';

const TaskStats = ({ tasks }) => {
  const totalTasks = tasks.length;
  const completedTasks = tasks.filter(task => task.completed).length;
  const pendingTasks = totalTasks - completedTasks;
  const completionPercentage = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
      {/* Total Tasks */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-600">Total Tasks</p>
            <p className="text-3xl font-bold text-gray-900">{totalTasks}</p>
          </div>
          <div className="bg-blue-100 p-3 rounded-lg">
            <ExclamationCircleIcon className="w-6 h-6 text-blue-600" />
          </div>
        </div>
      </div>

      {/* Completed Tasks */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-600">Completed</p>
            <p className="text-3xl font-bold text-green-600">{completedTasks}</p>
          </div>
          <div className="bg-green-100 p-3 rounded-lg">
            <CheckCircleIcon className="w-6 h-6 text-green-600" />
          </div>
        </div>
      </div>

      {/* Pending Tasks */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-600">Pending</p>
            <p className="text-3xl font-bold text-orange-600">{pendingTasks}</p>
          </div>
          <div className="bg-orange-100 p-3 rounded-lg">
            <ClockIcon className="w-6 h-6 text-orange-600" />
          </div>
        </div>
      </div>

      {/* Completion Percentage */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-600">Progress</p>
            <p className="text-3xl font-bold text-purple-600">{completionPercentage}%</p>
          </div>
          <div className="bg-purple-100 p-3 rounded-lg">
            <div className="w-6 h-6 rounded-full bg-purple-600 flex items-center justify-center">
              <span className="text-white text-xs font-bold">%</span>
            </div>
          </div>
        </div>
        {totalTasks > 0 && (
          <div className="mt-4">
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-purple-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${completionPercentage}%` }}
              ></div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TaskStats;