const path = require('path');
// load dependencies
const env = require('dotenv');
const express = require('express');
const bodyParser = require('body-parser');
const expressHbs = require('express-handlebars');

const app = express();
const router = express.Router();

//Loading Routes
const webRoutes = require('./routes/web');
const sequelize = require('./config/database');
const errorController = require('./app/controllers/ErrorController');

env.config();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.engine(
	'hbs',
	expressHbs({
		layoutsDir: 'views/layouts/',
		defaultLayout: 'web_layout',
		extname: 'hbs'
	})
);
app.set('view engine', 'hbs');
app.set('views', 'views');

app.use(webRoutes);

sequelize
	//.sync({force : true})
	.sync()
	.then(() => {
		app.listen(process.env.PORT);
		//pending set timezone
		console.log("App listening on port " + process.env.PORT);
	})
	.catch(err => {
		console.log(err);
	});
