const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const authroutes = require('./routes/auth'); // Ruta ajustada para conectar con el backend
//const cors = require('cors'); // Para habilitar CORS

const app = express();

// Configuración de EJS para renderizado de plantillas
app.set('view engine', 'ejs');
app.set('views', './views');
app.use(express.static('public'));
app.use(express.static('Js'));

// Middleware para analizar el cuerpo de la solicitud
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json()); // Para analizar JSON si usas APIs JSON

// Habilitar CORS
/*app.use(cors({
    origin: 'http://localhost:3000', // Cambia esto según el puerto de tu frontend
    credentials: true
}));*/

// Configuración de sesión

// Rutas


// Redirigir URL raíz a la página de inicio de sesión
app.get('/', (req, res) => {
    res.render('login');
});

app.get('/inicio', (req, res) => {
    res.render('inicio');  // Renderiza 'inicio.ejs' cuando se accede a la ruta '/inicio'
});


// Iniciar el servidor
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});




