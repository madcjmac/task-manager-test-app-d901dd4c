import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import TaskList from './components/TaskList';
import AddTaskForm from './components/AddTaskForm';
import TaskStats from './components/TaskStats';
import { CheckCircleIcon, ExclamationTriangleIcon } from '@heroicons/react/24/outline';

function App() {
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState('all'); // all, completed, pending
  const [searchTerm, setSearchTerm] = useState('');
  const [notification, setNotification] = useState(null);

  // Load tasks from localStorage on component mount
  useEffect(() => {
    const savedTasks = localStorage.getItem('taskManagerTasks');
    if (savedTasks) {
      setTasks(JSON.parse(savedTasks));
    }
  }, []);

  // Save tasks to localStorage whenever tasks change
  useEffect(() => {
    localStorage.setItem('taskManagerTasks', JSON.stringify(tasks));
  }, [tasks]);

  // Show notification
  const showNotification = (message, type = 'success') => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 3000);
  };

  // Add new task
  const addTask = (taskData) => {
    const newTask = {
      id: Date.now().toString(),
      title: taskData.title,
      description: taskData.description,
      priority: taskData.priority,
      dueDate: taskData.dueDate,
      completed: false,
      createdAt: new Date().toISOString(),
    };
    setTasks(prev => [newTask, ...prev]);
    showNotification('Task added successfully!');
  };

  // Edit task
  const editTask = (taskId, updatedData) => {
    setTasks(prev => prev.map(task => 
      task.id === taskId ? { ...task, ...updatedData } : task
    ));
    showNotification('Task updated successfully!');
  };

  // Delete task
  const deleteTask = (taskId) => {
    setTasks(prev => prev.filter(task => task.id !== taskId));
    showNotification('Task deleted successfully!', 'warning');
  };

  // Toggle task completion
  const toggleTaskCompletion = (taskId) => {
    setTasks(prev => prev.map(task => 
      task.id === taskId ? { ...task, completed: !task.completed } : task
    ));
    const task = tasks.find(t => t.id === taskId);
    showNotification(
      task?.completed ? 'Task marked as pending!' : 'Task completed!',
      task?.completed ? 'warning' : 'success'
    );
  };

  // Filter and search tasks
  const filteredTasks = tasks.filter(task => {
    const matchesFilter = filter === 'all' || 
      (filter === 'completed' && task.completed) ||
      (filter === 'pending' && !task.completed);
    
    const matchesSearch = task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      task.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    return matchesFilter && matchesSearch;
  });

  // Clear all completed tasks
  const clearCompleted = () => {
    const completedCount = tasks.filter(task => task.completed).length;
    if (completedCount > 0) {
      setTasks(prev => prev.filter(task => !task.completed));
      showNotification(`${completedCount} completed task(s) cleared!`, 'warning');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Header */}
        <Header />

        {/* Notification */}
        {notification && (
          <div className={`fixed top-4 right-4 z-50 flex items-center gap-2 px-4 py-3 rounded-lg shadow-lg transition-all duration-300 ${
            notification.type === 'success' 
              ? 'bg-green-500 text-white' 
              : 'bg-orange-500 text-white'
          }`}>
            {notification.type === 'success' ? (
              <CheckCircleIcon className="w-5 h-5" />
            ) : (
              <ExclamationTriangleIcon className="w-5 h-5" />
            )}
            {notification.message}
          </div>
        )}

        {/* Task Statistics */}
        <TaskStats tasks={tasks} />

        {/* Add Task Form */}
        <div className="mb-8">
          <AddTaskForm onAddTask={addTask} />
        </div>

        {/* Search and Filter Controls */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
          <div className="flex flex-col sm:flex-row gap-4 mb-4">
            {/* Search */}
            <div className="flex-1">
              <input
                type="text"
                placeholder="Search tasks..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            
            {/* Filter */}
            <div className="flex gap-2">
              {['all', 'pending', 'completed'].map((filterType) => (
                <button
                  key={filterType}
                  onClick={() => setFilter(filterType)}
                  className={`px-4 py-2 rounded-lg font-medium transition-colors capitalize ${
                    filter === filterType
                      ? 'bg-blue-500 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {filterType}
                </button>
              ))}
            </div>
          </div>

          {/* Clear Completed Button */}
          {tasks.some(task => task.completed) && (
            <button
              onClick={clearCompleted}
              className="text-red-600 hover:text-red-700 font-medium text-sm transition-colors"
            >
              Clear Completed Tasks
            </button>
          )}
        </div>

        {/* Task List */}
        <TaskList
          tasks={filteredTasks}
          onEditTask={editTask}
          onDeleteTask={deleteTask}
          onToggleCompletion={toggleTaskCompletion}
          searchTerm={searchTerm}
          filter={filter}
        />

        {/* Empty State */}
        {filteredTasks.length === 0 && tasks.length > 0 && (
          <div className="text-center py-12">
            <div className="text-gray-400 text-lg mb-2">No tasks found</div>
            <div className="text-gray-500 text-sm">
              Try adjusting your search or filter criteria
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;