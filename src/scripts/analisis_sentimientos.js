var bayes = require('bayes');
 
var classifier = bayes();

// Leo los datos de los csv y los clasifico
const csv = require('csv-parser');
const fs = require('fs');

// Db connection
const { mongoose } = require('../database');

const Valoration = require('../models/valoration');
const Classifier = require('../models/classifier');
const Book = require('../models/book');

async function obtainValorations() {
    return await Valoration.find();
}

async function obtainBooks() {
    return await Book.find();
}

obtainBooks()
    .then(async books => {
        for(let i in books) {
            console.log(i);

            books[i].polarity = 0;
            await books[i].save();
        }
    });

obtainValorations()
    .then(valorations => {
        fs.createReadStream('src/tweets_opinion_aviones/tweets_public.csv') 
            .pipe(csv())
            .on('data', function(data) {
                classifier.learn(data.text, data.airline_sentiment);
            })
            .on('end',function(){
                /*fs.readFile('src/isol/positivas_mejorada.csv', function(err, buf) {
                    var elements = buf.toString().split("\r\n");
                    for(let i in elements) classifier.learn(elements[i], 'positive');
                
                    fs.readFile('src/isol/negativas_mejorada.csv', function(err, buf) {
                        var elements = buf.toString().split("\r\n");
                        for(let i in elements) classifier.learn(elements[i], 'negative');
                
                        fs.readFile('src/esol/positivas_enriquecida.csv', function(err, buf) {
                            var elements = buf.toString().split("\r\n");
                            for(let i in elements) classifier.learn(elements[i], 'positive');
                
                            fs.readFile('src/esol/negativas_enriquecida.csv', function(err, buf) {
                                var elements = buf.toString().split("\r\n");
                                for(let i in elements) classifier.learn(elements[i], 'negative');
                          */      
                                fs.readdir('src/SFU', function(err,files) {
                                    for(let i in files) {
                                        fs.readdir('src/SFU/' + files[i], function(err, archivos) {
                                            for(let j in archivos) {
                                                fs.readFile('src/SFU/' + files[i] + '/' + archivos[j], 'latin1' , function(err, buf) {
                                                    if(archivos[j].indexOf('yes') > -1) classifier.learn(buf.toString(), 'positive');
                                                    else classifier.learn(buf.toString(), 'negative');
                                                });
                                            }
                                        });
                                    }

                                    fs.readFile('src/dic/negative_words_es.txt', function(err, buf) {
                                        var elements = buf.toString().split("\r\n");
                                        for(let i in elements) classifier.learn(elements[i], 'negative');
                                        
                                        fs.readFile('src/dic/positive_words_es.txt', async function(err, buf) {
                                            var elements = buf.toString().split("\r\n");
                                            for(let i in elements) classifier.learn(elements[i], 'positive');
                                           
                                            var pos = 0, neg = 0, neu = 0;
                                            for(let i in valorations) {
                                                var book = await Book.findOne({ _id: valorations[i].book });
                                                var sentiment = classifier.categorize(valorations[i].description);

                                                if(sentiment == 'positive') {
                                                   book.polarity++;
                                                   await book.save(); 
                                                   pos++; 
                                                } 
                                                else if(sentiment == 'neutral') neu++;
                                                else { 
                                                    book.polarity--;
                                                    await book.save(); 
                                                    neg++;
                                                }
                                            }
                                            console.log(pos);
                                            console.log(neu);
                                            console.log(neg);
                
                                            console.log(classifier.categorize('La continuación no está mal pero me gustan más otros libros, no lo recomendaría'));
                                            console.log(classifier.categorize('El libro es una mierda'));
                                            console.log(classifier.categorize('El libro es increíble'));

                                            /*var cl = new Classifier();
                                            cl.json = classifier.toJson();*/

                                            //var j = bayes.fromJson(cl.json);

                                            var j = bayes.fromJson(classifier.toJson());

                                            //await cl.save();

                                            console.log(j.categorize('El libro está bien'));
                                            console.log(j.categorize('La continuación no está mal pero me gustan más otros libros, no lo recomendaría'));
                                            console.log(j.categorize('El libro es una mierda'));
                                            console.log(j.categorize('El libro es increíble'));
                                            process.exit();
                                        });
                                    });
                                });
                            });
                        });
                /*    });
                });*/


        /*    });  
        });*/