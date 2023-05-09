class DespesaDAO {
    constructor(db) {
      this.db = db;
      this.collection = this.db.collection("despesas");
    }
  
    async criar(despesa) {
      const result = await this.collection.insertOne(despesa);
      return result.insertedId;
    }
  
    async calcularPagamentos(participantes, despesas) {
      const pagamentos = {};
      participantes.forEach((participante) => {
        pagamentos[participante] = 0;
      });
  
      despesas.forEach((despesa) => {
        const valorPorParticipante = despesa.valor / despesa.participantes.length;
        despesa.participantes.forEach((participante) => {
          if (participante === despesa.pagador) {
            pagamentos[participante] -= despesa.valor - valorPorParticipante;
          } else {
            pagamentos[participante] += valorPorParticipante;
          }
        });
      });
  
      return pagamentos;
    }
  }
  
  module.exports = DespesaDAO;
  