//Taken from Week 5B and 6A Demos
const http = require('http'); //pull in http module
//url module for parsing url string
const url = require('url'); 
//querystring module for parsing querystrings from url
const query = require('querystring');
//fs used for reading JSON file
const fs = require('fs');
//pull in our custom files
const htmlHandler = require('./htmlResponses.js');
const mediaHandler = require('./mediaResponses.js');
const jsonHandler = require('./jsonResponses.js');

const port = process.env.PORT || process.env.NODE_PORT || 3000;

let quokesArray;

//handle POST requests
const handlePost = (request, response, parsedUrl) => {
  //if post is to /addUser (our only POST url)
  if (parsedUrl.pathname === '/addUser') {
    const res = response;

    //uploads come in as a byte stream that we need 
    //to reassemble once it's all arrived
    const body = [];

    //if the upload stream errors out, just throw a
    //a bad request and send it back 
    request.on('error', (err) => {
      console.dir(err);
      res.statusCode = 400;
      res.end();
    });

    //on 'data' is for each byte of data that comes in
    //from the upload. We will add it to our byte array.
    request.on('data', (chunk) => {
      body.push(chunk); 
    });

    //on end of upload stream. 
    request.on('end', () => {
      //combine our byte array (using Buffer.concat)
      //and convert it to a string value (in this instance)
      const bodyString = Buffer.concat(body).toString();
      //since we are getting x-www-form-urlencoded data
      //the format will be the same as querystrings
      //Parse the string into an object by field name
      const bodyParams = query.parse(bodyString);

      //pass to our addUser function
      jsonHandler.addUser(request, res, bodyParams);
    });
  }
};

const handlerGetAllQuokes = (request, response) =>{
	const statusCode = 200;
	response.writeHead(statusCode, {'Content-Type': 'application/json', 'Access-Control-Allow-Origin' : '*'});
	response.write(JSON.stringify(quokesArray));
	response.end();
};

const handlerGetRandomQuoke = (request, response) =>{
	const statusCode = 200;
	response.writeHead(statusCode, {'Content-Type': 'application/json', 'Access-Control-Allow-Origin' : '*'});
	let quoke = quokesArray[Math.floor(Math.random() * quokesArray.length)];
	response.write(JSON.stringify(quoke));
	response.end();
};

//handle GET requests
const handleGet = (request, response, parsedUrl) => {
  //route to correct method based on url
  if (parsedUrl.pathname === '/style.css') {
    htmlHandler.getCSS(request, response);
  } 
  else if (parsedUrl.pathname === '/Corgi.jpg') {
    htmlHandler.getCorgi(request, response);
  } 
  else if (parsedUrl.pathname === '/getAllQuokes') {
    handlerGetAllQuokes(request, response);
  }
  else if (parsedUrl.pathname === '/roll.mp4') {
    mediaHandler.getVideo(request, response, '../client/roll.mp4', 'video/mp4');
  }
  else if (parsedUrl.pathname === '/getRandomQuoke') {
    handlerGetRandomQuoke(request, response);
  }
  /*else if (parsedUrl.pathname === '/right_bubble.png') {
    htmlHandler.getRight(request, response);
  }
  else if (parsedUrl.pathname === '/left_bubble.png') {
    htmlHandler.getLeft(request, response);
  }*/
  else if (parsedUrl.pathname === '/corgi_fur.jpg') {
    htmlHandler.getFur(request, response);
  }else {
    htmlHandler.getIndex(request, response);
  }
};

const onRequest = (request, response) => {
  //parse url into individual parts
  //returns an object of url parts by name
  const parsedUrl = url.parse(request.url);

  //check if method was POST, otherwise assume GET 
  //for the sake of this example
  if (request.method === 'POST') {
    handlePost(request, response, parsedUrl);
  } else {
    handleGet(request, response, parsedUrl);
  }
};

// load quokes
const quokesFile = fs.readFileSync(`${__dirname}/../client/quokes.json`);
quokesArray = JSON.parse(quokesFile).quokes;
console.log(`There are ${quokesArray.length} quokes`);

http.createServer(onRequest).listen(port);

console.log(`Listening on 127.0.0.1: ${port}`);
