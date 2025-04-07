import React from 'react';
import { Plus, ChevronRight, Trash2 } from 'lucide-react';

const ExpenseForm = ({ newExpense, expenses, onExpenseChange, onAddExpense, onRemoveExpense, onPrevious, onNext, isNextDisabled }) => {
  return (
    <div>
      <h3 className="text-lg font-semibold mb-3">เพิ่มรายการค่าใช้จ่าย</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div>
          <label className="block text-gray-700 mb-2">รายการ</label>
          <input
            type="text"
            value={newExpense.description}
            onChange={(e) => onExpenseChange('description', e.target.value)}
            placeholder="เช่น ค่าอาหาร, ค่าที่พัก"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block text-gray-700 mb-2">จำนวนเงิน (บาท)</label>
          <input
            type="number"
            value={newExpense.amount}
            onChange={(e) => onExpenseChange('amount', e.target.value)}
            placeholder="0.00"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="flex items-end">
          <button
            onClick={onAddExpense}
            disabled={!newExpense.description || !newExpense.amount}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg ${
              newExpense.description && newExpense.amount
                ? 'bg-blue-500 text-white hover:bg-blue-600'
                : 'bg-gray-200 text-gray-500 cursor-not-allowed'
            }`}
          >
            <Plus size={20} />
            <span>เพิ่มรายการ</span>
          </button>
        </div>
      </div>
      
      {expenses.length > 0 && (
        <div className="overflow-x-auto mb-6">
          <table className="min-w-full bg-white border">
            <thead>
              <tr className="bg-gray-100">
                <th className="py-2 px-3 border-b text-left">รายการ</th>
                <th className="py-2 px-3 border-b text-right">จำนวนเงิน (บาท)</th>
                <th className="py-2 px-3 border-b text-center w-20">ลบ</th>
              </tr>
            </thead>
            <tbody>
              {expenses.map((expense, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="py-2 px-3 border-b">{expense.description}</td>
                  <td className="py-2 px-3 border-b text-right">{parseFloat(expense.amount).toFixed(2)}</td>
                  <td className="py-2 px-3 border-b text-center">
                    <button 
                      onClick={() => onRemoveExpense(index)} 
                      className="text-red-500 hover:text-red-700"
                    >
                      <Trash2 size={16} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr className="bg-gray-50 font-bold">
                <td className="py-2 px-3 border-t">รวม</td>
                <td className="py-2 px-3 border-t text-right">
                  {expenses.reduce((sum, expense) => sum + parseFloat(expense.amount), 0).toFixed(2)}
                </td>
                <td className="py-2 px-3 border-t"></td>
              </tr>
            </tfoot>
          </table>
        </div>
      )}
      
      <div className="flex flex-wrap gap-3">
        <button
          onClick={onPrevious}
          className="flex items-center gap-2 text-blue-500 hover:text-blue-700 px-4 py-2 border border-blue-200 rounded-lg hover:bg-blue-50"
        >
          <span>ย้อนกลับ</span>
        </button>
        
        <button
          onClick={onNext}
          disabled={isNextDisabled}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg ${
            isNextDisabled 
              ? 'bg-gray-200 text-gray-500 cursor-not-allowed' 
              : 'bg-blue-500 text-white hover:bg-blue-600'
          }`}
        >
          <span>ต่อไป: เลือกผู้ร่วมแชร์</span>
          <ChevronRight size={20} />
        </button>
      </div>
    </div>
  );
};

export default ExpenseForm;
