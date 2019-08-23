const csv = require('csv-parser');
const fs = require('fs');
const createCsvWriter = require('csv-writer').createObjectCsvWriter;
var express = require('express');
var app = express();



const util = require('util');
util.inspect.defaultOptions.maxArrayLength = null; 

const results = [];

fs.createReadStream('data.csv')
    .pipe(csv())
    .on('data', (row) => {
        
        // selecionar as propriedades
        var imagens_data = [
            row['Imagem1'],
            row['Imagem2'],
            row['Imagem3'],
            row['Imagem4'],
            row['Imagem5'],
            row['Imagem6']
        ]
        
        // filtrar as virgulas extras
        imagens_data = imagens_data.filter(function(el) {
            return el != '';
        });

        // juntar por virgula
        imagens_data = imagens_data.join(',')

        // inserir row.push({'Imagens':'imagens_data'}) no csv
        row['Imagens'] = imagens_data;

        // deletar(pop) os Imagem1, Imagem2, Imagem3, Imagem4, Imagem5, Imagem6
        for (var i = 0; i < 7; i++) {
            delete row[`Imagem${i}`];
         }
       
        // retornar o valor de data/row
        results.push(row);
        // console.log(row);
        
    })
    .on('end', () => {
        console.log('CSV file successfully processed');
        // gravar o csv recebendo valores do data
        // console.log(results);

        var header = Object.getOwnPropertyNames(results[0]);
        header = header.map((val) => new Object({id: val, title: val}));

        const csvWriter = createCsvWriter({
            path: 'out.csv',
            header: header
          });
          
          csvWriter
            .writeRecords(results)
            .then(()=> console.log('The CSV file was written successfully'));
    });

    app.get('/', function (req, res) {
      res.send(results);
    });
    
    app.listen(3000, function () {
      console.log('Example app listening on port 3000!');
    });

    