class Despesa {
    constructor(participantes = [], valores = []) {
      this.participantes = participantes;
      this.valores = valores;
    }
  
    // Adiciona um novo participante e valor à despesa
    adicionarDespesa(participante, valor) {
      this.participantes.push(participante);
      this.valores.push(valor);
    }
  
    // Calcula quanto cada participante deve pagar aos outros
    calcularPagamentos() {
      const total = this.valores.reduce((acc, valor) => acc + valor, 0);
      const media = total / this.participantes.length;
      const pagamentos = {};
  
      this.participantes.forEach((participante, index) => {
        const valorDevido = media - this.valores[index];
        pagamentos[participante] = {};
  
        this.participantes.forEach((outroParticipante, outroIndex) => {
          if (index !== outroIndex) {
            pagamentos[participante][outroParticipante] = valorDevido / (this.participantes.length - 1);
          }
        });
      });
  
      return pagamentos;
    }
  }
  