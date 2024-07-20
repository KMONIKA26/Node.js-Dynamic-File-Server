const http = require('http');
const path = require('path');
const fs = require('fs');

const PORT = 3000;

const mimeTypes = {
  '.html': 'text/html',
  '.js': 'text/javascript',
  '.css': 'text/css',
  '.json': 'application/json',
  '.png': 'image/png',
  '.jpg': 'image/jpg',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.wav': 'audio/wav',
  '.mp4': 'video/mp4',
  '.woff': 'application/font-woff',
  '.ttf': 'application/font-ttf',
  '.eot': 'application/vnd.ms-fontobject',
  '.otf': 'application/font-otf',
  '.wasm': 'application/wasm'
};

const server = http.createServer((req, res) => {
  const parsedUrl = path.parse(req.url);
  let pathname = `.${req.url}`;

  fs.stat(pathname, (err, stats) => {
    if (err) {
      res.statusCode = 404;
      res.setHeader('Content-Type', 'text/html');
      res.end('<h1>404 Not Found</h1>');
    } else if (stats.isFile()) {
      const ext = path.parse(pathname).ext;
      res.statusCode = 200;
      res.setHeader('Content-Type', mimeTypes[ext] || 'text/plain');
      fs.createReadStream(pathname).pipe(res);
    } else if (stats.isDirectory()) {
      fs.readdir(pathname, (err, files) => {
        if (err) {
          res.statusCode = 500;
          res.setHeader('Content-Type', 'text/html');
          res.end('<h1>500 Internal Server Error</h1>');
        } else {
          res.statusCode = 200;
          res.setHeader('Content-Type', 'text/html');
          res.end(generateDirectoryListing(pathname, files));
        }
      });
    }
  });
});

function generateDirectoryListing(dirPath, files) {
  let listItems = files.map(file => {
    const filePath = path.join(dirPath, file);
    const stats = fs.statSync(filePath);
    const icon = stats.isDirectory() ? '📁' : '🖹';
    return `<li>${icon} <a href="${path.join('/', file)}">${file}</a></li>`;
  }).join('');
  return `
    <html>
    <head><title>Directory Listing</title></head>
    <body>
      <h1>Directory Listing for ${dirPath}</h1>
      <ul>${listItems}</ul>
    </body>
    </html>
  `;
}

server.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
