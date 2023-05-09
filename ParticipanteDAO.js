const { ObjectId } = require('mongodb');

class ParticipanteDAO {
  constructor(db) {
    this._db = db;
    this._collection = this._db.collection('participantes');
  }

  async criarParticipante(nome) {
    const participante = {
      nome,
      gastos: {},
    };
    const result = await this._collection.insertOne(participante);
    return result.insertedId;
  }

  async adicionarGasto(idParticipante, nomeParticipante, valor) {
    const filter = { _id: ObjectId(idParticipante) };
    const update = { $set: { [`gastos.${nomeParticipante}`]: valor } };
    await this._collection.updateOne(filter, update);
  }

  async calcularDividas(idParticipante) {
    const filter = { _id: ObjectId(idParticipante) };
    const participante = await this._collection.findOne(filter);
    const gastos = participante.gastos;
    const totalGasto = Object.values(gastos).reduce((total, valor) => total + valor, 0);
    const qtdParticipantes = Object.keys(gastos).length;
    const valorPorParticipante = totalGasto / qtdParticipantes;
    const dividas = {};
    for (const nome in gastos) {
      dividas[nome] = valorPorParticipante - gastos[nome];
    }
    return dividas;
  }
}

module.exports = ParticipanteDAO;
