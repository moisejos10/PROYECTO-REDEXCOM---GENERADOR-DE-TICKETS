import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import redexcomLogo from '../assets/redexcom-logo.png';

export default function Dashboard() {
  const navigate = useNavigate();

  // 1. Estado de los tickets (simulando lo que luego vendrá de tu base de datos con Node.js)
  const [tickets] = useState([
    { id: 1042, cliente: 'Farmacia Central (Sede 2)', problema: 'Pérdida de paquetes en enlace dedicado', estado: 'Pendiente' },
    { id: 1041, cliente: 'Inversiones Los Andes', problema: 'Router sin respuesta a ping', estado: 'En Progreso' },
  ]);

  // 2. Estado para la barra de búsqueda
  const [terminoBusqueda, setTerminoBusqueda] = useState('');

  // 3. Lógica de filtrado en tiempo real
  const ticketsFiltrados = tickets.filter((ticket) => {
    const busqueda = terminoBusqueda.toLowerCase();
    return (
      ticket.cliente.toLowerCase().includes(busqueda) ||
      ticket.problema.toLowerCase().includes(busqueda) ||
      ticket.id.toString().includes(busqueda)
    );
  });

  // Función para renderizar los colores de los estados
  const renderEstado = (estado) => {
    if (estado === 'Pendiente') {
      return <span className="rounded-full bg-red-500/10 px-3 py-1 text-xs font-medium text-red-500 border border-red-500/20">{estado}</span>;
    }
    if (estado === 'En Progreso') {
      return <span className="rounded-full bg-yellow-500/10 px-3 py-1 text-xs font-medium text-yellow-500 border border-yellow-500/20">{estado}</span>;
    }
    return <span className="rounded-full bg-green-500/10 px-3 py-1 text-xs font-medium text-green-500 border border-green-500/20">{estado}</span>;
  };

  return (
    <div className="flex h-screen bg-[#0b1325] text-white font-sans">
      
      {/* BARRA LATERAL (Sidebar) */}
      <aside className="w-64 flex flex-col border-r border-gray-800 bg-[#1c2438]">
        <div className="flex h-20 items-center justify-center border-b border-gray-800">
          <img src={redexcomLogo} alt="REDEXCOM" className="h-10 w-auto" />
        </div>
        
        <nav className="flex-1 space-y-2 p-4">
          <Link to="/dashboard" className="block rounded-lg bg-[var(--color-redexcom-primary)] px-4 py-3 font-medium text-white shadow-md shadow-blue-900/20">
            Tickets Activos
          </Link>
          {/* Aquí conectamos el historial usando la nueva ruta */}
          <Link to="/historial" className="block rounded-lg px-4 py-3 text-gray-400 transition-colors hover:bg-gray-800 hover:text-white">
            Historial de Casos
          </Link>
          <Link to="/usuarios" className="block rounded-lg px-4 py-3 text-gray-400 transition-colors hover:bg-gray-800 hover:text-white">
            Gestión de Usuarios
          </Link>
          
        </nav>
        
        <div className="border-t border-gray-800 p-4">
          <button className="w-full py-2 text-sm text-gray-400 transition-colors hover:text-red-400">
            Cerrar Sesión
          </button>
        </div>
      </aside>

      {/* ÁREA PRINCIPAL */}
      <main className="flex flex-1 flex-col overflow-hidden">
        
        {/* Barra Superior */}
        <header className="flex h-20 items-center justify-between border-b border-gray-800 bg-[#1c2438] px-8">
          <h2 className="text-xl font-semibold tracking-wide text-gray-200">Panel de Control de Tickets</h2>
          <div className="flex items-center space-x-4">
            <span className="text-sm text-gray-400">Técnico: <span className="font-medium text-white">Moise Sanchez</span></span>
            <div className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-[var(--color-redexcom-secondary)] bg-[#0b1325] font-bold text-[var(--color-redexcom-secondary)]">
              MS
            </div>
          </div>
        </header>

        {/* Zona de Trabajo (Contenido y Tabla) */}
        <div className="flex-1 overflow-y-auto p-8">
          
          {/* Tarjetas de Estadísticas (Ahora son dinámicas) */}
          <div className="mb-8 grid grid-cols-1 gap-6 md:grid-cols-3">
            <div className="rounded-xl border border-gray-800 border-l-4 border-l-red-500 bg-[#1c2438] p-6 shadow-lg">
              <p className="text-sm font-medium uppercase tracking-wider text-gray-400">Tickets Pendientes </p>
              <h3 className="mt-2 text-3xl font-bold text-white">{tickets.filter(t => t.estado === 'Pendiente').length}</h3>
            </div>
            <div className="rounded-xl border border-gray-800 border-l-4 border-l-yellow-500 bg-[#1c2438] p-6 shadow-lg">
              <p className="text-sm font-medium uppercase tracking-wider text-gray-400">tickets en Progreso</p>
              <h3 className="mt-2 text-3xl font-bold text-white">{tickets.filter(t => t.estado === 'En Progreso').length}</h3>
            </div>
            <div className="rounded-xl border border-gray-800 border-l-4 border-l-green-500 bg-[#1c2438] p-6 shadow-lg">
              <p className="text-sm font-medium uppercase tracking-wider text-gray-400">Tickets Resueltos</p>
              <h3 className="mt-2 text-3xl font-bold text-white">8</h3> {/* Este lo dejaremos fijo por ahora */}
            </div>
          </div>

          {/* Tabla de Tickets Recientes */}
          <div className="rounded-xl border border-gray-800 bg-[#1c2438] shadow-lg">
            
            {/* Cabecera con Búsqueda y Botón */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between border-b border-gray-800 px-6 py-4 space-y-4 sm:space-y-0">
              <h3 className="text-lg font-semibold text-white">Tickets Asignados a ti</h3>
              
              <div className="flex items-center w-full sm:w-auto space-x-4">
                {/* Barra de Búsqueda */}
                <div className="relative w-full sm:w-64">
                  <input
                    type="text"
                    placeholder="Buscar cliente, ID o falla..."
                    value={terminoBusqueda}
                    onChange={(e) => setTerminoBusqueda(e.target.value)}
                    className="w-full rounded-lg border border-gray-700 bg-[#0b1325] px-4 py-2 text-sm text-white placeholder-gray-500 focus:border-[var(--color-redexcom-primary)] focus:outline-none focus:ring-1 focus:ring-[var(--color-redexcom-primary)]"
                  />
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                    <svg className="h-4 w-4 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  </div>
                </div>

                {/* Botón Nuevo Ticket (con navegación correcta) */}
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
                <thead className="bg-[#0b1325] text-xs uppercase text-gray-500">
                  <tr>
                    <th className="px-6 py-4 font-medium">ID</th>
                    <th className="px-6 py-4 font-medium">Cliente</th>
                    <th className="px-6 py-4 font-medium">Problema Reportado</th>
                    <th className="px-6 py-4 font-medium">Estado</th>
                    <th className="px-6 py-4 font-medium">Acción</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-800">
                  
                  {/* .MAP PARA GENERAR LAS FILAS DINÁMICAMENTE */}
                  {ticketsFiltrados.length > 0 ? (
                    ticketsFiltrados.map((ticket) => (
                      <tr key={ticket.id} className="transition-colors hover:bg-gray-800/50">
                        <td className="px-6 py-4 font-medium text-white">#{ticket.id}</td>
                        <td className="px-6 py-4">{ticket.cliente}</td>
                        <td className="px-6 py-4">{ticket.problema}</td>
                        <td className="px-6 py-4">
                          {renderEstado(ticket.estado)}
                        </td>
                        <td className="px-6 py-4">
                          {/* El botón ahora navega usando el ID dinámico del ticket */}
                          <button 
                            onClick={() => navigate(`/ticket/${ticket.id}`)} 
                            className="text-[var(--color-redexcom-secondary)] hover:text-white transition-colors"
                          >
                            Abrir
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="5" className="px-6 py-8 text-center text-gray-500">
                        No se encontraron tickets.
                      </td>
                    </tr>
                  )}

                </tbody>
              </table>
            </div>
          </div>

        </div>
      </main>
    </div>
  );
}