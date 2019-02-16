const express = require('express');
const router = express.Router();
const crypto = require('crypto');
const fetch = require("node-fetch");
const nodemailer = require("nodemailer");

// Models
const Genre = require('../models/genre');
const User = require('../models/user');
const Book = require('../models/book');
const Theme = require('../models/theme');
const Valoration = require('../models/valoration');
const Suggestion = require('../models/suggestion');

// Routes
router.post('/book/data', async(req, res) => {
    const book = await Book.find({isbn: req.body.isbn});

    if(book.length == 0) res.json({ data: null, genres: null});
    else {
        const array = [];
        // Me recorro los géneros y obtengo los nombres
        for(let i in book[0].genres) {
            const genero = await Genre.findById(book[0].genres[i]._id);
            if(genero != null) array.push(genero.name);
        }

        res.json({ data: book, genres: array});
    }
});

router.post('/book/edit', async (req,res) => {
    // Obtengo el usuario de la sesión
    const book = await Book.findOne({ isbn: req.body.isbn });
    if(book != null) {
        // Si se introduce un título distinto, se actualiza
        if(req.body.title.length > 0 && req.body.title != req.body.title_old) book.title = req.body.title;
      
        // Si se introduce unos autores distintos, se actualizan
        if(req.body.chips_author.length > 0 && req.body.chips_author != req.body.chips_author_old) book.authors = req.body.chips_author;

        // Si se introduce un número de páginas distinto, se actualiza
        if(req.body.numpages.length > 0 && req.body.numpages != req.body.numpages_old) book.numpages = req.body.numpages;
        
        // Si se introduce una fecha de publicación distinta, se actualiza
        if(req.body.publicationdate.length > 0 && req.body.publicationdate != req.body.publicationdate_old) book.publicationdate = req.body.publicationdate;

        // Si se introduce una URL distinta, se actualiza
        if(req.body.url.length > 0 && req.body.url != req.body.url_old) book.url = req.body.url;

        // Si se introduce una editorial distinta, se actualiza
        if(req.body.publisher.length > 0 && req.body.publisher != req.body.publisher_old) book.publisher = req.body.publisher;

        // Si se introduce un estudio distinto, se actualiza
        if(req.body.studio.length > 0 && req.body.studio != req.body.studio_old) book.studio = req.body.studio;

        // Si se introduce un idioma distinto, se actualiza
        if(req.body.language.length > 0 && req.body.language != req.body.language_old) book.language = req.body.language;

        // Si se ha modificado los géneros, los actualizamos
        if(req.body.chips != req.body.chips_old) {
            book.genres = [];
            for(let i in req.body.chips) {
                const genero = await Genre.find({name: req.body.chips[i]});
                if(genero.length > 0) {
                    // Obtengo id y lo inserto
                    await book.genres.push(genero[0]._id);
                }
                else {
                    // Creo el género
                    var g = new Genre();
                    g.name = req.body.chips[i];

                    await g.save();

                    // Obtengo el id y lo inserto
                    const genero = await Genre.find({name: req.body.chips[i]});
                    if(genero.length > 0) await book.genres.push(genero[0]._id);
                }
            }        
        }        
        
        // Si se modificado la imagen, se actualiza
        if(req.body.image != undefined) book.image = req.body.image;
        
        await book.save();
               
        res.json({msg: ''});      
    }
    else res.json({ msg: 'ISBN no encontrado'});
});

router.post('/book/signup', async (req,res) => {
    // https://www.oreilly.com/library/view/regular-expressions-cookbook/9781449327453/ch04s13.html
    // Comprobar ISBN-10 o ISBN-13
    var regex = new RegExp("^(?=[0-9X]{10}$|(?=(?:[0-9]+[- ]){3})[- 0-9X]{13}$|97[89][0-9]{10}$|(?=(?:[0-9]+[- ]){4})[- 0-9]{17}$)(?:97[89][- ]?)?[0-9]{1,5}[- ]?[0-9]+[- ]?[0-9]+[- ]?[0-9X]$");
    if(regex.test(req.body.isbn)) {
        var is = req.body.isbn.replace(/-/g,"");
        // Compruebo si existe un libro con ese ISBN
        const isbn = await Book.find({ $or : [ {isbn: is}, {isbn13: is} ] });
        if(isbn.length == 0) {
        	fetch('https://www.googleapis.com/books/v1/volumes?q=isbn:' + is,{
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            })
                .then(res => res.json())
                .then(async data => {
                    if(data.totalItems == 0) {
                        if(req.body.chips_author.length == 0 || req.body.title.length == 0) res.json({ msg: 'No se han podido obtener los datos del libro con ese ISBN, por favor introduzcalos'});
                        else {
                            const libro = new Book(); // Creo libro
                
                            // Meto ya los datos obtenidos
                            libro.isbn = is;
                            libro.isbn13 = "";
                            libro.title = req.body.title;
                            libro.authors = req.body.chips_author;
                            libro.numpages = req.body.numpages;

                            // Se inserta la fecha de publicación, si se ha introducido
                            libro.publicationdate = req.body.publicationdate;

                            // Se inserta una url de referencia, si se ha introducido
                            libro.url = req.body.url;

                            // Se inserta la editorial, si se ha introducido
                            libro.publisher = req.body.publisher;

                            // Se inserta el estudio, si se ha introducido
                            libro.studio = req.body.studio;

                            // Se inserta el idioma, si se ha introducido
                            libro.language = req.body.language;

                            // Si se han introducido géneros, se insertan 
                            if(req.body.chips.length > 0) {
                                libro.genres = [];
                                for(let i in req.body.chips) {
                                    const genero = await Genre.find({name: req.body.chips[i]});
                                    if(genero.length > 0) {
                                        // Obtengo id y lo inserto
                                        await libro.genres.push(genero[0]._id);
                                    }
                                    else {
                                        // Creo el género
                                        var g = new Genre();
                                        g.name = req.body.chips[i];
        
                                        await g.save();
        
                                        // Obtengo el id y lo inserto
                                        const genero = await Genre.find({name: req.body.chips[i]});
                                        if(genero.length > 0) await libro.genres.push(genero[0]._id);
                                    }
                                }        
                            }

                            // Si se ha subido una imagen, la almaceno
                            libro.image = req.body.image;

                            // Guardo el libro
                            await libro.save();

                            res.json({ isbn:is, msg: '' });
                        }
                    }
                    else {
                        const libro = new Book(); // Creo libro
                    
                        var isb;

                        // ISBN
                        if(data.items[0].volumeInfo.industryIdentifiers[0].type == "ISBN_10") {
                            libro.isbn = data.items[0].volumeInfo.industryIdentifiers[0].identifier;
                            libro.isbn13 = data.items[0].volumeInfo.industryIdentifiers[1].identifier;
                            isb = libro.isbn;
                        }
                        else if(data.items[0].volumeInfo.industryIdentifiers[0].type == "ISBN_13") {
                            libro.isbn13 = data.items[0].volumeInfo.industryIdentifiers[0].identifier;
                            libro.isbn = data.items[0].volumeInfo.industryIdentifiers[1].identifier;
                            isb = libro.isbn;
                        }
                        else {
                            libro.isbn = is;
                            isb = libro.isbn;
                        }

                        // Título
                        libro.title = req.body.title.length > 0 ? req.body.title : data.items[0].volumeInfo.title;
                                
                        // Autores
                        libro.authors = [];
                        if(req.body.chips_author.length > 0) libro.authors = req.body.chips_author;
                        else for(let i in data.items[0].volumeInfo.authors) await libro.authors.push(data.items[0].volumeInfo.authors[i]);
                                
                        // Número de páginas
                        libro.numpages = req.body.numpages != undefined ? req.body.numpages : data.items[0].volumeInfo.pageCount;

                        // Fecha de publicación
                        libro.publicationdate = req.body.publicationdate.length == 0 ? data.items[0].volumeInfo.publishedDate : req.body.publicationdate;

                        // URL
                        libro.url = req.body.url.length > 0 ? req.body.url : data.items[0].volumeInfo.previewLink;

                        // Editorial
                        libro.publisher = req.body.publisher.length > 0 ? req.body.publisher : data.items[0].volumeInfo.publisher;

                        // Idioma
                        libro.language = req.body.language.length > 0 ? req.body.language : data.items[0].volumeInfo.language.toUpperCase();

                        // Estudio
                        libro.studio = req.body.studio;

                        // Si se han introducido géneros, se insertan 
                        libro.genres = [];
                        
                        var generos;
                        if(req.body.chips.length > 0) generos = req.body.chips;
                        else generos = data.items[0].volumeInfo.categories;
                            
                        for(let i in generos) {
                            const genero = await Genre.find({name: generos[i]});
                            if(genero.length > 0) {
                                // Obtengo id y lo inserto
                                await libro.genres.push(genero[0]._id);
                            }
                            else {
                                // Creo el género
                                var g = new Genre();
                                g.name = generos[i];

                                await g.save();

                                // Obtengo el id y lo inserto
                                const genero = await Genre.find({name: generos[i]});
                                if(genero.length > 0) await libro.genres.push(genero[0]._id);
                            }
                        }

                        // Si se ha subido una imagen, la almaceno
                        libro.image = req.body.image;
                                
                        // Guardo el libro
                        await libro.save();

                        res.json({ isbn: isb, msg: '' });
                    }
                })
                .catch(err => console.log(err));
        }
        else res.json({ msg: 'El libro con ese ISBN se encuentra ya registrado' });
    }
    else res.json({ msg: 'ISBN no introducido o no tiene el formato correcto' });
});

router.get('/users/signout', async (req,res) => {
    req.session.username = '';
    res.json({msg: 'Sesión cerrada con éxito'})
});

router.get('/verifysession', async (req,res) => {
    if(req.session.username === undefined || req.session.username.length == 0) res.json({msg: 'NO'});
    else res.json({msg: 'SI'});
});

router.get('/title', async (req,res) => {
    var data = [];

    const books = await Book.find();
    for(let i in books) data.push({ label: books[i].title + " - " + books[i].isbn });

    res.json({ data: data});
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

router.post('/user/profile', async (req,res) => {
    // Obtengo el usuario de la sesión
    const user = await User.findOne({username: req.session.username});
    if(user != null) {
        // Si se introduce un nombre distinto, se actualiza
        if(req.body.name.length > 0 && req.body.name != req.body.name_old) user.name = req.body.name;
      
        // Si se introduce unos apellidos distintos, se actualizan
        if(req.body.surname.length > 0 && req.body.surname != req.body.surname_old) user.surname = req.body.surname;

        // Si se introduce un email distinto, se actualiza
        if(req.body.email.length > 0 && req.body.email != req.body.email_old) user.email = req.body.email;
        
        // Compruebo que se haya introducido la contraseña
        if(req.body.password.length > 0) {
            if(req.body.password == req.body.confirmpassword) {
                user.password = crypto.createHmac('sha1', req.session.username).update(req.body.password).digest('hex');
            }
            else res.json({ msg: 'Las contraseñas no son iguales'});
        }
                            
        // Si se ha modificado los géneros, los actualizamos
        if(req.body.chips != req.body.chips_old) {
            user.favouritesgenres = [];
            for(let i in req.body.chips) {
                const genero = await Genre.find({name: req.body.chips[i]});
                if(genero.length > 0) {
                    // Obtengo id y lo inserto
                    await user.favouritesgenres.push(genero[0]._id);
                }
                else {
                    // Creo el género
                    var g = new Genre();
                    g.name = req.body.chips[i];

                    await g.save();

                    // Obtengo el id y lo inserto
                    const genero = await Genre.find({name: req.body.chips[i]});
                    if(genero.length > 0) await user.favouritesgenres.push(genero[0]._id);
                }
            }        
        }                   
        
        await user.save();
               
        res.json({msg: ''});      
    }
    else res.json({ msg: 'Nombre de usuario no encontrado'});
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
                                
                                var usuario = new User(data);

                                for(let i in req.body.chips) {
                                    const genero = await Genre.find({name: req.body.chips[i]});
                                    if(genero.length > 0) {
                                        // Obtengo id y lo inserto
                                        await usuario.favouritesgenres.push(genero[0]._id);
                                    }
                                    else {
                                        // Creo el género
                                        var g = new Genre();
                                        g.name = req.body.chips[i];
                    
                                        await g.save();
                    
                                        // Obtengo el id y lo inserto
                                        const genero = await Genre.find({name: req.body.chips[i]});
                                        if(genero.length > 0) await usuario.favouritesgenres.push(genero[0]._id);
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

router.post('/theme/signup', async (req,res) => {
    if(req.body.title.length > 0) { // Compruebo si aparece el título
        if(req.body.description.length > 0) { // Compruebo si aparece la descripción
            // Busco el usuario que ha creado el tema
            const usuario = await User.findOne({username: req.session.username});

            // Creo el tema e inserto los datos
            const tema = new Theme();
            tema.title = req.body.title;
            tema.description = req.body.description;
            tema.user = usuario._id;
            
            if(req.body.isbn == null) tema.book = null;
            else {
                let b = await Book.findOne({ isbn: req.body.isbn });
                tema.book = b._id;
            }

            await tema.save();
                                
            res.json({ msg: ''});                   
        }
        else res.json({ msg: 'Descripción no introducida'});
    }
    else res.json({ msg: 'Título no introducido'});
});

router.post('/comment/signup', async (req,res) => {
    if(req.body.response.length > 0) { // Compruebo si aparece la respuesta
        const tema = await Theme.findById(req.body.temaid);

        // Obtengo objeto usuario
        const user = await User.findOne({ username: req.session.username });

        if(tema != null && user != null) {
            tema.comments.push({
                description: req.body.response,
                user: user._id
            });

            await tema.save();
                                    
            res.json({ msg: ''}); 
        }
        else res.json({ msg: 'Problema al añadir el tema'});    
    }
    else res.json({ msg: 'Respuesta no introducida'});
});

router.post('/valoration/signup', async (req,res) => {
    if(req.body.description.length > 0) { // Compruebo si aparece la descripción
        if(req.body.note > 0) {
            // Obtengo objeto libro
            var book = await Book.findOne({ isbn: req.body.isbn});

            // Obtengo objeto usuario
            var user = await User.findOne({ username: req.session.username });

            if(book != null && user != null) {
                var valoration = new Valoration();
                valoration.description = req.body.description;
                valoration.note = req.body.note;
                valoration.book = book._id;
                valoration.user = user._id;

                await valoration.save();
                                                    
                res.json({ msg: ''}); 
            }
            else res.json({ msg: 'Problema al añadir la valoración'});   
        }
        else res.json({ msg: 'La nota de la valoración debe estar entre 1 y 5'})
    }
    else res.json({ msg: 'Respuesta no introducida'});
});

router.post('/canvalorate', async (req,res) => {
    // Puede valorar si ha registrado el libro como leído
    var b = await Book.findOne({ isbn: req.body.isbn });
    var user = await User.findOne({ username: req.session.username, readed_books: {$elemMatch: {_id: b._id}} });
    
    if(user == null) res.json({ canvalorate: false });
    else {
        // Compruebo si el usuario ya ha valorado ese libro
        user = await User.findOne({ username: req.session.username });
        var val = await Valoration.findOne({ book: b._id, user: user._id });
        
        if(val == null) res.json({ canvalorate: true });
        else res.json({ canvalorate: false });
    }
});

router.post('/valorations', async (req,res) => {
    const array = [];
    var num_valo = [];

    var valorations, numValorations;
    // Distingo para obtener las valoraciones de un libro o de un usuario
    if(req.body.isbn == null) {
        var user = await User.findOne({ username: req.session.username });
        valorations = await Valoration.find({ user: user._id }).sort({ datetime: -1}).skip(parseInt((req.body.currentPage-1)*2)).limit(2);
   
        // Cuento el número de valoraciones totales
        numValorations = await Valoration.find({ user: user._id }).countDocuments();
    }
    else {
        var book = await Book.findOne({isbn: req.body.isbn });
        valorations = await Valoration.find({ book: book._id }).sort({ datetime: -1}).skip(parseInt((req.body.currentPage-1)*2)).limit(2);
    
        // Cuento el número de valoraciones totales
        numValorations = await Valoration.find({ book: book._id }).countDocuments();

        for(let i=1;i<=5;i++) num_valo.push(await Valoration.find({ book: book._id, note:i }).countDocuments());
    }

    for(let i in valorations) {
        // Obtengo fecha
        let date = new Date(valorations[i].datetime);
        let minutos = date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
        let segundos = date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds();

        // Obtengo usuario
        const user = await User.findById(valorations[i].user);

        // Obtengo libro 
        const book = await Book.findById(valorations[i].book);

        array.push({ 
            id: valorations[i]._id, 
            fecha: date.getDate() + "/" + (date.getMonth()+1) + "/" + date.getFullYear(), 
            hora: date.getHours() + ":" + minutos + ":" + segundos,
            note: valorations[i].note,
            description: valorations[i].description,
            user: user.username,
            likes: valorations[i].likes.length,
            dislikes: valorations[i].dislikes.length,
            book: book.title
        });
    }

    res.json({ array: array, countValorations: numValorations, num_valo: num_valo });
});

router.post('/recomendedbooks', async (req,res) => {
    var array = [];

    var user = await User.findOne({ username: req.session.username }); 

    for(let i in user.recomended_books) {
        var book = await Book.findOne({ _id: user.recomended_books[i]._id});

        if(book != null) {
            array.push({ 
                isbn: book.isbn,
                title: book.title
            });
        }
    }

    res.json({ array: array });
});

router.post('/removerecomendedbook', async (req,res) => {
    var array = [];

    var user = await User.findOne({ username: req.session.username }); 
    var b = await Book.findOne({ isbn: req.body.isbn });

    let pos;

    for(let i in user.recomended_books) {
        var book = await Book.findOne({ _id: user.recomended_books[i]._id});

        if(book != null) {
            if(b.isbn == book.isbn) pos = i;
            else {
                array.push({ 
                    isbn: book.isbn,
                    title: book.title
                });
            }
        }
    }

    user.recomended_books.splice(pos,1);
    await user.save();

    res.json({ array: array });
});

router.post('/readedbooks', async (req,res) => {
    var array = [];

    var user = await User.findOne({ username: req.session.username }); 

    for(let i in user.readed_books) {
        var book = await Book.findOne({ _id: user.readed_books[i]._id});

        if(book != null) {
            var valoracion = await Valoration.findOne({ book: book._id, user: user._id });

            array.push({ 
                isbn: book.isbn,
                title: book.title, 
                valorado: valoracion == null ? false : true
            });
        }
    }

    res.json({ array: array });
});

router.post('/pendingbooks', async (req,res) => {
    var array = [];

    var user = await User.findOne({ username: req.session.username }); 

    for(let i in user.pending_books) {
        var book = await Book.findOne({ _id: user.pending_books[i]._id});

        if(book != null) {
            array.push({ 
                isbn: book.isbn,
                title: book.title
            });
        }
    }

    res.json({ array: array });
});

router.post('/removependingbook', async (req,res) => {
    var array = [];

    var user = await User.findOne({ username: req.session.username }); 
    var b = await Book.findOne({ isbn: req.body.isbn });

    let pos;

    for(let i in user.pending_books) {
        var book = await Book.findOne({ _id: user.pending_books[i]._id});

        if(book != null) {
            if(b.isbn == book.isbn) pos = i;
            else {
                array.push({ 
                    isbn: book.isbn,
                    title: book.title
                });
            }
        }
    }

    user.pending_books.splice(pos,1);
    await user.save();

    res.json({ array: array });
});

router.post('/addreadedbook', async (req,res) => {
    var user = await User.findOne({ username: req.session.username }); 
    var b = await Book.findOne({ isbn: req.body.isbn });

    user.readed_books.push(b._id);
    await user.save();

    res.json({ msg: '' });
});

router.post('/themes', async (req,res) => {
    const array = [];

    var temas, numthemes;
    if(req.body.book == null) {
        temas = await Theme.find({ book: null }).sort({ datetime: -1}).skip(parseInt((req.body.currentPage-1)*2)).limit(2);
    
        // Cuento el número de temas totales
        numthemes = await Theme.find({ book: null }).countDocuments();
    }
    else {
        var b = await Book.findOne({ isbn: req.body.book });
        temas = await Theme.find({ book: b._id }).sort({ datetime: -1}).skip(parseInt((req.body.currentPage-1)*2)).limit(2);
    
        // Cuento el número de temas totales
        numthemes = await Theme.find({ book: b._id }).countDocuments();
    }

    for(let i in temas) {
        // Obtengo fecha
        let date = new Date(temas[i].datetime);
        let minutos = date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
        let segundos = date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds();

        // Obtengo usuario
        const user = await User.findById(temas[i].user);

        // Obtengo comentarios del tema
        let comentarios = [];

        if(temas[i].comments.length > 0) {
            for(let j in temas[i].comments) {
                if(j != '_parent') { // Me sale los detalles del tema que es el padre de los comentarios
                    // Obtengo fecha
                    let date = new Date(temas[i].comments[j].datetime);
                    let minutos = date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
                    let segundos = date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds();

                    // Obtengo usuario
                    const user_c = await User.findById(temas[i].comments[j].user);

                    if(user_c != null) {
                        comentarios.push({
                            description: temas[i].comments[j].description,
                            fecha: date.getDate() + "/" + (date.getMonth()+1) + "/" + date.getFullYear(), 
                            hora: date.getHours() + ":" + minutos + ":" + segundos,
                            user: user_c.username
                        });
                    }
                }
            }
        }

        array.push({ 
            id: temas[i]._id, 
            fecha: date.getDate() + "/" + (date.getMonth()+1) + "/" + date.getFullYear(), 
            hora: date.getHours() + ":" + minutos + ":" + segundos,
            title: temas[i].title,
            description: temas[i].description,
            user: user.username,
            comments: comentarios,
            comments_mostrados: [],
            paginatema: 1
        });
    }

    res.json({ array: array, countThemes: numthemes });
});

function filtrarAcentos(nombre) {
    nombre = nombre.replace("á","a");
    nombre = nombre.replace("é","e");
    nombre = nombre.replace("í","i");
    nombre = nombre.replace("ó","o");
    nombre = nombre.replace("ú","u");
    nombre = nombre.replace("ü","u");
    nombre = nombre.replace("Á","A");
    nombre = nombre.replace("É","E");
    nombre = nombre.replace("Í","I");
    nombre = nombre.replace("Ó","O");
    nombre = nombre.replace("Ú","U");
    nombre = nombre.replace("Ü","U");
    return nombre;
}

router.post('/newgenre', async (req,res) => {
    if(req.body.name.length > 0) { // Compruebo nombre
        // Compruebo si se ha insertado el género
        var nombre = req.body.name.charAt(0).toUpperCase() + req.body.name.slice(1).toLowerCase();
        nombre = filtrarAcentos(nombre);
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

router.post('/newpendingbook', async (req,res) => {
    var book = await Book.findOne({ isbn: req.body.isbn });
    var user = await User.findOne({ username: req.session.username, pending_books: {$elemMatch: {_id: book._id}} });

    if(user == null) {
        user = await User.findOne({ username: req.session.username, readed_books: {$elemMatch: {_id: book._id}} });

        if(user == null) {
            user = await User.findOne({ username: req.session.username, recomended_books: {$elemMatch: {_id: book._id}} });

            if(user == null) {
                // Añado el libro como pendiente
                user = await User.findOne({ username: req.session.username });
                user.pending_books.push(book._id);
                await user.save();

                res.json({ msg: '' });
            }
            else res.json({ msg: 'El libro ya está recomendado por el sistema'}); 
        }
        else res.json({ msg: 'El libro ya está marcado como leído'});
    }
    else res.json({ msg: 'El libro ya está añadido como pendiente de leer'});
});

router.post('/givelike', async (req,res) => {
    // Compruebo si el usuario actual no es el mismo que ha hecho la valoración
    var val = await Valoration.findOne({ _id: req.body.valorationid }); 
    var user = await User.findOne({ _id: val.user });

    if(user.username == req.session.username) {
        if(req.body.like) res.json({ msg: 'Un usuario no puede darle a \'Me gusta\' a una valoración creada por él/ella.'});
        else res.json({ msg: 'Un usuario no puede darle a \'No me gusta\' a una valoración creada por él/ella.'});
    }
    else {
        // Compruebo que el usuario no le haya dado a like o dislike a esta valoración
        user = await User.findOne({ username: req.session.username });

        var valo;
        if(req.body.like) valo = await Valoration.findOne({ _id: req.body.valorationid, likes: {$elemMatch: { _id: user._id}} });
        else valo = await Valoration.findOne({ _id: req.body.valorationid, dislikes: {$elemMatch: { _id: user._id}} });

        if(valo == null) {
            // Añado el like o dislike 
            if(req.body.like) val.likes.push(user._id);
            else val.dislikes.push(user._id);

            await val.save();

            res.json({ msg: '' });
        }
        else {
            if(req.body.like) res.json({ msg: 'Ya le ha dado a \'Me gusta\' esta valoración' });
            else res.json({ msg: 'Ya le ha dado a \'No me gusta\' esta valoración' });
        }
    }
});

router.get('/genrelist', async (req,res) => {
    const lista = await Genre.find();
    res.json(lista);
});

router.post('/rememberpassword', async (req,res) => {
    var user = await User.findOne({ username: req.body.username });
    if(user == null) res.json({ msg: 'El nombre de usuario introducido no se ha encontrado'});
    else {
        // Genero contraseña temporal
        var caracteres = "abcdefghijkmnpqrtuvwxyzABCDEFGHIJKLMNPQRTUVWXYZ012346789";
        var temp_pass = "";
        for (let i=0; i<9; i++) temp_pass += caracteres.charAt(Math.floor(Math.random()*caracteres.length));

        // Envio email
        let transporter = nodemailer.createTransport({
            host: "smtp.gmail.com", 
            auth: {
              user: 'bookrecommender0@gmail.com', 
              pass: 'QdYJDYCcUe' 
            }
        });
        
        let mailOptions = {
            from: '"Book Recommender" <bookrecommender0@gmail.com>', 
            to: user.email, 
            subject: "Solicitud recordatorio contraseña", 
            text: "La contraseña temporal que se le ha asignado es: " + temp_pass + "\nSe le aconseja que vaya a su perfil y cambie la contraseña.\nUn saludo, el equipo de BookRecommender.", 
        };

        await transporter.sendMail(mailOptions, async (err,data) => {
            if(err) res.json({ msg: 'Hubo un problema al enviar el mensaje, si persiste este problema, contacte con el administrador'});
            else {
                // Cambio la contraseña del usuario
                user.password = crypto.createHmac('sha1', req.body.username).update(temp_pass).digest('hex');
                await user.save();

                res.json({ msg: '', email: user.email});
            }
        });
    }
});

router.post('/suggestion/signup', async (req,res) => {
    if(req.body.description.length > 0) {
        var sug = new Suggestion();
        sug.description = req.body.description;

        if(req.body.username.length > 0) {
            var user = await User.findOne({ username: req.body.username });
            
            if(user != null) sug.user = user._id;
        }
        
        // Guardo la sugerencia
        await sug.save();

        res.json({ msg: '' });
    }
    else res.json({ msg: 'Descripción no introducida'});
});

router.post('/suggestions', async (req,res) => {
    var array = [];

    var suggestions = await Suggestion.find().skip(parseInt((req.body.currentPage-1)*2)).limit(2);
   
    // Cuento el número de valoraciones totales
    var numSuggestions = await Suggestion.find().countDocuments();

    for(let i in suggestions) {
        // Obtengo usuario
        let user = await User.findById(suggestions[i].user);

        array.push({ 
            id: suggestions[i]._id, 
            description: suggestions[i].description,
            user: user == null ? "Anónimo" : user.username
        });
    }

    res.json({ array: array, countSuggestions: numSuggestions });
});

router.post('/removesuggestion', async (req,res) => {
    var suggestion = await Suggestion.findByIdAndDelete(req.body.id);
   
    if(suggestion == null) res.json({ msg: 'No se ha podido encontrar la sugerencia por lo que se no ha podido eliminar' });
    else res.json({ msg: 'Sugerencia eliminada' });
});

router.get('/books', async (req,res) => {
    var array = [];

    var libros = await Book.find(); 

    for(let i in libros) {
        array.push({ 
            isbn: libros[i].isbn,
            title: libros[i].title, 
        });
    }

    res.json({ array: array });
});

router.post('/removebook', async (req,res) => {
    var array = [];

    // Elimino libro
    var b = await Book.findOneAndDelete({ isbn: req.body.isbn });

    // Si algún usuario tiene ese libro como pendiente, leído o recomendado, lo elimino
    var users = await User.find({ pending_books: {$elemMatch: { _id: b._id}} });

    for(let i in users) 
        for(let j in users[i].pending_books) 
            if(b._id.equals(users[i].pending_books[j]._id)) {
                await users[i].pending_books.splice(j,1);
                await users[i].save();
                break;
            }
    
    users = await User.find({ readed_books: {$elemMatch: { _id: b._id}} });

    for(let i in users) 
        for(let j in users[i].readed_books) 
            if(b._id.equals(users[i].readed_books[j]._id)) {
                await users[i].readed_books.splice(j,1);
                await users[i].save();
                break;
            }

    users = await User.find({ recommended_books: {$elemMatch: { _id: b._id}} });

    for(let i in users) 
        for(let j in users[i].recommended_books) 
            if(b._id.equals(users[i].recommended_books[j]._id)) {
                await users[i].recommended_books.splice(j,1);
                await users[i].save();
                break;
            }

    // Elimino los temas de ese libro
    await Theme.deleteMany({ book: b._id });

    // Elimino las valoraciones de ese libro
    await Valoration.deleteMany({ book: b._id });

    var books = await Book.find();

    for(let i in books) {
        array.push({
            isbn: books[i].isbn,
            title: books[i].title
        });
    }

    res.json({ array: array });
});

router.post('/removegenre', async (req,res) => {
    // Elimino género
    var g = await Genre.findOneAndDelete({ name: req.body.name });

    // Si algún usuario tiene ese género como favorito, se elimina de su lista
    var users = await User.find({ favouritesgenres: {$elemMatch: { _id: g._id}} });

    for(let i in users) 
        for(let j in users[i].favouritesgenres) 
            if(g._id.equals(users[i].favouritesgenres[j]._id)) {
                await users[i].favouritesgenres.splice(j,1);
                await users[i].save();
                break;
            }
    
    // Si ese género pertenece a algún libro se elimina de su lista
    var books = await Book.find({ genres: {$elemMatch: { _id: g._id}} });

    for(let i in books) 
        for(let j in books[i].genres) 
            if(g._id.equals(books[i].genres[j]._id)) {
                await books[i].genres.splice(j,1);
                await books[i].save();
                break;
            }

    // Obtengo los géneros no eliminados
    genres = await Genre.find();

    res.json(genres);
});

module.exports = router;