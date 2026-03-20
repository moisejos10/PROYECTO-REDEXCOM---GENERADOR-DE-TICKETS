import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import NuevoTicket from './pages/NuevoTicket';
import DetalleTicket from './pages/DetalleTicket';
import HistorialTickets from './pages/HistorialTickets';
import GestionUsuarios from './pages/GestionUsuarios';
import MainLayout from './components/MainLayout'; 

function App() {
  return (
    // 👇 AQUÍ ESTÁ EL ENVOLTORIO QUE NOS FALTABA 👇
    <BrowserRouter>
      <Routes>
        {/* Ruta pública (Sin menú lateral) */}
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<Login />} />

        {/* Rutas privadas (Envueltas por el menú lateral oscuro) */}
        <Route element={<MainLayout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/nuevo-ticket" element={<NuevoTicket />} />
          <Route path="/ticket/:id" element={<DetalleTicket />} />
          <Route path="/historial" element={<HistorialTickets />} />
          <Route path="/usuarios" element={<GestionUsuarios />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;