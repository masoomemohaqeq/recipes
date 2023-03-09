import { ref } from "@vue/reactivity";
import { computed, onMounted } from "@vue/runtime-core";
import { config } from "@/configurations/config";
import { authHeader } from "@/helpers/authHeader";

function getRecipes(category) {
  const recipes = ref([]);
  const error = ref(null);

  async function getRecipes() {
    try {
      const requestOptions = {
        method: "GET",
        headers: authHeader(),
      };
      const res = await fetch(`${config.apiUrl}/Recipes`, requestOptions);

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
    return recipes.value.filter((recipe) => recipe.category.includes(category));
  });

  return {
    recipes,
    error,
    getRecipes,
    categorizedRecipes,
  };
}

export default getRecipes;
