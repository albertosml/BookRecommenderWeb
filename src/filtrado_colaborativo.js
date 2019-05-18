// Db connection
const { mongoose } = require('./database');

const User = require('./models/user');
const Book = require('./models/book');
const Valoration = require('./models/valoration');

function calculaSimilitud(ar1, ar2) {
    if(ar1.length == 0) return 0;
    else if(ar1.length == 1) {
        var diferencia = Math.abs(ar1[0] - ar2[0]);
        if(diferencia == 0) return 1;
        else if(diferencia == 1) return 0.5;
        else if(diferencia == 2) return 0;
        else if(diferencia == 3) return -0.5;
        else return -1;
    }
    else {
        // Calculo correlación pearson

        // 1) Calculo medias ar1 y ar2
        var media1 = 0;
        var media2 = 0;

        for(let i in ar1) {
            media1 += ar1[i];
            media2 += ar2[i];
        } 

        media1 /= ar1.length;
        media2 /= ar2.length;

        // 2) Calculo numerador correlación pearson
        var num = 0;
        for(let i in ar1) num += ((ar1[i] - media1)*(ar2[i]- media2));

        // 3) Calculo denominador correlación pearson
        var den1 = 0;
        var den2 = 0;
        for(let i in ar1) {
            den1 += Math.pow(ar1[i] - media1, 2);
            den2 += Math.pow(ar2[i] - media2, 2);
        }
        
        var den = Math.sqrt(den1) * Math.sqrt(den2);

        // 4) Calculo resultado correlación pearson
        var resultado = num/den;

        if(isNaN(resultado)) {
            // Si es NaN, procedo a calcular la correlación pearson
            
            // 1) Calculo numerador
            num = 0;

            for(let i in ar1) num += (ar1[i] * ar2[i]);

            // 2) Calcula denominador
            den1 = 0;
            den2 = 0;

            for(let i in ar1) {
                den1 += Math.pow(ar1[i], 2);
                den2 += Math.pow(ar2[i], 2);
            }

            den = Math.sqrt(den1) * Math.sqrt(den2);

            // 3) Calculo resultado
            return num/den;
        }
        else return resultado;
    }
}

async function obtenerValoraciones() {
    return await Valoration.find();
}

async function obtenerUsuarios() {
    return await User.find({}, { '_id': 1 });
}

async function obtenerComunes(id1, id2) {
    var ar1 = await Valoration.find({ user: id1 });
    var ar2 = await Valoration.find({ user: id2 });

    var array1 = [];
    var array2 = [];

    // Obtenemos las valoraciones comunes
    for(let i in ar1) {
        for(let j=(parseInt(i)+1);j<ar2.length;j++) {
            if(ar1[i].book.toString() == ar2[j].book.toString()) {
                array1.push(ar1[i].note);
                array2.push(ar2[i].note);
            }
        }
    }

    return { 'array1': array1, 'array2': array2 };
}

async function obtenerSimilitudes(usuarios) {
    var similitudes = [];
    
    for(let i in usuarios) {
        var obj = await obtenerComunes('5c6c87a365fc26001746f4f4', usuarios[i]._id);
        similitudes.push({ id: usuarios[i]._id, similitud: calculaSimilitud(obj.array1, obj.array2) });
    }

    return similitudes;
}

async function obtenerLibrosRecomendados(usuario_activo, vecinos) {
    var valoraciones_ua = await Valoration.find({ user: usuario_activo });
    
    var libros_no_comunes = [];
    var media_vecinos = [];
    var c = 0; // Constante c predicción

    // Obtengo libros no comunes
    for(let i in vecinos) {
        c += Math.abs(vecinos[i].similitud);
        media_vecinos[i] = 0;
        
        let valoraciones_vecino = await Valoration.find({ user: vecinos[i].id });

        for(let j in valoraciones_vecino) {
            var encontrado = valoraciones_ua.find(function(element) {
                return element.book.toString() == valoraciones_vecino[j].book.toString();
            });

            // Si ese libro no ha sido leído por el usuario activo, lo añado
            if(encontrado == undefined) {
                let book = valoraciones_vecino[j].book.toString();
                if(libros_no_comunes[book] == undefined) {
                    libros_no_comunes[book] = [{ note: valoraciones_vecino[j].note, similitud: vecinos[i].similitud, vecino: i }];
                }
                else libros_no_comunes[book].push({ note: valoraciones_vecino[j].note, similitud: vecinos[i].similitud, vecino: i }); 
            }

            media_vecinos[i] += valoraciones_vecino[j].note;
        }

        media_vecinos[i] /= valoraciones_vecino.length;
    }
     
    c = 1/c;

    // Para cada ítem, calculo la predicción
    var libros = [];

    // Media valoraciones usuario activo
    var media_u = 0;
    for(let k in valoraciones_ua) media_u += valoraciones_ua[k].note;
    media_u /= valoraciones_ua.length;

    for(let i in libros_no_comunes) {
        var sum = 0;

        for(let j in libros_no_comunes[i]) {
            sum += (libros_no_comunes[i][j].similitud * (libros_no_comunes[i][j].note - media_vecinos[parseInt(libros_no_comunes[i][j].vecino)])); 
        }

        var estimacion = media_u + c * sum;
        
        console.log(i);
        console.log(estimacion);

        if(estimacion > 4 && !libros.includes(i)) libros.push(i);
    }

    return libros;
}

/*
async function obtenerLibrosRecomendados(usuario_activo, vecinos) {
    var valoraciones_ua = await Valoration.find({ user: usuario_activo });
    
    var libros = [];

    for(let i in vecinos) {
        let valoraciones_vecino = await Valoration.find({ user: vecinos[i].id });

        for(let j in valoraciones_vecino) {
            var encontrado = valoraciones_ua.find(function(element) {
                return element.book.toString() == valoraciones_vecino[j].book.toString();
            });

            // Si ese libro no ha sido leído por el usuario activo, calculo la predicción
            if(encontrado == undefined) {
                // Media valoraciones usuario activo
                var media_u = 0;
                for(let k in valoraciones_ua) media_u += valoraciones_ua[k].note;
                media_u /= valoraciones_ua.length;

                // Calculo constante c
                var c = 0;
                for(let k in vecinos) c += Math.abs(vecinos[k].similitud);
                c = 1/c;

                // Media valoraciones vecino
                var media_v = 0;
                for(let k in valoraciones_vecino) media_v += valoraciones_vecino[k].note;
                media_v /= valoraciones_vecino.length;

                // Calculo sumatoria
                var sum = 0;
                for(let k in vecinos) {
                    sum += (vecinos[k].similitud * (valoraciones_vecino[j].note - media_v));
                }

                // Estimación
                var estimacion = media_u + (c * sum);

                console.log("HOLA")
                console.log(vecinos[i].id);
                console.log(valoraciones_vecino[j].book);
                console.log(estimacion);

                if(estimacion > 3 && !libros.includes(valoraciones_vecino[j].book.toString())) libros.push(valoraciones_vecino[j].book.toString());
            }
        }
    }

    return libros;
}
*/

async function encuentraLibros(libros) {
    for(let i in libros) {
        let b = await Book.findOne({ _id: libros[i] });
        console.log(b.title);
    }
}

obtenerUsuarios()
    .then(users => {
        //var usuarios = users.filter(user => user._id != '5c6c8cc08786420017d80d3b');
        var usuarios = users.filter(user => user._id != '5c6c87a365fc26001746f4f4');
        
        obtenerSimilitudes(usuarios)
            .then(similitudes => {
                // Ordenar similitudes
                similitudes.sort(function (a,b) { 
                    return b.similitud - a.similitud; 
                });

                // Obtenemos los k vecinos más similares (k=3)
                var vecinos = similitudes.slice(0,3);

                //obtenerLibrosRecomendados('5c6c8cc08786420017d80d3b', vecinos)
                
                obtenerLibrosRecomendados('5c6c87a365fc26001746f4f4', vecinos)
                    .then(libros => {
                        console.log(libros);

                        encuentraLibros(libros);
                    });
            });
    });