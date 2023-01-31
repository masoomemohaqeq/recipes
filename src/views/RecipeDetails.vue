<template>
  <NavBar />
  <div class="container my-6 mx-auto">
    <div v-if="recipe" class="space-y-4">
      <h2 class="text-2xl mt-2">{{ recipe.title }}</h2>
      <div class="flex justify-between">
        <Stars :score="recipe.score" />
        <span>
          <font-awesome-icon
            class="text-teal-700 mr-2"
            icon="fa-solid fa-clock"
          />{{ recipe.prepTime }}
          mins
        </span>
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
  <!-- <Recipes category="food" /> -->
</template>

<script>
import { ref } from "@vue/reactivity";
import { computed, onMounted } from "@vue/runtime-core";

import NavBar from "@/components/NavBar.vue";
import Loading from "@/components/Loading.vue";
import Error from "@/components/Error.vue";
import Stars from "@/components/Stars.vue";
import Recipes from "@/components/Recipes.vue";

export default {
  props: ["id", "slug"],
  components: {
    NavBar,
    Loading,
    Error,
    Stars,
    Recipes,
  },
  setup(props) {
    const recipe = ref(null);
    const error = ref(null);
    const getIngredients = ref("");

    async function getRecipe() {
      try {
        const res = await fetch("http://localhost:3000/recipes/" + props.id);

        if (!res.ok) throw Error("Something went wrong...");

        recipe.value = await res.json();

        recipe.value.ingredient.split(",").forEach((i) => {
          getIngredients.value += `<li>* ${i}</li>`;
        });
      } catch (err) {
        error.value = err.message;
      }
    }

    onMounted(() => {
      getRecipe();
    });

    return {
      recipe,
      error,
      getRecipe,
      getIngredients,
    };
  },
};
</script>

<style>
.details-line {
  @apply border-teal-600/30 my-2;
}
</style>
