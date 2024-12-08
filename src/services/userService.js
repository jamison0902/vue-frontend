import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000/api/users'; // URL base da API

// Função para tratamento de erro
const handleError = (error, message) => {
  console.error(message, error);
  throw error;  // Re-throw para que a chamada do serviço possa lidar com o erro
};

// Função para verificar se o CPF já existe
export async function checkCpf(cpf) {
  try {
    const response = await axios.get(`${API_URL}?cpf=${cpf}`);
    return response.data; // Exemplo de retorno: { exists: true/false }
  } catch (error) {
    handleError(error, 'Erro ao verificar CPF');
  }
}

// Função para verificar se o e-mail já existe
export async function checkEmail(email) {
  try {
    const response = await axios.get(`${API_URL}?email=${email}`); 
    return response.data; // Exemplo de retorno: { exists: true/false }
  } catch (error) {
    handleError(error, 'Erro ao verificar e-mail');
  }
}

// Função para buscar todos os usuários
export const getUsers = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    handleError(error, 'Erro ao buscar usuários');
  }
};

// Função para buscar um usuário por ID
export const getUserById = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    handleError(error, 'Erro ao buscar usuário');
  }
};

// Função para criar um novo usuário
export const createUser = async (userData) => {
  try {
    const response = await axios.post(API_URL, userData);
    return response.data;
  } catch (error) {
    handleError(error, 'Erro ao criar usuário');
  }
};

// Função para editar um usuário
export const updateUser = async (id, userData) => {
  try {
    console.log('Dados enviados para a atualização do usuário:', userData);
    const response = await axios.put(`${API_URL}/${id}`, userData);
    return response.data;
  } catch (error) {
    handleError(error, 'Erro ao atualizar usuário');
  }
};

// Função para excluir um usuário
export const deleteUser = async (id) => {
  try {
    const response = await axios.delete(`${API_URL}/${id}`);
    return response.status === 200; // Retorne um status de sucesso
  } catch (error) {
    handleError(error, 'Erro ao excluir usuário');
  }
};
