<template>
  <div class="container w-100 vh-100 d-flex flex-column align-items-center ">
    <br />
    <form class=" form-inline my-2 my-lg-0">
      <input class="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search">
      <button class="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
    </form>
    <br />
    <div class="w-100 d-flex flex-column justify-content-start ">
      <div>
        <button @click="filter('Graduação', '')">Graduacao</button>
        <button @click="filter('Pós-graduação', '')">Pós-Graduação</button>
      </div>
      <br />

      <div>
        <h4>Metodologia</h4>
        <button @click="filter('', 'Presencial')">Presencial</button>
        <button @click="filter('', 'A Distancia')">A Distancia</button>
      </div>
    </div>
    <br />
    <div class="container">
      <div class="row">
        <div v-for="item in      filteredCourses     " :key="item.id" class="col-md-3 mb-4">
          <div class="card" style="width: 100%;">
            <img class="card-img-top" src="https://imagens.grupointegrado.br/img/banners/1686655826000000.webp"
              alt="Card image cap">
            <div class="card-body">
              <h5 class="card-title">{{ item.name }}</h5>
              <p class="card-text">{{ item.description }}</p>
              <Button @click="() => {
                AdicionarSelectedCourse(item);
                RouterMatricula();
              }" class="btn btn-primary">
                Pré-Matricula
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
        const methodologyMatch = !modality || course.modality === modality;
        return typeMatch && methodologyMatch;
      });
    },
    RouterMatricula() {
      this.$router.push('/matricula')
    }

  },
})
</script>


<style></style>
