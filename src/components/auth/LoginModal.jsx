import React, { useState } from 'react';
import { X } from 'lucide-react';

const LoginModal = ({ onClose }) => {
  const [mode, setMode] = useState('login'); // login หรือ register
  const [form, setForm] = useState({ email: '', password: '', confirmPassword: '' });
  const [error, setError] = useState('');
  
  const handleInputChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError('');
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // ตัวอย่างการตรวจสอบง่ายๆ (ในโปรเจคจริงจะเชื่อมต่อกับ Firebase)
    if (!form.email || !form.password) {
      setError('กรุณากรอกอีเมลและรหัสผ่าน');
      return;
    }
    
    if (mode === 'register' && form.password !== form.confirmPassword) {
      setError('รหัสผ่านไม่ตรงกัน');
      return;
    }
    
    // ในโปรเจคจริงจะเรียก service สำหรับ login/register
    alert(`${mode === 'login' ? 'เข้าสู่ระบบ' : 'สมัครสมาชิก'} ด้วย ${form.email}`);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-md w-full">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">
            {mode === 'login' ? 'เข้าสู่ระบบ' : 'สมัครสมาชิก'}
          </h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X size={24} />
          </button>
        </div>
        
        <p className="mb-4 text-gray-600">เข้าสู่ระบบเพื่อบันทึกและเรียกดูประวัติการแชร์ค่าใช้จ่าย</p>
        
        {error && (
          <div className="bg-red-100 border border-red-300 text-red-700 px-4 py-2 rounded mb-4">
            {error}
          </div>
        )}
        
        <form onSubmit={handleSubmit} className="mb-6">
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">อีเมล</label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleInputChange}
              placeholder="your@email.com"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">รหัสผ่าน</label>
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleInputChange}
              placeholder="รหัสผ่าน"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          {mode === 'register' && (
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">ยืนยันรหัสผ่าน</label>
              <input
                type="password"
                name="confirmPassword"
                value={form.confirmPassword}
                onChange={handleInputChange}
                placeholder="ยืนยันรหัสผ่าน"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          )}
          <button 
            type="submit"
            className="w-full py-2 rounded bg-blue-500 text-white hover:bg-blue-600"
          >
            {mode === 'login' ? 'เข้าสู่ระบบ' : 'สมัครสมาชิก'}
          </button>
        </form>
        
        <div className="relative mb-6">
          <hr className="my-4" />
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white px-2 text-gray-500">
            หรือ
          </div>
        </div>
        
        <div className="flex flex-col gap-4">
          <button className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 flex items-center justify-center gap-2">
            <span>เข้าสู่ระบบด้วย Google</span>
          </button>
          <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 flex items-center justify-center gap-2">
            <span>เข้าสู่ระบบด้วย Facebook</span>
          </button>
        </div>
        
        <div className="mt-6 text-center">
          {mode === 'login' ? (
            <button 
              onClick={() => setMode('register')}
              className="text-blue-500 hover:underline"
            >
              ยังไม่มีบัญชี? สมัครสมาชิกใหม่
            </button>
          ) : (
            <button 
              onClick={() => setMode('login')}
              className="text-blue-500 hover:underline"
            >
              มีบัญชีอยู่แล้ว? เข้าสู่ระบบ
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default LoginModal;
