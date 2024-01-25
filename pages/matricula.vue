<template>
    <div class="matricula">
        <SideBar />
        <component :is="SelectStep"></component>
    </div>
</template>

<script>
import FormDadosPessoais from '~/components/FormDadosPessoais.vue';
import FormInformacoesAdicionais from '~/components/FormInformacoesAdicionais.vue';
import FormDocument from '~/components/FormDocument.vue';
import { mapActions, mapGetters } from 'vuex'
export default {
    async asyncData({ params, query, error, app, store, redirect }) {

    },
    data() {
        const SelectStep = () => {

            switch (this.step) {
                case 1:
                    return <FormDadosPessoais></FormDadosPessoais>
                    break;
                case 2:
                    return <FormInformacoesAdicionais></FormInformacoesAdicionais>
                    break;
                case 3:
                    return <FormDocument></FormDocument>
                    break;
                case 4:
                    return <Confirmacao></Confirmacao>
                    break;
            }
        }

        return {
            SelectStep
        }
    },
    beforeMount() {
        const selectedCourse = this.$store.getters['courses/SelectedCourse'];
        if (selectedCourse == null) {
            this.$router.push('/');
        }
    },
    computed: {
        ...mapGetters("step", ['step'])
    },
    methods: {
        ...mapActions("step", ['SetStep'])
    }
}
</script>

<style lang="css" scoped>
.matricula {
    width: 80%;
    height: 100vh;
    background-color: var(--color-background-primary);
    display: flex;
    flex-direction: row;
    border-radius: 10px;
    margin: 0 auto;
}

@media screen and (max-width:700px) {
    .matricula {
        width: 100vw;
        flex-direction: column;
        height: 100%;
    }
}
</style>
