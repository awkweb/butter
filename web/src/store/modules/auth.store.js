import {
  SET_USER,
} from '@/store/constants';

const store = {
  state: {
    user: JSON.parse(localStorage.getItem('user')) || null,
  },
  actions: {},
  mutations: {
    [SET_USER](state, user) {
      if (user) localStorage.setItem('user', JSON.stringify(user));
      else localStorage.removeItem('user');
      state.user = user;
    },
  },
  getters: {
    user: state => state.user,
  },
};

export default { ...store };
