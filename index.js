const csv = require('csv-parser');
const fs = require('fs');
const createCsvWriter = require('csv-writer').createObjectCsvWriter;

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
        
        const csvWriter = createCsvWriter({
            path: 'out.csv',
            header: [
              {id: 'name', title: 'Name'},
              {id: 'surname', title: 'Surname'},
              {id: 'age', title: 'Age'},
              {id: 'gender', title: 'Gender'},
            ]
          });
          
          const data = [
            {
              name: 'John',
              surname: 'Snow',
              age: 26,
              gender: 'M'
            }, {
              name: 'Clair',
              surname: 'White',
              age: 33,
              gender: 'F',
            }, {
              name: 'Fancy',
              surname: 'Brown',
              age: 78,
              gender: 'F'
            }
          ];
          
          csvWriter
            .writeRecords(data)
            .then(()=> console.log('The CSV file was written successfully'));


    });


    