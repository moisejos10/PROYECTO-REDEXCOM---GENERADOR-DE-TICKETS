const express = require('express');
const cors = require('cors');

// Inicializamos la aplicación de Express
const app = express();

// Definimos el puerto (usará el 3000 por defecto)
const PORT = process.env.PORT || 3000;

// --- MIDDLEWARES ---
// Estos son como los "filtros de seguridad" por los que pasa la información
app.use(cors()); // Permite que nuestro futuro frontend en React se pueda conectar
app.use(express.json()); // Le dice al servidor que entienda el formato JSON (como se envían los datos hoy en día)

// --- RUTAS DE PRUEBA ---
// Una ruta básica para saber si el servidor responde
app.get('/', (req, res) => {
    res.send('🚀 Motor del Sistema REDEXCOM en línea y esperando instrucciones.');
});

// --- ENCENDIDO DEL SERVIDOR ---
app.listen(PORT, () => {
    console.log(`✅ Servidor de REDEXCOM corriendo exitosamente en http://localhost:${PORT}`);
});