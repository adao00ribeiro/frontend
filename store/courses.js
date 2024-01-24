
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
  }
}

export const actions = {
  AdicionarCourse({ commit }, payload) {
    commit('addCourses', payload)
  },
  AdicionarSelectedCourse({ commit }, payload) {
    commit('addSelectedCourse', payload)
  },
  async GetCoursesAsync({ commit }) {
    try {
      const courses = await this.$axios.$get('http://localhost:5000/course')

      courses.forEach(course => {
        console.log(course.name)
        commit('addCourses', course);
      });
    } catch (error) {
      console.log(error)
    }

  }
}
