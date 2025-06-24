import React from 'react';
import { motion } from 'framer-motion';
import { useData } from '../../context/DataContext';
import { format } from 'date-fns';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../../common/SafeIcon';

const { FiCheckSquare, FiPlus, FiEdit, FiClock } = FiIcons;

function RecentActivity() {
  const { tasks, toolbox } = useData();

  // Get recent activities from tasks and toolbox items
  const getRecentActivities = () => {
    const activities = [];

    // Add recent tasks
    Object.entries(tasks).forEach(([category, taskList]) => {
      taskList.forEach(task => {
        activities.push({
          id: task.id,
          type: 'task',
          action: 'created',
          title: task.title,
          category: category,
          timestamp: task.createdAt,
          icon: FiPlus
        });
      });
    });

    // Add recent toolbox items
    Object.entries(toolbox).forEach(([category, items]) => {
      items.forEach(item => {
        activities.push({
          id: item.id,
          type: 'toolbox',
          action: 'added',
          title: item.name || item.title,
          category: category,
          timestamp: item.createdAt,
          icon: FiPlus
        });
      });
    });

    // Sort by timestamp and get the 10 most recent
    return activities
      .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))
      .slice(0, 10);
  };

  const recentActivities = getRecentActivities();

  const getCategoryColor = (category) => {
    const colors = {
      react: 'text-red-600 bg-red-100',
      maintain: 'text-yellow-600 bg-yellow-100',
      improve: 'text-green-600 bg-green-100',
      systems: 'text-blue-600 bg-blue-100',
      processes: 'text-purple-600 bg-purple-100',
      equipment: 'text-gray-600 bg-gray-100',
      software: 'text-indigo-600 bg-indigo-100',
      team: 'text-pink-600 bg-pink-100',
      keyEvents: 'text-orange-600 bg-orange-100',
      ideas: 'text-teal-600 bg-teal-100'
    };
    return colors[category] || 'text-gray-600 bg-gray-100';
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="bg-white rounded-lg shadow-sm border border-gray-200 p-6"
    >
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
      
      {recentActivities.length > 0 ? (
        <div className="space-y-4">
          {recentActivities.map((activity, index) => (
            <motion.div
              key={activity.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05 }}
              className="flex items-center space-x-4 p-3 rounded-lg hover:bg-gray-50"
            >
              <div className={`p-2 rounded-lg ${getCategoryColor(activity.category)}`}>
                <SafeIcon icon={activity.icon} className="w-4 h-4" />
              </div>
              
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 truncate">
                  {activity.action === 'created' ? 'Created task:' : 'Added to toolbox:'} {activity.title}
                </p>
                <p className="text-xs text-gray-500 capitalize">
                  {activity.category.replace(/([A-Z])/g, ' $1').trim()} • {format(new Date(activity.timestamp), 'MMM d, h:mm a')}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      ) : (
        <div className="text-center py-8 text-gray-500">
          <SafeIcon icon={FiClock} className="w-12 h-12 mx-auto mb-4 text-gray-300" />
          <p>No recent activity</p>
          <p className="text-sm mt-1">Start by adding tasks or toolbox items</p>
        </div>
      )}
    </motion.div>
  );
}

export default RecentActivity;