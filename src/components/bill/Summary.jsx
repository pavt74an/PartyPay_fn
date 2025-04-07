import React from 'react';
import { ArrowLeft, Save, ArrowRight } from 'lucide-react';

const Summary = ({ people, summaryResults, onPrevious, onReset }) => {
  const { totalAmount, transactions } = summaryResults;
  
  // รองรับทั้ง balances และ balance จาก backend
  const balances = summaryResults.balances || summaryResults.balance || [];
  const averagePerPerson = summaryResults.averagePerPerson || {};

  return (
    <div className="max-w-md mx-auto p-4 bg-white shadow-lg rounded-xl">
      <h3 className="text-xl font-bold text-center mb-6">สรุปค่าใช้จ่าย</h3>
      
      {/* ค่าใช้จ่ายรวมทั้งหมด */}
      <div className="bg-blue-50 border-2 border-blue-200 rounded-lg p-4 mb-6 text-center">
        <p className="text-sm mb-1">ค่าใช้จ่ายรวมทั้งหมด</p>
        <div className="text-3xl font-extrabold text-blue-600">{totalAmount.toFixed(2)} บาท</div>
      </div>
      
      {/* ตารางสรุปรายบุคคล */}
      <div className="mb-6">
        <h4 className="text-lg font-semibold mb-3">สรุปรายบุคคล</h4>
        <div className="overflow-hidden rounded-lg border">
          <table className="w-full bg-white">
            <thead className="bg-gray-100">
              <tr>
                <th className="py-2 px-3 text-left">ชื่อ</th>
                <th className="py-2 px-3 text-right">ส่วนแบ่งที่ต้องจ่าย</th>
                <th className="py-2 px-3 text-right">สถานะ</th>
              </tr>
            </thead>
            <tbody>
              {people.map((person, index) => {
                const shouldPay = parseFloat(averagePerPerson[index] || 0);
                const balance = parseFloat(balances[index] || 0);
                
                return (
                  <tr key={index} className="border-t hover:bg-gray-50">
                    <td className="py-2 px-3 font-medium">{person}</td>
                    <td className="py-2 px-3 text-right">{shouldPay.toFixed(2)} บาท</td>
                    <td className="py-2 px-3 text-right">
                      {balance > 0 ? (
                        <span className="text-green-600 font-semibold">ได้รับคืน {balance.toFixed(2)} บาท</span>
                      ) : balance < 0 ? (
                        <span className="text-red-600 font-semibold">ต้องจ่ายเพิ่ม {Math.abs(balance).toFixed(2)} บาท</span>
                      ) : (
                        <span className="text-gray-500">พอดี</span>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
      
      {/* รายการโอนเงินระหว่างกัน */}
      <div className="mb-6">
        <h4 className="text-lg font-semibold mb-3">รายการโอนเงิน</h4>
        
        {transactions.length === 0 ? (
          <div className="bg-gray-50 border rounded-lg p-4 text-center text-gray-600">
            ไม่มีรายการที่ต้องโอนเงิน (ทุกคนจ่ายเท่ากันพอดี)
          </div>
        ) : (
          <div className="space-y-3 bg-gray-50 rounded-lg border p-3">
            {transactions.map((transaction, index) => (
              <div 
                key={index} 
                className="flex items-center p-3 bg-white rounded-lg shadow-sm"
              >
                <div className="flex-1 font-medium text-right pr-2">
                  {people[transaction.from]}
                </div>
                <div className="flex flex-col items-center px-3">
                  <span className="text-xs text-gray-500">โอนให้</span>
                  <ArrowRight size={18} className="text-blue-500" />
                  <span className="text-blue-600 font-bold">{transaction.amount} บาท</span>
                </div>
                <div className="flex-1 font-medium pl-2">
                  {people[transaction.to]}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      
      {/* ปุ่มดำเนินการ */}
      <div className="flex justify-center space-x-3">
        <button
          onClick={onPrevious}
          className="flex items-center gap-2 text-blue-600 bg-blue-50 hover:bg-blue-100 px-4 py-2 rounded-lg"
        >
          <ArrowLeft size={20} />
          <span>ย้อนกลับ</span>
        </button>
        
        <button
          onClick={onReset}
          className="flex items-center gap-2 bg-green-500 text-white hover:bg-green-600 px-4 py-2 rounded-lg"
        >
          <Save size={20} />
          <span>เริ่มใหม่</span>
        </button>
      </div>
    </div>
  );
};

export default Summary;
