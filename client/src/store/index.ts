import { InstancesApi } from '@/api/instances';
import { createStore } from 'vuex';

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

      if (instances.length) store.commit('SET_CURRENT_INSTANCE', instances[0]);
    },
  },
});
