import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';

const DataContext = createContext();

const initialState = {
  tasks: {
    react: [],
    maintain: [],
    improve: []
  },
  toolbox: {
    systems: [],
    processes: [],
    equipment: [],
    software: [],
    team: [],
    keyEvents: [],
    ideas: []
  },
  reports: {
    taskDistribution: null,
    overdueTasksCount: 0,
    unassignedTasks: 0,
    tasksWithoutDueDate: 0,
    monthlyCompletionAverage: 0,
    equipmentGrowth: 0,
    staleEquipment: 0
  }
};

function dataReducer(state, action) {
  switch (action.type) {
    case 'LOAD_DATA':
      return { ...state, ...action.payload };
    
    case 'ADD_TASK':
      return {
        ...state,
        tasks: {
          ...state.tasks,
          [action.payload.category]: [
            ...state.tasks[action.payload.category],
            { ...action.payload.task, id: uuidv4(), createdAt: new Date().toISOString() }
          ]
        }
      };
    
    case 'UPDATE_TASK':
      return {
        ...state,
        tasks: {
          ...state.tasks,
          [action.payload.category]: state.tasks[action.payload.category].map(task =>
            task.id === action.payload.taskId ? { ...task, ...action.payload.updates } : task
          )
        }
      };
    
    case 'DELETE_TASK':
      return {
        ...state,
        tasks: {
          ...state.tasks,
          [action.payload.category]: state.tasks[action.payload.category].filter(
            task => task.id !== action.payload.taskId
          )
        }
      };
    
    case 'ADD_TOOLBOX_ITEM':
      return {
        ...state,
        toolbox: {
          ...state.toolbox,
          [action.payload.category]: [
            ...state.toolbox[action.payload.category],
            { ...action.payload.item, id: uuidv4(), createdAt: new Date().toISOString() }
          ]
        }
      };
    
    case 'UPDATE_TOOLBOX_ITEM':
      return {
        ...state,
        toolbox: {
          ...state.toolbox,
          [action.payload.category]: state.toolbox[action.payload.category].map(item =>
            item.id === action.payload.itemId ? { ...item, ...action.payload.updates } : item
          )
        }
      };
    
    case 'DELETE_TOOLBOX_ITEM':
      return {
        ...state,
        toolbox: {
          ...state.toolbox,
          [action.payload.category]: state.toolbox[action.payload.category].filter(
            item => item.id !== action.payload.itemId
          )
        }
      };
    
    case 'UPDATE_REPORTS':
      return {
        ...state,
        reports: { ...state.reports, ...action.payload }
      };
    
    default:
      return state;
  }
}

export function DataProvider({ children }) {
  const [state, dispatch] = useReducer(dataReducer, initialState);

  // Load data from localStorage on mount
  useEffect(() => {
    const savedData = localStorage.getItem('ops-viper-data');
    if (savedData) {
      try {
        const parsedData = JSON.parse(savedData);
        dispatch({ type: 'LOAD_DATA', payload: parsedData });
      } catch (error) {
        console.error('Error loading saved data:', error);
      }
    }
  }, []);

  // Save data to localStorage whenever state changes
  useEffect(() => {
    localStorage.setItem('ops-viper-data', JSON.stringify(state));
  }, [state]);

  const addTask = (category, task) => {
    dispatch({ type: 'ADD_TASK', payload: { category, task } });
  };

  const updateTask = (category, taskId, updates) => {
    dispatch({ type: 'UPDATE_TASK', payload: { category, taskId, updates } });
  };

  const deleteTask = (category, taskId) => {
    dispatch({ type: 'DELETE_TASK', payload: { category, taskId } });
  };

  const addToolboxItem = (category, item) => {
    dispatch({ type: 'ADD_TOOLBOX_ITEM', payload: { category, item } });
  };

  const updateToolboxItem = (category, itemId, updates) => {
    dispatch({ type: 'UPDATE_TOOLBOX_ITEM', payload: { category, itemId, updates } });
  };

  const deleteToolboxItem = (category, itemId) => {
    dispatch({ type: 'DELETE_TOOLBOX_ITEM', payload: { category, itemId } });
  };

  const updateReports = (reportData) => {
    dispatch({ type: 'UPDATE_REPORTS', payload: reportData });
  };

  const value = {
    ...state,
    addTask,
    updateTask,
    deleteTask,
    addToolboxItem,
    updateToolboxItem,
    deleteToolboxItem,
    updateReports
  };

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
}

export function useData() {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
}