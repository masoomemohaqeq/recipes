import { ref } from "@vue/reactivity";

import axios from "axios";

import { config } from "@/configurations/config";
import { authHeader } from "@/helpers/authHeader";

function getRecipe(id) {
  const recipe = ref(clearRecipe());
  const error = ref(null);
  const getIngredients = ref("");

  async function getRecipe() {
    try {
      const res = await axios.get(`${config.apiUrl}/Recipes/${id}`, {
        headers: authHeader(),
      });

      recipe.value = res.data;

      recipe.value.ingredient.split("\n").forEach((i) => {
        getIngredients.value += `<li>* ${i}</li>`;
      });
    } catch (err) {
      error.value = err;
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

  return {
    recipe,
    error,
    getRecipe,
    clearRecipe,
    getIngredients,
  };
}

export default getRecipe;
