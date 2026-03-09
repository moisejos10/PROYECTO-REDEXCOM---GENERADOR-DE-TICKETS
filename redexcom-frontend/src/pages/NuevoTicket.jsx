// Me traigo 'useState' que es la memoria de React, y 'useNavigate' para el salto de página
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import redexcomLogo from '../assets/redexcom-logo.png';

export default function NuevoTicket() {
  const navigate = useNavigate();
  
  // AQUÍ ESTÁ EL TRUCO: Creamos un interruptor apagado (false) para la notificación
  const [mostrarAlerta, setMostrarAlerta] = useState(false);

  // Esta función es la que hace la magia cuando le damos a "Generar Ticket"
  const handleGenerarTicket = () => {
    // 1. Encendemos el interruptor (mostramos el cartelito verde)
    setMostrarAlerta(true);

    // 2. Usamos setTimeout para decirle a React: "Espera 2.5 segundos para que el cliente lo lea..."
    setTimeout(() => {
      // 3. Y después del tiempo, ¡pum! Nos vamos al panel automáticamente
      navigate('/dashboard');
    }, 2500); // 2500 milisegundos = 2.5 segundos
  };

  return (
    // Puse 'relative' aquí por si necesitamos posicionar cosas absolutas
    <div className="flex min-h-screen flex-col items-center justify-center bg-[#0b1325] px-4 py-8 font-sans relative">
      
      {/* ===== LA NOTIFICACIÓN FLOTANTE (ESTILO PROFESIONAL) ===== */}
      {/* Si mostrarAlerta es true, React dibuja esto en pantalla. Le puse una animación para que entre bonito */}
      {mostrarAlerta && (
        <div className="fixed right-6 top-6 z-50 flex items-center gap-4 rounded-xl border-l-4 border-green-500 bg-[#1c2438] p-4 shadow-2xl shadow-green-900/20 animate-bounce">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-500/20 text-green-500">
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <div>
            <p className="font-bold text-white">¡Ticket #1045 Generado!</p>
            {/* Aquí metemos tu nombre para que tu amigo vea que el sistema ya reconoce a los técnicos */}
            <p className="text-sm text-gray-400">Notificación enviada al correo de Moise Sanchez</p>
          </div>
        </div>
      )}
      {/* ========================================================= */}

      {/* La caja principal del formulario (Igual a la que ya teníamos, solo cambiamos el botón final) */}
      <div className="w-full max-w-4xl rounded-xl border-t-4 border-[var(--color-redexcom-primary)] bg-[#1c2438] p-8 shadow-2xl">
        
        <div className="mb-8 flex items-center justify-between border-b border-gray-700 pb-4">
          <div>
            <h2 className="text-2xl font-bold text-white">Crear Nuevo Ticket</h2>
            <p className="mt-1 text-sm text-gray-400">Apertura de caso de soporte técnico</p>
          </div>
          <img src={redexcomLogo} alt="REDEXCOM" className="h-10 w-auto opacity-80" />
        </div>

        <form className="space-y-6">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-300">Nombre del Cliente</label>
              <input type="text" placeholder="Ej: Inversiones Los Andes C.A." className="w-full rounded-lg border border-gray-600 bg-[#0b1325] px-4 py-3 text-white transition-colors focus:border-[var(--color-redexcom-secondary)] focus:outline-none focus:ring-1" />
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-300">Nodo de Conexión</label>
              <select className="w-full rounded-lg border border-gray-600 bg-[#0b1325] px-4 py-3 text-white transition-colors focus:border-[var(--color-redexcom-secondary)] focus:outline-none focus:ring-1">
                <option value="">Seleccione el nodo...</option>
                <option value="nodo_principal">Nodo Principal (Torre Central)</option>
                <option value="nodo_norte">Nodo Norte (Cerro Verde)</option>
                <option value="nodo_sur">Nodo Sur (Zona Industrial)</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-300">Técnico Asignado</label>
              <select className="w-full rounded-lg border border-gray-600 bg-[#0b1325] px-4 py-3 text-white transition-colors focus:border-[var(--color-redexcom-secondary)] focus:outline-none focus:ring-1">
                <option value="">Asignar a un técnico...</option>
                <option value="moise">Moise Sanchez</option>
                <option value="carlos">Carlos Mendoza</option>
              </select>
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-300">Nivel de Urgencia</label>
              <select className="w-full rounded-lg border border-gray-600 bg-[#0b1325] px-4 py-3 text-white transition-colors focus:border-[var(--color-redexcom-secondary)] focus:outline-none focus:ring-1">
                <option value="alta">🔴 Alta (Caída total de servicio)</option>
                <option value="media">🟡 Media (Falla parcial / Intermitencia)</option>
                <option value="baja">🟢 Baja (Mantenimiento / Consulta)</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-300">Dirección Corta</label>
              <input type="text" placeholder="Ej: Av. Principal, Edif. Centro, Piso 2" className="w-full rounded-lg border border-gray-600 bg-[#0b1325] px-4 py-3 text-white transition-colors focus:border-[var(--color-redexcom-secondary)] focus:outline-none focus:ring-1" />
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-300">Número de Contacto</label>
              <input type="tel" placeholder="Ej: 0414-1234567" className="w-full rounded-lg border border-gray-600 bg-[#0b1325] px-4 py-3 text-white transition-colors focus:border-[var(--color-redexcom-secondary)] focus:outline-none focus:ring-1" />
            </div>
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-gray-300">Descripción de la Falla</label>
            <textarea rows="3" placeholder="Detalla el problema que reporta el cliente..." className="w-full rounded-lg border border-gray-600 bg-[#0b1325] px-4 py-3 text-white transition-colors focus:border-[var(--color-redexcom-secondary)] focus:outline-none focus:ring-1"></textarea>
          </div>

          <div className="mt-8 flex items-center justify-end space-x-4 border-t border-gray-700 pt-6">
            <button 
              type="button"
              onClick={() => navigate('/dashboard')}
              className="rounded-lg px-6 py-2.5 font-medium text-gray-400 transition-colors hover:bg-gray-800 hover:text-white"
            >
              Cancelar
            </button>
            
            {/* AQUÍ CONECTAMOS EL BOTÓN CON NUESTRA FUNCIÓN MÁGICA */}
            <button 
              type="button"
              onClick={handleGenerarTicket}
              className="rounded-lg bg-[var(--color-redexcom-primary)] px-8 py-2.5 font-bold text-white shadow-lg shadow-blue-900/30 transition-all hover:bg-blue-600 flex items-center gap-2"
            >
              Generar Ticket 🚀
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}