<template>
    <div class="container">
      <h2>Endereços sem Vínculo</h2>
      <hr class="border border-dark border-1 opacity-50 custom-hr" />      
      <AdressUnlinkedList />
    </div> 
  </template>
  
  <script>
  import AdressUnlinkedList from '@/components/AdressUnlinkedList.vue';
  
  export default {
    components: {
        AdressUnlinkedList,
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
  