import axios from 'axios';

// สร้าง Axios instance
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3000/party',
  headers: {
    'Content-Type': 'application/json',
  }
});

/**
 * คำนวณผลลัพธ์การแชร์บิล
 * @param {Object} data - ข้อมูลสำหรับการคำนวณ
 * @returns {Promise<Object>} - ผลลัพธ์การคำนวณ
 */
export const calBill = async (data) => {
  try {
    const requestData = {
      expenses: data.expenses.map(expense => ({
        description: expense.description,
        amount: parseFloat(expense.amount)
      })),
      people: data.people,
      sharedItems: data.sharedItems,
      paidByPerson: data.paidByPerson,
      eventName: data.eventName || '',
      eventDate: data.eventDate || ''
    };

    console.log('Sending data to backend:', requestData);
    
    const response = await api.post('/bills/calculate', requestData);
    return response.data;
  } catch (error) {
    console.error('Error calculating bill:', error);
    throw error;
  }
};

export default api;
