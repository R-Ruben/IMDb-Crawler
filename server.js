const express = require('express');
const app = express();
const Crawler = require('./crawler');
const crawler = new Crawler();
var socket = require('socket.io');

app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));

app.get('/', (req, res) => {
  res.render("../public/views/index.ejs");
});

app.get('/search/:searchQuery', async (req, res) => {
  res.render("../public/views/index.ejs");
crawler.crawlImdb(req.params.searchQuery, io);
});

const port = process.env.PORT || 3000;

let server = app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});

var io = socket(server);

io.on('connection', function(socket) {
  console.log('Socket connection made: '+socket.id);
})
























// var http = require('http');
// var fs = require('fs');
// var events = require('events');
// var util = require('util')
// var WebTorrent = require('webtorrent-hybrid')

// var torrentController = require('./torrentController')

// var server = http.createServer(function(req,res) {
//     console.log('Request was made: ' + req.url)
//     res.writeHead(200, {'Content-type': 'text/html'});

    
//     var client = new WebTorrent()

//     var torrentId = 'magnet:?xt=urn:btih:92d283be8d1a8c87904f1aee72f8357f19907f63&dn=Game.of.Thrones.S08E01.720p.WEB.H264-MEMENTO%5Bettv%5D&tr=udp%3A%2F%2Ftracker.leechers-paradise.org%3A6969&tr=udp%3A%2F%2Ftracker.openbittorrent.com%3A80&tr=udp%3A%2F%2Fopen.demonii.com%3A1337&tr=udp%3A%2F%2Ftracker.coppersurfer.tk%3A6969&tr=udp%3A%2F%2Fexodus.desync.com%3A6969'
    
//     client.add(torrentId, function (torrent) {

//       var file = torrent.files.find(function (file) {
//         return file;
//       })
    
//       console.log(file);
//     })

//     var readStream = fs.createReadStream(__dirname + '/public/index.html', 'utf8')
//     readStream.pipe(res);
// });


// server.listen(8000, 'localhost');
// console.log('Listening on port 8000');

