import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
// Importamos un pequeño icono de flecha para darle un toque visual sutil
import { IoArrowForward } from 'react-icons/io5';

export default function Dashboard() {
  const navigate = useNavigate();

  // 1. Estado de los tickets (Simulación de Base de Datos)
  const [tickets] = useState([
    { id: 1042, cliente: 'Farmacia Central (Sede 2)', problema: 'Pérdida de paquetes en enlace dedicado', estado: 'Pendiente' },
    { id: 1041, cliente: 'Inversiones Los Andes', problema: 'Router sin respuesta a ping', estado: 'En Progreso' },
  ]);

  // 2. Estado para la barra de búsqueda
  const [terminoBusqueda, setTerminoBusqueda] = useState('');

  // 3. Lógica de filtrado
  const ticketsFiltrados = tickets.filter((ticket) => {
    const busqueda = terminoBusqueda.toLowerCase();
    return (
      ticket.cliente.toLowerCase().includes(busqueda) ||
      ticket.problema.toLowerCase().includes(busqueda) ||
      ticket.id.toString().includes(busqueda)
    );
  });

  // 4. Renderizado de colores de estado
  const renderEstado = (estado) => {
    if (estado === 'Pendiente') return <span className="rounded-full bg-red-500/10 px-3 py-1 text-xs font-medium text-red-500 border border-red-500/20">{estado}</span>;
    if (estado === 'En Progreso') return <span className="rounded-full bg-yellow-500/10 px-3 py-1 text-xs font-medium text-yellow-500 border border-yellow-500/20">{estado}</span>;
    return <span className="rounded-full bg-green-500/10 px-3 py-1 text-xs font-medium text-green-500 border border-green-500/20">{estado}</span>;
  };

  return (
    <div className="space-y-8">
      
      {/* Título de la Sección */}
      <div>
        <h2 className="text-2xl font-bold text-white">Panel de Control </h2>
        <p className="text-gray-400 mt-1">Resumen general y tickets asignados a tu usuario.</p>
      </div>

      {/* Tarjetas de Estadísticas */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        <div className="rounded-xl border border-gray-800 border-l-4 border-l-red-500 bg-[#1c2438] p-6 shadow-lg">
          <p className="text-sm font-medium uppercase tracking-wider text-gray-400">Tickets Pendientes</p>
          <h3 className="mt-2 text-3xl font-bold text-white">{tickets.filter(t => t.estado === 'Pendiente').length}</h3>
        </div>
        <div className="rounded-xl border border-gray-800 border-l-4 border-l-yellow-500 bg-[#1c2438] p-6 shadow-lg">
          <p className="text-sm font-medium uppercase tracking-wider text-gray-400">Tickets en Progreso</p>
          <h3 className="mt-2 text-3xl font-bold text-white">{tickets.filter(t => t.estado === 'En Progreso').length}</h3>
        </div>
        <div className="rounded-xl border border-gray-800 border-l-4 border-l-green-500 bg-[#1c2438] p-6 shadow-lg">
          <p className="text-sm font-medium uppercase tracking-wider text-gray-400">Tickets Resueltos</p>
          <h3 className="mt-2 text-3xl font-bold text-white">8</h3> {/* Dato fijo temporal */}
        </div>
      </div>

      {/* Tabla de Tickets Recientes */}
      <div className="rounded-xl border border-gray-800 bg-[#1c2438] shadow-lg overflow-hidden">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between border-b border-gray-800 px-6 py-4 space-y-4 sm:space-y-0">
          <h3 className="text-lg font-semibold text-white">Cola de Trabajo</h3>
          
          <div className="flex items-center w-full sm:w-auto space-x-4">
            <div className="relative w-full sm:w-64">
              <input
                type="text"
                placeholder="Buscar por Cliente o ID... "
                value={terminoBusqueda}
                onChange={(e) => setTerminoBusqueda(e.target.value)}
                className="w-full rounded-lg border border-gray-700 bg-[#0b1325] px-4 py-2 text-sm text-white placeholder-gray-500 focus:border-[var(--color-redexcom-primary)] focus:outline-none"
              />
            </div>
            <button  
              onClick={() => navigate('/nuevo-ticket')} 
              className="shrink-0 rounded-lg bg-[var(--color-redexcom-primary)] px-4 py-2 text-sm font-bold text-white transition-colors hover:bg-blue-600"
            >
              + Nuevo Ticket
            </button>
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-gray-400">
            <thead className="bg-[#2a344a] text-xs uppercase text-gray-300">
              <tr>
                <th className="px-6 py-4 font-medium">ID</th>
                <th className="px-6 py-4 font-medium">Cliente</th>
                <th className="px-6 py-4 font-medium">Problema Reportado</th>
                <th className="px-6 py-4 font-medium">Estado</th>
                <th className="px-6 py-4 font-medium text-center">Detalle</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-700">
              {ticketsFiltrados.length > 0 ? (
                ticketsFiltrados.map((ticket) => (
                  <tr key={ticket.id} className="transition-colors hover:bg-[#2a344a]/50">
                    <td className="px-6 py-4 font-bold text-blue-400">#{ticket.id}</td>
                    <td className="px-6 py-4 text-white font-medium">{ticket.cliente}</td>
                    <td className="px-6 py-4">{ticket.problema}</td>
                    <td className="px-6 py-4">{renderEstado(ticket.estado)}</td>
                    <td className="px-6 py-4 text-center">
                      
                    
                      <button 
                        onClick={() => navigate(`/ticket/${ticket.id}`)} 
                        className="flex items-center justify-center gap-1.5 mx-auto text-blue-400 hover:text-white font-medium transition-colors"
                      >
                        <span>Abrir</span>
                        <IoArrowForward className="text-base" />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="px-6 py-8 text-center text-gray-500">
                    No se encontraron tickets con esa búsqueda.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}