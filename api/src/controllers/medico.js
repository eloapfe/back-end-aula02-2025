const db = require('../config/database'); 

exports.cadastrarMedico = (req, res) => {
    const { nome, crm, especialidade, telefone, email } = req.body;
    const query = 'INSERT INTO medicos (nome, crm, especialidade, telefone, email) VALUES (?, ?, ?, ?, ?)';
    
    db.query(query, [nome, crm, especialidade, telefone, email], (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.status(201).json({ id: result.insertId, nome, crm, especialidade, telefone, email });
    });
};

exports.editarMedico = (req, res) => {
    const { id } = req.params;
    const { nome, crm, especialidade, telefone, email } = req.body;
    const query = 'UPDATE medicos SET nome = ?, crm = ?, especialidade = ?, telefone = ?, email = ? WHERE id = ?';
    
    db.query(query, [nome, crm, especialidade, telefone, email, id], (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.status(200).json({ message: 'Médico atualizado com sucesso' });
    });
};

exports.excluirMedico = (req, res) => {
    const { id } = req.params;
    const query = 'DELETE FROM medicos WHERE id = ?';
    
    db.query(query, [id], (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.status(200).json({ message: 'Médico excluído com sucesso' });
    });
};

exports.listarMedicos = (req, res) => {
    const query = 'SELECT * FROM medicos';
    
    db.query(query, (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.status(200).json(results);
    });
};