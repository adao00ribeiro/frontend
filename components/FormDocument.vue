<template>
  <div class="p-4 d-flex flex-column flex-grow-1">
    <h4>Documento de Identificaçao</h4>
    <form class="w-100 h-100 d-flex flex-column " @submit.prevent="OnChangeSubmit()">
      <div class="flex-grow-1">
        <div>
          <span>Frente</span>
          <label class="labelAvatar">
            <span v-if="!DocumentoFrente.imagemUrl">
              <i class="bi bi-upload fs-3"></i>
            </span>
            <img v-else class="preview" :src='DocumentoFrente.imagemUrl' alt="Documento" />
            <input type="file" name="inputFile" accept="image/png, image/jpeg" @change="handleFileFrente" />
          </label>
        </div>

        <div>
          <span>Verso</span>
          <label class="labelAvatar">
            <span v-if="!DocumentoVerso.imagemUrl">
              <i class="bi bi-upload fs-3"></i>
            </span>
            <img v-else class="preview" :src="DocumentoVerso.imagemUrl" alt="Documento" />
            <input type="file" name="inputFile" accept="image/png, image/jpeg" @change="handleFileTras" />
          </label>
        </div>
        <span class="alerterror register-first-error" v-if="!DocumentoFrente.imageAvatar || !DocumentoVerso.imageAvatar">
          Por favor, Insira RG OU CNH
        </span>
      </div>
      <div class="d-flex justify-content-between">
        <button type="button" class="btn mt-auto align-self-start bg-transparent" @click="back()">
          Voltar
        </button>
        <button type="submit" class="btn btn-primary mt-auto align-self-end">
          Próxima Etapa
        </button>
      </div>
    </form>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import { Icon } from "@iconify/vue2";
export default {
  data() {
    return {
      DocumentoFrente: {
        imagemUrl: "",
        imageAvatar: null,
      },
      DocumentoVerso: {
        imagemUrl: "",
        imageAvatar: null,
      },
    };
  },
  components: {
    Icon,
  },
  created() {
    this.DocumentoFrente.imageAvatar = this.Matricula.documentfrenteImage;
    this.DocumentoVerso.imageAvatar = this.Matricula.documentversoImage;
  },
  computed: {
    ...mapGetters("step", ["step"]),
    ...mapGetters("useMatricula", ['Matricula'])
  },
  methods: {
    ...mapActions("step", ["SetStep"]),
    async OnChangeSubmit() {
      if (this.Matricula.id === "" || this.DocumentoFrente.imageAvatar == null || this.DocumentoVerso.imageAvatar == null) {
        console.log("opa")
        return;
      }

      try {
        const response = await this.$axios.post();


        if (response.data) {
          this.showMsgBoxTwo();
        }

        //this.$store.dispatch('useMatricula/setDocumentFrente', this.DocumentoFrente.imageAvatar);
        //this.$store.dispatch('useMatricula/setDocumentVerso', this.DocumentoVerso.imageAvatar);
        //this.SetStep(this.step + 1);
      } catch (error) {
        console.log(error);
      }
    },
    async handleFileFrente(event) {

      if (!event.target.files) {
        return;
      }
      const image = event.target.files[0];
      if (!image) {
        return;
      }
      if (image.type === 'image/jpeg' || image.type === 'image/png') {
        this.DocumentoFrente.imagemUrl = URL.createObjectURL(event.target.files[0]);
        this.DocumentoFrente.imageAvatar = image;
      }

    },
    handleFileTras(event) {
      if (!event.target.files) {
        return;
      }

      const image = event.target.files[0];
      if (!image) {
        return;
      }
      if (image.type === 'image/jpeg' || image.type === 'image/png') {
        this.DocumentoVerso.imagemUrl = URL.createObjectURL(event.target.files[0]);
        this.DocumentoVerso.imageAvatar = image;
      }
    },
    showMsgBoxTwo() {
      this.boxTwo = ''
      this.$bvModal.msgBoxOk('Matriculado com sucesso', {
        title: 'Confirmation',
        size: 'sm',
        buttonSize: 'sm',
        okVariant: 'success',
        headerClass: 'p-2 border-bottom-0',
        footerClass: 'p-2 border-top-0',
        centered: true
      })
        .then(value => {
          this.boxTwo = value
          this.$router.push("/");
        })
        .catch(err => {

        })
    },
    back() {
      this.SetStep(this.step - 1);
    }
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
  height: 125px;
  background-color: rgb(71, 71, 71);
  cursor: pointer;
}

.icon {
  width: 50px;
  height: 50px;
  color: white;
}

.labelAvatar span {
  z-index: 99;
  position: absolute;
  opacity: 0.5;
  transform: all 0.5s;
  color: #c0bebe;
}

.labelAvatar span:hover {
  opacity: 1;
  transform: scale(1.2);
}

.labelAvatar input {
  display: none;
}

.preview {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 0.3rem;
}
</style>
