import { useNavigate } from 'react-router-dom';
import redexcomLogo from '../assets/redexcom-logo.png';


export default function Dashboard() {
  const navigate = useNavigate(); // <-- Agrega esta línea
  // ... el resto de tu código
  return (

    <div className="flex h-screen bg-[#0b1325] text-white font-sans">

      

      {/* BARRA LATERAL (Sidebar) */}

      <aside className="w-64 flex flex-col border-r border-gray-800 bg-[#1c2438]">

        <div className="flex h-20 items-center justify-center border-b border-gray-800">

          <img src={redexcomLogo} alt="REDEXCOM" className="h-10 w-auto" />

        </div>

        

        <nav className="flex-1 space-y-2 p-4">

          <a href="#" className="block rounded-lg bg-[var(--color-redexcom-primary)] px-4 py-3 font-medium text-white shadow-md shadow-blue-900/20">

            Tickets Activos

          </a>

          <a href="#" className="block rounded-lg px-4 py-3 text-gray-400 transition-colors hover:bg-gray-800 hover:text-white">

            Historial de Casos

          </a>

          <a href="#" className="block rounded-lg px-4 py-3 text-gray-400 transition-colors hover:bg-gray-800 hover:text-white">

            Nodos / Redes

          </a>

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

          

          {/* Tarjetas de Estadísticas */}

          <div className="mb-8 grid grid-cols-1 gap-6 md:grid-cols-3">

            <div className="rounded-xl border border-gray-800 border-l-4 border-l-red-500 bg-[#1c2438] p-6 shadow-lg">

              <p className="text-sm font-medium uppercase tracking-wider text-gray-400">Pendientes (Urgente)</p>

              <h3 className="mt-2 text-3xl font-bold text-white">5</h3>

            </div>

            <div className="rounded-xl border border-gray-800 border-l-4 border-l-yellow-500 bg-[#1c2438] p-6 shadow-lg">

              <p className="text-sm font-medium uppercase tracking-wider text-gray-400">En Progreso</p>

              <h3 className="mt-2 text-3xl font-bold text-white">2</h3>

            </div>

            <div className="rounded-xl border border-gray-800 border-l-4 border-l-green-500 bg-[#1c2438] p-6 shadow-lg">

              <p className="text-sm font-medium uppercase tracking-wider text-gray-400">Resueltos Hoy</p>

              <h3 className="mt-2 text-3xl font-bold text-white">8</h3>

            </div>

          </div>



          {/* Tabla de Tickets Recientes */}

          <div className="rounded-xl border border-gray-800 bg-[#1c2438] shadow-lg">

            <div className="flex items-center justify-between border-b border-gray-800 px-6 py-4">

              <h3 className="text-lg font-semibold text-white">Tickets Asignados a ti</h3>

              <button  onClick={() => navigate('/nuevo-ticket')} className="rounded-lg bg-[var(--color-redexcom-primary)] px-4 py-2 text-sm font-bold text-white transition-colors hover:bg-blue-600">
               + Nuevo Ticket
              </button>

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

                  {/* Fila de ejemplo 1 */}

                  <tr className="transition-colors hover:bg-gray-800/50">

                    <td className="px-6 py-4 font-medium text-white">#1042</td>

                    <td className="px-6 py-4">Farmacia Central (Sede 2)</td>

                    <td className="px-6 py-4">Pérdida de paquetes en enlace dedicado</td>

                    <td className="px-6 py-4">

                      <span className="rounded-full bg-red-500/10 px-3 py-1 text-xs font-medium text-red-500 border border-red-500/20">

                        Pendiente

                      </span>

                    </td>

                    <td className="px-6 py-4">
                         {/* Le pongo el onClick para que salte al detalle del ticket específico */}
                     <button onClick={() => navigate('/ticket/1042')} 
                            className="text-[var(--color-redexcom-secondary)] hover:text-white transition-colors"
                             >
                             Abrir
                            </button>
                    </td>

                  </tr>

                  {/* Fila de ejemplo 2 */}

                  <tr className="transition-colors hover:bg-gray-800/50">

                    <td className="px-6 py-4 font-medium text-white">#1041</td>

                    <td className="px-6 py-4">Inversiones Los Andes</td>

                    <td className="px-6 py-4">Router sin respuesta a ping</td>

                    <td className="px-6 py-4">

                      <span className="rounded-full bg-yellow-500/10 px-3 py-1 text-xs font-medium text-yellow-500 border border-yellow-500/20">

                        En Progreso

                      </span>

                    </td>

                    <td className="px-6 py-4">

                      <button className="text-[var(--color-redexcom-secondary)] hover:text-white transition-colors">Abrir</button>

                    </td>

                  </tr>

                </tbody>

              </table>

            </div>

          </div>



        </div>

      </main>

    </div>

  );

}