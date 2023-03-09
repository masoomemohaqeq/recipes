import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import MainView from "../views/Main.vue";
import RecipeDetails from "../views/RecipeDetails.vue";
import SaveRecipe from "../views/SaveRecipe.vue";
import AddRecipe from "../views/AddRecipe.vue";
import Login from "../views/Login.vue";

const routes = [
  {
    path: "/login",
    name: "login",
    component: Login,
  },
  {
    path: "/",
    name: "main",
    component: MainView,
    children: [
      {
        path: "",
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
    ],
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach((to, from, next) => {
  // redirect to login page if not logged in and trying to access a restricted page
  const publicPages = ["/login"];
  const authRequired = !publicPages.includes(to.path);
  const loggedIn = localStorage.getItem("user");

  if (authRequired && !loggedIn) {
    return next("/login");
  }

  next();
});

export default router;
