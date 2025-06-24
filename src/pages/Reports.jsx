import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { useData } from '../context/DataContext';
import TaskDistributionChart from '../components/Reports/TaskDistributionChart';
import ReportCard from '../components/Reports/ReportCard';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';

const { FiAlertCircle, FiUser, FiCalendar, FiTrendingUp, FiHardDrive, FiClock } = FiIcons;

function Reports() {
  const { tasks, toolbox, reports, updateReports } = useData();

  useEffect(() => {
    // Calculate report metrics
    const calculateReports = () => {
      const allTasks = [...tasks.react, ...tasks.maintain, ...tasks.improve];
      
      // Task distribution percentages
      const totalTasks = allTasks.length;
      const taskDistribution = totalTasks > 0 ? {
        react: Math.round((tasks.react.length / totalTasks) * 100),
        maintain: Math.round((tasks.maintain.length / totalTasks) * 100),
        improve: Math.round((tasks.improve.length / totalTasks) * 100)
      } : null;

      // Overdue tasks
      const overdueTasksCount = allTasks.filter(task => 
        task.dueDate && new Date(task.dueDate) < new Date() && task.status !== 'completed'
      ).length;

      // Tasks with assignee but no due date
      const tasksWithoutDueDate = allTasks.filter(task => 
        task.assignee && !task.dueDate
      ).length;

      // Tasks with due date but no assignee
      const unassignedTasks = allTasks.filter(task => 
        task.dueDate && !task.assignee
      ).length;

      // Monthly completion average (mock calculation)
      const completedTasks = allTasks.filter(task => task.status === 'completed').length;
      const monthlyCompletionAverage = Math.round(completedTasks / 1); // Assuming 1 month of data

      // Equipment growth (mock calculation)
      const equipmentGrowth = toolbox.equipment.length;

      // Stale equipment (not updated in 90 days)
      const ninetyDaysAgo = new Date();
      ninetyDaysAgo.setDate(ninetyDaysAgo.getDate() - 90);
      const staleEquipment = toolbox.equipment.filter(item => 
        !item.updatedAt || new Date(item.updatedAt) < ninetyDaysAgo
      ).length;

      updateReports({
        taskDistribution,
        overdueTasksCount,
        unassignedTasks,
        tasksWithoutDueDate,
        monthlyCompletionAverage,
        equipmentGrowth,
        staleEquipment
      });
    };

    calculateReports();
  }, [tasks, toolbox, updateReports]);

  const reportCards = [
    {
      title: 'Overdue Tasks',
      value: reports.overdueTasksCount,
      icon: FiAlertCircle,
      color: 'red',
      description: 'Tasks past their due date'
    },
    {
      title: 'Unassigned Tasks',
      value: reports.unassignedTasks,
      icon: FiUser,
      color: 'orange',
      description: 'Tasks with due dates but no assignee'
    },
    {
      title: 'Tasks Without Due Date',
      value: reports.tasksWithoutDueDate,
      icon: FiCalendar,
      color: 'yellow',
      description: 'Assigned tasks missing due dates'
    },
    {
      title: 'Monthly Average',
      value: reports.monthlyCompletionAverage,
      icon: FiTrendingUp,
      color: 'green',
      description: 'Average tasks completed per month'
    },
    {
      title: 'Equipment Items',
      value: reports.equipmentGrowth,
      icon: FiHardDrive,
      color: 'blue',
      description: 'Total equipment in database'
    },
    {
      title: 'Stale Equipment',
      value: reports.staleEquipment,
      icon: FiClock,
      color: 'purple',
      description: 'Equipment not updated in 90+ days'
    }
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Reports & Analytics</h1>
        <p className="text-gray-600 mt-2">
          Insights into your ProcessDriven HQ performance and trends
        </p>
      </div>

      {/* Report Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {reportCards.map((card, index) => (
          <motion.div
            key={card.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <ReportCard {...card} />
          </motion.div>
        ))}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3 }}
        >
          <TaskDistributionChart />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4 }}
          className="bg-white rounded-lg shadow-sm border border-gray-200 p-6"
        >
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Key Insights</h3>
          
          <div className="space-y-4">
            <div className="p-4 bg-blue-50 rounded-lg">
              <h4 className="font-medium text-blue-900 mb-2">Task Balance</h4>
              <p className="text-sm text-blue-700">
                {reports.taskDistribution ? (
                  `Your task distribution: ${reports.taskDistribution.react}% React, ${reports.taskDistribution.maintain}% Maintain, ${reports.taskDistribution.improve}% Improve`
                ) : (
                  'No tasks to analyze yet'
                )}
              </p>
            </div>

            <div className="p-4 bg-green-50 rounded-lg">
              <h4 className="font-medium text-green-900 mb-2">Productivity</h4>
              <p className="text-sm text-green-700">
                Completing an average of {reports.monthlyCompletionAverage} tasks per month
              </p>
            </div>

            <div className="p-4 bg-yellow-50 rounded-lg">
              <h4 className="font-medium text-yellow-900 mb-2">Attention Needed</h4>
              <p className="text-sm text-yellow-700">
                {reports.overdueTasksCount > 0 
                  ? `${reports.overdueTasksCount} overdue tasks need immediate attention`
                  : 'No overdue tasks - great job staying on track!'
                }
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default Reports;