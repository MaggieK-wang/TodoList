import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);
export default new Vuex.Store({
  state: {
    userInfo: {},
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
    updateTodo(state, todo) {
      state.TodoList
    }
  },
  actions: {
    addTodo({ commit }, todo) {
      commit('addTodo', todo)
    },
    removeTodo({ commit }, todo) {
      commit('removeTodo', todo)
    },

    toggleTodo({ commit }, todo) {
      commit('editTodo', { todo, done: !todo.done })
    },

    // login({ commit }, userInfo) {
    //   // console.log(userInfo);
    //   // debugger
    //   sessionStorage.setItem(
    //     "loginAccount",
    //     JSON.stringify(userInfo.userAccount)
    //   );

    //   return new Promise((resolve, reject) => {
    //     login(userInfo)
    //       .then((response) => {
    //         sessionStorage.setItem("id", JSON.stringify(response.data.id));
    //         sessionStorage.setItem(
    //           "userSex",
    //           JSON.stringify(response.data.userSex)
    //         );
    //         sessionStorage.setItem(
    //           "frontScore",
    //           JSON.stringify(response.data.score)
    //         );

    //         const { data } = response;
    //         commit("SET_USER", data);
    //         resolve(data);
    //       })
    //       .catch((err) => {
    //         reject(err);
    //       });
    //   });
    // }
  },
  modules: {},
});
