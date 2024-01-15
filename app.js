// app.js

const express = require('express');
const fs = require('fs');
const PDFDocument = require('pdfkit'); // Adiciona esta linha
const app = express();
const PORT = 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

app.post('/submit', (req, res) => {
    const { nome, idade } = req.body;
    const data = `Nome: ${nome}, Idade: ${idade}\n`;

    // Salva os dados no arquivo PDF
    const pdfDoc = new PDFDocument();
    pdfDoc.pipe(fs.createWriteStream('respostas.pdf'));
    pdfDoc.fontSize(12).text(data);
    pdfDoc.end();

    res.send('<div class="success-message">Respostas enviadas com sucesso! <a href="/">Retornar à página inicial</a></div>');


});

app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});
