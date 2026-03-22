import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { IoArrowForward } from 'react-icons/io5';

export default function Dashboard() {
  const navigate = useNavigate();

  const [tickets] = useState([
    { id: 1042, cliente: 'Farmacia Central (Sede 2)', problema: 'Pérdida de paquetes en enlace dedicado', estado: 'Pendiente' },
    { id: 1041, cliente: 'Inversiones Los Andes', problema: 'Router sin respuesta a ping', estado: 'En Progreso' },
  ]);

  const [terminoBusqueda, setTerminoBusqueda] = useState('');

  const ticketsFiltrados = tickets.filter((ticket) => {
    const busqueda = terminoBusqueda.toLowerCase();
    return (
      ticket.cliente.toLowerCase().includes(busqueda) ||
      ticket.problema.toLowerCase().includes(busqueda) ||
      ticket.id.toString().includes(busqueda)
    );
  });

  // 1. MEJORA: Agregamos `whitespace-nowrap` y `inline-block` para que los colores no se deformen en móvil
  const renderEstado = (estado) => {
    if (estado === 'Pendiente') return <span className="inline-block whitespace-nowrap rounded-full bg-red-500/10 px-3 py-1 text-xs font-medium text-red-500 border border-red-500/20">{estado}</span>;
    if (estado === 'En Progreso') return <span className="inline-block whitespace-nowrap rounded-full bg-yellow-500/10 px-3 py-1 text-xs font-medium text-yellow-500 border border-yellow-500/20">{estado}</span>;
    return <span className="inline-block whitespace-nowrap rounded-full bg-green-500/10 px-3 py-1 text-xs font-medium text-green-500 border border-green-500/20">{estado}</span>;
  };

  return (
    <div className="space-y-8">
      
      {/* Título */}
      <div>
        <h2 className="text-2xl font-bold text-white">Panel de Control Activo</h2>
        <p className="text-gray-400 mt-1 text-sm md:text-base">Resumen general y tickets asignados a tu usuario.</p>
      </div>

      {/* Tarjetas de Estadísticas (Ya eran responsivas, se apilan en móvil) */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3 md:gap-6">
        <div className="rounded-xl border border-gray-800 border-l-4 border-l-red-500 bg-[#1c2438] p-5 shadow-lg">
          <p className="text-xs md:text-sm font-medium uppercase tracking-wider text-gray-400">Tickets Pendientes</p>
          <h3 className="mt-2 text-2xl md:text-3xl font-bold text-white">{tickets.filter(t => t.estado === 'Pendiente').length}</h3>
        </div>
        <div className="rounded-xl border border-gray-800 border-l-4 border-l-yellow-500 bg-[#1c2438] p-5 shadow-lg">
          <p className="text-xs md:text-sm font-medium uppercase tracking-wider text-gray-400">Tickets en Progreso</p>
          <h3 className="mt-2 text-2xl md:text-3xl font-bold text-white">{tickets.filter(t => t.estado === 'En Progreso').length}</h3>
        </div>
        <div className="rounded-xl border border-gray-800 border-l-4 border-l-green-500 bg-[#1c2438] p-5 shadow-lg">
          <p className="text-xs md:text-sm font-medium uppercase tracking-wider text-gray-400">Tickets Resueltos</p>
          <h3 className="mt-2 text-2xl md:text-3xl font-bold text-white">8</h3>
        </div>
      </div>

      {/* Tabla de Tickets Recientes */}
      <div className="rounded-xl border border-gray-800 bg-[#1c2438] shadow-lg overflow-hidden">
        
        {/* 2. MEJORA: Buscador y Botón adaptables (Ocupan 100% de ancho en móvil y se apilan) */}
        <div className="flex flex-col md:flex-row md:items-center justify-between border-b border-gray-800 p-4 md:px-6 gap-4">
          <h3 className="text-lg font-semibold text-white">Cola de Trabajo</h3>
          
          <div className="flex flex-col sm:flex-row w-full md:w-auto gap-3">
            <div className="relative w-full sm:w-64">
              <input
                type="text"
                placeholder="Buscar cliente, ID o falla..."
                value={terminoBusqueda}
                onChange={(e) => setTerminoBusqueda(e.target.value)}
                className="w-full rounded-lg border border-gray-700 bg-[#0b1325] px-4 py-2 text-sm text-white placeholder-gray-500 focus:border-[var(--color-redexcom-primary)] focus:outline-none"
              />
            </div>
            <button  
              onClick={() => navigate('/nuevo-ticket')} 
              className="w-full sm:w-auto shrink-0 rounded-lg bg-[var(--color-redexcom-primary)] px-4 py-2 text-sm font-bold text-white transition-colors hover:bg-blue-600 whitespace-nowrap"
            >
              + Nuevo Ticket
            </button>
          </div>
        </div>
        
        {/* 3. MEJORA: Contenedor con scroll y celdas con `whitespace-nowrap` para evitar deformaciones */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-gray-400 min-w-[600px]">
            <thead className="bg-[#2a344a] text-xs uppercase text-gray-300">
              <tr>
                <th className="px-4 py-3 md:px-6 md:py-4 font-medium whitespace-nowrap">ID</th>
                <th className="px-4 py-3 md:px-6 md:py-4 font-medium whitespace-nowrap">Cliente</th>
                <th className="px-4 py-3 md:px-6 md:py-4 font-medium whitespace-nowrap">Problema Reportado</th>
                <th className="px-4 py-3 md:px-6 md:py-4 font-medium whitespace-nowrap">Estado</th>
                <th className="px-4 py-3 md:px-6 md:py-4 font-medium text-center whitespace-nowrap">Detalle</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-700">
              {ticketsFiltrados.length > 0 ? (
                ticketsFiltrados.map((ticket) => (
                  <tr key={ticket.id} className="transition-colors hover:bg-[#2a344a]/50">
                    <td className="px-4 py-3 md:px-6 md:py-4 font-bold text-blue-400 whitespace-nowrap">#{ticket.id}</td>
                    <td className="px-4 py-3 md:px-6 md:py-4 text-white font-medium whitespace-nowrap">{ticket.cliente}</td>
                    <td className="px-4 py-3 md:px-6 md:py-4 min-w-[200px]">{ticket.problema}</td>
                    <td className="px-4 py-3 md:px-6 md:py-4">{renderEstado(ticket.estado)}</td>
                    <td className="px-4 py-3 md:px-6 md:py-4 text-center">
                      <button 
                        onClick={() => navigate(`/ticket/${ticket.id}`)} 
                        className="inline-flex items-center justify-center gap-1.5 text-blue-400 hover:text-white font-medium transition-colors whitespace-nowrap"
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