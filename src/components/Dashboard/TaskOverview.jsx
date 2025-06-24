import React from 'react';
import { motion } from 'framer-motion';
import { useData } from '../../context/DataContext';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';

const COLORS = {
  react: '#ef4444',
  maintain: '#f59e0b',
  improve: '#10b981'
};

function TaskOverview() {
  const { tasks } = useData();

  const data = [
    { name: 'React Tasks', value: tasks.react.length, color: COLORS.react },
    { name: 'Maintain Tasks', value: tasks.maintain.length, color: COLORS.maintain },
    { name: 'Improve Tasks', value: tasks.improve.length, color: COLORS.improve }
  ];

  const totalTasks = data.reduce((sum, item) => sum + item.value, 0);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="bg-white rounded-lg shadow-sm border border-gray-200 p-6"
    >
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Task Distribution</h3>
      
      {totalTasks > 0 ? (
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={100}
                paddingAngle={5}
                dataKey="value"
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      ) : (
        <div className="h-64 flex items-center justify-center text-gray-500">
          <p>No tasks yet. Start by adding some tasks!</p>
        </div>
      )}

      <div className="mt-4 grid grid-cols-3 gap-4">
        {data.map((item) => (
          <div key={item.name} className="text-center">
            <div className="flex items-center justify-center space-x-2">
              <div 
                className="w-3 h-3 rounded-full" 
                style={{ backgroundColor: item.color }}
              ></div>
              <span className="text-sm text-gray-600">{item.name}</span>
            </div>
            <p className="text-xl font-bold text-gray-900 mt-1">{item.value}</p>
          </div>
        ))}
      </div>
    </motion.div>
  );
}

export default TaskOverview;