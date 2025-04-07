import React, { useState, useEffect } from 'react';
import StepIndicator from './StepIndicator';
import EventForm from './EventForm';
import MemberList from './MemberList';
import ExpenseForm from './ExpenseForm';
import ShareTable from './ShareTable';
import Summary from './Summary';
import { calBill } from '../../services/api'

const BillSplitter = () => {
  // State สำหรับการจัดการขั้นตอน
  const [currentStep, setCurrentStep] = useState(1);
  
  // State สำหรับข้อมูลการแชร์ค่าใช้จ่าย
  const [eventName, setEventName] = useState('');
  const [eventDate, setEventDate] = useState('');
  const [people, setPeople] = useState(['']);
  const [expenses, setExpenses] = useState([]);
  const [newExpense, setNewExpense] = useState({ description: '', amount: '' });
  const [isCalculating, setIsCalculating] = useState(false);
  const [summaryResults, setSummaryResults] = useState({});
  const [error, setError] = useState('');
  
  // คนที่จ่ายแต่ละรายการ
  const [paidByPerson, setPaidByPerson] = useState([]);
  
  // checkbox สำหรับเลือกผู้ร่วมแชร์
  const [sharedItems, setSharedItems] = useState([]);
  
  // ตรวจสอบว่าขั้นตอนที่ 1 พร้อมหรือยัง (มีชื่อสมาชิกครบและไม่ว่าง)
  const isStep1Valid = () => {
    return people.length > 0 && people.every(person => person.trim() !== '');
  };
  
  // ตรวจสอบว่าขั้นตอนที่ 2 พร้อมหรือยัง (มีรายการค่าใช้จ่ายอย่างน้อย 1 รายการ)
  const isStep2Valid = () => {
    return expenses.length > 0;
  };
  
  // เพิ่มคนเข้าร่วม
  const addPerson = () => {
    setPeople([...people, '']);
  };
  
  // ลบคนออก
  const removePerson = (index) => {
    // ต้องมีคนอย่างน้อย 1 คน
    if (people.length <= 1) return;
    
    const newPeople = [...people];
    newPeople.splice(index, 1);
    setPeople(newPeople);
  };
  
  // แก้ไขชื่อคน
  const updatePerson = (index, value) => {
    const newPeople = [...people];
    newPeople[index] = value;
    setPeople(newPeople);
  };
  
  // อัพเดทข้อมูลค่าใช้จ่ายที่กำลังสร้าง
  const updateNewExpense = (field, value) => {
    setNewExpense({ ...newExpense, [field]: value });
  };
  
  // เพิ่มค่าใช้จ่าย
  const addExpense = () => {
    if (!newExpense.description || !newExpense.amount) return;
    
    // สร้างรายการค่าใช้จ่ายใหม่
    const expenseItem = {
      ...newExpense,
      id: Date.now(), // ใช้ timestamp เป็น id
      amount: parseFloat(newExpense.amount)
    };
    
    setExpenses([...expenses, expenseItem]);
    
    // อัพเดทคนที่จ่าย (เริ่มต้นเป็นคนแรก)
    const newPaidByPerson = [...paidByPerson];
    newPaidByPerson.push(0);
    setPaidByPerson(newPaidByPerson);
    
    // รีเซ็ตฟอร์ม
    setNewExpense({ description: '', amount: '' });
  };
  
  // ลบค่าใช้จ่าย
  const removeExpense = (index) => {
    const newExpenses = [...expenses];
    newExpenses.splice(index, 1);
    setExpenses(newExpenses);
    
    // ลบข้อมูลคนที่จ่ายด้วย
    const newPaidByPerson = [...paidByPerson];
    newPaidByPerson.splice(index, 1);
    setPaidByPerson(newPaidByPerson);
  };
  
  // อัพเดทคนที่จ่าย
  const updatePaidByPerson = (expenseIndex, personIndex) => {
    const newPaidByPerson = [...paidByPerson];
    newPaidByPerson[expenseIndex] = personIndex;
    setPaidByPerson(newPaidByPerson);
  };
  
  // อัพเดท sharedItems เมื่อจำนวนคนหรือค่าใช้จ่ายเปลี่ยน
  useEffect(() => {
    if (currentStep === 3 && people.length > 0 && expenses.length > 0) {
      // สร้าง array 2 มิติว่าง
      const newSharedItems = [];
      
      // สำหรับแต่ละรายการค่าใช้จ่าย สร้าง array ขนาดเท่ากับจำนวนคน และเริ่มต้นเป็น true ทั้งหมด
      for (let i = 0; i < expenses.length; i++) {
        const sharedByAll = new Array(people.length).fill(true);
        newSharedItems.push(sharedByAll);
      }
      
      setSharedItems(newSharedItems);
    }
  }, [currentStep, people.length, expenses.length]);
  
  // สลับสถานะ checkbox
  const toggleSharedItem = (expenseIndex, personIndex) => {
    const newSharedItems = [...sharedItems];
    
    // สลับค่า true/false
    newSharedItems[expenseIndex][personIndex] = !newSharedItems[expenseIndex][personIndex];
    
    // ตรวจสอบว่ามีคนร่วมแชร์อย่างน้อย 1 คน
    const anyoneSharing = newSharedItems[expenseIndex].some(status => status);
    
    // ถ้าไม่มีใครร่วมแชร์เลย ให้คนที่จ่ายเป็นคนแชร์
    if (!anyoneSharing) {
      newSharedItems[expenseIndex][paidByPerson[expenseIndex]] = true;
    }
    
    setSharedItems(newSharedItems);
  };
  
  // คำนวณผลลัพธ์โดยเรียกใช้ API
  const calculateResults = async () => {
    setIsCalculating(true);
    setError('');
    
    try {
      // เตรียมข้อมูลสำหรับส่งไป API
      const requestData = {
        eventName,
        eventDate,
        people,
        expenses,
        sharedItems,
        paidByPerson
      };
      
      // เรียกใช้ API
      const result = await calBill(requestData);
      
      // เก็บผลลัพธ์
      setSummaryResults(result);
      
      // ไปที่ขั้นตอนสุดท้าย
      setCurrentStep(4);
    } catch (error) {
      console.error('Error calculating bill:', error);
      setError('เกิดข้อผิดพลาดในการคำนวณ กรุณาลองใหม่อีกครั้ง');
    } finally {
      setIsCalculating(false);
    }
  };
  
  // เริ่มต้นขั้นตอนใหม่
  const resetForm = () => {
    setCurrentStep(1);
    setEventName('');
    setEventDate('');
    setPeople(['']);
    setExpenses([]);
    setNewExpense({ description: '', amount: '' });
    setPaidByPerson([]);
    setSharedItems([]);
    setSummaryResults({});
    setError('');
  };
  
  return (
    <div className="max-w-6xl mx-auto">
      <StepIndicator currentStep={currentStep} />
      
      {error && (
        <div className="bg-red-100 border border-red-300 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}
      
      <div className="bg-white rounded-lg shadow p-6 mb-6">
        <EventForm 
          eventName={eventName}
          eventDate={eventDate}
          onEventNameChange={setEventName}
          onEventDateChange={setEventDate}
        />
        
        {currentStep === 1 && (
          <MemberList 
            people={people}
            onUpdatePerson={updatePerson}
            onRemovePerson={removePerson}
            onAddPerson={addPerson}
            onNext={() => setCurrentStep(2)}
            isNextDisabled={!isStep1Valid()}
          />
        )}
        
        {currentStep === 2 && (
          <ExpenseForm 
            newExpense={newExpense}
            expenses={expenses}
            onExpenseChange={updateNewExpense}
            onAddExpense={addExpense}
            onRemoveExpense={removeExpense}
            onPrevious={() => setCurrentStep(1)}
            onNext={() => setCurrentStep(3)}
            isNextDisabled={!isStep2Valid()}
          />
        )}
        
        {currentStep === 3 && (
          <ShareTable 
            people={people}
            expenses={expenses}
            paidByPerson={paidByPerson}
            sharedItems={sharedItems}
            updatePaidByPerson={updatePaidByPerson}
            toggleSharedItem={toggleSharedItem}
            onPrevious={() => setCurrentStep(2)}
            onCalculate={calculateResults}
            isCalculating={isCalculating}
          />
        )}
        
        {currentStep === 4 && (
          <Summary 
            people={people}
            summaryResults={summaryResults}
            onPrevious={() => setCurrentStep(3)}
            onReset={resetForm}
          />
        )}
      </div>
    </div>
  );
};

export default BillSplitter;
