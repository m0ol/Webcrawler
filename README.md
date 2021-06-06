# Webcrawler

<b>Requisitos:</b>

1-Baixe e instale o <a href ="https://nodejs.org/en/download/">Node</a>

2-Baixa e instale algum programa para fazer as requisições. Exemplos: <a href="https://www.postman.com/">Postman</a>, <a href="https://curl.se/download.html">Curl</a>

<b>Como testar o código:</b>

1-Baixe o código do repositório

2-Abra o prompt de comando e navegue até a pasta <b>"Webcrawler"</b> do projeto baixado.

3-Digite no prompt o comando <b>"node server.js"</b> para ligar o servidor local para fazer as requisições <b>(Não feche o propmt de comando)</b>. 

4-Utilizando algum dos programas anteriormente baixados para realizar as requisições, realize a requisição GET utilizando o link: http://localhost:8080/status Em caso de sucesso irá retornar "Ok" no body como resposta.

5- Acesse o E-comerce www.magazineluiza.com.br e clique em algum produto, após carregar o produto copie o link do navegador

6-Realize a operação POST, colocando o link copiado no formato "http://localhost:8080/scrap_product?url="<b>cole o link aqui</b>". Exemplo de requisição: http://localhost:8080/scrap_product?url=https://www.magazineluiza.com.br/porta-pet-door-para-caes-e-gatos-ate-7kg-com-trava-4-funcoes-desembrulha-presentes/p/ecd90def61/pe/pstg/

7- Se for um link válido, irá retornar as informações: <b>nome do produto, link da imagem do produto, preço, disponibilidade do produto e URL do produto</b> no formato JSON no body como resposta.
