<template>
  <nav class="navbar navbar-expand-lg bg-body-tertiary" data-bs-theme="dark">
    <div class="container-fluid">
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <li class="nav-item">
            <router-link to="/" class="nav-link" aria-current="page">Usuários</router-link>
          </li>
          <li class="nav-item">
            <router-link to="/adress_unlinked" class="nav-link">Endereços</router-link>
          </li>
        </ul>

      </div>
    </div>
  </nav>
</template>

<script>
export default {
  name: 'TopNavbar',
};
</script>

<style scoped>
/* Estilos personalizados, se necessário */
</style>