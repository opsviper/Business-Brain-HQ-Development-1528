import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useData } from '../../context/DataContext';
import TaskCard from './TaskCard';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../../common/SafeIcon';

const { FiInbox } = FiIcons;

function TaskList({ category }) {
  const { tasks } = useData();
  const taskList = tasks[category] || [];

  return (
    <div className="space-y-4">
      <AnimatePresence>
        {taskList.length > 0 ? (
          taskList.map((task, index) => (
            <motion.div
              key={task.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ delay: index * 0.05 }}
            >
              <TaskCard task={task} category={category} />
            </motion.div>
          ))
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12 text-gray-500"
          >
            <SafeIcon icon={FiInbox} className="w-12 h-12 mx-auto mb-4 text-gray-300" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No tasks yet</h3>
            <p className="text-gray-600">
              Get started by adding your first {category} task
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default TaskList;