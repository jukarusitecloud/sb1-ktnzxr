import React from 'react';
import { LogType } from './types';

interface LogTypeFilterProps {
  selectedType: LogType;
  onTypeChange: (type: LogType) => void;
}

export default function LogTypeFilter({ selectedType, onTypeChange }: LogTypeFilterProps) {
  const types: { value: LogType; label: string }[] = [
    { value: 'all', label: 'すべて' },
    { value: 'auth', label: '認証' },
    { value: 'system', label: 'システム' },
    { value: 'data', label: 'データ' },
    { value: 'security', label: 'セキュリティ' }
  ];

  return (
    <div>
      <label className="block text-sm font-medium text-mono-700 mb-1">
        ログタイプ
      </label>
      <select
        value={selectedType}
        onChange={(e) => onTypeChange(e.target.value as LogType)}
        className="w-full px-4 py-2 border border-mono-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
      >
        {types.map((type) => (
          <option key={type.value} value={type.value}>
            {type.label}
          </option>
        ))}
      </select>
    </div>
  );
}