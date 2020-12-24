import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);
export default new Vuex.Store({
  state: {
    userInfo: {},
    context: '',
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
      state.TodoList.splice(todo, 1)
    },

    editTodo(state, { todo, text = todo.text, done = todo.done }) {
      const index = state.todos.indexOf(todo)
      state.todos.splice(index, 1, {
        ...todo,
        text,
        done
      })
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

    editTodo({ commit }, { todo, value }) {
      commit('editTodo', { todo, text: value })
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
