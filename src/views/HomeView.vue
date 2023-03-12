<template>
  <div class="text-center mt-6 mb-5 space-y-4 container mx-auto">
    <h1
      class="capitalize text-3xl border-b-[3px] border-yellow-400 inline-block hover:border-red-700"
    >
      The fantasic world of cooking
    </h1>
    <ul class="category flex justify-center gap-3 md:gap-x-16">
      <li
        :class="{ 'border-b-2 border-red-700': selectedCategory === '' }"
        @click="setSeletedCategory('')"
      >
        All
      </li>
      <li
        :class="{ 'border-b-2 border-red-700': selectedCategory === 'drink' }"
        @click="setSeletedCategory('drink')"
      >
        Drinks
      </li>
      <li
        :class="{ 'border-b-2 border-red-700': selectedCategory === 'food' }"
        @click="setSeletedCategory('food')"
      >
        Foods
      </li>
      <li
        :class="{ 'border-b-2 border-red-700': selectedCategory === 'dessert' }"
        @click="setSeletedCategory('dessert')"
      >
        Desserts
      </li>
    </ul>
  </div>

  <main>
    <Recipes :category="selectedCategory" />
  </main>
</template>

<script>
import { ref } from "@vue/reactivity";
import Recipes from "@/components/Recipes.vue";
import NavBar from "@/components/NavBar.vue";

export default {
  name: "HomeView",
  components: {
    Recipes,
    NavBar,
  },
  setup() {
    const selectedCategory = ref("");

    const setSeletedCategory = (cat) => {
      selectedCategory.value = cat;
    };

    return {
      selectedCategory,
      setSeletedCategory,
    };
  },
};
</script>

<style>
.category li {
  @apply cursor-pointer hover:border-b-2 hover:border-red-700;
}
</style>
