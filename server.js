const puppeteer = require("puppeteer");
var stringSimilarity = require("string-similarity");
var nombre = 0;
var nombre2 = 0;
var choix = "";
function extractItems() {
  const extractedElements = document.querySelectorAll("p");
  const extractedElements2 = document.querySelectorAll("div");
  const extractedElements3 = document.querySelectorAll(
    "h1, h2, h3, h4, h5, h6"
  );
  const items = [];
  for (let element of extractedElements) {
    if (
      element.innerText.length < 5000 &&
      element.innerText.length > 1500 &&
      element.innerText.indexOf("\t\t") === -1
    ) {
      items.push(element.innerText);
    }
  }
  for (let element of extractedElements2) {
    if (
      element.innerText.length < 5000 &&
      element.innerText.length > 1500 &&
      element.innerText.indexOf("\t\t") === -1
    ) {
      items.push(element.innerText);
    }
  }
  for (let element of extractedElements3) {
    if (
      element.innerText.length < 5000 &&
      element.innerText.length > 1500 &&
      element.innerText.indexOf("\t\t") === -1
    ) {
      items.push(element.innerText);
    }
  }
  return items;
}
function extractItems2() {
  const extractedElements = document.querySelectorAll(
    "div.result__extras__url>a"
  );

  const items = [];
  for (let element of extractedElements) {
    items.push(element.href);
  }
  return items;
}
function cleanArray(array) {
  var j, len;

  len = array.length;

  for (var k = 0; k < len; k++) {
    for (j = k + 1; j < len; j++) {
      var similarity = stringSimilarity.compareTwoStrings(array[k], array[j]);
      if (similarity > 0.95) {
        array.splice(j, 1);

        len--;
      }
    }
  }

  return array;
}
function cleanArraystring(array) {
  var j, len;

  len = array.length;

  for (var k = 0; k < len; k++) {
    for (j = k + 1; j < len; j++) {
      var similarity = stringSimilarity.compareTwoStrings(array[k], array[j]);
      if (similarity > 0.95) {
        array.splice(j, 1);

        len--;
      }
    }
  }

  return array;
}
function cleanArraybranche(array) {
  var j, len;

  len = array.length;

  for (var k = 0; k < len; k++) {
    var compare = array[k].text1[0];
    if (compare != undefined) {
      for (var p = k + 1; p < len; p++) {
        var len1 = array[p].text1.length;
        j = 0;
        while (j < len1) {
          var similarity = stringSimilarity.compareTwoStrings(
            compare,
            array[p].text1[j]
          );

          if (similarity > 0.95) {
            if (array[p].text1.length === 1) {
              array.splice(p, 1);

              len--;
            } else {
              array[p].text1.splice(j, 1);
            }
            len1--;
          }
          j++;
        }
      }
    }
  }

  return array;
}
var fr = require("stopword");
const stopwordsfr = require("stopwords-fr");
var fft = require("fft-js").fft;

function comparemystring(string1, string2) {
  string1 = string1.replace(/[\n\r\s\t]+/g, " ");
  var oldString = string1.split(" ");

  var newString = fr.removeStopwords(oldString, stopwordsfr);
  string2 = string2.replace(/[\n\r\s\t]+/g, " ");
  oldString = string2.split(" ");

  const newString2 = fr.removeStopwords(oldString);
  var comparestring1 = cleanArraystring(newString);
  var comparestring2 = cleanArraystring(newString2);
  const fouriercase = 128;
  var signal1 = [fouriercase];
  for (var k = 0; k < fouriercase; k++) {
    signal1[k] = 0;
  }
  for (var i = 0; i < newString.length; i++) {
    for (var j = 0; j < fouriercase; j++) {
      if (newString[i] === comparestring1[j]) {
        signal1[j] += 1;
        j = fouriercase;
      }
    }
  }
  var signal2 = [fouriercase];
  for (var k = 0; k < fouriercase; k++) {
    signal2[k] = 0;
  }
  for (i = 0; i < newString2.length; i++) {
    for (j = 0; j < fouriercase; j++) {
      if (newString2[i] === comparestring1[j]) {
        signal2[j] += 1;
        j = fouriercase;
      }
    }
  }

  var phasors = fft(signal1);
  var phasors2 = fft(signal2);
  var result = phasors2[0][0] / phasors[0][0];
  return result;
}

function sleep(milliseconds) {
  var start = new Date().getTime();
  for (var i = 0; i < 1e7; i++) {
    if (new Date().getTime() - start > milliseconds) {
      break;
    }
  }
}

var fs = require("fs");
var items = [];
var tr = require("tor-request");
tr.request("https://api.ipify.org", function(err, res, body) {
  if (!err && res.statusCode == 200) {
    console.log("Your public (through Tor) IP is: " + body);
  }
});
async function scrapegoogle(urlpost1, choix1) {
  const browser1 = await puppeteer.launch({
    defaultViewport: null,
    slowMo: 10,
    args: [
      "--proxy-server=127.0.0.1:8123",
      "--no-sandbox",
      "--disable-setuid-sandbox",
      "--disable-dev-shm-usage",
      "--disable-http2",
      "--shm - size = 1 gb"
    ]
  });

  const pageg = await browser1.newPage();
  await pageg.setUserAgent(
    "Mozilla / 5.0(iPhone; CPU iPhone OS 8 _3 like Mac OS X) AppleWebKit / 537.36(KHTML, like Gecko) Version / 8.0 Mobile / 12 F70 Safari / 600.1 .4(compatible; Googlebot / 2.1; + http: //www.google.com/bot.html)"
  );

  process.on("unhandledRejection", (reason, p) => {
    console.error("Unhandled Rejection at: Promise", p, "reason:", reason);

    browser1.close();
  });
  sleep(15000 + Math.random() * 8000);
  await pageg.goto(urlpost1, {
    waitUntil: ["load", "networkidle2"],
    timeout: 0
  });
  await pageg.waitFor(1000 + Math.random() * 500);
  await pageg.keyboard.press("Enter");

  await pageg.type("input[name=q]", choix1, {
    delay: Math.random() * 10 + Math.random() * 10
  });

  await pageg.keyboard.press("Enter");
  await pageg.waitForSelector("body");

  for (var i = 0; i < 20; i++) {
    sleep(2000 + Math.random() * 8000);

    if (i != 0) {
      var reg = "#rld-" + i + ">a";
      await pageg
        .focus(reg)
        .then(reg => {
          pageg.keyboard.press("Enter");
        })
        .catch(e => {
          console.log("XPath Error", e);
          i = 21;
        });

      await pageg.waitFor(1000 + Math.random() * 500);
    }
  }

  var elements = await pageg.evaluate(extractItems2);
  for (var j = 0; j < elements.length; j++) {
    items.push(elements[j]);
  }

  await browser1.close();

  if (items.length !== null) {
    await fs.readFile(
      "/home/specialjcg/site web/scrapperso/sitedoublon.json",
      "utf8",
      function readFileCallback(err1, data1) {
        if (err1) {
          return console.log(err1);
        } else {
          var obj1 = JSON.parse(data1); //now it an object
          for (j = 0; j < items.length; j++) {
            obj1.push(items[j]);
          }

          var json1 = JSON.stringify(obj1, null, "\n");

          fs.writeFile(
            "/home/specialjcg/site web/scrapperso/sitedoublon.json",
            json1,
            function(err1) {
              if (err1) {
                return console.log("json" + err1);
              }

              return;
            }
          );
        }
      }
    );
  }
  cleanArray(items);

  io.emit("googlesearch", items);
  return;
}
var request = require("request");
var cheerio = require("cheerio");
var boucle = 0;
function scrape(urlpost1, choix, nombredereponsepositive) {
  if (nombre <= nombredereponsepositive && nombre < urlpost1.length) {
    var urlpost = urlpost1[boucle];

    var itemssearch = [];
    var toto = {
      site: "",

      text1: [],
      taux1: [],
      taux2: []
    };
    var chaine = [];
    toto.site = urlpost;

    var url = urlpost;
    tr.request(url, function(error, response, body) {
      if (!error) {
        var $ = cheerio.load(body);

        $("p").each(function(i, e) {
          var text = $(this).text();

          text = text.replace(/[\n\r\s\t]+/g, " ");

          if (
            text.length < 5000 &&
            text.length > 400 &&
            text.indexOf("\t\t") === -1
          ) {
            itemssearch.push(text);
            cleanArray(itemssearch);
          }
        });
        $("div").each(function(i, e) {
          var text = $(this).text();
          text = text.replace(/[\n\r\s\t]+/g, " ");

          if (
            text.length < 5000 &&
            text.length > 400 &&
            text.indexOf("\t\t") === -1
          ) {
            itemssearch.push(text);
            cleanArray(itemssearch);
          }
        });

        /*
  const browser = await puppeteer.launch({
    defaultViewport: null,
    slowMo: 10,
    headless: false,
    args: [
      "--proxy-server=127.0.0.1:8123",
      "--no-sandbox",
      "--disable-setuid-sandbox",
      "--disable-dev-shm-usage",
      "--disable-http2",
      "--shm - size = 1 gb"
    ]
    
  });

  const page = await browser.newPage();
  /*  await page.setViewport({
        width: 1920,
        height: 2160
    });
  await page.setUserAgent(
    "Mozilla / 5.0(iPhone; CPU iPhone OS 8 _3 like Mac OS X) AppleWebKit / 537.36(KHTML, like Gecko) Version / 8.0 Mobile / 12 F70 Safari / 600.1 .4(compatible; Googlebot / 2.1; + http: //www.google.com/bot.html)"
  );
  process.on("unhandledRejection", (reason, p) => {
    console.error("Unhandled Rejection at: Promise", p, "reason:", reason);
    browser.close();
  });

  await page.goto(urlpost, {
    waitUntil: ["load", "networkidle2"],
    timeout: 0
  });
  await page.waitFor(1000 + Math.random() * 500);
  items = [];
  items = await page.evaluate(extractItems);

  var toto = {
    site: "",

    text1: []
  };

  toto.site = urlpost;

*/

        cleanArray(itemssearch);
        for (var i = 0; i < itemssearch.length; i++) {
          var taux1inter = stringSimilarity.compareTwoStrings(
            choix,
            itemssearch[i]
          );
          var taux2inter = comparemystring(choix, itemssearch[i]);

          if (taux1inter >= 0.1 && taux2inter >= 0.2) {
            toto.text1.push(itemssearch[i]);
            toto.taux1.push(taux1inter);
            toto.taux2.push(taux2inter);
          }
        }

        if (toto.text1.length !== 0) {
          fs.appendFileSync(
            "/home/specialjcg/site web/scrapperso/sitesurmesure.json",
            chaine,
            "utf8"
          ); // write it back

          fs.readFile(
            "/home/specialjcg/site web/scrapperso/sitesurmesure.json",
            "utf8",
            function readFileCallback(err, data) {
              if (err) {
                return console.log(err);
              } else {
                var obj = JSON.parse(data); //now it an object

                obj.push(toto); //add some data
                obj = cleanArraybranche(obj);
                for (
                  var nombretext = 0;
                  nombretext < obj[0].text1.length;
                  nombretext++
                ) {
                  nombre++;
                }
                var json = JSON.stringify(obj, null, "\n");

                fs.writeFile(
                  "/home/specialjcg/site web/scrapperso/sitesurmesure.json",
                  json,
                  function(err) {
                    if (err) {
                      return console.log("json" + err);
                    }

                    emettre();
                    return;
                  }
                );
              }
            }
          );
        }
        io.emit("loadingencour", nombre);
        io.emit("browserfermer", true);
        boucle++;
        scrape(urlpost1, choix, nombredereponsepositive);
      } else {
        console.log("We’ve encountered an error: " + error);
        io.emit("browserfermer", true);
        boucle++;
        scrape(urlpost1, choix, nombredereponsepositive);
      }
    });
  }

  return;
}

var app = require("express")();
var server = require("http").Server(app);
var io = require("socket.io")(server);
process.setMaxListeners(1000);

io.on("connection", function(socket) {
  socket.on("lancerecherche", async function(
    token,
    choix,
    nombredereponsepositive
  ) {
    scrape(token, choix, nombredereponsepositive);
  });

  socket.on("lancerecherche2", async function(token1, choix1) {
    scrapegoogle(token1, choix1);
  });
  socket.on("lanceconnect", function() {
    fs.writeFile(
      "/home/specialjcg/site web/scrapperso/sitesurmesure.json",
      "[]",
      async function(err) {
        if (err) {
          return console.log(err);
        }

        console.log("The file creé");
      }
    );
  });

  socket.on("lanceconnect2", function() {
    fs.writeFile(
      "/home/specialjcg/site web/scrapperso/sitedoublon.json",
      "[]",
      async function(err) {
        if (err) {
          return console.log(err);
        }

        console.log("The file creé");
      }
    );
  });
});
function emettre() {
  fs.readFile(
    "/home/specialjcg/site web/scrapperso/sitesurmesure.json",
    "utf8",
    function(erreur, donnees) {
      if (erreur) throw erreur; // Vous pouvez gérer les erreurs avant de parser le JSON

      var monJson = JSON.parse(donnees);

      io.emit("messagetext", monJson);
    }
  );
}

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
