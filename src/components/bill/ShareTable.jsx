import React from 'react';
import { ChevronRight } from 'lucide-react';

/**
 * คอมโพเนนต์แสดงตารางเลือกผู้ร่วมแชร์
 * @param {Object} props - Props
 */
const ShareTable = ({
  people,
  expenses,
  paidByPerson,
  sharedItems,
  updatePaidByPerson,
  toggleSharedItem,
  onPrevious,
  onCalculate,
  isCalculating
}) => {
  return (
    <div>
      <h3 className="text-lg font-semibold mb-3">เลือกผู้ร่วมแชร์และผู้จ่าย</h3>
      <p className="text-gray-600 mb-4">เลือกว่าใครเป็นคนจ่ายเงินในแต่ละรายการ และติ๊กผู้ที่ร่วมแชร์ค่าใช้จ่าย</p>
      
      <div className="overflow-x-auto mb-6">
        <table className="min-w-full bg-white border">
          <thead>
            <tr className="bg-gray-100">
              <th className="py-2 px-3 border-b border-r text-left">รายการ</th>
              <th className="py-2 px-3 border-b border-r text-right">จำนวนเงิน</th>
              <th className="py-2 px-3 border-b border-r text-left">จ่ายโดย</th>
              {people.map((person, index) => (
                <th key={index} className="py-2 px-3 border-b text-center">
                  {person || `คนที่ ${index + 1}`}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {expenses.map((expense, expenseIndex) => (
              <tr key={expenseIndex} className="hover:bg-gray-50">
                <td className="py-2 px-3 border-b border-r">{expense.description}</td>
                <td className="py-2 px-3 border-b border-r text-right">{parseFloat(expense.amount).toFixed(2)}</td>
                <td className="py-2 px-3 border-b border-r">
                  <select 
                    value={paidByPerson[expenseIndex] || 0}
                    onChange={(e) => updatePaidByPerson(expenseIndex, parseInt(e.target.value))}
                    className="w-full px-2 py-1 border rounded"
                  >
                    {people.map((person, personIndex) => (
                      <option key={personIndex} value={personIndex}>
                        {person || `คนที่ ${personIndex + 1}`}
                      </option>
                    ))}
                  </select>
                </td>
                {people.map((person, personIndex) => (
                  <td key={personIndex} className="py-2 px-3 border-b text-center">
                    <input
                      type="checkbox"
                      checked={sharedItems[expenseIndex] ? sharedItems[expenseIndex][personIndex] : false}
                      onChange={() => toggleSharedItem(expenseIndex, personIndex)}
                      className="w-5 h-5 cursor-pointer"
                    />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      <div className="flex flex-wrap gap-3">
        <button
          onClick={onPrevious}
          className="flex items-center gap-2 text-blue-500 hover:text-blue-700 px-4 py-2 border border-blue-200 rounded-lg hover:bg-blue-50"
        >
          <span>ย้อนกลับ</span>
        </button>
        
        <button
          onClick={onCalculate}
          disabled={isCalculating}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg ${
            isCalculating 
              ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
              : 'bg-blue-500 text-white hover:bg-blue-600'
          }`}
        >
          <span>{isCalculating ? 'กำลังคำนวณ...' : 'คำนวณผล'}</span>
          <ChevronRight size={20} />
        </button>
      </div>
    </div>
  );
};

export default ShareTable;
