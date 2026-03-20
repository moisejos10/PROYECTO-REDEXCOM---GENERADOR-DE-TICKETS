import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import NuevoTicket from './pages/NuevoTicket';
import DetalleTicket from './pages/DetalleTicket'; 
import HistorialTickets from './pages/HistorialTickets';
import GestionUsuarios from './pages/GestionUsuarios';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/nuevo-ticket" element={<NuevoTicket />} />
        <Route path="/ticket/:id" element={<DetalleTicket />} /> 
        <Route path="/historial" element={<HistorialTickets />} />
        <Route path="/usuarios" element={<GestionUsuarios />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;