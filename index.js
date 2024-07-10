const http = require('http');
const url = require('url');
const { parse } = require('querystring');

const hostname = 'localhost';
const porta = 3000;

const cores = {
    vermelho: '#FF0000',
    azul: '#0000FF',
    verde: '#00FF00',
    preto: '#000000',
    branco: '#FFFFFF',
};

const servidor = http.createServer((req, res)=>
{
    const urlPartes = url.parse(req.url, true);
    const nomePacote = urlPartes.pathname;
    const pedido = urlPartes.query;

    console.log('Recebido', nomePacote);

    if ( req.method === 'GET' && nomePacote == '/pegaCor'){
        const colorName = pedido.cor;
        if( colorName && cores[colorName] ){
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify({hex:cores[colorName]}));
        }else{
            res.statusCode = 400;
            res.setHeader('Content-Type', 'text/plain');
            res.end('Cor não encontrada!!!');
        }
    }else if (req.method === 'POST' && nomePacote == '/addCor'){
        let body;
        req.on('data', chunk =>{
            body = chunk.toString() ;
        });
        
        req.on('end', ()=>{
            const parseBody = parse(body);
            const colorName = parseBody.color;
            const hexCode = parseBody.hex;

            if(colorName && hexCode){
                cores[colorName] = hexCode;
                res.statusCode = 201;
                res.setHeader('Content-Type', 'text/plain');
                res.end('Cor cadastrada!!!');
            }else{
                res.statusCode = 400;
                res.setHeader('Content-Type', 'text/plain');
                res.end('Erro ao cadastrar cor!!!');
            }
        })
    }else{
        res.statusCode = 404;
        res.setHeader('Content-Type', 'text/plain');
        res.end('Pacote incorreto!!!');
    }
    //http://localhost:3000/pega_cor?cor=vermelho
});

servidor.listen(porta, hostname, ()=>{
     console.log('Servido Rodando!!!');
});

// //Exemplo POST
// //curl -X POST -d "color=purple&hex=#FF00FF" http://localhost:3000/addCor


// //Exemplo GET
// //http://localhost:3000/pega_cor?cor=vermelho