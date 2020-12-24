import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);
export default new Vuex.Store({
  state: {
    TodoList: [],
  },
  mutations: {
    SET_USER: (state, data) => {
      Object.assign(state.userInfo, data);
    },
    addTodo(state, todo) {
      state.TodoList.push(todo)
    },
    removeTodo(state, todo) {
      state.TodoList.splice(state.TodoList.indexOf(todo), 1)
    },
    changeStatus(state, todo) {
      todo.task_status = '1';
    },
  },
  actions: {
    addTodo({ commit }, todo) {
      commit('addTodo', todo)
    },
    removeTodo({ commit }, todo) {
      commit('removeTodo', todo)
    },
    // toggleTodo({ commit }, todo) {
    //   commit('editTodo', { todo, done: !todo.done })
    // },
    changeStatus({ commit }, todo) {
      commit('changeStatus', todo)
    },
    getters: {
      doneTodos: state => {
        return state.TodoList.filter(v => (v.task_status == '1'))
      }
    }

  },
  modules: {},
});
