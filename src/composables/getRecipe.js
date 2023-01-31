import { ref } from "@vue/reactivity";

function getRecipe(id) {
  const recipe = ref(clearRecipe());
  const error = ref(null);
  const getIngredients = ref("");

  async function getRecipe() {
    try {
      const res = await fetch("http://localhost:3000/recipes/" + id);

      if (!res.ok) throw Error("Something went wrong...");

      recipe.value = await res.json();

      recipe.value.ingredient.split(",").forEach((i) => {
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
