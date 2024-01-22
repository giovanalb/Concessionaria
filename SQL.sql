CREATE TABLE database (
    data DATE,                          
    vendas INT,                         
    valor_do_veiculo DECIMAL(10, 2),    
    nome TEXT,                          
    id_marca INT,                       
    marca TEXT                          
);

INSERT INTO database (data, vendas, valor_do_veiculo, nome, id_marca)
SELECT data, vendas, valor_do_veiculo, nome, id_marca_
FROM fixed_database_1;

UPDATE database
SET marca = (
    SELECT fixed_database_2.marca
    FROM fixed_database_2
    WHERE database.id_marca = fixed_database_2.id_marca
);

SELECT * FROM database;