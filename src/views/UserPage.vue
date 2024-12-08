<template>
  <div class="container">
    <h2>Lista de Usuários</h2>
    <hr class="border border-dark border-1 opacity-50 custom-hr" />
    
    <UserList />
  </div> 
</template>

<script>
import UserList from '@/components/UserList.vue';

export default {
  components: {
    UserList,
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
