
export const state = () => ({
    States: [],
})
export const getters = {
    liststates(state) {
        return state.States;
    },

}

export const mutations = {
    addStates(state, payload) {
        state.States.push({ ...payload });
    },
}

export const actions = {
    AdicionarStates({ commit }, payload) {
        commit('addStates', payload)
    },

    async GetStatesAsync({ commit }) {
        console.log('aki')
        try {
            const statesTemp = await this.$axios.$get('https://servicodados.ibge.gov.br/api/v1/'
            );
            statesTemp.forEach(state => {
                console.log(state)
                commit('addStates', state);
            });
        } catch (error) {
            console.log(error.message)
        }

    }
}
