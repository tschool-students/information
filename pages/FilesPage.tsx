import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { File, Download, Search, Filter } from 'lucide-react';

const FilesPage: React.FC = () => {
  const { files } = useApp();
  const [searchTerm, setSearchTerm] = useState('');

  const filteredFiles = files.filter(f => 
    f.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    f.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
            <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">檔案專區</h1>
            <p className="mt-2 text-slate-500">學生自治會公開資料庫，包含會議記錄、表單下載與財務報告。</p>
        </div>
        
        <div className="relative w-full md:w-72">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search size={18} className="text-slate-400" />
            </div>
            <input
                type="text"
                placeholder="搜尋檔案..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="block w-full pl-10 pr-3 py-2 border border-slate-300 rounded-lg leading-5 bg-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm shadow-sm"
            />
        </div>
      </div>

      <div className="bg-white shadow-sm border border-slate-200 rounded-xl overflow-hidden">
        {filteredFiles.length > 0 ? (
          <div className="divide-y divide-slate-200">
            {filteredFiles.map((file) => (
              <div key={file.id} className="p-4 hover:bg-slate-50 transition-colors flex items-center gap-4 group">
                <div className="p-3 bg-indigo-50 text-indigo-600 rounded-lg">
                    <File size={24} />
                </div>
                
                <div className="flex-1 min-w-0">
                    <h4 className="text-base font-semibold text-slate-900 truncate">{file.name}</h4>
                    <div className="flex items-center gap-3 mt-1 text-sm text-slate-500">
                        <span className="bg-slate-100 px-2 py-0.5 rounded text-xs font-medium text-slate-600">{file.category}</span>
                        <span>•</span>
                        <span>{file.date}</span>
                    </div>
                </div>

                <a 
                    href={file.url}
                    className="p-2 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-full transition-all"
                    title="下載"
                >
                    <Download size={20} />
                </a>
              </div>
            ))}
          </div>
        ) : (
            <div className="p-12 text-center text-slate-400">
                <Filter size={48} className="mx-auto mb-4 opacity-50" />
                <p>找不到符合搜尋條件的檔案。</p>
            </div>
        )}
      </div>
    </div>
  );
};

export default FilesPage;