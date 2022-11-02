const http = require("http");
const fs = require("fs");

function serverReMethods(req, res) {
    if(req.method == "GET") {
        switch(req.url){
            case "/page1" :
                res.setHeader("Content-Type", "text/html");
                fs.readFile(__dirname + "/page1.html",function(err, buffer){
                    let statusCode;
                    let fileBuffer;
                    if (err) {
                        statusCode= 404;
                        fileBuffer= "File not Found";
                    } else {
                        statusCode= 200;
                        fileBuffer= buffer;
                    }
                    res.writeHead(statusCode);
                    res.end(fileBuffer);
                });
                break;
            case "/page2" :
                res.setHeader("Content-Type", "text/html");
                fs.readFile(__dirname + "/page2.html",function(err, buffer){
                    let statusCode;
                    let fileBuffer;
                    if (err) {
                        statusCode= 404;
                        fileBuffer= "File not Found";
                    } else {
                        statusCode= 200;
                        fileBuffer= buffer;
                    }
                    res.writeHead(statusCode);
                    res.end(fileBuffer);
                });
                break;
            default :
                res.setHeader("Content-Type", "text/html");
                fs.readFile(__dirname + "/index.html",function(err, buffer){
                    let statusCode;
                    let fileBuffer;
                    if (err) {
                        statusCode= 404;
                        fileBuffer= "File not Found";
                    } else {
                        statusCode= 200;
                        fileBuffer= buffer;
                    }
                    res.writeHead(statusCode);
                    res.end(fileBuffer);
                });
                break;
        }
    }

    if(req.method == "POST") {
        res.setHeader("Content-Type", "application/json");
        res.writeHead(200);
        res.end("{'message' : 'Hello World!'}");
    }
        
            
    
}

/* wanted to create function for error handling but got error so I will try again tomorrow */
// function ErrorHandlingForFile(err, buffer){
//     let statusCode;
//     let fileBuffer;
//     if (err) {
//         statusCode= 404;
//         fileBuffer= "File not Found";
//     } else {
//         statusCode= 200;
//         fileBuffer= buffer;
//     }
//     res.writeHead(statusCode);
//     res.end(fileBuffer);
// }

const server = http.createServer(serverReMethods);
server.listen(3434,"localhost", function(){
    console.log("server is running on http://localhost:3434");
})