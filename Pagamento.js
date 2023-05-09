class Pagamento {
    constructor(participantes, gastos) {
      this.participantes = participantes;
      this.gastos = gastos;
    }
  
    calcularPagamentos() {
      const totalGasto = this.gastos.reduce((acc, gasto) => acc + gasto, 0);
      const valorIndividual = totalGasto / this.participantes.length;
  
      const pagamentos = {};
  
      for (const pagador of this.participantes) {
        pagamentos[pagador] = {};
  
        let valorPago = 0;
        for (const recebedor of this.participantes) {
          if (recebedor === pagador) {
            continue;
          }
          const valorDevido = valorIndividual - this.gastos[this.participantes.indexOf(recebedor)] / this.participantes.filter(participante => participante !== pagador && participante !== recebedor).length;
          pagamentos[pagador][recebedor] = valorDevido;
          valorPago += valorDevido;
        }
  
        pagamentos[pagador]['totalPago'] = this.gastos[this.participantes.indexOf(pagador)] - valorPago;
      }
  
      return pagamentos;
    }
  }
  
  module.exports = Pagamento;
  