export const state = () => ({
  step: 1
})

export const getters = {
    step(state){
     return state.step;
    }
}


export const mutations = {
  setstep(state,payload) {
    state.step= payload
  }
}


export const actions = {
      SetStep({commit},payload){
          commit('setstep',payload)
      }

}
