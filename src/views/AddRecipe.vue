<template>
  <NavBar />
  <div class="lg:bg-teal-500/10">
    <div class="mx-2 lg:mx-auto lg:max-w-4xl py-4">
      <div class="lg:bg-white rounded-md px-6 py-4 lg:shadow">
        <h2 class="text-2xl font-bold">New Recipe</h2>
        <hr class="details-line" />

        <form @submit.prevent="handleSubmit" class="">
          <div class="input-group">
            <label>Title:</label>
            <input type="text" v-model="recipe.title" required />
          </div>
          <!-- <div class="input-group">
            <label>Slug:</label>
            <input type="text" v-model="recipe.slug" required />
          </div> -->
          <div class="input-group">
            <label>Category:</label>
            <select v-model="recipe.category" required>
              <option disabled value="">Please select one</option>
              <option value="food">Food</option>
              <option value="drink">Drink</option>
              <option value="dessert">Dessert</option>
            </select>
          </div>
          <div class="input-group">
            <label>Card Image:</label>
            <input type="text" v-model="recipe.cardImage" required />
          </div>
          <div class="input-group">
            <label>Image:</label>
            <input type="text" v-model="recipe.image" required />
          </div>
          <div class="input-group">
            <label>Prepration Time (mins):</label>
            <input type="number" v-model="recipe.prepTime" min="1" required />
          </div>
          <div class="input-group">
            <label> Score (1-5):</label>
            <input
              type="number"
              v-model="recipe.score"
              min="1"
              max="5"
              required
            />
          </div>
          <div class="input-group">
            <label>Description:</label>
            <textarea v-model="recipe.description"></textarea>
          </div>
          <div class="input-group">
            <label>Ingredients (comma seperate):</label>
            <textarea v-model="recipe.ingredient" required></textarea>
          </div>
          <div class="input-group">
            <label>Method:</label>
            <textarea v-model="recipe.method" required></textarea>
          </div>
          <div class="mx-auto w-fit">
            <Btn text="Save Recipe" />
          </div>
        </form>
        <!-- <div v-else-if="!error">
    <Loading />
  </div> -->
        <div class="my-4">
          <ErrorMessage v-if="error" :error="error" />
          <SuccessMessage v-if="success" :msg="success" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from "@vue/reactivity";

import Btn from "@/components/Btn.vue";
import NavBar from "@/components/NavBar.vue";

import Loading from "@/components/Loading.vue";
import ErrorMessage from "@/components/ErrorMessage.vue";
import SuccessMessage from "@/components/SuccessMessage.vue";

export default {
  components: { NavBar, Btn, Loading, ErrorMessage, SuccessMessage },
  setup() {
    const error = ref(null);
    const success = ref(null);
    const recipe = ref({
      id: null,
      title: "",
      slug: "",
      category: "",
      cardImage: "",
      image: "",
      description: "",
      method: "",
      prepTime: 1,
      ingredient: "",
      score: 1,
    });

    async function handleSubmit() {
      recipe.value.slug = recipe.value.title.replace(" ", "-");
      const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(recipe.value),
      };
      try {
        const response = await fetch(
          "http://localhost:3000/recipes",
          requestOptions
        );

        if (!response.ok) {
          throw Error("Something went wrong...");
        }

        const data = await response.json();
        clearRecipe();
        success.value = "Successfully added";
      } catch (err) {
        error.value = err.message;
      }
    }

    function clearRecipe() {
      recipe.value = {
        id: null,
        title: "",
        slug: "",
        category: "",
        cardImage: "",
        image: "",
        description: "",
        method: "",
        prepTime: 1,
        ingredient: "",
        score: 1,
      };
    }

    return { recipe, handleSubmit, error, success };
  },
};
</script>

<style>
.input-group {
  @apply flex gap-2 my-4;
}

form label {
  @apply w-36;
}

form input,
form select,
form textarea {
  @apply border border-black/20 px-1 py-2 rounded w-full  focus:border-teal-700/40 outline-none;
}
</style>
