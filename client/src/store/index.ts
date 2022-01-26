import { InstancesApi } from '@/api/instances';
import { createStore } from 'vuex';

const STORAGE_INSTANCE_KEY = 'currentInstance';

export default createStore({
  state: {
    currentInstance: null,
    instances: [],
  },
  mutations: {
    SET_INSTANCES(state, instances) {
      state.instances = instances;
    },
    SET_CURRENT_INSTANCE(state, currentInstance) {
      state.currentInstance = currentInstance;
    },
  },
  actions: {
    async fetchInstances(store) {
      const instances = await InstancesApi.getInstances();

      store.commit('SET_INSTANCES', instances);

      if (!instances.length) return;

      if (instances.includes(localStorage.getItem(STORAGE_INSTANCE_KEY) || '')) {
        store.commit('SET_CURRENT_INSTANCE', localStorage.getItem(STORAGE_INSTANCE_KEY));
      } else {
        store.commit('SET_CURRENT_INSTANCE', instances[0]);
      }
    },

    changeInstance(store, instance) {
      store.commit('SET_CURRENT_INSTANCE', instance);
      localStorage.setItem(STORAGE_INSTANCE_KEY, instance);
      location.reload();
    }
  },
});
