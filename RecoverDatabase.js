const fs = require('fs');

function readFiles(fileOne, fileTwo) {
    try {
        const dataOne = fs.readFileSync(fileOne, 'utf8');
        const dataTwo = fs.readFileSync(fileTwo, 'utf8');
        const jsonOne = JSON.parse(dataOne);
        const jsonTwo = JSON.parse(dataTwo);
        return { jsonOne, jsonTwo };
    } catch (error) {
        console.error('Erro na leitura dos arquivos: ', error.message);
        return null;
    }
}

function fixNames(data) {
    const replaceCharacters = (str) => {
        return str.replace(/æ/g, 'a').replace(/ø/g, 'o');
    };

    const fixAllNames = (obj) => {
        for (let key in obj) {
            if (typeof obj[key] === 'string') {
                obj[key] = replaceCharacters(obj[key]);
            } else if (typeof obj[key] === 'object') {
                fixAllNames(obj[key]);
            }
        }
    };

    if (data) {
        fixAllNames(data);
    }

    return data;
}

function fixSales(data) {
    const fixAllSales = (obj) => {
        for (let key in obj) {
            if (typeof obj[key] === 'string' && !isNaN(obj[key])) {
                obj[key] = parseFloat(obj[key]);
            } else if (typeof obj[key] === 'object') {
                fixAllSales(obj[key]);
            }
        }
    };

    if (data) {
        fixAllSales(data);
    }

    return data;
}

function exportFiles(destinationPath, fileName, data) {
    try {
        if (!data) {
            console.error(`Erro ao exportar o arquivo ${fileName}: Os dados são indefinidos ou nulos.`);
            return;
        }

        const filePath = `${destinationPath}/${fileName}`;
        const jsonData = typeof data === 'object' ? JSON.stringify(data, null, 2) : data.toString();

        fs.writeFileSync(filePath, jsonData);
        console.log(`O arquivo ${filePath} foi exportado com sucesso!`);
    } catch (error) {
        console.error(`Erro ao exportar o arquivo ${fileName}:`, error.message);
    }
}

const destinationPath = 'C:/Users/Giovana/Downloads/Projeto/Database';

const { jsonOne, jsonTwo } = readFiles('C:/Users/Giovana/Downloads/Projeto/Database/broken_database_1.json', 'C:/Users/Giovana/Downloads/Projeto/Database/broken_database_2.json');

if (jsonOne && jsonTwo) {
    const fixed_database_1 = fixSales(fixNames(jsonOne));
    const fixed_database_2 = fixSales(fixNames(jsonTwo));

    exportFiles(destinationPath, 'fixed_database_1.json', fixed_database_1);
    exportFiles(destinationPath, 'fixed_database_2.json', fixed_database_2);
}