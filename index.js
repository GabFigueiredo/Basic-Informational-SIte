const http = require('http')
const url = require('url')
const fs = require('fs')

http.createServer(function(req, res) {
    const q = url.parse(req.url, true)

    if (q.pathname === '/') {
        fs.readFile('./index.html', function(err, data) {
            if (err) {
                console.log('Caught an error while reading INDEX.HTML')
                return;
            }

            res.writeHead(200, {'Content-Type': 'text/html'})
            res.write(data)
            return res.end()
        })
    } else {
        const filename = '.' + q.pathname
        fs.readFile(filename, function (err, data) {
            if (err) {
                fs.readFile('./404.html', function (err2, data2) {
                    if (err2) {
                        console.log(err2)
                    }
                    else {
                        res.writeHead(404, {'Content-Type': 'text/html'});
                        res.end(data2);
                    }
                })
            } else {
                res.writeHead(200, {'Content-Type': 'text/html'})
                res.write(data)
                return res.end()
            }
        }) 

        }
    
}).listen(8080)