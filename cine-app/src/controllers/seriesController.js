const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');

const seriesFilePath = path.join(__dirname, '..', 'models', 'series.json');
const genresFilePath = path.join(__dirname, '..', 'models', 'genres.json');

// Obtener todas las series
router.get('/', (req, res) => {
    const series = JSON.parse(fs.readFileSync(seriesFilePath, 'utf8'));
    res.render('series/index', { series });
});

// Formulario de creación de serie
router.get('/new', (req, res) => {
    const genres = JSON.parse(fs.readFileSync(genresFilePath, 'utf8'));
    res.render('series/new', { genres });
});

// Crear una nueva serie
router.post('/', (req, res) => {
    const series = JSON.parse(fs.readFileSync(seriesFilePath, 'utf8'));
    const newSeries = {
        id: series.length + 1,
        name: req.body.name,
        image: req.body.image,
        video: req.body.video,
        genre: req.body.genre
    };
    series.push(newSeries);
    fs.writeFileSync(seriesFilePath, JSON.stringify(series, null, 2));
    res.redirect('/series');
});

// Formulario de edición de serie
router.get('/:id/edit', (req, res) => {
    const series = JSON.parse(fs.readFileSync(seriesFilePath, 'utf8'));
    const seriesToEdit = series.find(serie => serie.id == req.params.id);
    const genres = JSON.parse(fs.readFileSync(genresFilePath, 'utf8'));
    res.render('series/edit', { series: seriesToEdit, genres });
});

// Editar una serie
router.post('/:id', (req, res) => {
    let series = JSON.parse(fs.readFileSync(seriesFilePath, 'utf8'));
    series = series.map(serie => {
        if (serie.id == req.params.id) {
            return {
                id: serie.id,
                name: req.body.name,
                image: req.body.image,
                video: req.body.video,
                genre: req.body.genre
            };
        }
        return serie;
    });
    fs.writeFileSync(seriesFilePath, JSON.stringify(series, null, 2));
    res.redirect('/series');
});

// Eliminar una serie
router.post('/:id/delete', (req, res) => {
    let series = JSON.parse(fs.readFileSync(seriesFilePath, 'utf8'));
    series = series.filter(serie => serie.id != req.params.id);
    fs.writeFileSync(seriesFilePath, JSON.stringify(series, null, 2));
    res.redirect('/series');
});

module.exports = router;

