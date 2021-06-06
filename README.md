# Webcrawler

<b>Requisitos:</b>

1-Baixe e instale o <a href ="https://nodejs.org/en/download/">Node</a>

2-Baixa e instale um programa para fazer as requisições exemplo: <a href="https://www.postman.com/">Postman</a>, <a href="https://curl.se/download.html">Curl</a>

<b>Como testar o código:</b>

1-Baixe o código do repositório

2-Abra o prompt de comando e acesse a raiz do projeto do código baixado na pasta <b>"Webcrawler"</b> do repositório

3-Digite no prompt o comando "node server.js" para ligar o servidor local para fazer as requisições (Não feche o propmt de comando). 

4-Utilizando algum dos programas anteriormente baixados para realizar as requisições, realize a requisição Get utilizando o link: http://localhost:8080/status Em caso de sucesso irá retornar "Ok" no body como resposta.

5- Acesse o E-comerce www.magazineluiza.com.br e clique em algum produto, após carregar o produto copie o link do navegador

6-Realize a operação POST, colocando o link copiado no formato "https://localhost:8080/scrap_product?url="<b>cole o link aqui</b>". Exemplo do POST: https://localhost:8080/scrap_product?url=https://www.magazineluiza.com.br/porta-pet-door-para-caes-e-gatos-ate-7kg-com-trava-4-funcoes-desembrulha-presentes/p/ecd90def61/pe/pstg/

7- Se for um link válido, irá retornar as informações: nome do produto, link da imagem do produto, preço, disponibilidade do produto e URL do produto no formato JSON no body como resposta.
