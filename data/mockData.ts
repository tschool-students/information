import { Club, Rule, GeneralFile } from '../types';

export const INITIAL_CLUBS: Club[] = [
  {
    id: '1',
    name: '攝影社',
    description: '捕捉瞬間，創造回憶。歡迎加入我們每週的攝影外拍活動。',
    imageUrl: 'https://picsum.photos/400/300?random=1',
    files: [
      { name: '社團組織章程', url: '#' },
      { name: '學期預算表', url: '#' }
    ]
  },
  {
    id: '2',
    name: '辯論社',
    description: '培養批判性思維與公共演說能力，探討社會議題。',
    imageUrl: 'https://picsum.photos/400/300?random=2',
    files: [
      { name: '議事規則', url: '#' }
    ]
  },
  {
    id: '3',
    name: '程式設計社',
    description: '一起開發 App、網站，學習演算法與最新技術。',
    imageUrl: 'https://picsum.photos/400/300?random=3',
    files: [
      { name: '入社申請表', url: '#' },
      { name: '專案開發指南', url: '#' }
    ]
  },
  {
    id: '4',
    name: '管弦樂團',
    description: '提供管弦樂、爵士樂與合唱團的演出機會，陶冶性情。',
    imageUrl: 'https://picsum.photos/400/300?random=4',
    files: []
  },
];

export const INITIAL_RULES: Rule[] = [
  { id: '1', title: '學生行為準則', category: '行為規範', url: '#' },
  { id: '2', title: '學術誠信政策', category: '學術規範', url: '#' },
  { id: '3', title: '校園服儀規定', category: '一般規定', url: '#' },
  { id: '4', title: '缺曠課獎懲辦法', category: '學術規範', url: '#' },
  { id: '5', title: '校園安全須知', category: '一般規定', url: '#' },
  { id: '6', title: '學生宿舍管理辦法', category: '行為規範', url: '#' },
];

export const INITIAL_FILES: GeneralFile[] = [
  { id: '1', name: '學生會九月份會議記錄', category: '會議記錄', date: '2023-09-15', url: '#' },
  { id: '2', name: '活動企劃書範本', category: '表單下載', date: '2023-08-20', url: '#' },
  { id: '3', name: '年度財務結算報告', category: '財務報表', date: '2023-06-30', url: '#' },
  { id: '4', name: '學生代表選舉辦法', category: '組織法規', date: '2023-10-01', url: '#' },
  { id: '5', name: '社團經費補助申請表', category: '財務報表', date: '2023-09-01', url: '#' },
];