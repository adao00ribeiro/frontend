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
        <button>Graduacao</button>
        <button>Pós-Graduação</button>
      </div>
      <br />

      <div>
        <h4>Metodologia</h4>
        <button>Presencial</button>
        <button>A Distancia</button>
      </div>
    </div>
    <br />
    <Courses></Courses>

  </div>
</template>

<script lang="ts">
import Vue from 'vue'


export default Vue.extend({
  name: 'IndexPage',

})
</script>


<style></style>
