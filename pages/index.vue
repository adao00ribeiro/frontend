<template>
  <div class="container w-100 vh-100 d-flex flex-column align-items-center ">
    <br />
    <input v-model="searchQuery" class="w-50 form-control " @input="handleSearch" type="search" placeholder="Procurar"
      aria-label="Search">

    <br />
    <div class="w-100 mt-5 d-flex flex-column justify-content-start ">
      <div>
        <button class="btn buttonprimary" @click="filter('Graduação', '')">Graduação</button>
        <button class="btn buttonprimary" @click="filter('Pós-Graduação', '')">Pós-Graduação</button>
      </div>
      <br />

      <div>
        <h4>Metodologia</h4>
        <button class="btn buttonprimary" @click="filter('', 'Presencial')">Presencial</button>
        <button class="btn buttonprimary" @click="filter('', 'A Distancia')">À Distância</button>
      </div>

    </div>
    <br />
    <div class="container">
      <div class="row ">
        <div v-for="item in filteredCourses" :key="item.id" class="col-md-4 mb-4">
          <div class="card" style="width: 100%;">
            <img class="card-img-top" :src="item.url" alt="Card image cap">
            <div class="card-body">
              <h4 class="title card-title">{{ item.name }}</h4>
              <span class="description card-text ">{{ item.description }}</span>
              <div class="containerInvestimento">
                <span>Investimento: R${{ item.investmentvalue }},00</span>
                <p>Parcelas Até : {{ item.numberofinstallments }}x</p>
              </div>
              <div class="d-flex flex-row justify-content-between">
                <p class="title card-title">{{ item.type }}</p>
                <p class="title card-title">{{ item.modality }}</p>
              </div>
              <Button @click="() => {
                AdicionarSelectedCourse(item);
                RouterMatricula();
              }" class="btn buttonprimary w-100">
               Matricula
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { mapActions, mapGetters } from "vuex";
import Vue from 'vue'
import { ICourse } from '../interfaces/ICourse'


export default Vue.extend({
  name: 'IndexPage',

  data() {
    return {
      Courses: [] as ICourse[],
      filteredCourses: [] as ICourse[],
      selectedType: '',
      selectedModality: '',
      searchQuery: '',
    }
  },

  async asyncData({ store }) {
    await store.dispatch('courses/GetCoursesAsync');

  },
  created() {
    this.Courses = this.$store.getters['courses/listcourse'] as ICourse[];
    this.filteredCourses = this.Courses;
  },
  computed: {
    ...mapGetters("courses", ["listcourse"]),
  },
  methods: {
    ...mapActions("courses", ["GetCoursesAsync"]),
    ...mapActions("courses", ["AdicionarSelectedCourse"]),
    filter(type: string, modality: string) {
      this.filteredCourses = this.Courses.filter((course: ICourse) => {
        const typeMatch = !type || course.type === type;
        const modalityMatch = !modality || course.modality === modality;
        const searchMatch = !this.searchQuery || (
          this.removeAccents(course.name.toLowerCase()).includes(this.searchQuery.toLowerCase())
        );
        return typeMatch && modalityMatch && searchMatch;
      });
    },
    removeAccents(str: string) {
      return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    },
    handleSearch() {
      this.searchQuery = this.removeAccents(this.searchQuery);
      this.filter(this.selectedType, this.selectedModality);
    },
    RouterMatricula() {
      this.$router.push('/matricula')
    },


  },
})
</script>


<style>
.card img {
  height: 200px;
}

.title {

  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  line-height: 1.56rem;
  max-width: 41rem;
}

.description {

  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  display: block;
  display: -webkit-box;
  font-size: .95rem;
  line-height: 1.56rem;
  max-height: 100px;
  max-width: 41rem;
  overflow: hidden;
  text-overflow: ellipsis;

}

.containerInvestimento {
  margin-top: 1rem;
}

.containerInvestimento span {
  font-weight: 700;
  font-size: 1rem;
}

.containerInvestimento p {
  font-weight: 700;
  font-size: 1rem;
}
</style>
