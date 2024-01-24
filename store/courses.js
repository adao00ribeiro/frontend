
export const state = () => ({
  courses: [],
})
export const getters = {
    listcourse(state){
     return state.courses;
    }
}

export const mutations = {
  addCourses(state,payload) {
    state.courses.push({...payload});
    }
}

export const actions = {
      AdicionarCourse({commit},payload){
          commit('addCourses',payload)
      },
      async GetCoursesAsync ({ commit }) {
        const courses = await this.$axios.$get('/course')

        courses.forEach(course => {
          console.log(course.name)
          commit('addCourses', course);
        });
      }
    }
