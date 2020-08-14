# Documentation
[Traduzir para Português](https://github.com/Allanksr/appmeunegocio/tree/master/documentacao-planilha)
### Our app in the testing phase has several Google services
| Service | Description |
| :---: | :--- |
| <img src="https://www.google.com/images/about/sheets-icon.svg" width="100"> | **We load the product list into our app using Google Sheets.**<br> **Our spreadsheet follows a pattern that Google App Script reads and returns the data in JSON format to be consumed in our application.**<br> **If you want to create a spreadsheet to upload your own products as a test in our app it's simple.** |<br>


## How to test
| Service | Description |
| :---: | :--- |
| <img src="https://github.com/Allanksr/appmeunegocio/blob/master/Projeto-App-Meu-Negocio/Implementacao-Pagar-me/views/images/store.png?raw=true" width="100"> | **Our spreadsheet has seven (7) mandatory fields as in the image below. A B C D E F G↓ ↓ ↓ ↓ ↓**<br><img src="https://github.com/Allanksr/appmeunegocio/blob/master/documentacao-planilha/imagens/campos_da_planilha.png?raw=true"><br>**In-app loaded product**<br> <img src="https://github.com/Allanksr/appmeunegocio/blob/master/documentacao-planilha/imagens/exemplo_do_produto_no_app.png?raw=true"  width="300"> <img src="https://github.com/Allanksr/appmeunegocio/blob/master/documentacao-planilha/imagens/produto_no_carrinho.png?raw=true">|<br>

## Concluding
| Service | Description |
| :---: | :--- |
| <img src="https://raw.githubusercontent.com/Allanksr/appmeunegocio/master/documentacao-planilha/imagens/finally.png" width="100"> | **Thus.** **All fields are mandatory and the field <a href="https://github.com/Allanksr/appmeunegocio/tree/master/documentacao-planilha#concluindo">productId</a> deserves special attention, because it defines the product in the store** **The test products in our application start at p01 and go up to p47** **Following this logic when you create your spreadsheet <a href="https://github.com/Allanksr/appmeunegocio/tree/master/documentacao-planilha#concluindo">productId</a> must MUST start at p48 and from then on p49, p50, p51 ect...**|<br>

