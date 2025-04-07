import React from 'react';
import { User, Trash2, Plus, ChevronRight } from 'lucide-react';

const MemberList = ({ people, onUpdatePerson, onRemovePerson, onAddPerson, onNext, isNextDisabled }) => {
  return (
    <div>
      <h3 className="text-lg font-semibold mb-3">รายชื่อสมาชิก</h3>
      <div className="space-y-3 mb-6">
        {people.map((person, index) => (
          <div key={index} className="flex items-center gap-2">
            <User size={20} className="text-gray-500" />
            <input
              type="text"
              value={person}
              onChange={(e) => onUpdatePerson(index, e.target.value)}
              placeholder={`ชื่อคนที่ ${index + 1}`}
              className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              onClick={() => onRemovePerson(index)}
              disabled={people.length <= 1}
              className={`p-2 rounded-lg ${people.length <= 1 ? 'text-gray-300' : 'text-red-500 hover:bg-red-100'}`}
            >
              <Trash2 size={20} />
            </button>
          </div>
        ))}
      </div>
      
      <div className="flex flex-wrap gap-3">
        <button
          onClick={onAddPerson}
          className="flex items-center gap-2 text-blue-500 hover:text-blue-700 px-4 py-2 border border-blue-200 rounded-lg hover:bg-blue-50"
        >
          <Plus size={20} />
          <span>เพิ่มสมาชิก</span>
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
          <span>ต่อไป: เพิ่มค่าใช้จ่าย</span>
          <ChevronRight size={20} />
        </button>
      </div>
    </div>
  );
};

export default MemberList;
