import React from 'react';
import { motion } from 'framer-motion';
import { useData } from '../../context/DataContext';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../../common/SafeIcon';

const { FiCheckSquare, FiClock, FiTrendingUp, FiDatabase } = FiIcons;

function DashboardStats() {
  const { tasks, toolbox } = useData();

  const totalTasks = Object.values(tasks).reduce((acc, taskList) => acc + taskList.length, 0);
  const overdueTasks = Object.values(tasks).reduce((acc, taskList) => {
    return acc + taskList.filter(task => 
      task.dueDate && new Date(task.dueDate) < new Date()
    ).length;
  }, 0);
  
  const completedTasks = Object.values(tasks).reduce((acc, taskList) => {
    return acc + taskList.filter(task => task.status === 'completed').length;
  }, 0);

  const totalToolboxItems = Object.values(toolbox).reduce((acc, items) => acc + items.length, 0);

  const stats = [
    {
      name: 'Total Tasks',
      value: totalTasks,
      icon: FiCheckSquare,
      color: 'text-blue-600',
      bgColor: 'bg-blue-100'
    },
    {
      name: 'Overdue Tasks',
      value: overdueTasks,
      icon: FiClock,
      color: 'text-red-600',
      bgColor: 'bg-red-100'
    },
    {
      name: 'Completed',
      value: completedTasks,
      icon: FiTrendingUp,
      color: 'text-green-600',
      bgColor: 'bg-green-100'
    },
    {
      name: 'Toolbox Items',
      value: totalToolboxItems,
      icon: FiDatabase,
      color: 'text-purple-600',
      bgColor: 'bg-purple-100'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat, index) => (
        <motion.div
          key={stat.name}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          className="bg-white rounded-lg shadow-sm border border-gray-200 p-6"
        >
          <div className="flex items-center">
            <div className={`${stat.bgColor} p-3 rounded-lg`}>
              <SafeIcon icon={stat.icon} className={`w-6 h-6 ${stat.color}`} />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">{stat.name}</p>
              <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}

export default DashboardStats;