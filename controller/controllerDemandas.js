const Demanda = require('../model/modelos');

exports.cria_get = function (req, res) {
    const contexto = {
        titulo_pagina: "Criar nova demanda",
    }

    res.render('cria_demanda', contexto);
}

exports.cria_post = async function (req, res) {
    const nova_demanda = {
        titulo: req.body.titulo,
        texto: req.body.texto,
        urgencia: req.body.urgencia,
        // status padrão 'pendente', definido no modelo
    };

    try {
        await Demanda.create(nova_demanda);
        return res.redirect('/');
    } catch (error) {
        console.error('Erro ao criar demanda: ', error);
        return res.status(500).send('Erro ao criar demanda');
    }
};

exports.consulta = async function (req, res) {
    const id_demanda = req.params.id;
    const demanda = await Demanda.findByPk(id_demanda);

    // formata a data de criação de cada demanda para o formato brasileiro
    demanda.criada_em_fmt = new Date(demanda.criada_em).toLocaleDateString('pt-BR');

    const contexto = {
        titulo_pagina: "Detalhes da Demanda",
        demanda: demanda,
    }

    res.render('consulta_demanda', contexto);
}

exports.altera_status = async function (req, res) {
    const id_demanda = req.params.id;
    const novo_status = req.params.novo_status;

    await Demanda.update(
        { status: novo_status },  // novos valores dos atributos
        { where: { id: id_demanda } } // condição para encontrar a demanda a ser utilizada
    );
    return res.redirect('/');
}