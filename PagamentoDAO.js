class PagamentoDAO {
    constructor(db) {
      this._db = db;
      this._pagamento = this._db.collection('pagamentos');
    }
  
    async criarPagamento(participantes, despesas) {
      const pagamentos = [];
  
      // Calcula o total gasto por participante
      const totaisGastos = {};
      despesas.forEach((despesa) => {
        despesa.participantes.forEach((participante) => {
          if (totaisGastos[participante]) {
            totaisGastos[participante] += despesa.valor / despesa.participantes.length;
          } else {
            totaisGastos[participante] = despesa.valor / despesa.participantes.length;
          }
        });
      });
  
      // Calcula quanto cada participante deve pagar aos outros
      participantes.forEach((pagador) => {
        participantes.forEach((recebedor) => {
          if (pagador !== recebedor) {
            const totalDevido = totaisGastos[recebedor] - totaisGastos[pagador];
            if (totalDevido > 0) {
              pagamentos.push({
                pagador: pagador,
                recebedor: recebedor,
                valor: totalDevido.toFixed(2),
              });
            }
          }
        });
      });
  
      // Salva os pagamentos no banco de dados
      const result = await this._pagamento.insertMany(pagamentos);
      return result.ops;
    }
  
    async listarPagamentos() {
      const pagamentos = await this._pagamento.find().toArray();
      return pagamentos;
    }
  }
  
  module.exports = PagamentoDAO;
  