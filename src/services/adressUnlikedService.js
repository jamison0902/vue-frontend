import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000/api/enderecos/unlinked'; // URL base da API


// Função para buscar todos os endereços sem link
export const getAdressUnlinked = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    handleError(error, 'Erro ao buscar endereços');
  }
};

// Função para tratamento de erro
const handleError = (error, message) => {
  console.error(message, error);
  throw error;  // Re-throw para que a chamada do serviço possa lidar com o erro
};