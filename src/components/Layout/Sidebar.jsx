import React from 'react';
import { NavLink } from 'react-router-dom';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../../common/SafeIcon';

const { FiHome, FiCheckSquare, FiDatabase, FiBarChart3, FiSettings, FiZap } = FiIcons;

const navigation = [
  { name: 'Dashboard', href: '/', icon: FiHome },
  { name: 'Task Management', href: '/tasks', icon: FiCheckSquare },
  { name: 'Toolbox', href: '/toolbox', icon: FiDatabase },
  { name: 'Reports', href: '/reports', icon: FiBarChart3 },
  { name: 'Settings', href: '/settings', icon: FiSettings },
];

function Sidebar() {
  return (
    <div className="w-64 bg-viper-900 text-white">
      <div className="p-6">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-r from-primary-500 to-primary-600 rounded-lg flex items-center justify-center">
            <SafeIcon icon={FiZap} className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold">OPS Viper</h1>
            <p className="text-viper-400 text-sm">Business Brain HQ</p>
          </div>
        </div>
      </div>
      
      <nav className="mt-8">
        <div className="px-4 space-y-2">
          {navigation.map((item) => (
            <NavLink
              key={item.name}
              to={item.href}
              className={({ isActive }) =>
                `flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors ${
                  isActive
                    ? 'bg-primary-600 text-white'
                    : 'text-viper-300 hover:bg-viper-800 hover:text-white'
                }`
              }
            >
              {({ isActive }) => (
                <motion.div
                  className="flex items-center space-x-3 w-full"
                  whileHover={{ x: 2 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <SafeIcon 
                    icon={item.icon} 
                    className={`w-5 h-5 ${isActive ? 'text-white' : 'text-viper-400'}`} 
                  />
                  <span>{item.name}</span>
                </motion.div>
              )}
            </NavLink>
          ))}
        </div>
      </nav>
      
      <div className="absolute bottom-0 left-0 right-0 p-4">
        <div className="text-center text-viper-400 text-xs">
          <p>ProcessDriven HQ Framework</p>
          <p className="mt-1">v1.0.0</p>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;