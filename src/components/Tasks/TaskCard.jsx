import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useData } from '../../context/DataContext';
import { format } from 'date-fns';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../../common/SafeIcon';

const { FiUser, FiCalendar, FiEdit2, FiTrash2, FiCheck, FiClock, FiAlertCircle } = FiIcons;

function TaskCard({ task, category }) {
  const { updateTask, deleteTask } = useData();
  const [isEditing, setIsEditing] = useState(false);

  const handleStatusChange = () => {
    const newStatus = task.status === 'completed' ? 'pending' : 'completed';
    updateTask(category, task.id, { status: newStatus });
  };

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      deleteTask(category, task.id);
    }
  };

  const isOverdue = task.dueDate && new Date(task.dueDate) < new Date() && task.status !== 'completed';
  const isCompleted = task.status === 'completed';

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'text-red-600 bg-red-100';
      case 'medium': return 'text-yellow-600 bg-yellow-100';
      case 'low': return 'text-green-600 bg-green-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  return (
    <motion.div
      layout
      className={`bg-white border rounded-lg p-4 ${
        isOverdue ? 'border-red-200 bg-red-50' : 
        isCompleted ? 'border-green-200 bg-green-50' : 
        'border-gray-200'
      }`}
    >
      <div className="flex items-start justify-between">
        <div className="flex items-start space-x-3 flex-1">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={handleStatusChange}
            className={`mt-1 w-5 h-5 rounded-full border-2 flex items-center justify-center ${
              isCompleted 
                ? 'bg-green-500 border-green-500 text-white' 
                : 'border-gray-300 hover:border-green-500'
            }`}
          >
            {isCompleted && <SafeIcon icon={FiCheck} className="w-3 h-3" />}
          </motion.button>
          
          <div className="flex-1">
            <h3 className={`font-medium ${isCompleted ? 'line-through text-gray-500' : 'text-gray-900'}`}>
              {task.title}
            </h3>
            
            {task.description && (
              <p className={`text-sm mt-1 ${isCompleted ? 'text-gray-400' : 'text-gray-600'}`}>
                {task.description}
              </p>
            )}
            
            <div className="flex items-center space-x-4 mt-3 text-sm text-gray-500">
              {task.assignee && (
                <div className="flex items-center space-x-1">
                  <SafeIcon icon={FiUser} className="w-4 h-4" />
                  <span>{task.assignee}</span>
                </div>
              )}
              
              {task.dueDate && (
                <div className={`flex items-center space-x-1 ${isOverdue ? 'text-red-600' : ''}`}>
                  <SafeIcon icon={isOverdue ? FiAlertCircle : FiCalendar} className="w-4 h-4" />
                  <span>{format(new Date(task.dueDate), 'MMM d, yyyy')}</span>
                </div>
              )}
              
              {task.priority && (
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(task.priority)}`}>
                  {task.priority}
                </span>
              )}
            </div>
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setIsEditing(true)}
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
    </motion.div>
  );
}

export default TaskCard;