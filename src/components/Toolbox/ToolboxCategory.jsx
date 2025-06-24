import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useData } from '../../context/DataContext';
import ToolboxItem from './ToolboxItem';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../../common/SafeIcon';

const { FiBox } = FiIcons;

function ToolboxCategory({ category }) {
  const { toolbox } = useData();
  const items = toolbox[category] || [];

  return (
    <div className="space-y-4">
      <AnimatePresence>
        {items.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {items.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ delay: index * 0.05 }}
              >
                <ToolboxItem item={item} category={category} />
              </motion.div>
            ))}
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12 text-gray-500"
          >
            <SafeIcon icon={FiBox} className="w-12 h-12 mx-auto mb-4 text-gray-300" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No items yet</h3>
            <p className="text-gray-600">
              Start building your {category} database
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default ToolboxCategory;