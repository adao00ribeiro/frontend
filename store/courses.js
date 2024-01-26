
export const state = () => ({
  courses: [],
  selectedcourse: {
    id: "",
    name: "",
    description: "",
    modality: "",
    type: "",
    investmentvalue: 0,
    numberofinstallments: 0,
    url: "",
    academicId: "",
  }
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
  },
  clearSelectCouse(state) {
    state.selectedcourse = {
      id: "",
      name: "",
      description: "",
      modality: "",
      type: "",
      investmentvalue: 0,
      numberofinstallments: 0,
      url: "",
      academicId: "",
    };
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
  LimparSelectCouse({ commit }) {
    commit('clearSelectCouse');
  },
  async GetCoursesAsync({ commit }) {
    try {
      commit('clearCourses');
      const courses = await this.$axios.$get(process.env.DIGITALMATRICULA_API_URL + '/course')

      courses.forEach(course => {
        commit('addCourses', course);
      });
    } catch (error) {
      console.log(error)
    }

  }
}
