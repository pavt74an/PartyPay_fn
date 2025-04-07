import React from 'react';

const EventForm = ({ eventName, eventDate, onEventNameChange, onEventDateChange }) => {
  return (
    <div className="mb-6">
      <h2 className="text-xl font-bold mb-4">รายละเอียดอีเวนท์</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-gray-700 mb-2">ชื่ออีเวนท์</label>
          <input
            type="text"
            value={eventName}
            onChange={(e) => onEventNameChange(e.target.value)}
            placeholder="เช่น ทริปเขาใหญ่, งานเลี้ยงวันเกิด"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block text-gray-700 mb-2">วันที่</label>
          <input
            type="date"
            value={eventDate}
            onChange={(e) => onEventDateChange(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>
    </div>
  );
};

export default EventForm;
