const express = require('express');
const router = express.Router();
const crypto = require('crypto');

// Models
const Genre = require('../models/genre');
const User = require('../models/user');

// Routes
router.get('/users/signout', async (req,res) => {
    req.session.username = '';
    res.json({msg: 'Sesión cerrada con éxito'});
});

router.get('/verifysession', async (req,res) => {
    if(req.session.username === undefined || req.session.username.length == 0) res.json({msg: 'NO'});
    else res.json({msg: 'SI'});
});

router.get('/user', async (req,res) => {
    const username = await User.find({username: req.session.username});
    if(username.length > 0) {
        res.json({
            msg: '',
            username: username[0].username,
            name: username[0].name + " " + username[0].surname
        });
    }
    else res.json({ msg: 'Usuario no encontrado'})
});

router.get('/user/data', async (req,res) => {
    const username = await User.find({username: req.session.username});
    if(username.length > 0) {
        const array = [];
        // Me recorro los géneros y obtengo los nombres
        for(let i in username[0].favouritesgenres) {
            const genero = await Genre.findById(username[0].favouritesgenres[i]._id);
            if(genero != null) array.push(genero.name);
        }

        res.json({
            msg: '',
            user: username[0],
            generos: array
        });
    }
    else res.json({ msg: 'Usuario no encontrado'})
});

router.post('/users/signin', async (req,res) => {
    if(req.body.username.length > 0) { // Comprobar username
        // Compruebo si existe ese nombre de usuario, en caso afirmativo, se sigue comprobando
        const username = await User.find({username: req.body.username});
        if(username.length > 0) {
            // Compruebo que se haya introducido la contraseña
            if(req.body.password.length > 0) { 
                // Comprobamos que la contraseña es la correcta, si lo es, redireccionamos a la página de inicio, si no, notificamos el error
                if(crypto.createHmac('sha1', req.body.username).update(req.body.password).digest('hex') === username[0].password) {
                    req.session.username = req.body.username;
                    
                    // Las sesiones se mantendrán almacenadas como mucho 1 hora
                    req.session.cookie.expires = new Date(Date.now() + 3600000)
                    req.session.cookie.maxAge = 3600000
                    
                    res.json({msg: ''});
                }
                else res.json({msg: 'Nombre de usuario y/o contraseña incorrectos'});
            }
            else res.json({msg: 'Contraseña no introducida'});
        }
        else res.json({msg: 'Nombre de usuario y/o contraseña incorrectos'});
    }
    else res.json({msg: 'Nombre de usuario no introducido'});
});

router.post('/users/signup', async (req,res) => {
    if(req.body.username.length > 0) { // Comprobar username
        // Compruebo si existe ese nombre de usuario
        const username = await User.find({username: req.body.username});
        if(username.length == 0) {
            if(req.body.name.length > 0) { // Compruebo nombre
                if(req.body.surname.length > 0) { // Compruebo apellidos
                    if(req.body.email.length > 0) { // Compruebo email
                        // Compruebo que se haya introducido la contraseña
                        if(req.body.password.length > 0) { 
                            // Compruebo que ambas contraseñas sean iguales
                            if(req.body.password == req.body.confirmpassword) {
                                const data =  { 
                                    username: req.body.username,
                                    name: req.body.name,
                                    surname: req.body.surname,
                                    email: req.body.email,
                                    password: crypto.createHmac('sha1', req.body.username).update(req.body.password).digest('hex')
                                };
                                
                                const usuario = new User(data);

                                for(let e in req.body.chips) {
                                    const genero = await Genre.find({name: req.body.chips[e]});
                                    if(genero.length > 0) {
                                        // Obtengo id y lo inserto
                                        await usuario.favouritesgenres.push(genero[0]._id);
                                    }
                                }
                                
                                await usuario.save();
                                
                                res.json({ msg: ''});   
                            }
                            else res.json({ msg: 'Las contraseñas no son iguales'});
                        }
                        else res.json({ msg: 'No se ha introducido la contraseña'});
                    }
                    else res.json({ msg: 'Email no introducido'});
                }
                else res.json({ msg: 'Apellidos no introducidos'});
            }
            else res.json({ msg: 'Nombre no introducido'});
        }
        else res.json({ msg: 'Nombre de usuario ya existente'});
    }
    else res.json({ msg: 'Nombre de usuario no introducido'});
});

router.post('/newgenre', async (req,res) => {
    if(req.body.name.length > 0) { // Compruebo nombre
        // Compruebo si se ha insertado el género
        const nombre = req.body.name.charAt(0).toUpperCase() + req.body.name.slice(1).toLowerCase();
        const found = await Genre.find({name: nombre});
        if(found.length == 0) {
            const data = { name: nombre };
            const genre = new Genre(data);
            await genre.save();
            res.json({ msg: ''});
        }
        else res.json({ msg: 'El género ya estaba añadido' });    
    }
    else res.json({ msg: 'Nombre del género no introducido'});
});

router.get('/genrelist', async (req,res) => {
    const lista = await Genre.find();
    res.json(lista);
});

module.exports = router;
