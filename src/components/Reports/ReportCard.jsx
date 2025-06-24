import React from 'react';
import { motion } from 'framer-motion';
import SafeIcon from '../../common/SafeIcon';

function ReportCard({ title, value, icon, color, description }) {
  const colorClasses = {
    red: 'text-red-600 bg-red-100',
    orange: 'text-orange-600 bg-orange-100',
    yellow: 'text-yellow-600 bg-yellow-100',
    green: 'text-green-600 bg-green-100',
    blue: 'text-blue-600 bg-blue-100',
    purple: 'text-purple-600 bg-purple-100'
  };

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className="bg-white rounded-lg shadow-sm border border-gray-200 p-6"
    >
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <p className="text-sm font-medium text-gray-600 mb-1">{title}</p>
          <p className="text-3xl font-bold text-gray-900">{value}</p>
          <p className="text-sm text-gray-500 mt-1">{description}</p>
        </div>
        
        <div className={`p-3 rounded-lg ${colorClasses[color]}`}>
          <SafeIcon icon={icon} className="w-6 h-6" />
        </div>
      </div>
    </motion.div>
  );
}

export default ReportCard;