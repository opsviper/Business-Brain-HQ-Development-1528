import React, { useState } from 'react';
import { motion } from 'framer-motion';
import TaskList from '../components/Tasks/TaskList';
import TaskModal from '../components/Tasks/TaskModal';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';

const { FiPlus } = FiIcons;

const taskCategories = [
  { id: 'react', name: 'React Tasks', color: 'red', description: 'Urgent issues requiring immediate attention' },
  { id: 'maintain', name: 'Maintain Tasks', color: 'yellow', description: 'Regular maintenance and upkeep activities' },
  { id: 'improve', name: 'Improve Tasks', color: 'green', description: 'Enhancement and optimization initiatives' }
];

function TaskManagement() {
  const [activeTab, setActiveTab] = useState('react');
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Task Management</h1>
          <p className="text-gray-600 mt-2">
            Manage your React, Maintain, and Improve tasks using the ProcessDriven framework
          </p>
        </div>
        
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setIsModalOpen(true)}
          className="flex items-center space-x-2 bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors"
        >
          <SafeIcon icon={FiPlus} className="w-4 h-4" />
          <span>Add Task</span>
        </motion.button>
      </div>

      {/* Task Category Tabs */}
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8">
          {taskCategories.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveTab(category.id)}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === category.id
                  ? `border-${category.color}-500 text-${category.color}-600`
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              {category.name}
            </button>
          ))}
        </nav>
      </div>

      {/* Active Tab Content */}
      <div className="space-y-4">
        {taskCategories.map((category) => (
          <div key={category.id} className={activeTab === category.id ? 'block' : 'hidden'}>
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="mb-4">
                <h2 className="text-xl font-semibold text-gray-900">{category.name}</h2>
                <p className="text-gray-600 text-sm mt-1">{category.description}</p>
              </div>
              
              <TaskList category={category.id} />
            </div>
          </div>
        ))}
      </div>

      <TaskModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        category={activeTab}
      />
    </div>
  );
}

export default TaskManagement;