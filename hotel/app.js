const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const db = require('./db');
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.set('view engine', 'ejs');
app.use(express.static('public'));

app.get('/', (req, res) => {
    const { tipo, andar, precoMax, mostrarOcupados } = req.query;
    let sql = 'SELECT * FROM Quartos WHERE 1=1';
    const params = [];

    if (tipo) {
        sql += ' AND tipo_quarto = ?';
        params.push(tipo);
    }
    if (andar) {
        sql += ' AND andar = ?';
        params.push(andar);
    }
    if (precoMax) {
        sql += ' AND preco <= ?';
        params.push(precoMax);
    }
    if (!mostrarOcupados) {
        sql += ' AND disponivel = TRUE';
    }

    db.query(sql, params, (err, results) => {
        if (err) {
            return res.status(500).send('Erro ao buscar dados.');
        }
        res.render('index', { quartos: results });
    });
}); app.get('/quarto/:id', (req, res) => {
    const { id } = req.params;

    const sql = 'SELECT * FROM Quartos WHERE id = ?';

    db.query(sql, [id], (err, results) => {
        if (err) {
            return res.status(500).send('Erro ao buscar dados do quarto.');
        }
        if (results.length === 0) {
            return res.status(404).send('Quarto não encontrado.');
        }
        res.render('quarto', { quarto: results[0] });
    });
}); app.post('/agendar', (req, res) => {
    const { id, checkin, checkout } = req.body;

    console.log('Dados recebidos:', req.body);

    if (!id || !checkin || !checkout) {
        return res.status(400).send('Todos os campos são obrigatórios.');
    }

    const sql = 'UPDATE Quartos SET disponivel = FALSE WHERE id = ?';

    db.query(sql, [id], (err, result) => {
        if (err) {
            console.error('Erro ao atualizar disponibilidade:', err);
            return res.status(500).send('Erro ao agendar a estadia.');
        }
        res.send(`
            <h1>Estadia agendada com sucesso!</h1>
            <p>Você será redirecionado para a página inicial em alguns segundos.</p>
            <script>
                setTimeout(function(){
                    window.location.href = '/';
                }, 3000); // 3000 milissegundos = 3 segundos
            </script>
        `);

    });
});

app.listen(3000, () => {
    console.log('Servidor rodando na porta 3000');
});