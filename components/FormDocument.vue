<template>
  <div class="w-100 h-100 d-flex flex-column">
    <h3>Documentos</h3>
    <form class="d-flex flex-row flex-grow-1 gap-1 justify-content-around">
      <div>
        <span>Documento Frente</span>
        <label class="labelAvatar">
        <span>
          <Icon icon="material-symbols:upload-sharp" width="100" height="100" />
        </span>
         <input
          type="file"
          name="inputFile"
          accept="image/png, image/jpeg"
          v-on:input="handleFile"
        />

        <img v-if="DocumentoFrente.imagemUrl"
          class="preview"
          :src="DocumentoFrente.imagemUrl"
          alt="Documento"

        />
      </label>
      </div>

      <div>
        <span>Documento Tras</span>
        <label class="labelAvatar">
        <span>
          <Icon icon="material-symbols:upload-sharp" width="100" height="100" />
        </span>
         <input
          type="file"
          name="inputFile"
          accept="image/png, image/jpeg"
          v-on:input="handleFile"
        />

        <img v-if="DocumentoTras.imagemUrl"
          class="preview"
          :src="DocumentoTras.imagemUrl"
          alt="Documento"

        />
      </label>
      </div>
    </form>
    <div class="d-flex justify-content-between">
      <button
        type="button"
        class="btn btn-primary mt-auto align-self-start bg-transparent"
        @click="SetStep(step - 1)"
      >
        Voltar
      </button>
      <button
        type="submit"
        class="btn btn-primary mt-auto align-self-end"
        @click="SetStep(step + 1)"
      >
        Próxima Etapa
      </button>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import { Icon } from "@iconify/vue2";
export default {
  data(){
    return {
      DocumentoFrente: {
        imagemUrl: "",
        imageAvatar: null,
      },
      DocumentoTras: {
        imagemUrl: "",
        imageAvatar: null,
      },
    };
  },

  components: {
    Icon,
  },
  computed: {
    ...mapGetters("step", ["step"]),
  },
  methods: {
    ...mapActions("step", ["SetStep"]),
    handleFile(event) {
      if (!event.target.files) {
            return;
        }

        const image = event.target.files[0];
        if (!image) {
            return;
        }
        if (image.type === 'image/jpeg' || image.type === 'image/png') {
          Inputs = {...Inputs, imageUrl: URL.createObjectURL(event.target.files[0]),
                imageAvatar: image}

        }
    },
  },
};
</script>

<style lang="css" scoped>
.form {
  width: 600px;
  display: flex;
  flex-direction: column;
  gap: 1rem;


}
.form select {
    color: white;
    padding: 5px 20px;
    border: 1px solid #696969;
    border-radius: 5px;
    height: 40px;
    background-color: var(--dark-gray);
  }
.labelAvatar {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 150px;
  background-color: rgb(71, 71, 71);
  cursor: pointer;
}

.labelAvatar span {
  z-index: 99;
  position: absolute;
  opacity: 0.5;
  transform: all 0.5s;
  color: #696969;
}

.labelAvatar span:hover {
  opacity: 1;
  transform: scale(1.2);
}

.labelAvatar  input {
  display: none;
}

.preview {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 0.3rem;

}
</style>
