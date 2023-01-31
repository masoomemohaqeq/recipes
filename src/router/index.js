import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import RecipeDetails from "../views/RecipeDetails.vue";
import SaveRecipe from "../views/SaveRecipe.vue";
import AddRecipe from "../views/AddRecipe.vue";

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/recipe/:slug/:id",
    name: "recipe",
    component: RecipeDetails,
    props: true,
  },
  {
    path: "/recipe/add-recipe",
    name: "addRecipe",
    component: AddRecipe,
    props: true,
  },
  {
    path: "/recipe/save-recipe/:id",
    name: "saveRecipe",
    component: SaveRecipe,
    props: true,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
