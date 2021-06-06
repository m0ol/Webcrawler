module.exports = {
  handleRequest: function (request, response) {
    var https = require("https");
    var baseURL = "https://" + request.headers.host + "/";
    var path = new URL(request.url, baseURL);
    //Switch para as rotas da API
    switch (path.pathname) {
      case "/scrap_product":
        let cheerio = require("cheerio");
        let dataURL = [];
        //Carrega os dados do site passado pela API
        https
          .get(path.searchParams.get("url"), (res) => {
            res.on("data", (data) => {
              dataURL.push(data);
            });
            res.on("end", () => {
              dataURL = Buffer.concat(dataURL).toString();
              let $ = cheerio.load(dataURL);
              var availability_product = true;
              //Verifica se existe tag de produto indisponível e preenche os campos de acordo
              if ($(".unavailable__product").length) {
                var title = $("h1").text();
                var imagelink = $(".unavailable__product-img").attr("src");
                var priceJSON = JSON.parse(
                  $(".icon-fav-outline").attr("data-product")
                );
                var price_product = priceJSON.price;
                var url = path.searchParams.get("url");
                availability_product = false;
              } else {
                var title = $("h1").text();
                var imagelink = $(".showcase-product__big-img").attr("src");
                var price_product = parseFloat(
                  $(".price-template__text").text().replace(",", ".")
                );
                var url = path.searchParams.get("url");
              }
              //Monta o JSON para retorno da requisição
              let productJson = {
                name: title,
                image_primary: imagelink,
                price: price_product,
                availability: availability_product,
                url: url,
              };
              let product = JSON.stringify(productJson);
              response.setHeader("Content-Type", "application/json");
              response.setHeader("Access-Control-Allow-Origin", "*");
              response.writeHead(200);
              response.write(product);
              response.end();
            });
          })
          .on("error", (error) => {
            response.writeHead(404);
            response.write("Houve erro na requisição. " + error);
            response.end();
          });
        break;
      case "/status":
        //Retorna Ok no body como resposta a requisição
        response.writeHead(200, { "Content-Type": "text/html" });
        response.write("OK");
        response.end();
        break;
      default:
        //Caso nenhuma rota definida seja feita na requisição
        response.writeHead(404);
        response.write("Rota não definida");
        response.end();
    }
  },
};
