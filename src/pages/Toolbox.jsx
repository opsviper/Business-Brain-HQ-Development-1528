import React, { useState } from 'react';
import { motion } from 'framer-motion';
import ToolboxCategory from '../components/Toolbox/ToolboxCategory';
import ToolboxModal from '../components/Toolbox/ToolboxModal';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';

const { FiPlus, FiDatabase, FiSettings, FiHardDrive, FiUsers, FiCalendar, FiLightbulb, FiCpu } = FiIcons;

const toolboxCategories = [
  { 
    id: 'systems', 
    name: 'Systems Database', 
    icon: FiCpu,
    color: 'blue',
    required: true,
    description: 'Core business systems and architectures'
  },
  { 
    id: 'processes', 
    name: 'Process Database', 
    icon: FiSettings,
    color: 'purple',
    required: true,
    description: 'Standard operating procedures and workflows'
  },
  { 
    id: 'equipment', 
    name: 'Equipment Database', 
    icon: FiHardDrive,
    color: 'gray',
    required: true,
    description: 'Hardware and physical assets inventory'
  },
  { 
    id: 'software', 
    name: 'Software Database', 
    icon: FiDatabase,
    color: 'indigo',
    required: false,
    description: 'Software licenses and applications'
  },
  { 
    id: 'team', 
    name: 'Team Database', 
    icon: FiUsers,
    color: 'pink',
    required: false,
    description: 'Team members and their roles'
  },
  { 
    id: 'keyEvents', 
    name: 'Key Events Database', 
    icon: FiCalendar,
    color: 'orange',
    required: false,
    description: 'Important dates and milestones'
  },
  { 
    id: 'ideas', 
    name: 'Idea Database', 
    icon: FiLightbulb,
    color: 'teal',
    required: true,
    description: 'Innovation opportunities and future improvements'
  }
];

function Toolbox() {
  const [activeCategory, setActiveCategory] = useState('systems');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const activeToolbox = toolboxCategories.find(cat => cat.id === activeCategory);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Toolbox</h1>
          <p className="text-gray-600 mt-2">
            Manage your knowledge base across 7 key categories
          </p>
        </div>
        
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setIsModalOpen(true)}
          className="flex items-center space-x-2 bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors"
        >
          <SafeIcon icon={FiPlus} className="w-4 h-4" />
          <span>Add Item</span>
        </motion.button>
      </div>

      {/* Category Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {toolboxCategories.map((category) => (
          <motion.button
            key={category.id}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setActiveCategory(category.id)}
            className={`p-4 rounded-lg border-2 text-left transition-all ${
              activeCategory === category.id
                ? `border-${category.color}-500 bg-${category.color}-50`
                : 'border-gray-200 hover:border-gray-300'
            }`}
          >
            <div className="flex items-center space-x-3 mb-2">
              <div className={`p-2 rounded-lg bg-${category.color}-100`}>
                <SafeIcon icon={category.icon} className={`w-5 h-5 text-${category.color}-600`} />
              </div>
              <div className="flex-1">
                <h3 className="font-medium text-gray-900">{category.name}</h3>
                {category.required && (
                  <span className="text-xs text-red-600">Required</span>
                )}
              </div>
            </div>
            <p className="text-sm text-gray-600">{category.description}</p>
          </motion.button>
        ))}
      </div>

      {/* Active Category Content */}
      {activeToolbox && (
        <motion.div
          key={activeCategory}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-lg shadow-sm border border-gray-200 p-6"
        >
          <div className="flex items-center space-x-3 mb-6">
            <div className={`p-3 rounded-lg bg-${activeToolbox.color}-100`}>
              <SafeIcon icon={activeToolbox.icon} className={`w-6 h-6 text-${activeToolbox.color}-600`} />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-gray-900">{activeToolbox.name}</h2>
              <p className="text-gray-600 text-sm">{activeToolbox.description}</p>
            </div>
          </div>
          
          <ToolboxCategory category={activeCategory} />
        </motion.div>
      )}

      <ToolboxModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        category={activeCategory}
      />
    </div>
  );
}

export default Toolbox;