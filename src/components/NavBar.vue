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
          <span class="hidden md:inline-block">Home</span>
        </router-link>
        <router-link
          :to="{ name: 'addRecipe' }"
          class="cursor-pointer hover:border-b border-b-teal-700 pb-2"
          v-if="hasPermission('Permissions.Recipes.Create')"
        >
          <!-- <font-awesome-icon
            icon="fa-solid fa-file-circle-plus"
            class="inline-block md:hidden"
            title="Add new recipe"
          /> -->
          <Btn class="inline-block md:hidden text-xs" text="New Recipe" />
          <span class="hidden md:inline-block">New Recipe</span>
        </router-link>
        <router-link
          :to="{ name: 'login' }"
          class="cursor-pointer hover:border-b border-b-teal-700 pb-2"
        >
          <div @click="logout" class="inline-block" title="Logout">
            <font-awesome-icon
              icon="fa-solid fa-right-from-bracket"
              class="inline-block md:hidden"
            />
            <span class="hidden md:inline-block">Logout</span>
          </div>
        </router-link>
      </div>
    </div>
  </nav>
</template>

<script>
import Btn from "@/components/buttons/Btn";
import { userService } from "@/services/userServices";

export default {
  components: { Btn },
  setup() {
    const logout = () => {
      userService.logout();
    };

    const hasPermission = (permission) => {
      return userService.hasPermission(permission);
    };

    return { logout, hasPermission };
  },
};
</script>
