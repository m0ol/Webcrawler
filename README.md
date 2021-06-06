# Webcrawler

Requisitos:

1-Instale o node acessando o site: https://nodejs.org/en/download/
2-Instale um programa para fazer as requisições ex: Postman, Curl

Como testar o código:

1-Baixe o código do repositório
2-Abre o prompt de comando e acesse a raiz do projeto do código do repositório
3-Digite no prompt o comando "node server.js" para ligar o servidor local para fazer as requisições
4-Utilizando algum dos programas anteriormente baixados, realize a requisição Get utilizando o link: http://localhost:8080/status Em caso de sucesso irá retornar "Ok" no body.
5- Copie o link de algum produto no site do www.magazineluiza.com.br
6-Realize a requisição post conforme o exemplo a seguir: http://localhost:8080/scrap_product?url=https://www.magazineluiza.com.br/porta-pet-door-para-caes-e-gatos-ate-7kg-com-trava-4-funcoes-desembrulha-presentes/p/ecd90def61/pe/pstg/
7- Se for um link válido ele devera retornar as informações: nome do produto, link da imagem do produto, preço, disponibilidade do produto e URL do produto.
