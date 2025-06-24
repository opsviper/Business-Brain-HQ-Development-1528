import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useData } from '../../context/DataContext';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../../common/SafeIcon';

const { FiX } = FiIcons;

const categoryFields = {
  systems: [
    { name: 'name', label: 'System Name', type: 'text', required: true },
    { name: 'description', label: 'Description', type: 'textarea', required: false },
    { name: 'version', label: 'Version', type: 'text', required: false },
    { name: 'status', label: 'Status', type: 'select', options: ['active', 'inactive', 'maintenance'], required: false }
  ],
  processes: [
    { name: 'name', label: 'Process Name', type: 'text', required: true },
    { name: 'description', label: 'Description', type: 'textarea', required: false },
    { name: 'owner', label: 'Process Owner', type: 'text', required: false },
    { name: 'frequency', label: 'Frequency', type: 'select', options: ['daily', 'weekly', 'monthly', 'quarterly', 'annually'], required: false }
  ],
  equipment: [
    { name: 'name', label: 'Equipment Name', type: 'text', required: true },
    { name: 'description', label: 'Description', type: 'textarea', required: false },
    { name: 'serialNumber', label: 'Serial Number', type: 'text', required: false },
    { name: 'status', label: 'Status', type: 'select', options: ['operational', 'maintenance', 'retired'], required: false }
  ],
  software: [
    { name: 'name', label: 'Software Name', type: 'text', required: true },
    { name: 'description', label: 'Description', type: 'textarea', required: false },
    { name: 'version', label: 'Version', type: 'text', required: false },
    { name: 'license', label: 'License Type', type: 'text', required: false }
  ],
  team: [
    { name: 'name', label: 'Team Member Name', type: 'text', required: true },
    { name: 'role', label: 'Role', type: 'text', required: false },
    { name: 'email', label: 'Email', type: 'email', required: false },
    { name: 'department', label: 'Department', type: 'text', required: false }
  ],
  keyEvents: [
    { name: 'name', label: 'Event Name', type: 'text', required: true },
    { name: 'description', label: 'Description', type: 'textarea', required: false },
    { name: 'date', label: 'Date', type: 'date', required: false },
    { name: 'type', label: 'Event Type', type: 'select', options: ['milestone', 'deadline', 'meeting', 'review'], required: false }
  ],
  ideas: [
    { name: 'title', label: 'Idea Title', type: 'text', required: true },
    { name: 'description', label: 'Description', type: 'textarea', required: false },
    { name: 'priority', label: 'Priority', type: 'select', options: ['low', 'medium', 'high'], required: false },
    { name: 'status', label: 'Status', type: 'select', options: ['new', 'reviewing', 'approved', 'rejected'], required: false }
  ]
};

function ToolboxModal({ isOpen, onClose, category }) {
  const { addToolboxItem } = useData();
  const [formData, setFormData] = useState({});

  const fields = categoryFields[category] || [];

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const requiredFields = fields.filter(field => field.required);
    const missingFields = requiredFields.filter(field => !formData[field.name]?.trim());
    
    if (missingFields.length > 0) {
      alert(`Please fill in all required fields: ${missingFields.map(f => f.label).join(', ')}`);
      return;
    }

    addToolboxItem(category, formData);
    setFormData({});
    onClose();
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const renderField = (field) => {
    const value = formData[field.name] || '';
    
    switch (field.type) {
      case 'textarea':
        return (
          <textarea
            name={field.name}
            value={value}
            onChange={handleChange}
            required={field.required}
            rows={3}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
            placeholder={`Enter ${field.label.toLowerCase()}`}
          />
        );
      
      case 'select':
        return (
          <select
            name={field.name}
            value={value}
            onChange={handleChange}
            required={field.required}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
          >
            <option value="">Select {field.label.toLowerCase()}</option>
            {field.options.map(option => (
              <option key={option} value={option}>
                {option.charAt(0).toUpperCase() + option.slice(1)}
              </option>
            ))}
          </select>
        );
      
      default:
        return (
          <input
            type={field.type}
            name={field.name}
            value={value}
            onChange={handleChange}
            required={field.required}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
            placeholder={`Enter ${field.label.toLowerCase()}`}
          />
        );
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 transition-opacity bg-gray-500 bg-opacity-75"
              onClick={onClose}
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-lg"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-medium text-gray-900">
                  Add {category.charAt(0).toUpperCase() + category.slice(1)} Item
                </h3>
                <button
                  onClick={onClose}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <SafeIcon icon={FiX} className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                {fields.map((field) => (
                  <div key={field.name}>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      {field.label} {field.required && '*'}
                    </label>
                    {renderField(field)}
                  </div>
                ))}

                <div className="flex justify-end space-x-3 pt-4">
                  <button
                    type="button"
                    onClick={onClose}
                    className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 text-sm font-medium text-white bg-primary-600 rounded-md hover:bg-primary-700 transition-colors"
                  >
                    Add Item
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        </div>
      )}
    </AnimatePresence>
  );
}

export default ToolboxModal;