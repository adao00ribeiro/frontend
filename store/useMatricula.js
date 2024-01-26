
export const state = () => ({
    matricula: {
        name: "",
        email: "",
        phone: "",
        city: "",
        state: "",
        cep: "",
        cpf: "",
        birthday: "",
        documentfrenteImage: null,
        documentversoImage: null
    },

})
export const getters = {
    Matricula(state) {
        return state.matricula;
    },

}

export const mutations = {

    setName(state, name) {
        state.matricula.name = name;
    },

    setEmail(state, email) {
        state.matricula.email = email;
    },

    setPhone(state, phone) {
        state.matricula.phone = phone;
    },

    setCity(state, city) {
        state.matricula.city = city;
    },

    setState(state, stateValue) {
        state.matricula.state = stateValue;
    },

    setCep(state, cep) {
        state.matricula.cep = cep;
    },

    setCpf(state, cpf) {
        state.matricula.cpf = cpf;
    },

    setBirthday(state, birthday) {
        state.matricula.birthday = birthday;
    },

    setDocumentFrente(state, documentfrente) {
        state.matricula.documentfrenteImage = documentfrente;
    },

    setDocumentVerso(state, documentverso) {
        state.matricula.documentversoImage = documentverso;
    },
    clearMatricula(state) {

        Object.keys(state.matricula).forEach((field) => {
            if (field.includes('Image')) {
                state.matricula[field] = null;
            } else {
                state.matricula[field] = '';
            }
        });
    }
}

export const actions = {
    setName({ commit }, name) {
        commit('setName', name);
    },

    setEmail({ commit }, email) {
        commit('setEmail', email);
    },

    setPhone({ commit }, phone) {
        commit('setPhone', phone);
    },

    setCity({ commit }, city) {
        commit('setCity', city);
    },

    setState({ commit }, stateValue) {
        commit('setState', stateValue);
    },

    setCep({ commit }, cep) {
        commit('setCep', cep);
    },

    setCpf({ commit }, cpf) {
        commit('setCpf', cpf);
    },

    setBirthday({ commit }, birthday) {
        commit('setBirthday', birthday);
    },

    setDocumentFrente({ commit }, documentfrente) {
        commit('setDocumentFrente', documentfrente);
    },

    setDocumentVerso({ commit }, documentverso) {
        commit('setDocumentVerso', documentverso);
    },
    LimparMatricula({ commit }) {
        commit('clearMatricula');
    },
}
