/* eslint-disable prettier/prettier */
const puppeteer = require('puppeteer');

function extractItems() {
    const extractedElements = document.querySelectorAll('p');
    const items = [];
    for (let element of extractedElements) {
        items.push(element.innerText);
    }
    return items;
}


async function scrape(urlpost) {

    const browser = await puppeteer.launch({
        args: ['--no-sandbox', '--disable-setuid-sandbox'],
        headless: false
    });
    const page = await browser.newPage();
    await page.setViewport({
        width: 1920,
        height: 2160
    });

    await page.goto(urlpost);

   
    let items = await page.evaluate(extractItems);
   

console.log(items );
    var fs = require('fs');
var toto = {};
toto.truc = "nouvelle propriété";
 var toto = {};
    for (var i=0;i<items.length;i++){
     
      toto.truc = items[i];
   if (toto.truc.length > 100) {
var chaine = JSON.stringify(toto, null, '\n');

fs.appendFileSync("/home/specialjcg/site web/scrapperso/sitesurmesure.json", chaine, "UTF-8");
}

      }
    browser.close();
}
/*var url = require("url");
var querystring = require('querystring');*/
var http = require('http');

var server = http.createServer(function (req, res) {
 /*  res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Request-Method', '*');
    res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET');
    res.setHeader('Access-Control-Allow-Headers', '*');
    var params = querystring.parse(url.parse(req.url).query);*/
    if (req.method === 'OPTIONS') {
        res.writeHead(200);
        res.end('Salut tout le monde !');

        urlpost = params['adr'];
        scrape('http://ordiwebassistance.livehost.fr/creation-de-sites-web/site-sur-mesure');
        return;
    }
   
    
});
server.listen(3000);