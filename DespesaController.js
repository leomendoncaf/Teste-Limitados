const Despesa = require('./Despesa.js');

class DespesaController {
  constructor() {
    this.despesas = [];
  }

  criarDespesa(participantes, valores) {
    const despesa = new Despesa(participantes, valores);
    this.despesas.push(despesa);
    despesa.salvar();
  }

  getDespesas() {
    return this.despesas;
  }

  getDivisaoDespesas() {
    const divisao = {};
    const totalGastoPorPessoa = {};
    let totalGeral = 0;

    // Calcula o total gasto por pessoa e o total geral
    for (const despesa of this.despesas) {
      const participantes = despesa.getParticipantes();
      const valores = despesa.getValores();
      const valorTotal = valores.reduce((acc, curr) => acc + curr, 0);
      totalGeral += valorTotal;

      for (let i = 0; i < participantes.length; i++) {
        const participante = participantes[i];
        const valor = valores[i];

        if (!totalGastoPorPessoa[participante]) {
          totalGastoPorPessoa[participante] = 0;
        }
        totalGastoPorPessoa[participante] += valor;
      }
    }

    // Calcula a divisão das despesas
    for (const participante1 in totalGastoPorPessoa) {
      for (const participante2 in totalGastoPorPessoa) {
        if (participante1 !== participante2) {
          if (!divisao[participante1]) {
            divisao[participante1] = {};
          }
          const valorPagar = totalGeral / Object.keys(totalGastoPorPessoa).length - totalGastoPorPessoa[participante1] / Object.keys(totalGastoPorPessoa).length + totalGastoPorPessoa[participante2] / Object.keys(totalGastoPorPessoa).length;
          divisao[participante1][participante2] = Math.round(valorPagar * 100) / 100;
        }
      }
    }

    return divisao;
  }
}

module.exports = DespesaController;
