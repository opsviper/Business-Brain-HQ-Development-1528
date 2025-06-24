import React from 'react';
import { motion } from 'framer-motion';
import { useData } from '../../context/DataContext';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip, BarChart, Bar, XAxis, YAxis, CartesianGrid } from 'recharts';

const COLORS = {
  react: '#ef4444',
  maintain: '#f59e0b',
  improve: '#10b981'
};

function TaskDistributionChart() {
  const { tasks } = useData();

  const pieData = [
    { name: 'React', value: tasks.react.length, color: COLORS.react },
    { name: 'Maintain', value: tasks.maintain.length, color: COLORS.maintain },
    { name: 'Improve', value: tasks.improve.length, color: COLORS.improve }
  ];

  const barData = [
    { name: 'React', tasks: tasks.react.length, completed: tasks.react.filter(t => t.status === 'completed').length },
    { name: 'Maintain', tasks: tasks.maintain.length, completed: tasks.maintain.filter(t => t.status === 'completed').length },
    { name: 'Improve', tasks: tasks.improve.length, completed: tasks.improve.filter(t => t.status === 'completed').length }
  ];

  const totalTasks = pieData.reduce((sum, item) => sum + item.value, 0);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="bg-white rounded-lg shadow-sm border border-gray-200 p-6"
    >
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Task Distribution & Progress</h3>
      
      {totalTasks > 0 ? (
        <div className="space-y-6">
          {/* Pie Chart */}
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>

          {/* Bar Chart */}
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={barData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="tasks" fill="#94a3b8" name="Total Tasks" />
                <Bar dataKey="completed" fill="#10b981" name="Completed Tasks" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      ) : (
        <div className="h-64 flex items-center justify-center text-gray-500">
          <div className="text-center">
            <p className="text-lg font-medium">No data to display</p>
            <p className="text-sm mt-1">Add some tasks to see your distribution</p>
          </div>
        </div>
      )}
    </motion.div>
  );
}

export default TaskDistributionChart;