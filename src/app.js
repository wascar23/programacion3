const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Configuración de middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'src', 'views'));

// Importar rutas
const seriesRoutes = require('./src/controllers/seriesController');
const genresRoutes = require('./src/controllers/genresController');

// Usar rutas
app.use('/series', seriesRoutes);
app.use('/genres', genresRoutes);

// Ruta principal
app.get('/', (req, res) => {
    res.render('index', { body: 'Bienvenido a Cine App' });
});


app.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${PORT}`);
});

app.get('/series', (req, res) => {
    res.render('series/index');
});

