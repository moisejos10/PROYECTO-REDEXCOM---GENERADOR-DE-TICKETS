// Sigo trayendo la herramienta de navegación
import { useNavigate } from 'react-router-dom';
import redexcomLogo from '../assets/redexcom-logo.png';

export default function Login() {
  const navigate = useNavigate();

  // Función para teletransportarnos al panel
  const handleLogin = () => {
    navigate('/dashboard');
  };

  return (
    // Contenedor principal a pantalla completa con el fondo azul noche
    <div className="flex min-h-screen items-center justify-center bg-[#0b1325] px-4 font-sans">
      
      {/*  Cambié 'max-w-md' por 'max-w-sm' para hacerlo más angosto y elegante. 
          También reduje el padding a 'p-6' para que los bordes abracen mejor el contenido */}
      <div className="w-full max-w-sm rounded-xl border-t-4 border-[var(--color-redexcom-primary)] bg-[#1c2438] p-6 shadow-2xl">
        
        {/* Logo y título: Los hice un poquitito más pequeños para que combinen con el nuevo tamaño del cuadro */}
        <div className="mb-6 flex flex-col items-center text-center">
          <img 
            src={redexcomLogo} 
            alt="CORPORACIÓN REDEXCOM" 
            className="mb-4 h-16 w-auto" 
          />
          <h1 className="text-lg font-semibold tracking-wide text-white">
            Portal de Soporte Técnico
          </h1>
          <p className="mt-1 text-xs text-gray-400">Acceso Interno</p>
        </div>

        {/* Formulario */}
        <form className="space-y-5">
          <div>
            <label className="mb-1.5 block text-sm font-medium text-gray-300">
              Correo Electrónico
            </label>
            {/* Los inputs ahora tienen un padding un poco más ajustado (py-2.5) */}
            <input 
              type="email" 
              placeholder="tecnico@redexcom.com"
              className="w-full rounded-lg border border-gray-600 bg-[#0b1325] px-4 py-2.5 text-white placeholder-gray-500 transition-colors focus:border-[var(--color-redexcom-secondary)] focus:outline-none focus:ring-1 focus:ring-[var(--color-redexcom-secondary)]"
            />
          </div>

          <div>
            <label className="mb-1.5 block text-sm font-medium text-gray-300">
              Contraseña
            </label>
            <input 
              type="password" 
              placeholder="••••••••"
              className="w-full rounded-lg border border-gray-600 bg-[#0b1325] px-4 py-2.5 text-white placeholder-gray-500 transition-colors focus:border-[var(--color-redexcom-secondary)] focus:outline-none focus:ring-1 focus:ring-[var(--color-redexcom-secondary)]"
            />
          </div>

          {/* Botón principal de acceso */}
          <button 
            type="button"
            onClick={handleLogin}
            className="mt-4 w-full rounded-lg bg-[var(--color-redexcom-primary)] px-4 py-2.5 font-bold text-white shadow-lg shadow-blue-900/30 transition-all hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-[var(--color-redexcom-secondary)]/50"
          >
            Ingresar al Sistema
          </button>

          {/* Línea divisoria súper sutil */}
          <div className="mt-5 flex items-center justify-center space-x-2">
            <span className="h-px w-full bg-gray-700"></span>
            <span className="text-xs text-gray-500">O</span>
            <span className="h-px w-full bg-gray-700"></span>
          </div>

          {/* El botón de Google */}
          <button 
            type="button"
            className="mt-5 flex w-full items-center justify-center gap-3 rounded-lg border border-gray-600 bg-[#1c2438] px-4 py-2.5 font-medium text-white transition-all hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-500"
          >
            <svg className="h-5 w-5" viewBox="0 0 24 24">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
            </svg>
            Continuar con Google
          </button>
        </form>

      </div>
    </div>
  );
}