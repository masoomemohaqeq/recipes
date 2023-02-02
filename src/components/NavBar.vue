<template>
  <nav class="border-b border-b-red-700">
    <div
      class="flex justify-between items-center font-bold text-teal-900 px-4 py-4 2xl:container 2xl:mx-auto"
    >
      <div class="cursor-pointer">
        <router-link to="/">
          <img class="w-10 inline-block" src="../assets/images/chef-icon.png" />
          <span class="hidden md:inline-block">Yummy Recipes</span>
        </router-link>
      </div>

      <div class="space-x-2">
        <router-link
          to="/"
          class="cursor-pointer hover:border-b border-b-teal-700 pb-2"
        >
          Home</router-link
        >
        <router-link :to="{ name: 'addRecipe' }">
          <Btn text="New Recipe" />
        </router-link>
      </div>
    </div>
  </nav>
</template>

<script>
import Btn from "@/components/buttons/Btn.vue";
export default {
  components: { Btn },
};
</script>
