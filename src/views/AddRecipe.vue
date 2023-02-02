<template>
  <div class="lg:bg-teal-600/5">
    <div class="mx-2 lg:mx-auto lg:max-w-4xl py-4">
      <div class="lg:bg-white rounded-md px-6 py-4 lg:shadow">
        <h2 class="text-2xl font-bold">New Recipe</h2>
        <hr class="details-line" />

        <form @submit.prevent="handleSubmit" class="">
          <div class="input-group">
            <label>Title:</label>
            <input type="text" v-model="recipe.title" required />
          </div>

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
            <FileUploader @initImage="saveCardImagePrev" />
          </div>

          <div class="input-group">
            <label>Image:</label>
            <FileUploader @initImage="saveImagePrev" />
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
            <textarea v-model="recipe.description" rows="8" required></textarea>
          </div>
          <div class="input-group">
            <label>Ingredients (seperate by enter):</label>
            <textarea v-model="recipe.ingredient" rows="8" required></textarea>
          </div>
          <div class="input-group">
            <label>Method:</label>
            <textarea v-model="recipe.method" rows="12" required></textarea>
          </div>
          <div class="mx-auto w-fit space-x-1 md:space-x-4">
            <BtnSecond
              text="Back to Home"
              @click="
                () => {
                  $router.push('/');
                }
              "
            />
            <Btn text="Save Recipe" />
          </div>
        </form>
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

import Btn from "@/components/buttons/Btn.vue";
import BtnSecond from "@/components/buttons/BtnSecond.vue";
import ErrorMessage from "@/components/messages/ErrorMessage.vue";
import SuccessMessage from "@/components/messages/SuccessMessage.vue";
import FileUploader from "@/components/FileUploader.vue";

import fileUpload from "@/composables/fileUpload";

export default {
  components: {
    Btn,
    ErrorMessage,
    SuccessMessage,
    BtnSecond,
    FileUploader,
  },
  setup() {
    const error = ref(null);
    const success = ref(null);
    const recipe = ref(clearRecipe());
    const cardImageFile = ref(null);
    const imageFile = ref(null);

    const uploadImage = fileUpload;

    async function handleSubmit() {
      error.value = null;
      success.value = null;

      recipe.value.slug = recipe.value.title.replaceAll(" ", "-");

      try {
        let cardResult = await uploadImage(cardImageFile.value);

        if (cardResult.success) {
          recipe.value.cardImage = cardResult.url;
        } else {
          throw new Error(`Card Image: ${cardResult.message}`);
        }

        let imageResult = await uploadImage(imageFile.value);

        if (imageResult.success) {
          recipe.value.image = imageResult.url;
        } else {
          throw new Error(`Image: ${imageResult.message}`);
        }

        const requestOptions = {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(recipe.value),
        };

        const response = await fetch(
          "http://localhost:3000/recipes",
          requestOptions
        );

        if (!response.ok) {
          throw Error("Something went wrong...");
        }

        const data = await response.json();
        recipe.value = clearRecipe();
        cardImageFile.value = null;
        imageFile.value = null;

        success.value = "Successfully added.";
      } catch (err) {
        error.value = err.message;
      }
    }

    function clearRecipe() {
      return {
        id: 0,
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

    const saveCardImagePrev = (files) => {
      cardImageFile.value = files[0];
    };

    const saveImagePrev = (files) => {
      imageFile.value = files[0];
    };

    return {
      recipe,
      handleSubmit,
      error,
      success,
      saveCardImagePrev,
      saveImagePrev,
    };
  },
};
</script>

<style></style>
