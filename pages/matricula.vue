<template>
    <div class="container d-flex justify-content-center align-items-center vh-100">
        <div class="main">
            <div class="containerLeft">
                <SideBar />
            </div>
            <div class="containerRight">
                <component :is="SelectStep"></component>
            </div>
        </div>
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
    beforeMount(){
     const selectedCourse  = this.$store.getters['courses/SelectedCourse'];
      if(selectedCourse ==null){
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
.main {
    width: 60vw;
    height: 75vh;
    background-color:var(--color-background-primary);
    display: flex;
    flex-direction: row;
    padding: 5px;
    border-radius: 10px;
}

.containerLeft {
    flex: 1;
}

.containerRight {

    padding: 2rem 5rem 2rem 5rem;
    flex: 2;
}
</style>
