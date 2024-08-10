const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');

const genresFilePath = path.join(__dirname, '..', 'models', 'genres.json');

// Obtener todos los géneros
router.get('/', (req, res) => {
    const genres = JSON.parse(fs.readFileSync(genresFilePath, 'utf8'));
    res.render('genres/index', { genres });
});

// Formulario de creación de género
router.get('/new', (req, res) => {
    res.render('genres/new');
});

// Crear un nuevo género
router.post('/', (req, res) => {
    const genres = JSON.parse(fs.readFileSync(genresFilePath, 'utf8'));
    const newGenre = {
        id: genres.length + 1,
        name: req.body.name
    };
    genres.push(newGenre);
    fs.writeFileSync(genresFilePath, JSON.stringify(genres, null, 2));
    res.redirect('/genres');
});

// Formulario de edición de género
router.get('/:id/edit', (req, res) => {
    const genres = JSON.parse(fs.readFileSync(genresFilePath, 'utf8'));
    const genreToEdit = genres.find(genre => genre.id == req.params.id);
    res.render('genres/edit', { genre: genreToEdit });
});

// Editar un género
router.post('/:id', (req, res) => {
    let genres = JSON.parse(fs.readFileSync(genresFilePath, 'utf8'));
    genres = genres.map(genre => {
        if (genre.id == req.params.id) {
            return {
                id: genre.id,
                name: req.body.name
            };
        }
        return genre;
    });
    fs.writeFileSync(genresFilePath, JSON.stringify(genres, null, 2));
    res.redirect('/genres');
});

// Eliminar un género
router.post('/:id/delete', (req, res) => {
    let genres = JSON.parse(fs.readFileSync(genresFilePath, 'utf8'));
    genres = genres.filter(genre => genre.id != req.params.id);
    fs.writeFileSync(genresFilePath, JSON.stringify(genres, null, 2));
    res.redirect('/genres');
});

module.exports = router;
