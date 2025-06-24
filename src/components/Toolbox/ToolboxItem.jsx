import React from 'react';
import { motion } from 'framer-motion';
import { useData } from '../../context/DataContext';
import { format } from 'date-fns';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../../common/SafeIcon';

const { FiEdit2, FiTrash2, FiCalendar, FiTag } = FiIcons;

function ToolboxItem({ item, category }) {
  const { updateToolboxItem, deleteToolboxItem } = useData();

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this item?')) {
      deleteToolboxItem(category, item.id);
    }
  };

  return (
    <motion.div
      layout
      className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
    >
      <div className="flex items-start justify-between mb-3">
        <h3 className="font-medium text-gray-900 flex-1">
          {item.name || item.title}
        </h3>
        
        <div className="flex items-center space-x-2">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="p-1 text-gray-400 hover:text-gray-600"
          >
            <SafeIcon icon={FiEdit2} className="w-4 h-4" />
          </motion.button>
          
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={handleDelete}
            className="p-1 text-gray-400 hover:text-red-600"
          >
            <SafeIcon icon={FiTrash2} className="w-4 h-4" />
          </motion.button>
        </div>
      </div>
      
      {item.description && (
        <p className="text-sm text-gray-600 mb-3">{item.description}</p>
      )}
      
      <div className="space-y-2">
        {item.version && (
          <div className="flex items-center space-x-2 text-xs text-gray-500">
            <SafeIcon icon={FiTag} className="w-3 h-3" />
            <span>Version: {item.version}</span>
          </div>
        )}
        
        {item.status && (
          <div className="flex items-center space-x-2 text-xs text-gray-500">
            <span className={`px-2 py-1 rounded-full text-xs font-medium ${
              item.status === 'active' ? 'bg-green-100 text-green-800' :
              item.status === 'inactive' ? 'bg-red-100 text-red-800' :
              'bg-gray-100 text-gray-800'
            }`}>
              {item.status}
            </span>
          </div>
        )}
        
        {item.createdAt && (
          <div className="flex items-center space-x-2 text-xs text-gray-500">
            <SafeIcon icon={FiCalendar} className="w-3 h-3" />
            <span>Added {format(new Date(item.createdAt), 'MMM d, yyyy')}</span>
          </div>
        )}
      </div>
    </motion.div>
  );
}

export default ToolboxItem;