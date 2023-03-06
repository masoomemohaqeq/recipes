<template>
  <div class="bg-teal-50/70 py-8" v-if="recipes.length">
    <div
      class="container mx-auto gap-4 grid grid-cols-1 lg:gap-8 md:grid-cols-3"
    >
      <Card
        v-for="recipe in categorizedRecipes"
        :key="recipe.id"
        :recipe="recipe"
      />
    </div>
  </div>
  <div v-else-if="!error">
    <Loading />
  </div>
  <Error v-if="error" :error="error" @retry="getRecipes()" />
</template>

<script>
import { ref } from "@vue/reactivity";
import { computed, onMounted } from "@vue/runtime-core";

import Card from "@/components/Card.vue";
import Loading from "@/components/Loading.vue";
import Error from "@/components/messages/Error.vue";

export default {
  props: ["category"],
  components: {
    Card,
    Loading,
    Error,
  },
  setup(props) {
    const recipes = ref([]);
    const error = ref(null);

    async function getRecipes() {
      try {
        const res = await fetch("https://localhost:7109/api/Recipes");

        if (!res.ok) throw Error("Something went wrong...");

        recipes.value = await res.json();
      } catch (err) {
        error.value = err.message;
      }
    }

    onMounted(() => {
      getRecipes();
    });

    const categorizedRecipes = computed(() => {
      return recipes.value.filter((recipe) =>
        recipe.category.includes(props.category)
      );
    });

    return {
      recipes,
      error,
      getRecipes,
      categorizedRecipes,
    };
  },
};
</script>

<style></style>
