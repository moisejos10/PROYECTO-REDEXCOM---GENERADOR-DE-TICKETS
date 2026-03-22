import { useNavigate, useParams } from 'react-router-dom';
import { IoArrowBack } from 'react-icons/io5'; // Importamos la flecha de la misma librería que usamos en el menú

export default function DetalleTicket() {
  const navigate = useNavigate();
  const { id } = useParams(); 

  return (
    <div className="mx-auto max-w-5xl space-y-6">
      
      {/* Botón de volver (Minimalista y fuera del cuadro principal) */}
      <button 
        onClick={() => navigate('/dashboard')} 
        className="flex items-center gap-2 text-gray-400 transition-colors hover:text-white w-fit"
      >
        <IoArrowBack className="text-xl" />
        <span className="font-medium">Volver al Dashboard</span>
      </button>

      {/* Caja principal del detalle */}
      <div className="rounded-xl border-t-4 border-[var(--color-redexcom-secondary)] bg-[#1c2438] p-5 md:p-8 shadow-2xl">
        
        {/* Título y estado del ticket (Responsivo: apilado en móvil, en línea en PC) */}
        <div className="mb-8 flex flex-col md:flex-row md:items-start justify-between gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold tracking-wide text-white">Ticket #{id}</h1>
            <p className="mt-2 text-sm text-gray-400">Abierto el 06 Mar 2026 - 14:30 hrs</p>
          </div>
          
          <div className="flex flex-wrap md:flex-col items-center md:items-end gap-2">
            <span className="rounded-full border border-red-500/30 bg-red-500/10 px-3 md:px-4 py-1 text-xs font-semibold uppercase tracking-wide text-red-500 whitespace-nowrap">
              Urgencia Alta
            </span>
            <span className="rounded-full border border-yellow-500/30 bg-yellow-500/10 px-3 md:px-4 py-1 text-xs font-semibold uppercase tracking-wide text-yellow-500 whitespace-nowrap">
              En Progreso
            </span>
          </div>
        </div>

        {/* FICHA TÉCNICA DEL CLIENTE */}
        <div className="mb-8 rounded-xl border border-gray-700/50 bg-[#0b1325]/80 p-5 md:p-8 shadow-inner">
          <div className="flex flex-col gap-6 md:gap-8">
            
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 md:gap-x-12">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-gray-500">Cliente</p>
                <p className="mt-1 md:mt-2 text-sm md:text-base font-medium text-white">Inversiones Los Andes C.A.</p>
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-gray-500">Nodo / Conexión</p>
                <p className="mt-1 md:mt-2 text-sm md:text-base font-medium text-white">Nodo Principal (Torre Central)</p>
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-gray-500">Contacto</p>
                <p className="mt-1 md:mt-2 text-sm md:text-base font-medium text-white">0414-1234567</p>
              </div>
            </div>

            <div className="h-px w-full bg-gray-700/50"></div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 md:gap-x-12">
              <div className="md:col-span-2">
                <p className="text-xs font-semibold uppercase tracking-wider text-gray-500">Dirección</p>
                <p className="mt-1 md:mt-2 text-sm md:text-base font-medium leading-relaxed text-white">
                  Av. Principal, Edif. Centro, Piso 2, Oficina 2A
                </p>
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-gray-500">Técnico Asignado</p>
                <p className="mt-1 md:mt-2 text-sm md:text-base font-bold text-[var(--color-redexcom-secondary)]">Moise Sanchez</p>
              </div>
            </div>

          </div>
        </div>

        {/* El problema reportado */}
        <div className="mb-8 rounded-xl border border-gray-700/50 bg-[#0b1325]/50 p-5 md:p-6">
          <h3 className="mb-3 text-sm font-semibold uppercase tracking-wider text-gray-500">Descripción de la falla</h3>
          <p className="text-justify text-sm md:text-base leading-relaxed text-gray-200">
            El cliente reporta pérdida masiva de paquetes en el enlace dedicado. El router de borde no responde a ping de forma constante. Se verificó remotamente la antena y parece estar negociando a una velocidad muy baja. Requiere revisión del cableado o posible reemplazo del PoE.
          </p>
        </div>

        {/* Zona de trabajo del técnico */}
        <div className="border-t border-gray-700/50 pt-6 md:pt-8">
          <h3 className="mb-4 text-base md:text-lg font-semibold text-white">Actualizaciones Técnicas</h3>
          
          <textarea 
            rows="3"
            placeholder="Escribe aquí tu avance o diagnóstico..."
            className="mb-4 md:mb-6 w-full rounded-lg border border-gray-600 bg-[#0b1325] px-4 py-3 text-sm md:text-base text-white placeholder-gray-500 transition-colors focus:border-[var(--color-redexcom-secondary)] focus:outline-none focus:ring-1 focus:ring-[var(--color-redexcom-secondary)]"
          ></textarea>

          {/* Botones de acción (Responsivos: apilados en móvil, en línea en PC) */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
            <select className="w-full sm:w-auto rounded-lg border border-gray-600 bg-[#0b1325] px-4 py-2.5 text-sm text-white outline-none focus:border-[var(--color-redexcom-primary)]">
              <option>Marcar como Resuelto</option>
              <option>Esperando respuesta del cliente</option>
              <option>Escalar a Nivel 2</option>
            </select>

            <button className="w-full sm:w-auto whitespace-nowrap rounded-lg bg-[var(--color-redexcom-primary)] px-8 py-2.5 font-bold text-white shadow-lg shadow-blue-900/30 transition-all hover:bg-blue-600">
              Guardar Avance
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}