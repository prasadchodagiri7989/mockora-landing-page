import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Landing from './pages/Landing';
import RegisterAndPay from './pages/RegisterAndPay';
import PaymentStatus from './pages/PaymentStatus';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/register" element={<RegisterAndPay />} />
        <Route path="/checkout" element={<Navigate to="/register" replace />} />
        <Route path="/payment/status" element={<PaymentStatus />} />
      </Routes>
    </BrowserRouter>
  );
}
