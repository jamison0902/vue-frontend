export function formatCPF(cpf) {
    if (!cpf) return '';
    return cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4'); // Formato CPF
  }
  
  export function formatDate(dateString) {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR'); // Formato brasileiro
  }

  export function validarCpf(cpf) {
    // Remove caracteres não numéricos
    cpf = cpf.replace(/\D/g, '');
  
    // Verifica se tem 11 dígitos e não é uma sequência repetida
    if (cpf.length !== 11 || /^(\d)\1+$/.test(cpf)) {
      return false;
    }
  
    // Calcula os dois dígitos verificadores
    const calcDigito = (baseCpf, peso) => {
      let soma = 0;
      for (let i = 0; i < baseCpf.length; i++) {
        soma += parseInt(baseCpf[i]) * (peso - i);
      }
      const resto = soma % 11;
      return resto < 2 ? 0 : 11 - resto;
    };
  
    const baseCpf = cpf.substring(0, 9);
    const digito1 = calcDigito(baseCpf, 10);
    const digito2 = calcDigito(baseCpf + digito1, 11);
  
    // Verifica se os dígitos calculados batem com os informados
    return cpf === baseCpf + digito1 + digito2;
  }
  