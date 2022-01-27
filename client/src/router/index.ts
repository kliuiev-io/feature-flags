import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router';
import Instances from '@/views/instances/Instances.vue';
import Groups from '@/views/groups/Groups.vue';
import Users from '@/views/users/Users.vue';
import Client from '@/views/client/Client.vue';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    redirect: '/instances',
  },
  {
    path: '/instances',
    name: 'Instances',
    component: Instances,
  },
  {
    path: '/groups',
    name: 'Groups',
    component: Groups,
  },
  {
    path: '/users',
    name: 'Users',
    component: Users,
  },
  {
    path: '/client',
    name: 'Client',
    component: Client,
  },
];

const router = createRouter({
  history: createWebHashHistory(process.env.BASE_URL),
  routes,
});

export default router;
