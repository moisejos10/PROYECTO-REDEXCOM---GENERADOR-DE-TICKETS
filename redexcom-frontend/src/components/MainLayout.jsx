import { useState } from 'react';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import redexcomLogo from '../assets/redexcom-logo.png';
import { 
  IoTicketOutline, 
  IoTimeOutline, 
  IoPeopleOutline, 
  IoHardwareChipOutline, 
  IoLogOutOutline,
  IoMenuOutline, // Icono de hamburguesa
  IoCloseOutline // Icono de cerrar
} from 'react-icons/io5';

export default function MainLayout() {
  const location = useLocation();
  const navigate = useNavigate();
  
  // NUEVO: Estado para saber si el menú del teléfono está abierto o cerrado
  const [menuAbierto, setMenuAbierto] = useState(false);

  const claseDelBoton = (ruta) => {
    return location.pathname.includes(ruta)
      ? "flex items-center gap-3 rounded-lg bg-[var(--color-redexcom-primary)] px-4 py-3 font-medium text-white shadow-md shadow-blue-900/20"
      : "flex items-center gap-3 rounded-lg px-4 py-3 text-gray-400 transition-colors hover:bg-gray-800 hover:text-white";
  };

  // Función para cerrar el menú en móvil después de hacer clic en una opción
  const cerrarMenu = () => setMenuAbierto(false);

  return (
    <div className="flex h-screen bg-[#0b1325] text-white font-sans overflow-hidden">
      
      {/* 1. OVERLAY OSCURO (Solo aparece en móvil cuando el menú está abierto) */}
      {menuAbierto && (
        <div 
          className="fixed inset-0 bg-black/60 z-40 md:hidden backdrop-blur-sm transition-opacity"
          onClick={cerrarMenu}
        ></div>
      )}

      {/* 2. BARRA LATERAL INTELIGENTE */}
      {/* En móvil: Se esconde a la izquierda (-translate-x-full). En PC (md:): Se queda fija en su lugar */}
      <aside className={`fixed inset-y-0 left-0 z-50 w-64 flex flex-col border-r border-gray-800 bg-[#1c2438] transform transition-transform duration-300 ease-in-out md:relative md:translate-x-0 ${menuAbierto ? 'translate-x-0 shadow-2xl' : '-translate-x-full'}`}>
        
        <div className="flex h-20 items-center justify-between px-4 border-b border-gray-800 md:justify-center">
          <img src={redexcomLogo} alt="REDEXCOM" className="h-15 w-auto md:mx-auto" />
          {/* Botón X para cerrar (Solo visible en móvil) */}
          <button onClick={cerrarMenu} className="text-gray-400 hover:text-white md:hidden p-1">
            <IoCloseOutline className="text-3xl" />
          </button>
        </div>
        
        <nav className="flex-1 space-y-2 p-4 overflow-y-auto">
          <Link to="/dashboard" onClick={cerrarMenu} className={claseDelBoton('/dashboard')}>
            <IoTicketOutline className="text-xl shrink-0" />
            <span>Dashboard</span>
          </Link>
          <Link to="/historial" onClick={cerrarMenu} className={claseDelBoton('/historial')}>
            <IoTimeOutline className="text-xl shrink-0" />
            <span>Historial de Casos</span>
          </Link>
          <Link to="/usuarios" onClick={cerrarMenu} className={claseDelBoton('/usuarios')}>
            <IoPeopleOutline className="text-xl shrink-0" />
            <span>Gestión de Usuarios</span>
          </Link>
          <a href="#" onClick={cerrarMenu} className="flex items-center gap-3 rounded-lg px-4 py-3 text-gray-400 transition-colors hover:bg-gray-800 hover:text-white">
            <IoHardwareChipOutline className="text-xl shrink-0" />
            <span>Nodos / Redes</span>
          </a>
        </nav>
        
        <div className="border-t border-gray-800 p-4">
          <button onClick={() => navigate('/login')} className="flex items-center gap-3 w-full py-2 text-sm text-gray-400 transition-colors hover:text-red-400 px-4">
            <IoLogOutOutline className="text-xl shrink-0" />
            <span>Cerrar Sesión</span>
          </button>
        </div>
      </aside>

      {/* 3. ÁREA PRINCIPAL DINÁMICA */}
      <main className="flex flex-1 flex-col overflow-hidden w-full">
        
        {/* Barra Superior */}
        <header className="flex h-20 items-center justify-between border-b border-gray-800 bg-[#1c2438] px-4 md:px-8 shrink-0">
          
          <div className="flex items-center gap-3">
            {/* Botón Hamburguesa (Solo visible en móvil) */}
            <button 
              onClick={() => setMenuAbierto(true)}
              className="p-2 -ml-2 text-gray-400 hover:text-white md:hidden rounded-lg hover:bg-gray-800 transition-colors"
            >
              <IoMenuOutline className="text-2xl" />
            </button>
            
            {/* Título adaptable (Se hace corto en teléfonos pequeños) */}
            <h2 className="text-lg md:text-xl font-semibold tracking-wide text-gray-200 hidden sm:block">
              REDEXCOM | Centro de Operaciones (NOC)
            </h2>
            <h2 className="text-lg font-semibold tracking-wide text-gray-200 sm:hidden">
              REDEXCOM NOC
            </h2>
          </div>

          <div className="flex items-center space-x-3">
            <span className="text-sm text-gray-400 hidden sm:inline">Admin: <span className="font-medium text-white">Moise Sanchez</span></span>
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border-2 border-yellow-500 bg-[#0b1325] font-bold text-yellow-500">
              MS
            </div>
          </div>
        </header>

        {/* CONTENIDO (Ajustamos el padding 'p-4 md:p-8' para que no estorbe en móvil) */}
        <div className="flex-1 overflow-y-auto p-4 md:p-8">
          <Outlet />
        </div>

      </main>
    </div>
  );
}