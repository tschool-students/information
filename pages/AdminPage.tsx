import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Lock, Plus, Trash2, Save, X } from 'lucide-react';
import { Club, Rule, GeneralFile } from '../types';

// Simple unique ID generator
const generateId = () => Math.random().toString(36).substr(2, 9);

const AdminPage: React.FC = () => {
  const { 
    isAuthenticated, login, 
    clubs, addClub, deleteClub,
    rules, addRule, deleteRule,
    files, addFile, deleteFile 
  } = useApp();

  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState<'clubs' | 'rules' | 'files'>('clubs');

  // Forms State
  const [newClub, setNewClub] = useState<Partial<Club>>({ name: '', description: '', imageUrl: 'https://picsum.photos/400/300' });
  const [newRule, setNewRule] = useState<Partial<Rule>>({ title: '', category: '一般規定', url: '' });
  const [newFile, setNewFile] = useState<Partial<GeneralFile>>({ name: '', category: '一般文件', date: new Date().toISOString().split('T')[0], url: '' });

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (login(password)) {
      setError('');
    } else {
      setError('密碼錯誤');
    }
  };

  const handleAddClub = () => {
    if (newClub.name && newClub.description) {
      addClub({
        id: generateId(),
        name: newClub.name!,
        description: newClub.description!,
        imageUrl: newClub.imageUrl || 'https://picsum.photos/400/300',
        files: []
      });
      setNewClub({ name: '', description: '', imageUrl: 'https://picsum.photos/400/300' });
    }
  };

  const handleAddRule = () => {
    if (newRule.title && newRule.url) {
      addRule({
        id: generateId(),
        title: newRule.title!,
        category: newRule.category || '一般規定',
        url: newRule.url!
      });
      setNewRule({ title: '', category: '一般規定', url: '' });
    }
  };

  const handleAddFile = () => {
    if (newFile.name && newFile.url) {
      addFile({
        id: generateId(),
        name: newFile.name!,
        category: newFile.category || '一般文件',
        date: newFile.date || new Date().toISOString().split('T')[0],
        url: newFile.url!
      });
      setNewFile({ name: '', category: '一般文件', date: new Date().toISOString().split('T')[0], url: '' });
    }
  };

  const getTabLabel = (tab: string) => {
      switch(tab) {
          case 'clubs': return '社團管理';
          case 'rules': return '校規管理';
          case 'files': return '檔案管理';
          default: return tab;
      }
  }

  if (!isAuthenticated) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh]">
        <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-lg border border-slate-100">
          <div className="flex justify-center mb-6">
            <div className="bg-indigo-100 p-3 rounded-full">
              <Lock size={32} className="text-indigo-600" />
            </div>
          </div>
          <h2 className="text-2xl font-bold text-center text-slate-800 mb-6">管理員登入</h2>
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">密碼</label>
              <input
                type="password"
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="請輸入管理員密碼"
              />
            </div>
            {error && <p className="text-red-500 text-sm">{error}</p>}
            <button
              type="submit"
              className="w-full bg-indigo-600 text-white py-2 rounded-lg font-semibold hover:bg-indigo-700 transition-colors shadow-md hover:shadow-lg"
            >
              登入系統
            </button>
          </form>
          <p className="text-center text-xs text-slate-400 mt-4">預設密碼提示: admin888</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h1 className="text-3xl font-bold text-slate-900">後台管理系統</h1>
        <div className="flex bg-white rounded-lg p-1 shadow-sm border border-slate-200">
            {(['clubs', 'rules', 'files'] as const).map(tab => (
                <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
                        activeTab === tab 
                        ? 'bg-indigo-100 text-indigo-700' 
                        : 'text-slate-500 hover:text-slate-700'
                    }`}
                >
                    {getTabLabel(tab)}
                </button>
            ))}
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
        
        {/* CLUBS MANAGEMENT */}
        {activeTab === 'clubs' && (
          <div className="space-y-8">
            <div className="grid gap-4 md:grid-cols-2 bg-slate-50 p-6 rounded-xl border border-slate-200">
                <h3 className="md:col-span-2 text-lg font-semibold text-slate-800 flex items-center gap-2">
                    <Plus size={20} /> 新增社團
                </h3>
                <input 
                    placeholder="社團名稱" 
                    className="p-2 border rounded"
                    value={newClub.name}
                    onChange={e => setNewClub({...newClub, name: e.target.value})}
                />
                <input 
                    placeholder="圖片網址 (選填)" 
                    className="p-2 border rounded"
                    value={newClub.imageUrl}
                    onChange={e => setNewClub({...newClub, imageUrl: e.target.value})}
                />
                <textarea 
                    placeholder="社團簡介" 
                    className="md:col-span-2 p-2 border rounded"
                    rows={2}
                    value={newClub.description}
                    onChange={e => setNewClub({...newClub, description: e.target.value})}
                />
                <button onClick={handleAddClub} className="md:col-span-2 bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700 font-medium">新增社團</button>
            </div>

            <div className="space-y-4">
                <h3 className="text-lg font-semibold text-slate-800">現有社團</h3>
                <div className="divide-y">
                    {clubs.map(club => (
                        <div key={club.id} className="py-4 flex items-center justify-between group">
                            <div className="flex items-center gap-4">
                                <img src={club.imageUrl} alt="" className="w-12 h-12 rounded object-cover bg-slate-200" />
                                <div>
                                    <p className="font-medium text-slate-900">{club.name}</p>
                                    <p className="text-sm text-slate-500 truncate max-w-md">{club.description}</p>
                                </div>
                            </div>
                            <button 
                                onClick={() => deleteClub(club.id)}
                                className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded transition-colors"
                            >
                                <Trash2 size={20} />
                            </button>
                        </div>
                    ))}
                </div>
            </div>
          </div>
        )}

        {/* RULES MANAGEMENT */}
        {activeTab === 'rules' && (
          <div className="space-y-8">
             <div className="grid gap-4 md:grid-cols-3 bg-slate-50 p-6 rounded-xl border border-slate-200">
                <h3 className="md:col-span-3 text-lg font-semibold text-slate-800 flex items-center gap-2">
                    <Plus size={20} /> 新增校規
                </h3>
                <input 
                    placeholder="規章標題" 
                    className="p-2 border rounded"
                    value={newRule.title}
                    onChange={e => setNewRule({...newRule, title: e.target.value})}
                />
                <select 
                    className="p-2 border rounded"
                    value={newRule.category}
                    onChange={e => setNewRule({...newRule, category: e.target.value})}
                >
                    <option value="一般規定">一般規定</option>
                    <option value="學術規範">學術規範</option>
                    <option value="行為規範">行為規範</option>
                </select>
                <input 
                    placeholder="連結網址" 
                    className="p-2 border rounded"
                    value={newRule.url}
                    onChange={e => setNewRule({...newRule, url: e.target.value})}
                />
                <button onClick={handleAddRule} className="md:col-span-3 bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700 font-medium">新增校規</button>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
                {rules.map(rule => (
                    <div key={rule.id} className="flex items-center justify-between p-4 border rounded-lg bg-white">
                        <div>
                            <p className="font-medium text-slate-900">{rule.title}</p>
                            <span className="text-xs bg-slate-100 px-2 py-1 rounded text-slate-600">{rule.category}</span>
                        </div>
                        <button 
                            onClick={() => deleteRule(rule.id)}
                            className="text-slate-400 hover:text-red-600 transition-colors"
                        >
                            <Trash2 size={18} />
                        </button>
                    </div>
                ))}
            </div>
          </div>
        )}

        {/* FILES MANAGEMENT */}
        {activeTab === 'files' && (
          <div className="space-y-8">
             <div className="grid gap-4 md:grid-cols-4 bg-slate-50 p-6 rounded-xl border border-slate-200">
                <h3 className="md:col-span-4 text-lg font-semibold text-slate-800 flex items-center gap-2">
                    <Plus size={20} /> 新增檔案
                </h3>
                <input 
                    placeholder="檔案名稱" 
                    className="md:col-span-2 p-2 border rounded"
                    value={newFile.name}
                    onChange={e => setNewFile({...newFile, name: e.target.value})}
                />
                <input 
                    placeholder="類別 (如：會議記錄)" 
                    className="p-2 border rounded"
                    value={newFile.category}
                    onChange={e => setNewFile({...newFile, category: e.target.value})}
                />
                 <input 
                    type="date"
                    className="p-2 border rounded"
                    value={newFile.date}
                    onChange={e => setNewFile({...newFile, date: e.target.value})}
                />
                 <input 
                    placeholder="下載連結" 
                    className="md:col-span-4 p-2 border rounded"
                    value={newFile.url}
                    onChange={e => setNewFile({...newFile, url: e.target.value})}
                />
                <button onClick={handleAddFile} className="md:col-span-4 bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700 font-medium">新增檔案</button>
            </div>

            <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-slate-200">
                    <thead className="bg-slate-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">名稱</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">類別</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">日期</th>
                            <th className="px-6 py-3 text-right text-xs font-medium text-slate-500 uppercase tracking-wider">操作</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-slate-200">
                        {files.map(file => (
                            <tr key={file.id}>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-slate-900">{file.name}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">{file.category}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">{file.date}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                    <button 
                                        onClick={() => deleteFile(file.id)}
                                        className="text-red-600 hover:text-red-900"
                                    >
                                        刪除
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default AdminPage;