import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import redexcomLogo from '../assets/redexcom-logo.png';
import { 
  IoTicketOutline, 
  IoTimeOutline, 
  IoPeopleOutline, 
  IoHardwareChipOutline, 
  IoLogOutOutline 
} from 'react-icons/io5';

export default function MainLayout() {
  const location = useLocation();
  const navigate = useNavigate();

  // Función para iluminar el botón del menú según la página donde estés
  const claseDelBoton = (ruta) => {
    return location.pathname.includes(ruta)
      ? "flex items-center gap-3 rounded-lg bg-[var(--color-redexcom-primary)] px-4 py-3 font-medium text-white shadow-md shadow-blue-900/20"
      : "flex items-center gap-3 rounded-lg px-4 py-3 text-gray-400 transition-colors hover:bg-gray-800 hover:text-white";
  };

  return (
    <div className="flex h-screen bg-[#0b1325] text-white font-sans">
      
      {/* BARRA LATERAL FIJA */}
      <aside className="w-64 flex flex-col border-r border-gray-800 bg-[#1c2438]">
        <div className="flex h-20 items-center justify-center border-b border-gray-800">
          <img src={redexcomLogo} alt="REDEXCOM" className="h-15 w-auto" />
        </div>
        
        <nav className="flex-1 space-y-2 p-4">
          <Link to="/dashboard" className={claseDelBoton('/dashboard')}>
            <IoTicketOutline className="text-xl" />
            <span>Tickets Activos</span>
          </Link>
          <Link to="/historial" className={claseDelBoton('/historial')}>
            <IoTimeOutline className="text-xl" />
            <span>Historial de Casos</span>
          </Link>
          <Link to="/usuarios" className={claseDelBoton('/usuarios')}>
            <IoPeopleOutline className="text-xl" />
            <span>Gestión de Usuarios</span>
          </Link>
          
        </nav>
        
        <div className="border-t border-gray-800 p-4">
          <button onClick={() => navigate('/login')} className="flex items-center gap-3 w-full py-2 text-sm text-gray-400 transition-colors hover:text-red-400 px-4">
            <IoLogOutOutline className="text-xl" />
            <span>Cerrar Sesión</span>
          </button>
        </div>
      </aside>

      {/* ÁREA PRINCIPAL DINÁMICA */}
      <main className="flex flex-1 flex-col overflow-hidden">
        
        {/* Barra Superior Fija */}
        <header className="flex h-20 items-center justify-between border-b border-gray-800 bg-[#1c2438] px-8">
          <h2 className="text-xl font-semibold tracking-wide text-gray-200">Portal de Gestión REDEXCOM</h2>
          <div className="flex items-center space-x-4">
            <span className="text-sm text-gray-400">Admin: <span className="font-medium text-white">Moise Sanchez</span></span>
            <div className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-yellow-500 bg-[#0b1325] font-bold text-yellow-500">
              MS
            </div>
          </div>
        </header>

        {/* CONTENIDO (Aquí entra Gestión de Usuarios automáticamente) */}
        <div className="flex-1 overflow-y-auto p-8">
          <Outlet />
        </div>

      </main>
    </div>
  );
}