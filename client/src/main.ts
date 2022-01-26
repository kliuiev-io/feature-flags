import { createApp } from 'vue';
import Element from 'element-plus';
import App from './App.vue';
import router from './router';
import store from './store';
import 'element-plus/dist/index.css';


async function initialize() {
  await store.dispatch('fetchInstances');
  createApp(App).use(store).use(router).use(Element).mount('#app');
}


initialize();