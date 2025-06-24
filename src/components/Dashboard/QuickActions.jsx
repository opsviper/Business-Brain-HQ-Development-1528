import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../../common/SafeIcon';

const { FiPlus, FiDatabase, FiBarChart3, FiSettings } = FiIcons;

function QuickActions() {
  const navigate = useNavigate();

  const actions = [
    {
      name: 'Add New Task',
      description: 'Create a new React, Maintain, or Improve task',
      icon: FiPlus,
      color: 'bg-blue-500 hover:bg-blue-600',
      onClick: () => navigate('/tasks')
    },
    {
      name: 'Manage Toolbox',
      description: 'Add processes, systems, or equipment',
      icon: FiDatabase,
      color: 'bg-green-500 hover:bg-green-600',
      onClick: () => navigate('/toolbox')
    },
    {
      name: 'View Reports',
      description: 'Analyze performance and trends',
      icon: FiBarChart3,
      color: 'bg-purple-500 hover:bg-purple-600',
      onClick: () => navigate('/reports')
    },
    {
      name: 'Settings',
      description: 'Configure your HQ preferences',
      icon: FiSettings,
      color: 'bg-gray-500 hover:bg-gray-600',
      onClick: () => navigate('/settings')
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="bg-white rounded-lg shadow-sm border border-gray-200 p-6"
    >
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
      
      <div className="grid grid-cols-2 gap-4">
        {actions.map((action, index) => (
          <motion.button
            key={action.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={action.onClick}
            className="p-4 text-left rounded-lg border border-gray-200 hover:border-gray-300 transition-colors"
          >
            <div className={`w-10 h-10 rounded-lg ${action.color} flex items-center justify-center mb-3`}>
              <SafeIcon icon={action.icon} className="w-5 h-5 text-white" />
            </div>
            <h4 className="font-medium text-gray-900 mb-1">{action.name}</h4>
            <p className="text-sm text-gray-600">{action.description}</p>
          </motion.button>
        ))}
      </div>
    </motion.div>
  );
}

export default QuickActions;