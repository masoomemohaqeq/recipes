import { ref } from "@vue/reactivity";
import { config } from "@/configurations/config";
import { authHeader } from "@/helpers/authHeader";

function getRecipe(id) {
  const recipe = ref(clearRecipe());
  const error = ref(null);
  const getIngredients = ref("");

  async function getRecipe() {
    try {
      const requestOptions = {
        method: "GET",
        headers: authHeader(),
      };
      const res = await fetch(`${config.apiUrl}/Recipes/${id}`, requestOptions);

      if (!res.ok) throw Error("Something went wrong...");

      recipe.value = await res.json();

      recipe.value.ingredient.split("\n").forEach((i) => {
        getIngredients.value += `<li>* ${i}</li>`;
      });
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

  return {
    recipe,
    error,
    getRecipe,
    clearRecipe,
    getIngredients,
  };
}

export default getRecipe;
