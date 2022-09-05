const express = require('express');
const path = require('path');
const port = process.env.PORT || 8080;
const app = express(); 
// the __dirname is the current directory from where the script is // running
app.use(express.static(__dirname)); 
// send the user to index html page inspite of the url
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'index.html'));
}); 
app.listen(port);

// app.use('/', (req, res, next) => {
//     if (req.originalUrl === '/') {
//       res.send('Service is running!');
//       return;
//     }
//     next();
//   });

  const excludes = ['book', 'games', 'stats']; //Client
      
  app.use(express.static(__dirname)); //подключить папку с index.html
  
  app.use('/', (req, res, next) => {
      const url = req.path;

      for(let ex in excludes) { //Ищем запросы к API
          if(url.includes(ex)) {
              res.sendFile(path.join(__dirname, "index.html")); //Наш клиент
              //res.redirect('/');
              return; //чтобы не попасть в API и на страницу 404
          }
      }
      
      next(); //переход к API
  })