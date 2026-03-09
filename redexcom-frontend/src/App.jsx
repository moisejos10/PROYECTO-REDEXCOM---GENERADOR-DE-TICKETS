import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import NuevoTicket from './pages/NuevoTicket';
import DetalleTicket from './pages/DetalleTicket'; 

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/nuevo-ticket" element={<NuevoTicket />} />
        
        {/* 2. El :id significa que esta ruta es dinámica. Puede ser /ticket/10 o /ticket/99 */}
        <Route path="/ticket/:id" element={<DetalleTicket />} /> 
      </Routes>
    </BrowserRouter>
  );
}

export default App;