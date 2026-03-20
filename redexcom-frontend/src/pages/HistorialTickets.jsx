import { useState } from 'react';
import { Link } from 'react-router-dom';


export default function HistorialTickets() {
  // Simulador de usuario logueado (Cámbialo a 'tecnico' para ver la diferencia)
  const [rolActual, setRolActual] = useState('admin'); 
  const nombreUsuario = 'Moise Sanchez'; // Nombre del técnico logueado

  // Estados para los filtros
  const [filtroId, setFiltroId] = useState('');
  const [filtroTecnico, setFiltroTecnico] = useState('');

  // Base de datos simulada de tickets resueltos
  const ticketsResueltos = [
    { id: '1001', cliente: 'Farmacia San Juan', nodo: 'Nodo Norte', tecnico: 'Moise Sanchez', fechaCierre: '2026-03-15', problema: 'Sin conexión PTP' },
    { id: '1002', cliente: 'Inversiones Los Andes', nodo: 'Nodo Sur', tecnico: 'Carlos Mendoza', fechaCierre: '2026-03-16', problema: 'Router quemado' },
    { id: '1003', cliente: 'Panadería Central', nodo: 'Nodo Principal', tecnico: 'Moise Sanchez', fechaCierre: '2026-03-18', problema: 'Lentitud de servicio' },
    { id: '1004', cliente: 'Librería Escolar', nodo: 'Nodo Norte', tecnico: 'Luis Perez', fechaCierre: '2026-03-19', problema: 'Corte de fibra' },
  ];

  // Lógica de filtrado en tiempo real
  const ticketsFiltrados = ticketsResueltos.filter(ticket => {
    // 1. Filtro por Rol: Si es técnico, solo ve los suyos. Si es admin, ve todos.
    const pasaFiltroRol = rolActual === 'admin' || ticket.tecnico === nombreUsuario;
    
    // 2. Filtro por ID
    const pasaFiltroId = ticket.id.includes(filtroId);
    
    // 3. Filtro por Técnico (Solo aplica si el usuario es Admin y seleccionó un técnico)
    const pasaFiltroTecnico = filtroTecnico === '' || ticket.tecnico === filtroTecnico;

    return pasaFiltroRol && pasaFiltroId && pasaFiltroTecnico;
  });

  return (
    <div className="min-h-screen bg-[#0b1325] p-8 font-sans text-gray-200">
      
      {/* Controles temporales para probar los roles (Borraremos esto al conectar el Backend) */}
      <div className="mb-6 flex gap-4 rounded-lg bg-yellow-600/20 p-4 border border-yellow-600/50">
        <span className="text-yellow-500 font-bold">🛠️ Simulador de Rol:</span>
        <button 
          onClick={() => setRolActual('admin')}
          className={`px-3 py-1 rounded ${rolActual === 'admin' ? 'bg-yellow-500 text-black' : 'bg-gray-800'}`}
        >
          Ver como Admin
        </button>
        <button 
          onClick={() => setRolActual('tecnico')}
          className={`px-3 py-1 rounded ${rolActual === 'tecnico' ? 'bg-yellow-500 text-black' : 'bg-gray-800'}`}
        >
          Ver como Técnico (Moise)
        </button>
      </div>

      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-white">Historial de Tickets</h1>
          <p className="text-gray-400 mt-1">Registro de casos resueltos y cerrados</p>
        </div>
        <Link to="/dashboard" className="bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-lg transition-colors">
          Volver al Dashboard
        </Link>
      </div>

      {/* Barra de Filtros */}
      <div className="bg-[#1c2438] p-5 rounded-xl border border-gray-700 mb-8 grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label className="block text-sm text-gray-400 mb-1">Buscar por ID (#)</label>
          <input 
            type="text" 
            placeholder="Ej: 1001" 
            value={filtroId}
            onChange={(e) => setFiltroId(e.target.value)}
            className="w-full bg-[#0b1325] border border-gray-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-blue-500"
          />
        </div>

        {/* Este filtro solo se muestra si eres Administrador */}
        {rolActual === 'admin' && (
          <div>
            <label className="block text-sm text-gray-400 mb-1">Filtrar por Técnico</label>
            <select 
              value={filtroTecnico}
              onChange={(e) => setFiltroTecnico(e.target.value)}
              className="w-full bg-[#0b1325] border border-gray-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-blue-500"
            >
              <option value="">Todos los técnicos</option>
              <option value="Moise Sanchez">Moise Sanchez</option>
              <option value="Carlos Mendoza">Carlos Mendoza</option>
              <option value="Luis Perez">Luis Perez</option>
            </select>
          </div>
        )}
      </div>

      {/* Tabla de Historial */}
      <div className="bg-[#1c2438] rounded-xl border border-gray-700 overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-[#2a344a] text-gray-300">
            <tr>
              <th className="p-4 font-semibold">ID Ticket</th>
              <th className="p-4 font-semibold">Cliente</th>
              <th className="p-4 font-semibold">Problema Reportado</th>
              {rolActual === 'admin' && <th className="p-4 font-semibold">Técnico</th>}
              <th className="p-4 font-semibold">Fecha de Cierre</th>
              <th className="p-4 font-semibold">Estado</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-700">
            {ticketsFiltrados.length > 0 ? (
              ticketsFiltrados.map((ticket) => (
                <tr key={ticket.id} className="hover:bg-[#2a344a]/50 transition-colors">
                  <td className="p-4 font-bold text-blue-400">#{ticket.id}</td>
                  <td className="p-4 text-white">{ticket.cliente} <br/><span className="text-xs text-gray-500">{ticket.nodo}</span></td>
                  <td className="p-4 text-gray-300">{ticket.problema}</td>
                  {rolActual === 'admin' && <td className="p-4 text-gray-300">{ticket.tecnico}</td>}
                  <td className="p-4 text-gray-300">{ticket.fechaCierre}</td>
                  <td className="p-4">
                    <span className="bg-green-500/20 text-green-400 px-3 py-1 rounded-full text-xs font-bold border border-green-500/30">
                      Resuelto
                    </span>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="p-8 text-center text-gray-500">
                  No se encontraron tickets resueltos con esos filtros.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

    </div>
  );
}