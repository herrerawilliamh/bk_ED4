/*IMPORTS*/
import express from "express";
import path from "path";
import __dirname from "./utils.js";
import handlebars from 'express-handlebars';
import viewsRouter from './routes/views.router.js';
import { Server } from "socket.io";
import productsRouter from './routes/products.router.js';
import cartsRouter from './routes/carts.router.js'

/*VARS*/
const app = express();
const PORT = 8080;
const httpServer = app.listen(PORT, () => { console.log(`Listening on port ${PORT}`) });
const socketServer = new Server(httpServer);

/*Template Manager*/
app.engine('handlebars', handlebars.engine());
app.set('views', __dirname, '/views');
app.set('view engine', 'handlebars');


/*Middlewars*/
app.use(express.json());
app.use(express.urlencoded({extended: true}));

/*Manager Public Folder*/
app.use(express.static(path.join(__dirname, 'public')));

/*Routes*/
app.use("/", productsRouter);
app.use("/", cartsRouter);
app.use("/", viewsRouter);

/*Server Route to .html*/
/*app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "index.html"))
})*/
