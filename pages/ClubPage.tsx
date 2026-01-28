import React from 'react';
import { useApp } from '../context/AppContext';
import { FileText, Download } from 'lucide-react';

const ClubPage: React.FC = () => {
  const { clubs } = useApp();

  return (
    <div className="space-y-8">
      <div className="text-center max-w-2xl mx-auto">
        <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight sm:text-4xl">學生社團</h1>
        <p className="mt-3 text-lg text-slate-500">
          探索我們充滿活力的學生組織。查閱組織章程、預算報告與相關活動資訊。
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {clubs.map((club) => (
          <div key={club.id} className="bg-white rounded-xl shadow-sm border border-slate-200 hover:shadow-md transition-shadow overflow-hidden flex flex-col">
            <div className="h-48 w-full bg-slate-100 overflow-hidden relative">
                <img 
                    src={club.imageUrl} 
                    alt={club.name} 
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-105" 
                    loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-4">
                    <h2 className="text-white text-xl font-bold">{club.name}</h2>
                </div>
            </div>
            
            <div className="p-6 flex-1 flex flex-col">
              <p className="text-slate-600 mb-6 text-sm leading-relaxed flex-1">
                {club.description}
              </p>
              
              <div className="space-y-3">
                <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider">相關文件</h3>
                {club.files.length > 0 ? (
                  <ul className="space-y-2">
                    {club.files.map((file, idx) => (
                      <li key={idx}>
                        <a 
                          href={file.url} 
                          className="group flex items-center justify-between p-2 rounded-lg bg-slate-50 hover:bg-indigo-50 text-indigo-700 transition-colors"
                        >
                          <div className="flex items-center gap-2">
                            <FileText size={16} className="text-indigo-400 group-hover:text-indigo-600" />
                            <span className="text-sm font-medium">{file.name}</span>
                          </div>
                          <Download size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                        </a>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <div className="text-sm text-slate-400 italic">目前沒有公開文件。</div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ClubPage;