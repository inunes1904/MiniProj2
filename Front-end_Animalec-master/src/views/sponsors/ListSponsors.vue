<template>
  <section class="page-section">
    <b-container>
      <HeaderPage title="Gestão de Patrocinadores" />

      <!--MENU TOPO-->
      <b-row class="mb-4">
        <b-col>
          <router-link
              :to="{ name: 'addSponsor' }"
              tag="button"
              class="btn btn-outline-success mr-2 mt-2"
          ><i class="fas fa-plus-square"></i> ADICIONAR
            PATROCINADOR</router-link
          >
          <router-link
              :to="{ name: 'admin' }"
              tag="button"
              class="btn btn-outline-info mr-2 mt-2"
          ><i class="fas fa-bars"></i> MENU PRINCIPAL</router-link
          >
        </b-col>
      </b-row>

      <!-- TABELA -->
      <b-row>
        <b-col>
          <table class="table table-striped">
            <thead class="thead-dark">
            <tr>
              <th scope="col">
                IMAGEM
                <i
                    class="fas fa-arrow-up"
                    v-if="sortType === 1"
                    @click="sort()"
                ></i>
                <i class="fas fa-arrow-down" v-else @click="sort()"></i>
              </th>
              <th scope="col">
                NOME
                <i
                    class="fas fa-arrow-up"
                    v-if="sortType === 1"
                    @click="sort()"
                ></i>
                <i class="fas fa-arrow-down" v-else @click="sort()"></i>
              </th>
              <th scope="col">ANIMAL</th>
              <th scope="col">TIPO</th>
              <th scope="col">VALOR</th>
              <th scope="col">CONTACTO</th>
              <th scope="col">AÇÕES</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="sponsor of sponsors" :key="sponsor._id">
              <td class="pt-4" ><img alt="" style="width: 80px"  src="https://png.pngtree.com/png-vector/20220910/ourmid/pngtree-sponsor-sign-word-lean-vector-png-image_19774682.png" ></td>
              <td class="pt-4">{{ sponsor.name }}</td>
              <td class="pt-4">{{ sponsor.animal }}</td>
              <td class="pt-4">{{ sponsor.group }}</td>
              <td class="pt-4">{{ sponsor.value }}</td>
              <td class="pt-4">{{ sponsor.contact }}</td>
              <td>
                <router-link
                    :to="{
                      name: 'editSponsor',
                      params: { sponsorId: sponsor._id }
                    }"
                    tag="button"
                    class="btn btn-outline-warning mr-2"
                ><i class="fas fa-edit"></i> EDITAR</router-link
                >
                <button
                    @click="viewSponsor(sponsor._id)"
                    type="button"
                    class="btn btn-outline-success mr-2"
                >
                  <i class="fas fa-search"></i> VER
                </button>
                <button
                    @click="removeSponsor(sponsor._id)"
                    type="button"
                    class="btn btn-outline-danger mr-2 "
                >
                  <i class="fas fa-trash-alt"></i> REMOVER
                </button>
              </td>
            </tr>
            </tbody>
          </table>
        </b-col>
      </b-row>
    </b-container>
  </section>
</template>

<script>
import { FETCH_SPONSORS, REMOVE_SPONSOR } from "@/store/sponsors/sponsor.constants";
import HeaderPage from "@/components/HeaderPage.vue";
import { mapGetters } from "vuex";

export default {
  name: "ManageSponsors",
  components: {
    HeaderPage
  },
  data: function() {
    return {
      sponsors: [],
      sortType: 1
    };
  },
  computed: {
    ...mapGetters("sponsor", ["getSponsors", "getMessage"])
  },
  methods: {
    fetchSponsors() {
      this.$store.dispatch(`sponsor/${FETCH_SPONSORS}`).then(
          () => {
            this.sponsors = this.getSponsors;
          },
          err => {
            this.$alert(`${err.message}`, "Erro", "error");
          }
      );
    },
    sort() {
      this.sponsors.sort(this.compareNames);
      this.sortType *= -1;
    },
    compareNames(s1, s2) {
      if (s1.name > s2.name) return 1 * this.sortType;
      else if (s1.name < s2.name) return -1 * this.sortType;
      else return 0;
    },

    viewSponsor(id) {
      const sponsor = this.sponsors.find(sponsor => sponsor._id === id);
      this.$fire({
        title: sponsor.name,
        html: this.generateTemplate(sponsor),
      });
    },

    generateTemplate(sponsor) {
      return `
        <p>
          <img style="" class="w-50"  src="${sponsor.img}" alt="" srcset=""> <br>
          <b>Nome:</b> ${sponsor.name} <br>
          <b>Animal:</b> ${sponsor.animal} <br>
          <b>Grupo:</b> ${sponsor.group} <br>
          <b>Descrição:</b> ${sponsor.description}<br>
          <b>Anos de Patrocinio:</b> ${sponsor.years_sponsored} <br>
          <b>Localização:</b> ${sponsor.location.city} / ${sponsor.location.country} <br>
          <b>Valor por ano:</b> ${sponsor.value} € <br>
          <b>Localização:</b> ${sponsor.contact}
        </p>
      `;
    },

    removeSponsor(id) {
      this.$confirm(
          "Se sim, clique em OK",
          "Deseja mesmo remover o patrocinador?",
          "warning",
          { confirmButtonText: "OK", cancelButtonText: "Cancelar" }
      ).then(
          () => {
            this.$store.dispatch(`sponsor/${REMOVE_SPONSOR}`, id).then(() => {
              this.$alert(this.getMessage, "Patrocinador removido!", "success");
              this.fetchSponsors();
            });
          },
          () => {
            this.$alert("Remoção cancelada!", "Informação", "info");
          }
      );
    }
  },
  created() {
    this.fetchSponsors();
  }
};
</script>