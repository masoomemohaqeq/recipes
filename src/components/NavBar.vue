<template>
  <nav class="border-b border-b-red-700">
    <div
      class="flex justify-between items-center font-bold text-teal-900 px-4 py-4 cursor-pointer 2xl:container 2xl:mx-auto"
    >
      <div>
        <img class="w-10 inline-block" src="../assets/images/chef-icon.png" />
        <span class="">Yummy Recipes</span>
      </div>
      <div class="space-x-2">
        <router-link to="/"> Home</router-link>
        <router-link :to="{ name: 'addRecipe' }">
          <Btn text="New Recipe" />
        </router-link>
      </div>
    </div>
  </nav>
</template>

<script>
import Btn from "@/components/Btn.vue";
export default {
  components: { Btn },
};
</script>
