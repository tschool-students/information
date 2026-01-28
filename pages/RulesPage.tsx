import React from 'react';
import { useApp } from '../context/AppContext';
import { ExternalLink, BookOpen, ShieldAlert, Scale, Info } from 'lucide-react';

const RulesPage: React.FC = () => {
  const { rules } = useApp();

  const getIcon = (category: string) => {
    switch (category) {
      case '學術規範': return <BookOpen size={32} />;
      case '行為規範': return <ShieldAlert size={32} />;
      case '一般規定': return <Info size={32} />;
      default: return <Scale size={32} />;
    }
  };

  const getColor = (category: string) => {
    switch (category) {
        case '學術規範': return 'bg-blue-50 text-blue-600 hover:bg-blue-100 border-blue-100';
        case '行為規範': return 'bg-red-50 text-red-600 hover:bg-red-100 border-red-100';
        default: return 'bg-emerald-50 text-emerald-600 hover:bg-emerald-100 border-emerald-100';
    }
  }

  return (
    <div className="space-y-8">
      <div className="text-center max-w-2xl mx-auto">
        <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight sm:text-4xl">校規資訊</h1>
        <p className="mt-3 text-lg text-slate-500">
            學校重要政策、學生行為準則與相關指導方針。
        </p>
      </div>

      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {rules.map((rule) => (
          <a
            key={rule.id}
            href={rule.url}
            target="_blank"
            rel="noreferrer"
            className={`
                group relative flex flex-col items-center justify-center p-8 
                rounded-2xl border transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg
                ${getColor(rule.category)}
            `}
          >
            <div className="mb-4 p-4 rounded-full bg-white shadow-sm group-hover:scale-110 transition-transform duration-300">
                {getIcon(rule.category)}
            </div>
            <h3 className="text-lg font-bold text-center text-slate-800 mb-2">{rule.title}</h3>
            <span className="inline-flex items-center gap-1 text-xs font-semibold uppercase tracking-wider opacity-70">
              {rule.category} <ExternalLink size={12} />
            </span>
          </a>
        ))}
      </div>
    </div>
  );
};

export default RulesPage;