const cors = require('cors');
const express = require('express');

const app = express();
const hostname = '127.0.0.1';
const port = 3000;

// Mapeamento de cores para códigos hexadecimais
const cores = {
    vermelho: '#FF0000',
    verde: '#008000',
    azul: '#0000FF',
    amarelo: '#FFFF00',
    preto: '#000000',
    branco: '#FFFFFF',
    // Adicione mais cores conforme necessário
};

// Middleware CORS
app.use(cors());
app.use(express.urlencoded({ extended: true }));

app.get('/pegaCor', (req, res) => {
    const nomeCor = req.query.cor ? req.query.cor.toLowerCase() : null;

    if (nomeCor && cores[nomeCor]) {
        res.status(200).json({ hex:cores[nomeCor] });
        console.log(cores[nomeCor]);
    } else {
        res.status(400).json({ error: 'Cor não encontrada...' });
    }
});

app.post('/addCor', (req, res) => {
    const nomeCor = req.body.cor ? req.body.cor.toLowerCase() : null;
    const hexCor = req.body.hex;

    if (nomeCor && hexCor) {
        cores[nomeCor] = hexCor;
        res.status(200).json({ message: 'Cor adicionada com sucesso!!!', cor: nomeCor, hex: hexCor });
    } else {
        res.status(400).json({ error: 'Inputs invalidos...' });
    }
});

app.use((req, res) => {
    res.status(404).send('Função não encontrada...');
});

app.listen(port, hostname, () => {
    console.log(`Server rodano em http://${hostname}:${port}/`);
});