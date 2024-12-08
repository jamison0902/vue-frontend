<template>
  <div id="app">
    <TopNavbar />    
    <router-view /> <!-- Aqui a rota será renderizada -->
  </div>
</template>

<script>
import TopNavbar from './components/TopNavbar.vue';

export default {
  name: 'App',
  components: {
    TopNavbar
  },  
};
</script>
