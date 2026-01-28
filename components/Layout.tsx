import React, { useState } from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { Menu, X, GraduationCap, Shield, FolderOpen, Lock, LogOut } from 'lucide-react';
import { useApp } from '../context/AppContext';

const Layout: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { isAuthenticated, logout } = useApp();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const NavItem = ({ to, icon: Icon, label }: { to: string, icon: any, label: string }) => (
    <NavLink
      to={to}
      onClick={() => setIsMenuOpen(false)}
      className={({ isActive }) =>
        `flex items-center gap-2 px-4 py-2 rounded-lg transition-colors duration-200 ${
          isActive
            ? 'bg-indigo-600 text-white font-medium shadow-md'
            : 'text-slate-600 hover:bg-slate-100 hover:text-indigo-600'
        }`
      }
    >
      <Icon size={20} />
      <span>{label}</span>
    </NavLink>
  );

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      {/* Navigation Bar */}
      <nav className="bg-white shadow-sm border-b border-slate-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <NavLink to="/" className="flex-shrink-0 flex items-center gap-2">
                <img src="logo.png" alt="Logo" className="h-10 w-auto object-contain" />
                <span className="font-bold text-xl text-slate-800 tracking-tight">學生資訊彙整頁面</span>
              </NavLink>
            </div>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center space-x-4">
              <NavItem to="/club" icon={GraduationCap} label="社團資訊" />
              <NavItem to="/rules" icon={Shield} label="校規資訊" />
              <NavItem to="/files" icon={FolderOpen} label="檔案專區" />
              
              <div className="h-6 w-px bg-slate-200 mx-2"></div>
              
              {isAuthenticated ? (
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-2 px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors font-medium"
                >
                  <LogOut size={20} />
                  登出
                </button>
              ) : (
                <NavItem to="/admin" icon={Lock} label="管理後台" />
              )}
            </div>

            {/* Mobile menu button */}
            <div className="flex items-center md:hidden">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="inline-flex items-center justify-center p-2 rounded-md text-slate-400 hover:text-indigo-600 hover:bg-slate-100 focus:outline-none"
              >
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-white border-t border-slate-100">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              <NavItem to="/club" icon={GraduationCap} label="社團資訊" />
              <NavItem to="/rules" icon={Shield} label="校規資訊" />
              <NavItem to="/files" icon={FolderOpen} label="檔案專區" />
              <div className="border-t border-slate-100 my-2"></div>
               {isAuthenticated ? (
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center gap-2 px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors font-medium"
                >
                  <LogOut size={20} />
                  登出
                </button>
              ) : (
                <NavItem to="/admin" icon={Lock} label="管理員入口" />
              )}
            </div>
          </div>
        )}
      </nav>

      {/* Main Content */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Outlet />
      </main>
      
      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 py-6">
        <div className="max-w-7xl mx-auto px-4 text-center text-slate-400 text-sm">
          &copy; {new Date().getFullYear()} 臺北市數位實驗高級中等學校學生自治會 版權所有 (StudentHub Portal)
        </div>
      </footer>
    </div>
  );
};

export default Layout;