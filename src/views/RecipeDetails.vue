<template>
  <div class="container my-6 mx-auto">
    <div v-if="recipe" class="space-y-4">
      <h2 class="text-2xl mt-2">{{ recipe.title }}</h2>
      <div class="flex justify-between">
        <div
          class="flex flex-col-reverse md:flex-row md:space-x-4 md:items-end"
        >
          <Stars :score="recipe.score" />

          <div>
            <font-awesome-icon
              class="text-teal-700 mr-2"
              icon="fa-solid fa-clock"
            />{{ recipe.prepTime }}
            mins
          </div>
        </div>
        <div class="space-x-2 md:space-x-4">
          <router-link
            :to="{ name: 'saveRecipe', params: { id: recipe.id } }"
            v-if="hasPermission('Permissions.Recipes.Edit')"
          >
            <BtnDefault text="edit" />
          </router-link>
          <BtnThird
            text="Delete"
            @click="toggleModal"
            v-if="hasPermission('Permissions.Recipes.Delete')"
          />
        </div>
      </div>

      <div class="2xl:flex items-start gap-6">
        <img :src="recipe.image" class="w-full md:max-w-md" />
        <div
          class="space-y-6 2xl:border 2xl:border-teal-700/40 2xl:p-4 2xl:rounded"
        >
          <div>
            <h2 class="text-2xl">About:</h2>
            <hr class="details-line" />

            <p>{{ recipe.description }}</p>
          </div>
          <div>
            <h2 class="text-2xl">Ingredients:</h2>
            <hr class="details-line" />
            <ul v-html="getIngredients"></ul>
          </div>
          <div>
            <h2 class="text-2xl">Method:</h2>
            <hr class="details-line" />

            <p>{{ recipe.method }}</p>
          </div>
        </div>
      </div>
    </div>
    <div v-else-if="!error">
      <Loading />
    </div>
    <Error v-if="error" :error="error" @retry="getRecipe()" />
  </div>
  <Modal v-if="showModal">
    <template #content>
      <p>
        Do you want to delete <strong>{{ recipe.title }}</strong> ?
      </p>
    </template>
    <template #actions>
      <BtnThird text="Yes" @click="deleteRecipe" />
      <BtnDefault text="No" @click="toggleModal" />
    </template>
  </Modal>
</template>

<script>
import { ref } from "@vue/reactivity";
import router from "@/router";

import axios from "axios";

import { config } from "@/configurations/config";
import { authHeader } from "@/helpers/authHeader";

import Loading from "@/components/Loading.vue";
import Error from "@/components/messages/Error.vue";
import Stars from "@/components/Stars.vue";
import Modal from "@/components/Modal.vue";
import BtnThird from "@/components/buttons/BtnThird.vue";
import BtnDefault from "@/components/buttons/BtnDefault.vue";
import Recipes from "@/components/Recipes.vue";

import GetRecipe from "@/composables/getRecipe";
import { userService } from "@/composables/userServices";

export default {
  props: ["id", "slug"],
  components: {
    Loading,
    Error,
    Stars,
    Recipes,
    Modal,
    BtnThird,
    BtnDefault,
    BtnThird,
  },
  setup(props) {
    const deleteMsg = ref("");
    const showModal = ref(false);

    const { recipe, error, getRecipe, getIngredients } = GetRecipe(props.id);

    getRecipe();

    function toggleModal() {
      showModal.value = !showModal.value;
    }

    async function deleteRecipe() {
      try {
        await axios.delete(`${config.apiUrl}/Recipes/${props.id}`, {
          headers: authHeader(),
        });
        debugger;
        router.push("/");
      } catch (err) {
        error.value = err;
      }
    }

    const hasPermission = (permission) => {
      return userService.hasPermission(permission);
    };

    return {
      recipe,
      error,
      getRecipe,
      getIngredients,
      deleteMsg,
      showModal,
      toggleModal,
      deleteRecipe,
      hasPermission,
    };
  },
};
</script>

<style></style>
