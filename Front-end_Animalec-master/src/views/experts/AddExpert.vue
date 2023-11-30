<template>
  <section class="page-section">
    <b-container>
      <HeaderPage title="Adicionar Especialista" />
      <b-row>
        <b-col cols="2"></b-col>
        <b-col>
          <form @submit.prevent="add">
            <div class="form-group">
              <input
                  v-model="img"
                  type="text"
                  class="form-control form-control-lg"
                  placeholder="Imagem do Especialista"
                  required
              />
            </div>
            <div class="form-group">
              <input
                  v-model="name"
                  type="text"
                  class="form-control form-control-lg"
                  placeholder="Nome do Especialista"
                  required
              />
            </div>
            <div class="form-group">
              <input
                  v-model="animal"
                  type="text"
                  class="form-control form-control-lg"
                  placeholder="Animal"
                  required
              />
            </div>
            <div class="form-group">
              <select
                  id="sltGroup"
                  class="form-control form-control-lg"
                  v-model="group"
                  required
              >
                <option value>-- SELECIONA GRUPO --</option>
                <option value="anfibio">ANFÍBIO</option>
                <option value="ave">AVE</option>
                <option value="mamifero">MAMÍFERO</option>
                <option value="peixe">PEIXE</option>
                <option value="reptil">RÉPTIL</option>
              </select>
            </div>
            <div class="form-group">
              <input
                  v-model="years_experted"
                  type="number"
                  class="form-control form-control-lg"
                  placeholder="Anos de Experiência"
                  required
              />
            </div>
            <div class="form-group">
              <textarea
                  v-model="description"
                  class="form-control form-control-lg"
                  placeholder="Descrição"
                  rows="5"
                  required
              ></textarea>
            </div>
            <div class="form-group">
              <input
                  v-model="location.city"
                  type="text"
                  class="form-control form-control-lg"
                  placeholder="Cidade"
                  required
              />
            </div>
            <div class="form-group">
              <input
                  v-model="location.country"
                  type="text"
                  class="form-control form-control-lg"
                  placeholder="País"
                  required
              />
            </div>
            <div class="form-group">
              <input
                  v-model="value"
                  type="text"
                  class="form-control form-control-lg"
                  placeholder="Valor por hora"
                  required
              />
            </div>
            <div class="form-group">
              <input
                  v-model="contact"
                  type="text"
                  class="form-control form-control-lg"
                  placeholder="Contacto"
                  required
              />
            </div>
            <button type="submit" class="btn btn-outline-success btn-lg mr-2">
              <i class="fas fa-plus-square"></i> ADICIONAR
            </button>
            <router-link
                :to="{ name: 'listExperts' }"
                tag="button"
                class="btn btn-outline-danger btn-lg"
            >
              <i class="fas fa-window-close"></i> CANCELAR
            </router-link>
          </form>
        </b-col>
        <b-col cols="2"></b-col>
      </b-row>
    </b-container>
  </section>
</template>

<script>
import { ADD_EXPERT } from "@/store/experts/expert.constants";
import HeaderPage from "@/components/HeaderPage.vue";
import router from "@/router";
import { mapGetters } from "vuex";

export default {
  name: "AddExpert",
  components: {
    HeaderPage
  },
  data: () => {
    return {
      img:"",
      name: "",
      animal: "",
      group: "",
      years_experted: 0,
      description: "",
      contact: "",
      value:0.0,
      location: {
        city: "",
        country: ""
      }
    };
  },
  computed: {
    ...mapGetters("expert", ["getMessage"])
  },
  methods: {
    add() {
      this.$store.dispatch(`expert/${ADD_EXPERT}`, this.$data).then(
          () => {
            this.$alert(this.getMessage, "Expert adicionado!", "success");
            router.push({ name: "listExperts" });
          },
          err => {
            this.$alert(`${err.message}`, "Erro", "error");
          }
      );
    }
  }
};
</script>
