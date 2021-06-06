const { match } = require('assert');

module.exports = {
    handleRequest: function(request, response){
        var https = require('https');
        var cheerio = require('cheerio');
        var dataURL = [];
        var baseURL = 'https://' + request.headers.host + '/';
        let path = new URL(request.url,baseURL);
        switch(path.pathname){
            case '/scrap_product':
                https.get(path.searchParams.get('url'), (res) => {
                    res.on('data', (d) => {
                        dataURL.push(d);
                    });
                    res.on('end', () => {
                        dataURL = Buffer.concat(dataURL).toString();
                       let $  = cheerio.load(dataURL,{xmlMode: true});
                       var availability = true
                       if($('.unavailable__product').length){
                        var title = $('h1').text();
                        var imagelink = $('.unavailable__product-img').attr('src');
                        var priceJSON = JSON.parse($('.icon-fav-outline').attr('data-product'));
                        var price = priceJSON.price;
                        var url = path.searchParams.get('url');
                        availability = false;
                        }else{
                            var title = $('h1').text();
                            var imagelink = $('.showcase-product__big-img').attr('src');
                            var price = parseFloat($('.price-template__text').text().replace(",","."));
                            var url = path.searchParams.get('url');
                        }            
                let payload = {
                    name: title,
                    image_primary: imagelink,
                    price: price,
                    availability: availability,
                    url: url
                };
                let payloadStr = JSON.stringify(payload);
                response.setHeader("Content-Type", "application/json");
                response.setHeader("Access-Control-Allow-Origin","*");
                response.writeHead(200);
                response.write(payloadStr);
                response.end();
              });
            }).on('error', (error) => {
                response.writeHead(404);
                response.write('Houve erro na requisição');
                response.end();
                console.error(error);
              });
                break;
                case '/status':
                    response.writeHead(200, {'Content-Type': 'text/html'});
                    response.write('OK');
                    response.end();
                    break;
                    default:
                        response.writeHead(404);
                        response.write('Rota não definida');
                        response.end();
        }
    }
};