const express = require('express');
const path = require('path');
const cors = require('cors');
const app = express();
const bodyParser = require('body-parser');
const { home,
        deptos, 
        country, 
        region, 
        commune,
        subdepto,
        permisson,
        user,
        auth,
        subdeptoProcess,
        action,
        view,
        request,
        upload,
        provider,
        product,
        productBrand,
        productCategory,
        productStatus,
        productArrival
      } = require('./src/routes');

//CONFIGURACIONES PRIMERO
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

//RUTAS
app.use(`/${process.env.API_VER}/home`, home);
app.use(`/${process.env.API_VER}/depto`, deptos);
app.use(`/${process.env.API_VER}/country`, country);
app.use(`/${process.env.API_VER}/region`, region);
app.use(`/${process.env.API_VER}/commune`, commune);
app.use(`/${process.env.API_VER}/subdepto`, subdepto);
app.use(`/${process.env.API_VER}/permission`, permisson);
app.use(`/${process.env.API_VER}/user`, user);
app.use(`/${process.env.API_VER}/auth`, auth);
app.use(`/${process.env.API_VER}/subdeptoProcess`, subdeptoProcess);
app.use(`/${process.env.API_VER}/action`, action);
app.use(`/${process.env.API_VER}/view`, view);
app.use(`/${process.env.API_VER}/request`, request);
app.use(`/${process.env.API_VER}/upload`, upload);
app.use(`/${process.env.API_VER}/provider`, provider);
app.use(`/${process.env.API_VER}/product`, product);
app.use(`/${process.env.API_VER}/productBrand`, productBrand);
app.use(`/${process.env.API_VER}/productCategory`, productCategory);
app.use(`/${process.env.API_VER}/productStatus`, productStatus);
app.use(`/${process.env.API_VER}/productArrival`, productArrival);

//CONFIGURE UPLOAD FOLDER
app.use(express.static('uploads'));
app.use('/static',express.static(path.join(__dirname,'uploads')));


module.exports = app;