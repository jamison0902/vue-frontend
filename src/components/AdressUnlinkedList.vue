<template>
    <div class="row justify-content-center">
      <div class="table-responsive">
        <table id="example" class="table table-bordered display">
          <thead class="table-dark">
            <tr>
              <th>ID</th>
              <th>CEP</th>
              <th>Logradouro</th>
              <th>Bairro</th>
              <th>Cidade</th>
              <th>Estado</th>
              <th>Número</th>
              <th>Complemento</th>
            </tr>
          </thead>
          <tbody></tbody>
        </table>
      </div>
    </div>
  </template>
  
  <script>
  import $ from "jquery"; 
  import DataTable from "datatables.net-dt";
  import { getAdressUnlinked } from "@/services/adressUnlikedService";
  
  export default {
    data() {
      return {
        adressUnliked: [], // Dados para a tabela
      };
    },
    methods: {
      async loadAdressUnlinked() {
        try {
          // Carregar dados da API
          this.adressUnliked = await getAdressUnlinked();
  
          // Inicializar DataTable após carregar os dados
          this.$nextTick(() => {
            // Destruir instância anterior, se existir
            if ($.fn.DataTable.isDataTable("#example")) {
              $("#example").DataTable().clear().destroy();
            }
  
            // Inicializar o DataTable
            new DataTable("#example", {
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
                  sLast: "Último",
                },
              },
              data: this.adressUnliked, // Dados para a tabela
              columns: [
                { data: "id" }, // Certifique-se de que as chaves correspondem aos dados retornados
                { data: "cep" },
                { data: "logradouro" },
                { data: "bairro" },
                { data: "cidade" },
                { data: "estado" },
                { data: "numero" },
                { data: "complemento" },
              ],
            });
          });
        } catch (error) {
          console.error("Erro ao carregar endereços:", error);
        }
      },
    },
    mounted() {
      this.loadAdressUnlinked(); // Carregar os dados ao montar o componente
    },
  };
  </script>
  
  <style scoped>
  /* Estilos para melhorar o layout */
  .user-list {
    margin-top: 20px;
  }
  
  /* Importar estilos do DataTables */
  @import "datatables.net-dt";
  </style>
  