import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

// mount React app ลง #root ใน index.html
createRoot(document.getElementById('root')).render(
  // StrictMode ช่วยเตือน side effects ที่ไม่ปลอดภัยตอนพัฒนา
  // หมายเหตุ: โหมดนี้มีผลตอน dev เป็นหลัก ไม่กระทบ production build
  <StrictMode>
    <App />
  </StrictMode>,
)
