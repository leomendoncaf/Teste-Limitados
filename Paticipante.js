class Participante {
  constructor(nome) {
    this.nome = nome;
    this.gastos = [];
    this.pagamentos = [];
  }

  adicionarGasto(descricao, valor, participantes) {
    const gasto = {
      descricao,
      valor,
      participantes: participantes.filter(p => p !== this.nome),
      pagamentos: {},
    };

    const valorPorParticipante = valor / gasto.participantes.length;

    gasto.participantes.forEach(p => {
      gasto.pagamentos[p] = valorPorParticipante;
    });

    this.gastos.push(gasto);

    return gasto;
  }

  get totalGasto() {
    return this.gastos.reduce((total, gasto) => total + gasto.valor, 0);
  }

  get totalPago() {
    return this.gastos.reduce((total, gasto) => {
      const pagamentos = Object.values(gasto.pagamentos);
      return total + pagamentos.reduce((total, pagamento) => total + pagamento, 0);
    }, 0);
  }

  get totalAPagar() {
    const totalPago = this.totalPago;
    const totalGasto = this.totalGasto;
    return totalGasto - totalPago;
  }

  pagarPara(participante) {
    const gastos = this.gastos.filter(gasto => gasto.participantes.includes(participante.nome));
    const pagamentos = gastos.map(gasto => gasto.pagamentos[this.nome] || 0);
    const totalAPagar = pagamentos.reduce((total, pagamento) => total + pagamento, 0);
    return totalAPagar;
  }
}

module.exports = Participante;
