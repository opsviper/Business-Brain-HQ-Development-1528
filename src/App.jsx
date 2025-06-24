import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { DataProvider } from './context/DataContext';
import Layout from './components/Layout/Layout';
import Dashboard from './pages/Dashboard';
import TaskManagement from './pages/TaskManagement';
import Toolbox from './pages/Toolbox';
import Reports from './pages/Reports';
import Settings from './pages/Settings';

function App() {
  return (
    <DataProvider>
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/tasks" element={<TaskManagement />} />
            <Route path="/toolbox" element={<Toolbox />} />
            <Route path="/reports" element={<Reports />} />
            <Route path="/settings" element={<Settings />} />
          </Routes>
        </Layout>
      </Router>
    </DataProvider>
  );
}

export default App;