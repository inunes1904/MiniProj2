<template>
  <section class="page-section">
    <b-container>
      <HeaderPage title="Adicionar Sponsor" />
      <b-row>
        <b-col cols="2"></b-col>
        <b-col>
          <form @submit.prevent="add">
            <div class="form-group">
              <input
                  v-model="img"
                  type="text"
                  class="form-control form-control-lg"
                  placeholder="Imagem do Patrocinador"
                  required
              />
            </div>
            <div class="form-group">
              <input
                  v-model="name"
                  type="text"
                  class="form-control form-control-lg"
                  placeholder="Nome do Patrocinador"
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
                  v-model="years_sponsored"
                  type="number"
                  class="form-control form-control-lg"
                  placeholder="Anos de Patrocínio"
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
                  placeholder="Valor por ano"
                  required
              />
            </div>
            <div class="form-group">
              <input
                  v-model="contact"
                  type="text"
                  class="form-control form-control-lg"
                  placeholder="Valor por ano"
                  required
              />
            </div>
            <button type="submit" class="btn btn-outline-success btn-lg mr-2">
              <i class="fas fa-plus-square"></i> ADICIONAR
            </button>
            <router-link
                :to="{ name: 'listSponsors' }"
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
import { ADD_SPONSOR } from "@/store/sponsors/sponsor.constants";
import HeaderPage from "@/components/HeaderPage.vue";
import router from "@/router";
import { mapGetters } from "vuex";

export default {
  name: "AddSponsor",
  components: {
    HeaderPage
  },
  data: () => {
    return {
      img:"",
      name: "",
      animal: "",
      group: "",
      years_sponsored: 0,
      description: "",
      location: {
        city: "",
        country: ""
      }
    };
  },
  computed: {
    ...mapGetters("sponsor", ["getMessage"])
  },
  methods: {
    add() {
      this.$store.dispatch(`sponsor/${ADD_SPONSOR}`, this.$data).then(
          () => {
            this.$alert(this.getMessage, "Sponsor adicionado!", "success");
            router.push({ name: "listSponsors" });
          },
          err => {
            this.$alert(`${err.message}`, "Erro", "error");
          }
      );
    }
  }
};
</script>
