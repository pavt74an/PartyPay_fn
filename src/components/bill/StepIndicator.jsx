import React from 'react';

const StepIndicator = ({ currentStep }) => {
  const steps = [
    { number: 1, title: 'เพิ่มสมาชิก' },
    { number: 2, title: 'เพิ่มค่าใช้จ่าย' },
    { number: 3, title: 'เลือกผู้ร่วมแชร์' },
    { number: 4, title: 'สรุปผล' }
  ];

  return (
    <div className="flex justify-between items-center mb-8 bg-gray-100 p-4 rounded-lg">
      {steps.map((step) => (
        <div 
          key={step.number}
          className={`text-center flex-1 py-2 ${currentStep >= step.number ? 'font-bold text-blue-600' : ''}`}
        >
          <div 
            className={`rounded-full w-8 h-8 mx-auto mb-1 flex items-center justify-center ${
              currentStep >= step.number ? 'bg-blue-600 text-white' : 'bg-gray-300'
            }`}
          >
            {step.number}
          </div>
          <span>{step.title}</span>
        </div>
      ))}
    </div>
  );
};

export default StepIndicator;
