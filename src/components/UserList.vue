<template>
  <div class="row justify-content-center">

    <div class="d-flex justify-content-end">
      <router-link to="/users/create">
      <button type="button" class="btn btn-success ms-auto">
        <i class="bi bi-plus-lg me-1"></i>Adicionar Usuário
      </button>
    </router-link>
    </div>

    <div class="table-responsive">
      <table id="example" class="table table-bordered display" v-if="users.length > 0">
        <thead class="table-dark">
          <tr>
            <th>Nome</th>
            <th>CPF</th>
            <th>Cadastro</th>
            <th>Ação</th>
          </tr>
        </thead>
        <tbody>

        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import $ from 'jquery'; // Importando o jQuery
import { getUsers, deleteUser } from '@/services/userService';
import DataTable from 'datatables.net-dt';
import { formatCPF, formatDate } from '@/utils/formatters';

export default {
  data() {
    return {
      users: [],
    };
  },
  created() {
    this.loadUsers();
  },
  methods: {
    formatCPF,
    formatDate,
    async loadUsers() {
      try {
        // Carrega os usuários da API
        this.users = await getUsers();
        //console.log(this.users); // Verifica os dados carregados

        this.$nextTick(() => {
          // Verifica se o DataTable já foi inicializado
          if ($.fn.DataTable.isDataTable('#example')) {
            $('#example').DataTable().clear().destroy(); // Destrói instância anterior, se houver
          }

          // Inicializa o DataTable com os dados atualizados
          new DataTable('#example', {
            language: {
              sProcessing: "Processando...",
              sLengthMenu: "Mostrar _MENU_ registros",
              sZeroRecords: "Nenhum registro encontrado",
              sInfo: "Mostrando de _START_ até _END_ de _TOTAL_ registros",
              sInfoEmpty: "Mostrando 0 até 0 de 0 registros",
              sInfoFiltered: "(filtrado de _MAX_ registros no total)",
              sSearch: "Pesquisar:",
              oPaginate: {
                sFirst: "Primeiro",
                sPrevious: "Anterior",
                sNext: "Próximo",
                sLast: "Último"
              },
            },
            // Recarregar os dados no DataTable com o formato correto
            data: this.users, // Passa os dados para o DataTable
            columns: [
              { data: 'nome' },
              { data: 'cpf', render: (data) => formatCPF(data) },
              { data: 'created_at', render: (data) => formatDate(data) },
              {
                data: null, render: (data, type, row) => {
                  // Alterando os botões para chamar os métodos corretamente
                  return `
                    <button type="button" class="btn btn-primary mb-1" onclick="window.vueApp.editUser(${row.id})">Editar</button>
                    <button type="button" class="btn btn-danger mb-1" onclick="window.vueApp.deleteUser(${row.id})">Excluir</button>
                  `;
                }
              }
            ]
          });
        });
      } catch (error) {
        console.error('Erro ao carregar usuários:', error);
      }
    },
    editUser(id) {
      this.$router.push(`/users/${id}`);
    },
    async deleteUser(id) {
      try {
        await deleteUser(id);
        this.loadUsers();
      } catch (error) {
        console.error('Erro ao excluir usuário:', error);
      }
    },
  },
  mounted() {
    // Associar o Vue ao window para que as funções possam ser acessadas globalmente
    window.vueApp = this;
  }
};
</script>

<style scoped>
/* Estilos */
.user-list {
  margin-top: 20px;
}

button {
  margin-left: 10px;
}

/* Importando os estilos do DataTables */
@import 'datatables.net-dt';
</style>
