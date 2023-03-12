<template>
  <div class="lg:bg-teal-600/10">
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
            <FileUploader
              @initImage="saveCardImagePrev"
              :img="recipe.cardImage"
              :isLoading="isLoading"
            />
          </div>

          <div class="input-group">
            <label>Image:</label>
            <FileUploader
              @initImage="saveImagePrev"
              :img="recipe.image"
              :isLoading="isLoading"
            />
          </div>

          <div class="input-group">
            <label>Prepration Time (mins):</label>
            <input
              type="number"
              v-model="recipe.prepTime"
              min="1"
              required
              :isLoading="isLoading"
            />
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
          <div class="mx-auto w-fit space-x-4">
            <BtnSecond
              text="Back"
              @click="
                () => {
                  $router.go(-1);
                }
              "
            />
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

import axios from "axios";

import { config } from "@/configurations/config";
import { authHeader } from "@/helpers/authHeader";

import Btn from "@/components/buttons/Btn.vue";
import BtnSecond from "@/components/buttons/BtnSecond.vue";
import NavBar from "@/components/NavBar.vue";
import Loading from "@/components/Loading.vue";
import ErrorMessage from "@/components/messages/ErrorMessage.vue";
import SuccessMessage from "@/components/messages/SuccessMessage.vue";
import FileUploader from "@/components/FileUploader.vue";

import GetRecipe from "@/composables/getRecipe";
import fileUpload from "@/composables/fileUpload";

export default {
  props: ["id"],
  components: {
    NavBar,
    Loading,
    ErrorMessage,
    SuccessMessage,
    Btn,
    BtnSecond,
    FileUploader,
  },
  setup(props) {
    const error = ref(null);
    const success = ref(null);
    const cardImageFile = ref(null);
    const imageFile = ref(null);
    const isLoading = ref(true);

    const uploadImage = fileUpload;

    async function handleSubmit() {
      error.value = null;
      success.value = null;

      recipe.value.slug = recipe.value.title.replaceAll(" ", "-");

      try {
        if (cardImageFile.value) {
          let cardResult = await uploadImage(cardImageFile.value);

          if (cardResult.success) {
            recipe.value.cardImage = cardResult.url;
          } else {
            throw new Error(`Card Image: ${cardResult.message}`);
          }
        }

        if (imageFile.value) {
          let imageResult = await uploadImage(imageFile.value);

          if (imageResult.success) {
            recipe.value.image = imageResult.url;
          } else {
            throw new Error(`Image: ${imageResult.message}`);
          }
        }

        await axios.put(`${config.apiUrl}/Recipes/${props.id}`, recipe.value, {
          headers: authHeader(),
        });

        success.value = "Successfully updated. ";

        cardImageFile.value = null;
        imageFile.value = null;
      } catch (err) {
        error.value = err;
      }
    }

    const { recipe, getRecipe } = GetRecipe(props.id);

    if (props.id) {
      getRecipe().then(() => {
        isLoading.value = false;
      });
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
      isLoading,
    };
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
