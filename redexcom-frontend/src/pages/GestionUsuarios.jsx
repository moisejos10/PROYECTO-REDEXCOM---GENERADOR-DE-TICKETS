import { useState } from 'react';
import { Link } from 'react-router-dom';
import redexcomLogo from '../assets/redexcom-logo.png';
// Importamos todos los iconos de Ionicons que le darán vida a la interfaz
import { 
  IoPersonAddOutline, 
  IoPencil, 
  IoTrashOutline, 
  IoSaveOutline, 
  IoCloseOutline,
  IoTicketOutline,
  IoTimeOutline,
  IoPeopleOutline,
  IoHardwareChipOutline,
  IoLogOutOutline
} from 'react-icons/io5';

export default function GestionUsuarios() {
  // 1. Estado para simular la Base de Datos
  const [usuarios, setUsuarios] = useState([
    { id: 1, nombre: 'Moise Sanchez', correo: 'moise@redexcom.com', rol: 'Administrador', estado: 'Activo' },
    { id: 2, nombre: 'Carlos Mendoza', correo: 'cmendoza@redexcom.com', rol: 'Técnico', estado: 'Activo' },
    { id: 3, nombre: 'Luis Perez', correo: 'lperez@redexcom.com', rol: 'Técnico', estado: 'Inactivo' },
  ]);

  // 2. Estados para el formulario
  const [nombre, setNombre] = useState('');
  const [correo, setCorreo] = useState('');
  const [rol, setRol] = useState('Técnico');
  const [password, setPassword] = useState('');

  // 3. Estados para controlar si estamos "Creando" o "Editando"
  const [modoEdicion, setModoEdicion] = useState(false);
  const [idEdicion, setIdEdicion] = useState(null);

  // 4. LÓGICA: Crear o Guardar Edición
  const manejarEnvio = (e) => {
    e.preventDefault();
    
    if (modoEdicion) {
      const usuariosActualizados = usuarios.map(user => 
        user.id === idEdicion ? { ...user, nombre, correo, rol } : user
      );
      setUsuarios(usuariosActualizados);
      alert('✅ Usuario actualizado correctamente');
    } else {
      const nuevoUsuario = {
        id: usuarios.length > 0 ? Math.max(...usuarios.map(u => u.id)) + 1 : 1,
        nombre,
        correo,
        rol,
        estado: 'Activo'
      };
      setUsuarios([...usuarios, nuevoUsuario]);
      alert('✅ Usuario creado exitosamente en el sistema');
    }
    
    limpiarFormulario();
  };

  // 5. LÓGICA: Preparar el formulario para Editar
  const cargarUsuarioParaEditar = (usuario) => {
    setNombre(usuario.nombre);
    setCorreo(usuario.correo);
    setRol(usuario.rol);
    setPassword(''); 
    setModoEdicion(true);
    setIdEdicion(usuario.id);
  };

  // 6. LÓGICA: Borrar Usuario
  const eliminarUsuario = (id) => {
    const confirmar = window.confirm("⚠️ ¿Estás seguro de que deseas eliminar este usuario del sistema?");
    if (confirmar) {
      const usuariosFiltrados = usuarios.filter(user => user.id !== id);
      setUsuarios(usuariosFiltrados);
    }
  };

  // 7. LÓGICA: Limpiar el formulario
  const limpiarFormulario = () => {
    setNombre('');
    setCorreo('');
    setRol('Técnico');
    setPassword('');
    setModoEdicion(false);
    setIdEdicion(null);
  };

  return (
    <div className="flex h-screen bg-[#0b1325] text-white font-sans">
      
      {/* BARRA LATERAL (Sidebar) CON ICONOS */}
      <aside className="w-64 flex flex-col border-r border-gray-800 bg-[#1c2438]">
        <div className="flex h-20 items-center justify-center border-b border-gray-800">
          <img src={redexcomLogo} alt="REDEXCOM" className="h-10 w-auto" />
        </div>
        
        <nav className="flex-1 space-y-2 p-4">
          <Link to="/dashboard" className="flex items-center gap-3 rounded-lg px-4 py-3 text-gray-400 transition-colors hover:bg-gray-800 hover:text-white">
            <IoTicketOutline className="text-xl" />
            <span>Tickets Activos</span>
          </Link>
          <Link to="/historial" className="flex items-center gap-3 rounded-lg px-4 py-3 text-gray-400 transition-colors hover:bg-gray-800 hover:text-white">
            <IoTimeOutline className="text-xl" />
            <span>Historial de Casos</span>
          </Link>
          <Link to="/usuarios" className="flex items-center gap-3 rounded-lg bg-[var(--color-redexcom-primary)] px-4 py-3 font-medium text-white shadow-md shadow-blue-900/20">
            <IoPeopleOutline className="text-xl" />
            <span>Gestión de Usuarios</span>
          </Link>
          <a href="#" className="flex items-center gap-3 rounded-lg px-4 py-3 text-gray-400 transition-colors hover:bg-gray-800 hover:text-white">
            <IoHardwareChipOutline className="text-xl" />
            <span>Nodos / Redes</span>
          </a>
        </nav>
        
        <div className="border-t border-gray-800 p-4">
          <button className="flex items-center gap-3 w-full py-2 text-sm text-gray-400 transition-colors hover:text-red-400 px-4">
            <IoLogOutOutline className="text-xl" />
            <span>Cerrar Sesión</span>
          </button>
        </div>
      </aside>

      {/* ÁREA PRINCIPAL */}
      <main className="flex flex-1 flex-col overflow-hidden">
        
        {/* Barra Superior */}
        <header className="flex h-20 items-center justify-between border-b border-gray-800 bg-[#1c2438] px-8">
          <h2 className="text-xl font-semibold tracking-wide text-gray-200">Administración de Personal</h2>
          <div className="flex items-center space-x-4">
            <span className="text-sm text-gray-400">Admin: <span className="font-medium text-white">Moise Sanchez</span></span>
            <div className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-yellow-500 bg-[#0b1325] font-bold text-yellow-500">
              MS
            </div>
          </div>
        </header>

        {/* Zona de Trabajo */}
        <div className="flex-1 overflow-y-auto p-8">
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* Formulario Inteligente (Izquierda) */}
            <div className="lg:col-span-1">
              <div className="bg-[#1c2438] rounded-xl border border-gray-700 p-6 shadow-lg">
                <h3 className="flex items-center gap-2 text-lg font-bold mb-4 text-white border-b border-gray-700 pb-2">
                  {modoEdicion ? <><IoPencil className="text-yellow-500" /> Editar Usuario</> : <><IoPersonAddOutline className="text-[var(--color-redexcom-primary)]" /> Registrar Nuevo Usuario</>}
                </h3>
                
                <form onSubmit={manejarEnvio} className="space-y-4">
                  <div>
                    <label className="block text-sm text-gray-400 mb-1">Nombre Completo</label>
                    <input 
                      type="text" required
                      value={nombre} onChange={(e) => setNombre(e.target.value)}
                      className="w-full bg-[#0b1325] border border-gray-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-[var(--color-redexcom-primary)]"
                    />
                  </div>

                  <div>
                    <label className="block text-sm text-gray-400 mb-1">Correo Electrónico</label>
                    <input 
                      type="email" required
                      value={correo} onChange={(e) => setCorreo(e.target.value)}
                      className="w-full bg-[#0b1325] border border-gray-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-[var(--color-redexcom-primary)]"
                    />
                  </div>

                  <div>
                    <label className="block text-sm text-gray-400 mb-1">
                      {modoEdicion ? 'Nueva Contraseña (Opcional)' : 'Contraseña de Acceso'}
                    </label>
                    <input 
                      type="password" required={!modoEdicion}
                      value={password} onChange={(e) => setPassword(e.target.value)}
                      className="w-full bg-[#0b1325] border border-gray-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-[var(--color-redexcom-primary)]"
                      placeholder="••••••••"
                    />
                  </div>

                  <div>
                    <label className="block text-sm text-gray-400 mb-1">Rol en el Sistema</label>
                    <select 
                      value={rol} onChange={(e) => setRol(e.target.value)}
                      className="w-full bg-[#0b1325] border border-gray-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-[var(--color-redexcom-primary)]"
                    >
                      <option value="Técnico">Técnico de Terreno</option>
                      <option value="Administrador">Administrador</option>
                    </select>
                  </div>

                  <div className="flex flex-col gap-2 mt-4">
                    <button 
                      type="submit" 
                      className={`flex items-center justify-center gap-2 w-full font-bold py-2 px-4 rounded-lg transition-colors ${modoEdicion ? 'bg-yellow-600 hover:bg-yellow-500 text-white' : 'bg-[var(--color-redexcom-primary)] hover:bg-blue-600 text-white'}`}
                    >
                      {modoEdicion ? <><IoSaveOutline className="text-lg" /> Guardar Cambios</> : <><IoPersonAddOutline className="text-lg" /> Crear Cuenta</>}
                    </button>

                    {modoEdicion && (
                      <button 
                        type="button" 
                        onClick={limpiarFormulario}
                        className="flex items-center justify-center gap-2 w-full bg-gray-700 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded-lg transition-colors"
                      >
                        <IoCloseOutline className="text-lg" /> Cancelar
                      </button>
                    )}
                  </div>
                </form>
              </div>
            </div>

            {/* Tabla de Usuarios (Derecha) */}
            <div className="lg:col-span-2">
              <div className="bg-[#1c2438] rounded-xl border border-gray-700 overflow-hidden shadow-lg">
                <div className="p-6 border-b border-gray-700 flex justify-between items-center">
                  <h3 className="text-lg font-bold text-white">Directorio de Personal</h3>
                  <span className="bg-blue-900/50 text-[var(--color-redexcom-secondary)] text-xs px-3 py-1 rounded-full font-bold border border-blue-500/30">
                    {usuarios.length} Registrados
                  </span>
                </div>
                
                <table className="w-full text-left text-sm text-gray-400">
                  <thead className="bg-[#2a344a] text-gray-300">
                    <tr>
                      <th className="p-4 font-semibold">Nombre</th>
                      <th className="p-4 font-semibold">Correo</th>
                      <th className="p-4 font-semibold">Rol</th>
                      <th className="p-4 font-semibold text-center">Acciones</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-700">
                    {usuarios.map((user) => (
                      <tr key={user.id} className="hover:bg-[#2a344a]/50 transition-colors">
                        <td className="p-4 font-medium text-white">{user.nombre}</td>
                        <td className="p-4">{user.correo}</td>
                        <td className="p-4">
                          <span className={`px-2 py-1 rounded text-xs font-bold ${user.rol === 'Administrador' ? 'bg-purple-500/20 text-purple-400' : 'bg-gray-700 text-gray-300'}`}>
                            {user.rol}
                          </span>
                        </td>
                        <td className="p-4 text-center">
                          <div className="flex items-center justify-center gap-4">
                            <button 
                              onClick={() => cargarUsuarioParaEditar(user)}
                              className="flex items-center gap-1 text-yellow-500 hover:text-yellow-400 font-medium transition-colors"
                              title="Editar"
                            >
                              <IoPencil className="text-lg" />
                            </button>
                            
                            <span className="text-gray-600">|</span>
                            
                            <button 
                              onClick={() => eliminarUsuario(user.id)}
                              className="flex items-center gap-1 text-red-500 hover:text-red-400 font-medium transition-colors"
                              title="Borrar"
                            >
                              <IoTrashOutline className="text-lg" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

          </div>

        </div>
      </main>
    </div>
  );
}