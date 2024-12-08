import { createRouter, createWebHistory } from 'vue-router';
import UserForm from '@/components/UserForm.vue'; 
import UserPage from '@/views/UserPage.vue';
import AdressUnlinkedPage from '@/views/AdressUnlinkedPage.vue';

const routes = [
  {
    path: '/',
    name: 'home',
    component: UserPage, // Página principal para gerenciar usuários    
  },
  {
    path: '/adress_unlinked',
    name: 'adress_unlinked',
    component: AdressUnlinkedPage, // Página principal para gerenciar endereços    
  },
  {
    path: '/users/:id',
    name: 'userEdit',
    component: UserForm, // Página de edição de usuário
    props: true, // Passa o id como prop para o componente
  },
  {
    path: '/users/create',
    name: 'userCreate',
    component: UserForm, // Página de criação de usuário
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
