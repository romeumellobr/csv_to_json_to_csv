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

        results.push(row);
        
    })
    .on('end', () => {
        console.log('CSV file successfully processed');

        var header = Object.getOwnPropertyNames(results[0]);
        header = header.map((val) => new Object({id: val, title: val}));

        const csvWriter = createCsvWriter({
            path: 'out.csv',
            header: header
          });
          
          // Write CSV file
          csvWriter
            .writeRecords(results)
            .then(()=> console.log('The CSV file was written successfully'));
    });

    // Send JSON to Browser
    app.get('/', function (req, res) {
      res.send(results);
    });
    
    app.listen(3000, function () {
      console.log('Example app listening on port 3000!');
    });