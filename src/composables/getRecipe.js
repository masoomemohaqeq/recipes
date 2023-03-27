import { ref } from "@vue/reactivity";

import { recipesService } from "@/services/recipesService";

function getRecipe(id) {
  const recipe = ref(clearRecipe());
  const error = ref(null);
  const getIngredients = ref("");

  async function getRecipe() {
    try {
      const recService = new recipesService();
      const res = await recService.get(id);

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
