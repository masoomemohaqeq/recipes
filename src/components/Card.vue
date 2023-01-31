<template>
  <router-link
    :to="{ name: 'recipe', params: { slug: recipe.slug, id: recipe.id } }"
  >
    <div
      class="card cursor-pointer bg-white border-yellow-500 hover:shadow-3xl hover:-translate-x-px hover:-translate-y-px"
    >
      <img
        class="card-img w-full"
        :src="recipe.cardImage"
        alt="Potato-Stacks"
      />
      <div class="card-content px-4 py-6">
        <span class="text-red-700 font-bold uppercase text-xs tracking-wider">{{
          recipe.category
        }}</span>
        <h2 class="text-3xl font-normal">{{ recipe.title }}</h2>
        <div class="flex justify-between items-center mt-6 mb-1">
          <span class="text-sm text-black/95 font-sans">
            <font-awesome-icon class="text-teal-700" icon="fa-solid fa-clock" />
            {{ recipe.prepTime }} mins</span
          >
          <Stars :score="recipe.score" />
        </div>
      </div>
    </div>
  </router-link>
</template>

<script>
import Stars from "@/components/Stars.vue";

export default {
  props: ["recipe"],
  components: {
    Stars,
  },
};
</script>
