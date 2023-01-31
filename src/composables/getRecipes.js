import { ref } from "@vue/reactivity";
import { computed, onMounted } from "@vue/runtime-core";

function getRecipes(category) {
  console.log(category);
  const recipes = ref([]);
  const error = ref(null);

  async function getRecipes() {
    try {
      const res = await fetch("http://localhost:3000/recipes");

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
