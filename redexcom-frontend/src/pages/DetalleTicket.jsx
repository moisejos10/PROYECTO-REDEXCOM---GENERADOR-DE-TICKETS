// Me traigo las herramientas para navegar y sacar el ID de la URL
import { useNavigate, useParams } from 'react-router-dom';
import redexcomLogo from '../assets/redexcom-logo.png';

export default function DetalleTicket() {
  const navigate = useNavigate();
  const { id } = useParams(); 

  return (
    // Fondo oscuro a pantalla completa
    <div className="flex min-h-screen flex-col items-center bg-[#0b1325] px-4 py-8 font-sans">
      
      {/* Caja principal del detalle */}
      <div className="w-full max-w-4xl rounded-xl border-t-4 border-[var(--color-redexcom-secondary)] bg-[#1c2438] p-8 shadow-2xl">
        
        {/* Cabecera: AHORA CON FLECHA MINIMALISTA Y LOGO */}
        <div className="mb-8 flex items-center justify-between border-b border-gray-700/50 pb-6">
          
          {/* El nuevo botón de regresar: Le quité el texto, le puse un SVG de flecha y un fondo circular al hacer hover */}
          <button 
            onClick={() => navigate('/dashboard')} 
            title="Volver al Panel" // Esto hace que salga un textito si dejan el mouse quieto ahí
            className="flex h-10 w-10 items-center justify-center rounded-full text-gray-400 transition-all hover:bg-gray-700/50 hover:text-white"
          >
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
          </button>

          <img src={redexcomLogo} alt="REDEXCOM" className="h-8 w-auto opacity-80" />
        </div>

        {/* Título y estado del ticket */}
        <div className="mb-8 flex items-start justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-wide text-white">Ticket #{id}</h1>
            <p className="mt-2 text-sm text-gray-400">Abierto el 06 Mar 2026 - 14:30 hrs</p>
          </div>
          
          <div className="flex flex-col items-end gap-3">
            <span className="rounded-full border border-red-500/30 bg-red-500/10 px-4 py-1 text-xs font-semibold uppercase tracking-wide text-red-500">
              Urgencia Alta
            </span>
            <span className="rounded-full border border-yellow-500/30 bg-yellow-500/10 px-4 py-1 text-xs font-semibold uppercase tracking-wide text-yellow-500">
              En Progreso
            </span>
          </div>
        </div>

        {/* FICHA TÉCNICA DEL CLIENTE */}
        <div className="mb-8 rounded-xl border border-gray-700/50 bg-[#0b1325]/80 p-8 shadow-inner">
          <div className="flex flex-col gap-8">
            
            <div className="grid grid-cols-1 gap-6 md:grid-cols-3 md:gap-x-12">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-gray-500">Cliente</p>
                <p className="mt-2 text-base font-medium text-white">Inversiones Los Andes C.A.</p>
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-gray-500">Nodo / Conexión</p>
                <p className="mt-2 text-base font-medium text-white">Nodo Principal (Torre Central)</p>
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-gray-500">Contacto</p>
                <p className="mt-2 text-base font-medium text-white">0414-1234567</p>
              </div>
            </div>

            <div className="h-px w-full bg-gray-700/50"></div>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-3 md:gap-x-12">
              <div className="md:col-span-2">
                <p className="text-xs font-semibold uppercase tracking-wider text-gray-500">Dirección</p>
                <p className="mt-2 text-base font-medium leading-relaxed text-white">
                  Av. Principal, Edif. Centro, Piso 2, Oficina 2A
                </p>
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-gray-500">Técnico Asignado</p>
                <p className="mt-2 text-base font-bold text-[var(--color-redexcom-secondary)]">Moise Sanchez</p>
              </div>
            </div>

          </div>
        </div>

        {/* El problema reportado */}
        <div className="mb-8 rounded-xl border border-gray-700/50 bg-[#0b1325]/50 p-6">
          <h3 className="mb-3 text-sm font-semibold uppercase tracking-wider text-gray-500">Descripción de la falla</h3>
          <p className="text-justify leading-relaxed text-gray-200">
            El cliente reporta pérdida masiva de paquetes en el enlace dedicado. El router de borde no responde a ping de forma constante. Se verificó remotamente la antena y parece estar negociando a una velocidad muy baja. Requiere revisión del cableado o posible reemplazo del PoE.
          </p>
        </div>

        {/* Zona de trabajo del técnico */}
        <div className="border-t border-gray-700/50 pt-8">
          <h3 className="mb-4 text-lg font-semibold text-white">Actualizaciones Técnicas</h3>
          
          <textarea 
            rows="3"
            placeholder="Escribe aquí tu avance o diagnóstico..."
            className="mb-6 w-full rounded-lg border border-gray-600 bg-[#0b1325] px-4 py-3 text-white placeholder-gray-500 transition-colors focus:border-[var(--color-redexcom-secondary)] focus:outline-none focus:ring-1 focus:ring-[var(--color-redexcom-secondary)]"
          ></textarea>

          <div className="flex items-center justify-between">
            <select className="rounded-lg border border-gray-600 bg-[#0b1325] px-4 py-2.5 text-sm text-white outline-none focus:border-[var(--color-redexcom-primary)]">
              <option>Marcar como Resuelto</option>
              <option>Esperando respuesta del cliente</option>
              <option>Escalar a Nivel 2</option>
            </select>

            <button className="rounded-lg bg-[var(--color-redexcom-primary)] px-8 py-2.5 font-bold text-white shadow-lg shadow-blue-900/30 transition-all hover:bg-blue-600">
              Guardar Avance
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}