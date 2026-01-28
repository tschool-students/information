import React from 'react';
import { createRoot } from 'react-dom/client';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import Layout from './components/Layout';
import ClubPage from './pages/ClubPage';
import RulesPage from './pages/RulesPage';
import FilesPage from './pages/FilesPage';
import AdminPage from './pages/AdminPage';

// A simple landing page that redirects to Club page or shows a welcome screen
const LandingPage = () => (
    <div className="flex flex-col items-center justify-center py-20 text-center space-y-6">
        <h1 className="text-5xl font-bold text-slate-900 mb-4">學生資訊彙整頁面（測試中）</h1>
        <p className="text-xl text-slate-500 max-w-2xl">
            測試中
        </p>
        <div className="flex gap-4 mt-8">
            <a href="#/club" className="px-6 py-3 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 transition shadow-lg hover:shadow-xl">探索社團</a>
            <a href="#/rules" className="px-6 py-3 bg-white text-indigo-600 border border-indigo-200 rounded-lg font-medium hover:bg-indigo-50 transition">查閱校規</a>
        </div>
    </div>
);

const App: React.FC = () => {
  return (
    <AppProvider>
      <HashRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<LandingPage />} />
            <Route path="club" element={<ClubPage />} />
            <Route path="rules" element={<RulesPage />} />
            <Route path="files" element={<FilesPage />} />
            <Route path="admin" element={<AdminPage />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Route>
        </Routes>
      </HashRouter>
    </AppProvider>
  );
};

export default App;