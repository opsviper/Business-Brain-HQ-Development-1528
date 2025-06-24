import React from 'react';
import { motion } from 'framer-motion';
import { useData } from '../context/DataContext';
import DashboardStats from '../components/Dashboard/DashboardStats';
import TaskOverview from '../components/Dashboard/TaskOverview';
import RecentActivity from '../components/Dashboard/RecentActivity';
import QuickActions from '../components/Dashboard/QuickActions';

function Dashboard() {
  const { tasks, toolbox } = useData();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 24
      }
    }
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-6"
    >
      <motion.div variants={itemVariants}>
        <h1 className="text-3xl font-bold text-gray-900">Business Brain HQ</h1>
        <p className="text-gray-600 mt-2">
          Welcome to your ProcessDriven command center for MSP operations
        </p>
      </motion.div>

      <motion.div variants={itemVariants}>
        <DashboardStats />
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <motion.div variants={itemVariants}>
          <TaskOverview />
        </motion.div>
        
        <motion.div variants={itemVariants}>
          <QuickActions />
        </motion.div>
      </div>

      <motion.div variants={itemVariants}>
        <RecentActivity />
      </motion.div>
    </motion.div>
  );
}

export default Dashboard;