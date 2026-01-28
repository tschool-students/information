import React, { createContext, useContext, useState, useEffect } from 'react';
import { Club, Rule, GeneralFile } from '../types';
import { INITIAL_CLUBS, INITIAL_RULES, INITIAL_FILES } from '../data/mockData';

interface AppContextType {
  clubs: Club[];
  rules: Rule[];
  files: GeneralFile[];
  isAuthenticated: boolean;
  login: (password: string) => boolean;
  logout: () => void;
  addClub: (club: Club) => void;
  deleteClub: (id: string) => void;
  addRule: (rule: Rule) => void;
  deleteRule: (id: string) => void;
  addFile: (file: GeneralFile) => void;
  deleteFile: (id: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Load from LocalStorage or fallback to Mock Data
  const [clubs, setClubs] = useState<Club[]>(() => {
    const saved = localStorage.getItem('sh_clubs');
    return saved ? JSON.parse(saved) : INITIAL_CLUBS;
  });

  const [rules, setRules] = useState<Rule[]>(() => {
    const saved = localStorage.getItem('sh_rules');
    return saved ? JSON.parse(saved) : INITIAL_RULES;
  });

  const [files, setFiles] = useState<GeneralFile[]>(() => {
    const saved = localStorage.getItem('sh_files');
    return saved ? JSON.parse(saved) : INITIAL_FILES;
  });

  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    return sessionStorage.getItem('sh_auth') === 'true';
  });

  // Persist to LocalStorage whenever state changes
  useEffect(() => localStorage.setItem('sh_clubs', JSON.stringify(clubs)), [clubs]);
  useEffect(() => localStorage.setItem('sh_rules', JSON.stringify(rules)), [rules]);
  useEffect(() => localStorage.setItem('sh_files', JSON.stringify(files)), [files]);
  useEffect(() => {
    if (isAuthenticated) {
      sessionStorage.setItem('sh_auth', 'true');
    } else {
      sessionStorage.removeItem('sh_auth');
    }
  }, [isAuthenticated]);

  const login = (password: string) => {
    // HARDCODED PASSWORD FOR DEMO
    if (password === 'admin888') {
      setIsAuthenticated(true);
      return true;
    }
    return false;
  };

  const logout = () => setIsAuthenticated(false);

  const addClub = (club: Club) => setClubs([...clubs, club]);
  const deleteClub = (id: string) => setClubs(clubs.filter(c => c.id !== id));

  const addRule = (rule: Rule) => setRules([...rules, rule]);
  const deleteRule = (id: string) => setRules(rules.filter(r => r.id !== id));

  const addFile = (file: GeneralFile) => setFiles([...files, file]);
  const deleteFile = (id: string) => setFiles(files.filter(f => f.id !== id));

  return (
    <AppContext.Provider value={{
      clubs, rules, files, isAuthenticated,
      login, logout,
      addClub, deleteClub,
      addRule, deleteRule,
      addFile, deleteFile
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error('useApp must be used within AppProvider');
  return context;
};