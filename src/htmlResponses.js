//Taken from Week 5B and 6A Demos

const fs = require('fs');  // pull in the file system module

const index = fs.readFileSync(`${__dirname}/../client/client.html`);
const css = fs.readFileSync(`${__dirname}/../client/style.css`);
const corgi = fs.readFileSync(`${__dirname}/../client/images/Corgi.jpg`);
const fur = fs.readFileSync(`${__dirname}/../client/images/corgi_fur.jpg`);
const left = fs.readFileSync(`${__dirname}/../client/images/left_bubble.png`);
const right = fs.readFileSync(`${__dirname}/../client/images/right_bubble.png`);

const getIndex = (request, response) => {
  response.writeHead(200, { 'Content-Type': 'text/html' });
  response.write(index);
  response.end();
};

const getCSS = (request, response) => {
  response.writeHead(200, { 'Content-Type': 'text/css' });
  response.write(css);
  response.end();
};

const getFur = (request, response) => {
  response.writeHead(200, { 'Content-Type': 'image/jpg' });
  response.write(fur);
  response.end();
};

const getCorgi = (request, response) => {
  response.writeHead(200, { 'Content-Type': 'image/jpg' });
  response.write(corgi);
  response.end();
};

const getLeft = (request, response) => {
  response.writeHead(200, { 'Content-Type': 'image/png' });
  response.write(left);
  response.end();
}

const getRight = (request, response) => {
  response.writeHead(200, { 'Content-Type': 'image/png' });
  response.write(right);
  response.end();
}

module.exports = {
  getIndex,
  getCSS,
  getCorgi,
  getFur,
  getLeft,
  getRight,
};
