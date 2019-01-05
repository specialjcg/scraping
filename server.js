/* eslint-disable prettier/prettier */
/* eslint-disable no-console */

const puppeteer = require('puppeteer');

function extractItems() {
    const extractedElements = document.querySelectorAll('p');
    const extractedElements2 = document.querySelectorAll('div');
    const extractedElements3 = document.querySelectorAll('h1, h2, h3, h4, h5, h6');
    const items = [];
    for (let element of extractedElements) {
        items.push(element.innerText);
    }
 for (let element of extractedElements2) {
     items.push(element.innerText);
 }
    for (let element of extractedElements3) {
        items.push(element.innerText);
    }
    return items;
}
var fs = require('fs');




async function scrape(urlpost) {
    const browser = await puppeteer.launch({
        args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage', '--disable-http2'],
        /* headless: false*/
    });
    
    
    const page = await browser.newPage();
  /*  await page.setViewport({
        width: 1920,
        height: 2160
    });*/

process.on("unhandledRejection", (reason, p) => {
        console.error("Unhandled Rejection at: Promise", p, "reason:", reason);
        browser.close();
    });
    await page.goto(urlpost, {
        waitUntil: 'networkidle0' ,
        timeout: 0

    });
   
    let items = await page.evaluate(extractItems);
    
var chaine={}

    
    
    var toto = {
        
        "site":"",
        
        
        "text1":[]
    
    };
  
    toto.site=urlpost;
  
    console.log(urlpost);
    for (var i = 0; i < items.length; i++) {

        
        
        if ((items[i].length < 1000) && (items[i].length > 300) && (items[i].indexOf("site sur mesure")!=-1) ) {
            toto.text1.push(items[i]);
           
        }} 
 
    
    if (toto.text1.length!=0){
    
      /*      fs.appendFileSync('/home/specialjcg/site web/scrapperso/sitesurmesure.json', chaine, 'utf8'); // write it back
        }*/
        
  await fs.readFile('/home/specialjcg/site web/scrapperso/sitesurmesure.json', 'utf8', async function readFileCallback(err, data) {
            if (err) {
               return console.log(err);
            } else {

               var obj = JSON.parse(data); //now it an object


               
                obj.push(toto); //add some data
                var json = JSON.stringify(obj, null, '\n'); 
                
               await fs.writeFile('/home/specialjcg/site web/scrapperso/sitesurmesure.json', json, async function (err) {
                 
                    if (err) {
                        return console.log(err);
                    }

                  console.log("The file was saved!");
                   emettre();
            });
            
                }}
                
                
                );
 
   
  
    
    
}

    browser.close();
return ;
}



var app = require('express')();
var server = require('http').Server(app);
var io = require('socket.io')(server);
io.sockets.setMaxListeners(30);

 io.on('connection', function(socket) {
     socket.on('lancerecherche', async function(token) {
   scrape(token);

    });
     socket.on('lanceconnect', function () { 
         fs.writeFile('/home/specialjcg/site web/scrapperso/sitesurmesure.json', '[]', async function (err) {

             if (err) {
                 return console.log(err);
             }

             console.log("The file creé");

         })




     });
});
function emettre() {
    fs.readFile('/home/specialjcg/site web/scrapperso/sitesurmesure.json', 'utf8', function (erreur, donnees) {
        if (erreur)
            throw erreur; // Vous pouvez gérer les erreurs avant de parser le JSON

        var monJson = JSON.parse(donnees);
      
        io.emit('message', monJson)
    });}

server.listen(3000);


/*http.createServer(function (req, res) {
 res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Request-Method', '*');
    res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET');
    res.setHeader('Access-Control-Allow-Headers', '*');
     res.setHeader('Content-Type', 'application/json');
    var params = querystring.parse(url.parse(req.url).query);


    res.writeHead(200 ,{
        'Content-Type': 'text/html'
    });
   
 
   
 urlpost = params['adr'];
 machaine=scrape(urlpost);
 res.write(JSON.stringify({
     a: 1
 }));
res.end();
 return;


}).listen(3000);*/

