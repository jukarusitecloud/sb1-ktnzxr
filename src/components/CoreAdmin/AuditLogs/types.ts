export type LogType = 'all' | 'auth' | 'system' | 'data' | 'security';

export interface LogEntry {
  id: string;
  timestamp: string;
  type: LogType;
  user: string;
  action: string;
  details: string;
  ip?: string;
}