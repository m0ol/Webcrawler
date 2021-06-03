module.exports = {
    handleRequest: function(request, response){
        const baseURL = 'https://' + request.headers.host + '/';
        let path = new URL(request.url,baseURL);
        switch(path.pathname){
            case '/scrap_product':
                var https = require('https');
                https.get(path.searchParams.get('url'), (res) => {
                    res.on('data', (d) => {
                        let body = [];
                        body.push(d);
                    }).on('end', () => {
                    body = Buffer.concat(body).toString();
                      console.log(body);
                    });
                  }).on('error', (e) => {
                    response.writeHead(404);
                    response.write('Houve erro na requisição');
                    console.error(e);
                  })

                let payload = {
                    name: "Lucas",
                    image_primary: "",
                    price: "",
                    availability: "",
                    url: ""
                };
                let payloadStr = JSON.stringify(payload);
                response.setHeader("Content-Type", "application/json");
                response.setHeader("Access-Control-Allow-Origin","*");
                response.writeHead(200);
                response.write(payloadStr);
                response.end();
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