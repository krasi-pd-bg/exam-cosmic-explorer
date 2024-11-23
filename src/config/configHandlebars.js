import handlebars from 'express-handlebars';


export default function configHandlebars(app) {
    app.engine('hbs', handlebars.engine({
        extname: 'hbs',
        
    }));
    app.set('view engine', 'hbs');
    app.set('views', './src/views'); //if views is in root folder we don't do this
}
