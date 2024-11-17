import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { motion } from 'framer-motion';
import { Mail, Lock, Eye, EyeOff, AlertCircle, Shield, UserPlus, Users } from 'lucide-react';
import { useCoreAdmin } from '../../contexts/CoreAdminContext';

const loginSchema = z.object({
  email: z.string().email('メールアドレスが無効です'),
  password: z.string().min(1, 'パスワードを入力してください'),
});

type LoginFormData = z.infer<typeof loginSchema>;
type LoginMode = 'admin' | 'staff' | 'register';

export default function CoreAdminLogin() {
  const { login, loginAsStaff, register } = useCoreAdmin();
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [mode, setMode] = useState<LoginMode>('admin');

  const {
    register: registerForm,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: mode === 'admin' ? 'coreadmin@example.com' : '',
      password: mode === 'admin' ? 'admin123!@#' : ''
    }
  });

  const onSubmit = async (data: LoginFormData) => {
    try {
      setError(null);
      
      if (!data.email || !data.password) {
        throw new Error('メールアドレスとパスワードを入力してください');
      }
      
      switch (mode) {
        case 'admin':
          await login(data.email, data.password);
          break;
        case 'staff':
          await loginAsStaff(data.email, data.password);
          break;
        case 'register':
          await register(data.email, data.password, 'New Admin');
          break;
      }
    } catch (error) {
      setError(error instanceof Error ? error.message : 'ログインに失敗しました');
      console.error('Login failed:', error);
    }
  };

  return (
    <div className="min-h-screen bg-mono-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="flex justify-center">
          <Shield className="h-12 w-12 text-purple-600" />
        </div>
        <h2 className="mt-6 text-center text-3xl font-extrabold text-mono-900">
          {mode === 'admin' ? '運営管理パネル' : 
           mode === 'staff' ? 'スタッフログイン' : 
           '新規管理者登録'}
        </h2>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow-sm sm:rounded-lg sm:px-10">
          <div className="flex gap-2 mb-6">
            <button
              onClick={() => {
                setMode('admin');
                setError(null);
                reset({
                  email: 'coreadmin@example.com',
                  password: 'admin123!@#'
                });
              }}
              className={`flex-1 flex items-center justify-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                mode === 'admin'
                  ? 'bg-purple-600 text-white'
                  : 'bg-mono-100 text-mono-600 hover:bg-mono-200'
              }`}
            >
              <Shield className="h-5 w-5" />
              管理者
            </button>
            <button
              onClick={() => {
                setMode('staff');
                setError(null);
                reset();
              }}
              className={`flex-1 flex items-center justify-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                mode === 'staff'
                  ? 'bg-purple-600 text-white'
                  : 'bg-mono-100 text-mono-600 hover:bg-mono-200'
              }`}
            >
              <Users className="h-5 w-5" />
              スタッフ
            </button>
            <button
              onClick={() => {
                setMode('register');
                setError(null);
                reset();
              }}
              className={`flex-1 flex items-center justify-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                mode === 'register'
                  ? 'bg-purple-600 text-white'
                  : 'bg-mono-100 text-mono-600 hover:bg-mono-200'
              }`}
            >
              <UserPlus className="h-5 w-5" />
              新規登録
            </button>
          </div>

          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center gap-2 text-red-600"
            >
              <AlertCircle className="h-5 w-5" />
              <span>{error}</span>
            </motion.div>
          )}

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-mono-700">
                メールアドレス
              </label>
              <div className="mt-1 relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-mono-400 h-5 w-5" />
                <input
                  type="email"
                  {...registerForm('email')}
                  className="block w-full pl-10 pr-3 py-2 border border-mono-200 rounded-lg focus:ring-2 focus:ring-purple-400"
                />
              </div>
              {errors.email && (
                <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-mono-700">
                パスワード
              </label>
              <div className="mt-1 relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-mono-400 h-5 w-5" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  {...registerForm('password')}
                  className="block w-full pl-10 pr-10 py-2 border border-mono-200 rounded-lg focus:ring-2 focus:ring-purple-400"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2"
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5 text-mono-400" />
                  ) : (
                    <Eye className="h-5 w-5 text-mono-400" />
                  )}
                </button>
              </div>
              {errors.password && (
                <p className="mt-1 text-sm text-red-600">{errors.password.message}</p>
              )}
            </div>

            <button
              type="submit"
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
            >
              {mode === 'admin' ? '管理者としてログイン' :
               mode === 'staff' ? 'スタッフとしてログイン' :
               '新規登録'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}