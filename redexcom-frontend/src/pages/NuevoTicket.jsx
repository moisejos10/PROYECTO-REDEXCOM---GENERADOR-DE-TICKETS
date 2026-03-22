import { useState } from 'react';
import { useNavigate } from 'react-router-dom';


export default function NuevoTicket() {
  const navigate = useNavigate();
  
  // Interruptor para la notificación flotante
  const [mostrarAlerta, setMostrarAlerta] = useState(false);

  // ESTADO NUEVO: Aquí guardamos todo lo que se escribe en el formulario
  const [formData, setFormData] = useState({
    cliente: '',
    nodo: '',
    tecnico: '',
    urgencia: 'media',
    direccion: '',
    telefono: '',
    descripcion: ''
  });

  // Función que se ejecuta al darle al botón "Generar Ticket"
  const handleGenerarTicket = (e) => {
    e.preventDefault(); // Evita recargas indeseadas si apretamos Enter

    // Aquí podemos ver en la consola del navegador que los datos se están guardando bien
    console.log("Datos listos para enviar al backend:", formData);

    // 1. Encendemos el interruptor (mostramos el cartelito verde)
    setMostrarAlerta(true);

    // 2. Usamos setTimeout para esperar 2.5 segundos
    setTimeout(() => {
      // 3. Volvemos al panel automáticamente
      navigate('/dashboard');
    }, 2500); 
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-[#0b1325] px-4 py-8 font-sans relative">
      
      {/* ===== LA NOTIFICACIÓN FLOTANTE ===== */}
      {mostrarAlerta && (
        <div className="fixed right-6 top-6 z-50 flex items-center gap-4 rounded-xl border-l-4 border-green-500 bg-[#1c2438] p-4 shadow-2xl shadow-green-900/20 animate-bounce">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-500/20 text-green-500">
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <div>
            <p className="font-bold text-white">¡Ticket #1045 Generado!</p>
            <p className="text-sm text-gray-400">Notificación enviada al correo de Moise Sanchez</p>
          </div>
        </div>
      )}

      {/* ===== CAJA PRINCIPAL DEL FORMULARIO ===== */}
      <div className="w-full max-w-4xl rounded-xl border-t-4 border-[var(--color-redexcom-primary)] bg-[#1c2438] p-8 shadow-2xl">
        
        <div className="mb-8 flex items-center justify-between border-b border-gray-700 pb-4">
          <div>
            <h2 className="text-2xl font-bold text-white">Crear Nuevo Ticket</h2>
            <p className="mt-1 text-sm text-gray-400">Apertura de caso de soporte técnico</p>
          </div>
        
        </div>

        {/* Agregué el onSubmit aquí por buenas prácticas de React */}
        <form onSubmit={handleGenerarTicket} className="space-y-6">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-300">Nombre del Cliente</label>
              <input 
                type="text" 
                required
                value={formData.cliente}
                onChange={(e) => setFormData({...formData, cliente: e.target.value})}
                placeholder="Ej: Inversiones Los Andes C.A." 
                className="w-full rounded-lg border border-gray-600 bg-[#0b1325] px-4 py-3 text-white transition-colors focus:border-[var(--color-redexcom-secondary)] focus:outline-none focus:ring-1" 
              />
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-300">Nodo de Conexión</label>
              <select 
                required
                value={formData.nodo}
                onChange={(e) => setFormData({...formData, nodo: e.target.value})}
                className="w-full rounded-lg border border-gray-600 bg-[#0b1325] px-4 py-3 text-white transition-colors focus:border-[var(--color-redexcom-secondary)] focus:outline-none focus:ring-1"
              >
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
              <select 
                required
                value={formData.tecnico}
                onChange={(e) => setFormData({...formData, tecnico: e.target.value})}
                className="w-full rounded-lg border border-gray-600 bg-[#0b1325] px-4 py-3 text-white transition-colors focus:border-[var(--color-redexcom-secondary)] focus:outline-none focus:ring-1"
              >
                <option value="">Asignar a un técnico...</option>
                <option value="moise">Moise Sanchez</option>
                <option value="carlos">Carlos Mendoza</option>
              </select>
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-300">Nivel de Urgencia</label>
              <select 
                value={formData.urgencia}
                onChange={(e) => setFormData({...formData, urgencia: e.target.value})}
                className="w-full rounded-lg border border-gray-600 bg-[#0b1325] px-4 py-3 text-white transition-colors focus:border-[var(--color-redexcom-secondary)] focus:outline-none focus:ring-1"
              >
                <option value="alta">🔴 Alta (Caída total de servicio)</option>
                <option value="media">🟡 Media (Falla parcial / Intermitencia)</option>
                <option value="baja">🟢 Baja (Mantenimiento / Consulta)</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-300">Dirección Corta</label>
              <input 
                type="text" 
                value={formData.direccion}
                onChange={(e) => setFormData({...formData, direccion: e.target.value})}
                placeholder="Ej: Av. Principal, Edif. Centro, Piso 2" 
                className="w-full rounded-lg border border-gray-600 bg-[#0b1325] px-4 py-3 text-white transition-colors focus:border-[var(--color-redexcom-secondary)] focus:outline-none focus:ring-1" 
              />
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-300">Número de Contacto</label>
              <input 
                type="tel" 
                required
                value={formData.telefono}
                onChange={(e) => setFormData({...formData, telefono: e.target.value})}
                placeholder="Ej: 0414-1234567" 
                className="w-full rounded-lg border border-gray-600 bg-[#0b1325] px-4 py-3 text-white transition-colors focus:border-[var(--color-redexcom-secondary)] focus:outline-none focus:ring-1" 
              />
            </div>
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-gray-300">Descripción de la Falla</label>
            <textarea 
              rows="3" 
              required
              value={formData.descripcion}
              onChange={(e) => setFormData({...formData, descripcion: e.target.value})}
              placeholder="Detalla el problema que reporta el cliente..." 
              className="w-full rounded-lg border border-gray-600 bg-[#0b1325] px-4 py-3 text-white transition-colors focus:border-[var(--color-redexcom-secondary)] focus:outline-none focus:ring-1"
            ></textarea>
          </div>

          <div className="mt-8 flex items-center justify-end space-x-4 border-t border-gray-700 pt-6">
            <button 
              type="button"
              onClick={() => navigate('/dashboard')}
              className="rounded-lg px-6 py-2.5 font-medium text-gray-400 transition-colors hover:bg-gray-800 hover:text-white"
            >
              Cancelar
            </button>
            
            {/* Cambié el type a "submit" para que valide los campos obligatorios antes de ejecutar la función */}
            <button 
              type="submit"
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