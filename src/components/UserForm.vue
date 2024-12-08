<template>
  <!-- Adicionando v-bind="$attrs" ao nó raiz -->
  <div class="container" v-bind="$attrs">
    <h2>{{ isEdit ? 'Editar' : 'Criar' }} Usuário</h2>
    <hr class="border border-dark border-1 opacity-50 custom-hr" />

    <form @submit.prevent="submitForm">
      <div class="mb-3">
        <label for="nome" class="form-label">Nome</label>
        <input type="text" id="nome" class="form-control" v-model="user.nome" required />
      </div>

      <div class="mb-3">
        <label for="email" class="form-label">Email</label>
        <input type="email" id="email" class="form-control" autocomplete="email" v-model="user.email" required />
        <p v-if="emailError" class="error text-danger">{{ emailError }}</p>
      </div>

      <div class="mb-3">
        <label for="cpf" class="form-label">CPF</label>
        <input type="text" id="cpf" class="form-control" v-model="user.cpf" maxlength="11" pattern="\d{11}" required />
        <p v-if="cpfError" class="error text-danger">{{ cpfError }}</p>
      </div>

      <div class="mb-3">
        <label for="perfil_id" class="form-label">Perfil</label>
        <select class="form-select" id="perfil_id" aria-label="Default select example" v-model="user.perfil_id"
          required>
          <option disabled value="">Selecione um perfil</option>
          <option value="1">Administrador</option>
          <option value="2">Usuário</option>
          <option value="3">Gerente</option>
        </select>
      </div>

      <!-- Lista de Endereços -->
      <div class="mb-3">
        <button type="button" class="btn btn-info mt-2 mb-3" @click="modalVisible = true">Adicionar Endereço</button>
        <ul class="list-group">
          <li class="list-group-item" v-for="(endereco, index) in user.enderecos" :key="index">
            {{ endereco.logradouro }}, {{ endereco.numero }} - {{ endereco.cidade }} / {{ endereco.estado }}
            <button type="button" class="btn btn-danger btn-sm float-end"
              @click="removerEndereco(index)">Excluir</button>
          </li>
        </ul>
      </div>

      <div class="mb-3 d-flex align-items-center">
        <router-link to="/" class="me-3">
          <button type="button" class="btn btn-primary">Voltar</button>
        </router-link>
        <button class="btn btn-success" type="submit">{{ isEdit ? 'Atualizar' : 'Salvar' }}</button>
      </div>
    </form>
  </div>

  <!-- Modal para adicionar endereço -->
  <div v-if="modalVisible" class="modal fade show" tabindex="-1" style="display: block;" aria-modal="true"
    role="dialog">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">Adicionar Endereço</h5>
          <button type="button" class="btn-close" aria-label="Close" @click="modalVisible = false"></button>
        </div>
        <div class="modal-body">
          <div class="mb-3">
            <label for="cep" class="form-label">CEP</label>
            <input type="text" id="cep" class="form-control" pattern="\d{8}" v-model="novoEndereco.cep"
              @input="novoEndereco.cep = novoEndereco.cep.replace(/[^0-9]/g, '')" @blur="consultarCep" required
              inputmode="numeric" maxlength="8" />
          </div>
          <div class="mb-3">
            <label for="logradouro" class="form-label">Logradouro</label>
            <input type="text" id="logradouro" class="form-control" v-model="novoEndereco.logradouro" readonly
              required />
          </div>
          <div class="mb-3">
            <label for="bairro" class="form-label">Bairro</label>
            <input type="text" id="bairro" class="form-control" v-model="novoEndereco.bairro" readonly required />
          </div>
          <div class="mb-3">
            <label for="cidade" class="form-label">Cidade</label>
            <input type="text" id="cidade" class="form-control" v-model="novoEndereco.cidade" readonly required />
          </div>
          <div class="mb-3">
            <label for="estado" class="form-label">Estado</label>
            <input type="text" id="estado" class="form-control" v-model="novoEndereco.estado" readonly required />
          </div>
          <div class="mb-3">
            <label for="numero" class="form-label">Número</label>
            <input type="text" id="numero" class="form-control" v-model="novoEndereco.numero" required />
          </div>
          <div class="mb-3">
            <label for="complemento" class="form-label">Complemento</label>
            <input type="text" id="complemento" class="form-control" v-model="novoEndereco.complemento" />
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" @click="modalVisible = false">Cancelar</button>
          <button type="button" class="btn btn-primary" @click="adicionarEndereco">Adicionar Endereço</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getUserById, createUser, updateUser, checkCpf, checkEmail } from '@/services/userService';

export default {
  data() {
    return {
      user: {
        nome: '',
        email: '',
        cpf: '',
        perfil_id: '',
        enderecos: [] // Array para armazenar os endereços
      },
      originalCpf: '', // CPF original
      originalEmail: '', // E-mail original
      emailError: '',
      cpfError: '',
      isEdit: false,
      modalVisible: false, // Controla a visibilidade do modal
      novoEndereco: {
        cep: '',
        logradouro: '',
        bairro: '',
        cidade: '',
        estado: '',
        numero: '',
        complemento: ''
      }
    };
  },
  created() {
    const route = this.$route;
    if (route.params.id) {
      this.isEdit = true;
      this.loadUser(route.params.id);
    }
  },
  methods: {
    // Função para lidar com erros e atualizar a mensagem de erro
    handleError(error, defaultMessage) {
      // Verifica se o erro tem uma mensagem específica
      if (error.response && error.response.data && error.response.data.message) {
        this.errorMessage = error.response.data.message;  // Usa a mensagem da API
      } else {
        this.errorMessage = defaultMessage || 'Erro desconhecido';  // Mensagem padrão
      }
    },
    async loadUser(id) {
      try {
        const userData = await getUserById(id);
        this.user = userData;
        this.originalCpf = userData.cpf; // Armazena o CPF original
        this.originalEmail = userData.email; // Armazena o e-mail original
      } catch (error) {
        console.error('Erro ao carregar usuário:', error);
      }
    },
    // Função para verificar se o CPF já existe
    async checkIfCpfExists() {
      if (this.isEdit && this.user.cpf === this.originalCpf) {
        return true; // Se o CPF não mudou, não valida
      }

      try {
        const response = await checkCpf(this.user.cpf);
        if (response.length>0) {
          this.cpfError = 'O CPF já está cadastrado.';
          return false;
        }
        this.cpfError = ''; // Limpa erros
        return true;
      } catch (error) {
        console.error('Erro ao verificar CPF:', error);
      }
    },
    // Função para verificar se o e-mail já existe
    async checkIfEmailExists() {
      if (this.isEdit && this.user.email === this.originalEmail) {
        return true; // Se o e-mail não mudou, não valida
      }

      try {
        const response = await checkEmail(this.user.email);
        if (response.length>0) {
          this.emailError = 'O E-mail já está cadastrado.';
          return false;
        }
        this.emailError = ''; // Limpa erros
        return true;
      } catch (error) {
        console.error('Erro ao verificar e-mail:', error);
      }
    },
    // Envio do formulario
    async submitForm() {
      // Primeiramente, verifica se CPF e e-mail estão disponíveis
      const cpfExists = await this.checkIfCpfExists();
      const emailExists = await this.checkIfEmailExists();

      //console.log(`Erro ao verificar e-mail: cpfExists=${cpfExists}, emailExists=${emailExists}`);

      // Se algum dos campos não for válido, impede o submit
      if (!cpfExists || !emailExists) {
        return;
      }

      try {
        if (this.isEdit) {
          await updateUser(this.user.id, this.user);
        } else {
          await createUser(this.user);
        }
        this.$router.push('/'); // Redirecionar para a página inicial após salvar
      } catch (error) {
        console.error('Erro ao salvar usuário:', error);
      }
    },
    async consultarCep() {
      const cep = this.novoEndereco.cep.replace(/\D/g, ''); // Remove tudo que não for número
      if (cep.length === 8) {
        try {
          const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
          const data = await response.json();
          if (!data.erro) {
            // Preenche os campos com as informações retornadas
            this.novoEndereco.logradouro = data.logradouro;
            this.novoEndereco.bairro = data.bairro;
            this.novoEndereco.cidade = data.localidade;
            this.novoEndereco.estado = data.uf;
          } else {
            alert('CEP não encontrado');
          }
        } catch (error) {
          console.error('Erro ao consultar CEP:', error);
        }
      }
    },
    // Função para adicionar o novo endereço ao array de endereços
    adicionarEndereco() {
      // Valida o campo CEP (somente números e com 8 dígitos)
      const cepValido = this.novoEndereco.cep && this.novoEndereco.cep.replace(/\D/g, '').length === 8;

      if (cepValido && this.novoEndereco.numero) {
        this.user.enderecos.push({ ...this.novoEndereco });

        // Limpa o formulário após adicionar
        this.novoEndereco = {
          cep: '',
          logradouro: '',
          bairro: '',
          cidade: '',
          estado: '',
          numero: '',
          complemento: ''
        };

        // Fecha o modal
        this.modalVisible = false;
      } else {
        // Exibe uma mensagem se algum campo não for válido
        if (!cepValido) {
          alert('CEP inválido. O CEP deve conter 8 dígitos numéricos.');
        } else {
          alert('Preencha os campos obrigatórios.');
        }
      }
    },
    // Função para remover um endereço
    removerEndereco(index) {
      this.user.enderecos.splice(index, 1);
    },
  },
};
</script>

<style scoped>
.container {
  margin-top: 20px;
}

.custom-hr {
  margin-top: -3px;
}
</style>
