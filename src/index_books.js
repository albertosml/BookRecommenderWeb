var SolrNode = require('solr-node');

const { mongoose } = require('./database');

const Book = require('./models/book');
const Genre = require('./models/genre');

var client = new SolrNode({
    host: '192.168.99.100',
    port: '8983',
    core: 'books',
    protocol: 'http'
});


async function obtainBooks() {
    return await Book.find();
}

obtainBooks()
    .then(async books => {
        /*for(let i=0; i<books.length; i++) {
            client.delete({ id: books[i]._id.toString() }, function(err, result) {
                if(err) {
                    console.log(err);
                    return ;
                }
                console.log(result);
            });
        }*/
        
        var genres;
        let cont=0;
        for(let i=0; i<books.length; i++) {
            //console.log(i);
            genres = [];
            for(let j=0;j<books[i].genres.length;j++) {
                var genre = await Genre.findOne({ _id: books[i].genres[j]._id });
                genres.push(genre.name);
            }
        
            var data = {
                'id': books[i]._id.toString(),
                'isbn': books[i].isbn,
                'isbn13': books[i].isbn13 != undefined ? books[i].isbn13 : '',
                'title': books[i].title,
                'authors': books[i].authors,
                'publisher': books[i].publisher != undefined ? books[i].publisher: '',
                'language': books[i].language != undefined ? books[i].language: '',
                'genres': genres,
                'polarity': books[i].polarity 
            };

            client.update(data, function(err, result) {
                if (err) {
                    console.log(err);
                    return;
                }
                console.log('Response:', result);

                if(cont < (books.length - 1)) {
                    console.log(cont);
                    cont++;
                }
                else process.exit();
            });
            
        }
        
    });