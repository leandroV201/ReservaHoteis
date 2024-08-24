A fim de fazer funcionar o projeto deve ser criado o seguinte banco de dados
CREATE TABLE Quartos (
    id INT PRIMARY KEY AUTO_INCREMENT,
    numero_quarto INT NOT NULL,
    tipo_quarto VARCHAR(50) NOT NULL,
    preco DECIMAL(10, 2) NOT NULL,
    andar INT NOT NULL,
    disponivel BOOLEAN NOT NULL DEFAULT TRUE
);
devem ser baixados os pacotes com:
npm init -y
npm install express ejs mysql2
e deve ser feita alterações no db.js de acordo com seu banco.