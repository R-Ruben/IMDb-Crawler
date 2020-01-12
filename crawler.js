const HTMLParser = require('node-html-parser');

class Crawler {


    crawlImdb(query, io) {
        let Crawler = require("js-crawler");
        new Crawler().configure({
                depth: 1,

            })
            .crawl("https://www.imdb.com/find?q=" + query + "&s=tt&ttype=ft&ref_=fn_ft", function onSuccess(page) {
                let root = HTMLParser.parse(page.content);
                let list = root.querySelector('.findList');
                list.querySelectorAll('.result_text a').some(function (element, index) {
                    let url = element.rawAttrs.split('href="')[1].split('"')[0];
                    let sortId = index;
                    new Crawler().configure({
                            depth: 1,

                        })
                        .crawl("https://www.imdb.com/" + url, function onSuccess(page) {
                            let root = HTMLParser.parse(page.content);

                            //Set title
                            let title = root.querySelector('.title_block h1')
                                .rawText.split('&nbsp;')[0] + ' ' +
                                root.querySelector('.title_block h1').
                                rawText.split('&nbsp;')[1];

                            //Set image URL
                            let img = root.querySelector('.poster a img');
                            let imgUrl;
                            if (img) {
                                imgUrl = img.rawAttrs.split('src="')[1].split('"')[0];
                            } else {
                                imgUrl = "/img/noimage.jpg";
                            }
                        
                            io.sockets.emit('dataReceived', {
                                title,
                                imgUrl,
                                sortId,
                                query
                            })
                        });


                });

            });
    }



}

module.exports = Crawler;