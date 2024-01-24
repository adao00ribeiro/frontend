<template>
    <div class="container">
        <div class="row">
            <div v-for="item in listcourse" :key="item.id" class="col-md-3 mb-4">
                <div class="card" style="width: 100%;">
                    <img class="card-img-top" src="https://imagens.grupointegrado.br/img/banners/1686655826000000.webp"
                        alt="Card image cap">
                    <div class="card-body">
                        <h5 class="card-title">{{ item.name }}</h5>
                        <p class="card-text">{{ item.description }}</p>
                        <NuxtLink class="btn btn-primary" to="/matricula">Pré-Matricula</NuxtLink>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import  {ICourse} from "../interfaces/ICourse";
import { mapActions, mapGetters } from "vuex";
export default {
  computed: {
    ...mapGetters("courses", ["listcourse"]),
  },

}
</script>

<style lang="css" scoped>
/* Estilos específicos do componente, se necessário */
</style>
