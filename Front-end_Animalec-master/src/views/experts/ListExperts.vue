<template>
  <section class="page-section">
    <b-container>
      <HeaderPage title="Gestão de Especialistas" />

      <!--MENU TOPO-->
      <b-row class="mb-4">
        <b-col>
          <router-link
              :to="{ name: 'addExpert' }"
              tag="button"
              class="btn btn-outline-success mr-2 mt-2"
          ><i class="fas fa-plus-square"></i> ADICIONAR
            ESPECIALISTA</router-link
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
            <tr v-for="expert of experts" :key="expert._id">
              <td class="pt-4" ><img alt="" style="width: 80px"  src="https://img.favpng.com/25/7/23/computer-icons-user-profile-avatar-image-png-favpng-LFqDyLRhe3PBXM0sx2LufsGFU.jpg" ></td>
              <td class="pt-4">{{ expert.name }}</td>
              <td class="pt-4">{{ expert.animal }}</td>
              <td class="pt-4">{{ expert.group }}</td>
              <td class="pt-4">{{ expert.value }}</td>
              <td class="pt-4">{{ expert.contact }}</td>
              <td>
                <router-link
                    :to="{
                      name: 'editExpert',
                      params: { expertId: expert._id }
                    }"
                    tag="button"
                    class="btn btn-outline-warning mr-2"
                ><i class="fas fa-edit"></i> EDITAR</router-link
                >
                <button
                    @click="viewExpert(expert._id)"
                    type="button"
                    class="btn btn-outline-success mr-2"
                >
                  <i class="fas fa-search"></i> VER
                </button>
                <button
                    @click="removeExpert(expert._id)"
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
import { FETCH_EXPERTS, REMOVE_EXPERT } from "@/store/experts/expert.constants";
import HeaderPage from "@/components/HeaderPage.vue";
import { mapGetters } from "vuex";

export default {
  name: "ManageExperts",
  components: {
    HeaderPage
  },
  data: function() {
    return {
      experts: [],
      sortType: 1
    };
  },
  computed: {
    ...mapGetters("expert", ["getExperts", "getMessage"])
  },
  methods: {
    fetchExperts() {
      this.$store.dispatch(`expert/${FETCH_EXPERTS}`).then(
          () => {
            this.experts = this.getExperts;
          },
          err => {
            this.$alert(`${err.message}`, "Erro", "error");
          }
      );
    },
    sort() {
      this.experts.sort(this.compareNames);
      this.sortType *= -1;
    },
    compareNames(s1, s2) {
      if (s1.name > s2.name) return 1 * this.sortType;
      else if (s1.name < s2.name) return -1 * this.sortType;
      else return 0;
    },

    viewExpert(id) {
      const expert = this.experts.find(expert => expert._id === id);
      this.$fire({
        title: expert.name,
        html: this.generateTemplate(expert),
      });
    },

    generateTemplate(expert) {
      return `
        <p>
          <img style="" class="w-50"  src="${expert.img}" alt="" srcset=""> <br>
          <b>Nome:</b> ${expert.name} <br>
          <b>Animal:</b> ${expert.animal} <br>
          <b>Grupo:</b> ${expert.group} <br>
          <b>Descrição:</b> ${expert.description}<br>
          <b>Anos de Especialista:</b> ${expert.years_experted} <br>
          <b>Localização:</b> ${expert.location.city} / ${expert.location.country} <br>
          <b>Valor por hora:</b> ${expert.value} € <br>
          <b>Localização:</b> ${expert.contact}
        </p>
      `;
    },

    removeExpert(id) {
      this.$confirm(
          "Se sim, clique em OK",
          "Deseja mesmo remover o Especialista?",
          "warning",
          { confirmButtonText: "OK", cancelButtonText: "Cancelar" }
      ).then(
          () => {
            this.$store.dispatch(`expert/${REMOVE_EXPERT}`, id).then(() => {
              this.$alert(this.getMessage, "Especialista removido!", "success");
              this.fetchExperts();
            });
          },
          () => {
            this.$alert("Remoção cancelada!", "Informação", "info");
          }
      );
    }
  },
  created() {
    this.fetchExperts();
  }
};
</script>