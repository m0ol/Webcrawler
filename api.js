module.exports = {
  handleRequest: function (request, response) {
    const https = require("https");
    const cheerio = require("cheerio");
    const baseURL = "https://" + request.headers.host + "/";
    const path = new URL(request.url, baseURL);

    switch (path.pathname) {
      case "/scrap_product":
        let dataURL = [];
        https
          .get(path.searchParams.get("url"), (res) => {
            res.on("data", (data) => {
              dataURL.push(data);
            });
            res.on("end", () => {
              dataURL = Buffer.concat(dataURL).toString();
              let $ = cheerio.load(dataURL);
              var availability_product = true;
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
        response.writeHead(200, { "Content-Type": "text/html" });
        response.write("OK");
        response.end();
        break;
      default:
        response.writeHead(404);
        response.write("Rota não definida");
        response.end();
    }
  },
};
