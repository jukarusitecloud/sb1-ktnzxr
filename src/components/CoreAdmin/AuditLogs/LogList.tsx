import React from 'react';
import { format } from 'date-fns';
import { ja } from 'date-fns/locale';
import { LogType, LogEntry } from './types';

interface LogListProps {
  searchTerm: string;
  selectedType: LogType;
  startDate: string;
  endDate: string;
}

export default function LogList({ searchTerm, selectedType, startDate, endDate }: LogListProps) {
  // TODO: Replace with actual API call
  const mockLogs: LogEntry[] = [
    {
      id: '1',
      timestamp: '2024-03-15T10:30:00',
      type: 'auth',
      user: 'admin@example.com',
      action: 'ログイン',
      details: '管理者ログイン成功',
      ip: '192.168.1.1'
    },
    {
      id: '2',
      timestamp: '2024-03-15T11:15:00',
      type: 'system',
      user: 'system',
      action: 'バックアップ',
      details: 'システムバックアップ完了',
    },
    {
      id: '3',
      timestamp: '2024-03-15T12:00:00',
      type: 'data',
      user: 'user@example.com',
      action: 'データ更新',
      details: '患者情報の更新',
      ip: '192.168.1.2'
    }
  ];

  const filteredLogs = mockLogs.filter(log => {
    const matchesSearch = searchTerm === '' || 
      log.action.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.details.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.user.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesType = selectedType === 'all' || log.type === selectedType;
    
    const logDate = new Date(log.timestamp);
    const isAfterStart = !startDate || logDate >= new Date(startDate);
    const isBeforeEnd = !endDate || logDate <= new Date(endDate);

    return matchesSearch && matchesType && isAfterStart && isBeforeEnd;
  });

  return (
    <div className="bg-white rounded-xl shadow-sm border border-mono-200">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-mono-50">
              <th className="px-6 py-3 text-left text-xs font-medium text-mono-500 uppercase tracking-wider">タイムスタンプ</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-mono-500 uppercase tracking-wider">ユーザー</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-mono-500 uppercase tracking-wider">アクション</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-mono-500 uppercase tracking-wider">詳細</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-mono-500 uppercase tracking-wider">IP</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-mono-200">
            {filteredLogs.map((log) => (
              <tr key={log.id} className="hover:bg-mono-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm text-mono-900">
                  {format(new Date(log.timestamp), 'yyyy/MM/dd HH:mm:ss', { locale: ja })}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-mono-900">{log.user}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-mono-900">{log.action}</td>
                <td className="px-6 py-4 text-sm text-mono-900">{log.details}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-mono-500">{log.ip || '-'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}