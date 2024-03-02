const http = require("http");
const fs = require("fs");

HOST = "localhost";
PORT = 8000;

const searchEngines = [
  "https://www.google.com",
  "https://www.yahoo.com",
  "https://www.yandex.ru",
];

function extractDomain(url) {
    let domain = url.replace(/^https?:\/\/www./, '');
    domain = domain.split('.')[0];
    return domain.toUpperCase();
  }

const requestHandler = (req, res) => {
  switch (req.url) {
    case "/music": {
      const image = fs.readFileSync(`${__dirname}/5Nizza.mp3`);
      res.setHeader("content-type", "audio/mp3");
      res.end(music);
      break;
    }
    case "/html": {
      const html = `
        <html>
        <head>
        <title> My server is working</title>
        <style>
        ul {
         list-style-type: none; 
         paddind-left:20px;
        }
       </style>
        </head>
        <body>
        
        <ul> List search engines:
        ${searchEngines.map((item) => `<li><a href=${item}> ${extractDomain (item)}</a></li>`).join('')}
        </ul>
        </body> 
        </html>`;
      res.setHeader("content-type", "text/html");
      res.end(html);
      break;
    }
    default: {
      res.setHeader("content-type", "text/plain");
      res.end("Hello from server");
    }
  }
};

const server = http.createServer(requestHandler);
server.listen(PORT, HOST, () =>
  console.log(`Server is runing http://${HOST}:${PORT}`)
);
