import { useState } from 'react';

export default function HistorialTickets() {
  // Simulador de rol para pruebas
  const [rolActual, setRolActual] = useState('admin'); 
  const nombreUsuario = 'Moise Sanchez'; 

  const [filtroId, setFiltroId] = useState('');
  const [filtroTecnico, setFiltroTecnico] = useState('');

  const ticketsResueltos = [
    { id: '1001', cliente: 'Farmacia San Juan', nodo: 'Nodo Norte', tecnico: 'Moise Sanchez', fechaCierre: '2026-03-15', problema: 'Sin conexión PTP' },
    { id: '1002', cliente: 'Inversiones Los Andes', nodo: 'Nodo Sur', tecnico: 'Carlos Mendoza', fechaCierre: '2026-03-16', problema: 'Router quemado' },
    { id: '1003', cliente: 'Panadería Central', nodo: 'Nodo Principal', tecnico: 'Moise Sanchez', fechaCierre: '2026-03-18', problema: 'Lentitud de servicio' },
    { id: '1004', cliente: 'Librería Escolar', nodo: 'Nodo Norte', tecnico: 'Luis Perez', fechaCierre: '2026-03-19', problema: 'Corte de fibra' },
  ];

  const ticketsFiltrados = ticketsResueltos.filter(ticket => {
    const pasaFiltroRol = rolActual === 'admin' || ticket.tecnico === nombreUsuario;
    const pasaFiltroId = ticket.id.includes(filtroId);
    const pasaFiltroTecnico = filtroTecnico === '' || ticket.tecnico === filtroTecnico;
    return pasaFiltroRol && pasaFiltroId && pasaFiltroTecnico;
  });

  return (
    <div className="space-y-6">
      
      {/* Título de la Sección */}
      <div>
        <h2 className="text-2xl font-bold text-white">Historial de Casos</h2>
        <p className="text-gray-400 mt-1">Registro histórico de todos los tickets resueltos y cerrados.</p>
      </div>

      {/* Controles temporales para probar los roles (Opcional) */}
      <div className="flex gap-4 rounded-lg bg-yellow-600/10 p-4 border border-yellow-600/30">
        <span className="text-yellow-500 font-bold flex items-center">🛠️ Simulador de Rol:</span>
        <button onClick={() => setRolActual('admin')} className={`px-3 py-1 rounded text-sm transition-colors ${rolActual === 'admin' ? 'bg-yellow-500 text-black font-bold' : 'bg-gray-800 text-gray-400 hover:text-white'}`}>
          Vista Admin
        </button>
        <button onClick={() => setRolActual('tecnico')} className={`px-3 py-1 rounded text-sm transition-colors ${rolActual === 'tecnico' ? 'bg-yellow-500 text-black font-bold' : 'bg-gray-800 text-gray-400 hover:text-white'}`}>
          Vista Técnico
        </button>
      </div>

      {/* Barra de Filtros */}
      <div className="bg-[#1c2438] p-5 rounded-xl border border-gray-700 grid grid-cols-1 md:grid-cols-3 gap-4 shadow-lg">
        <div>
          <label className="block text-sm text-gray-400 mb-1">Buscar por ID (#)</label>
          <input 
            type="text" placeholder="Ej: 1001" 
            value={filtroId} onChange={(e) => setFiltroId(e.target.value)}
            className="w-full bg-[#0b1325] border border-gray-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-[var(--color-redexcom-primary)] transition-colors"
          />
        </div>

        {rolActual === 'admin' && (
          <div>
            <label className="block text-sm text-gray-400 mb-1">Filtrar por Técnico</label>
            <select 
              value={filtroTecnico} onChange={(e) => setFiltroTecnico(e.target.value)}
              className="w-full bg-[#0b1325] border border-gray-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-[var(--color-redexcom-primary)] transition-colors"
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
      <div className="bg-[#1c2438] rounded-xl border border-gray-700 overflow-hidden shadow-lg">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-gray-400">
            <thead className="bg-[#2a344a] text-gray-300 uppercase text-xs">
              <tr>
                <th className="px-6 py-4 font-semibold">ID Ticket</th>
                <th className="px-6 py-4 font-semibold">Cliente</th>
                <th className="px-6 py-4 font-semibold">Problema Reportado</th>
                {rolActual === 'admin' && <th className="px-6 py-4 font-semibold">Técnico</th>}
                <th className="px-6 py-4 font-semibold">Fecha de Cierre</th>
                <th className="px-6 py-4 font-semibold">Estado</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-700">
              {ticketsFiltrados.length > 0 ? (
                ticketsFiltrados.map((ticket) => (
                  <tr key={ticket.id} className="hover:bg-[#2a344a]/50 transition-colors">
                    <td className="px-6 py-4 font-bold text-blue-400">#{ticket.id}</td>
                    <td className="px-6 py-4 text-white">
                      {ticket.cliente} <br/>
                      <span className="text-xs text-gray-500 font-normal">{ticket.nodo}</span>
                    </td>
                    <td className="px-6 py-4">{ticket.problema}</td>
                    {rolActual === 'admin' && <td className="px-6 py-4">{ticket.tecnico}</td>}
                    <td className="px-6 py-4">{ticket.fechaCierre}</td>
                    <td className="px-6 py-4">
                      <span className="bg-green-500/10 text-green-400 px-3 py-1 rounded-full text-xs font-bold border border-green-500/20">
                        Resuelto
                      </span>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="px-6 py-8 text-center text-gray-500">
                    No se encontraron tickets resueltos con esos filtros.
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