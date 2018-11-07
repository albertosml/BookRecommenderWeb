//const JavaScriptObfuscator = require('webpack-obfuscator');

module.exports = {
    entry: {
        inicio: './src/app/index.js',
        detalles: './src/app/details.js',
        perfil: './src/app/profile.js',
        nuevo_usuario: './src/app/new_user.js',
        iniciar_sesion: './src/app/start_session.js',
        nuevo_libro: './src/app/new_book.js',
        modificar_libro: './src/app/edit_book.js',
        mis_valoraciones: './src/app/my_valorations.js'
    },
    output: {
        path: __dirname + '/src/public',
        filename: '[name].js' 
    },
    module: {
        rules: [
            {
                use: 'babel-loader',
                test: /\.js/,
                exclude: /node_modules/
            }
        ]
    },
    /*plugins: [
        new JavaScriptObfuscator({
            rotateUnicodeArray: true
        }, ['inicio.js'])
    ]*/
};