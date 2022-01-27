import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import Instances from '@/views/instances/Instances.vue';
import Groups from '@/views/groups/Groups.vue';
import Users from '@/views/users/Users.vue';

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
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
