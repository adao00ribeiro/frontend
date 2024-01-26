
export const state = () => ({
  courses: [],
  selectedcourse: null
})
export const getters = {
  listcourse(state) {
    return state.courses;
  },
  SelectedCourse(state) {
    return state.selectedcourse;
  }
}

export const mutations = {
  addCourses(state, payload) {
    state.courses.push({ ...payload });
  },
  addSelectedCourse(state, payload) {
    state.selectedcourse = payload;
  },
  clearCourses(state) {
    state.courses = [];
  }
}

export const actions = {
  AdicionarCourse({ commit }, payload) {
    commit('addCourses', payload)
  },
  AdicionarSelectedCourse({ commit }, payload) {
    commit('addSelectedCourse', payload)
  },
  LimparCourses({ commit }) {
    commit('clearCourses');
  },
  async GetCoursesAsync({ commit }) {
    try {
      commit('clearCourses');
      const courses = await this.$axios.$get(process.env.DIGITALMATRICULA_API_URL + '/course')

      courses.forEach(course => {
        console.log(course.name)
        commit('addCourses', course);
      });
    } catch (error) {
      console.log(error)
    }

  }
}
