import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useData } from '../context/DataContext';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';

const { FiDownload, FiUpload, FiTrash2, FiSave, FiUser, FiBell, FiLock } = FiIcons;

function Settings() {
  const { tasks, toolbox } = useData();
  const [activeTab, setActiveTab] = useState('general');
  const [settings, setSettings] = useState({
    companyName: 'OPS Viper',
    notifications: true,
    autoSave: true,
    darkMode: false
  });

  const exportData = () => {
    const data = {
      tasks,
      toolbox,
      exportDate: new Date().toISOString(),
      version: '1.0.0'
    };
    
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `ops-viper-backup-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const importData = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const data = JSON.parse(e.target.result);
        if (window.confirm('This will replace all current data. Are you sure?')) {
          localStorage.setItem('ops-viper-data', JSON.stringify(data));
          window.location.reload();
        }
      } catch (error) {
        alert('Invalid file format');
      }
    };
    reader.readAsText(file);
  };

  const clearAllData = () => {
    if (window.confirm('This will permanently delete all data. Are you sure?')) {
      localStorage.removeItem('ops-viper-data');
      window.location.reload();
    }
  };

  const tabs = [
    { id: 'general', name: 'General', icon: FiUser },
    { id: 'notifications', name: 'Notifications', icon: FiBell },
    { id: 'data', name: 'Data Management', icon: FiDownload },
    { id: 'security', name: 'Security', icon: FiLock }
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Settings</h1>
        <p className="text-gray-600 mt-2">
          Configure your Business Brain HQ preferences and manage your data
        </p>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        {/* Tabs */}
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8 px-6">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === tab.id
                    ? 'border-primary-500 text-primary-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <SafeIcon icon={tab.icon} className="w-4 h-4" />
                <span>{tab.name}</span>
              </button>
            ))}
          </nav>
        </div>

        {/* Tab Content */}
        <div className="p-6">
          {activeTab === 'general' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-4">General Settings</h3>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Company Name
                    </label>
                    <input
                      type="text"
                      value={settings.companyName}
                      onChange={(e) => setSettings({...settings, companyName: e.target.value})}
                      className="w-full max-w-md px-3 py-2 border border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
                    />
                  </div>

                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="autoSave"
                      checked={settings.autoSave}
                      onChange={(e) => setSettings({...settings, autoSave: e.target.checked})}
                      className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                    />
                    <label htmlFor="autoSave" className="ml-2 block text-sm text-gray-900">
                      Enable auto-save
                    </label>
                  </div>

                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="darkMode"
                      checked={settings.darkMode}
                      onChange={(e) => setSettings({...settings, darkMode: e.target.checked})}
                      className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                    />
                    <label htmlFor="darkMode" className="ml-2 block text-sm text-gray-900">
                      Dark mode (coming soon)
                    </label>
                  </div>
                </div>

                <div className="mt-6">
                  <button className="flex items-center space-x-2 bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors">
                    <SafeIcon icon={FiSave} className="w-4 h-4" />
                    <span>Save Settings</span>
                  </button>
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === 'notifications' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-4">Notification Preferences</h3>
                
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-sm font-medium text-gray-900">Task Reminders</h4>
                      <p className="text-sm text-gray-500">Get notified about upcoming due dates</p>
                    </div>
                    <input
                      type="checkbox"
                      checked={settings.notifications}
                      onChange={(e) => setSettings({...settings, notifications: e.target.checked})}
                      className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-sm font-medium text-gray-900">Overdue Alerts</h4>
                      <p className="text-sm text-gray-500">Get alerted when tasks become overdue</p>
                    </div>
                    <input
                      type="checkbox"
                      defaultChecked
                      className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-sm font-medium text-gray-900">Weekly Reports</h4>
                      <p className="text-sm text-gray-500">Receive weekly performance summaries</p>
                    </div>
                    <input
                      type="checkbox"
                      defaultChecked
                      className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                    />
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === 'data' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-4">Data Management</h3>
                
                <div className="space-y-6">
                  <div className="border border-gray-200 rounded-lg p-4">
                    <h4 className="font-medium text-gray-900 mb-2">Export Data</h4>
                    <p className="text-sm text-gray-600 mb-4">
                      Download all your tasks and toolbox data as a JSON file
                    </p>
                    <button
                      onClick={exportData}
                      className="flex items-center space-x-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
                    >
                      <SafeIcon icon={FiDownload} className="w-4 h-4" />
                      <span>Export Data</span>
                    </button>
                  </div>

                  <div className="border border-gray-200 rounded-lg p-4">
                    <h4 className="font-medium text-gray-900 mb-2">Import Data</h4>
                    <p className="text-sm text-gray-600 mb-4">
                      Import data from a previously exported JSON file
                    </p>
                    <label className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors cursor-pointer">
                      <SafeIcon icon={FiUpload} className="w-4 h-4" />
                      <span>Import Data</span>
                      <input
                        type="file"
                        accept=".json"
                        onChange={importData}
                        className="hidden"
                      />
                    </label>
                  </div>

                  <div className="border border-red-200 rounded-lg p-4 bg-red-50">
                    <h4 className="font-medium text-red-900 mb-2">Danger Zone</h4>
                    <p className="text-sm text-red-700 mb-4">
                      Permanently delete all data. This action cannot be undone.
                    </p>
                    <button
                      onClick={clearAllData}
                      className="flex items-center space-x-2 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors"
                    >
                      <SafeIcon icon={FiTrash2} className="w-4 h-4" />
                      <span>Clear All Data</span>
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === 'security' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-4">Security Settings</h3>
                
                <div className="space-y-4">
                  <div className="p-4 bg-blue-50 rounded-lg">
                    <h4 className="font-medium text-blue-900 mb-2">Data Storage</h4>
                    <p className="text-sm text-blue-700">
                      All data is stored locally in your browser. No data is sent to external servers.
                    </p>
                  </div>

                  <div className="p-4 bg-green-50 rounded-lg">
                    <h4 className="font-medium text-green-900 mb-2">Privacy</h4>
                    <p className="text-sm text-green-700">
                      Your business data remains completely private and under your control.
                    </p>
                  </div>

                  <div className="p-4 bg-yellow-50 rounded-lg">
                    <h4 className="font-medium text-yellow-900 mb-2">Backup Recommendation</h4>
                    <p className="text-sm text-yellow-700">
                      Regularly export your data to prevent loss due to browser data clearing.
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Settings;