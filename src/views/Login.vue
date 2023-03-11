<template>
  <div class="bg-login w-screen h-screen flex justify-center items-center">
    <div class="bg-white m-2 p-4 shadow-lg rounded-md md:mx-auto">
      <form @submit.prevent="handleSubmit">
        <div class="text-center m-4">
          <h5 class="font-semibold text-lg">Login</h5>
          <p class="text-gray-600">
            Login to access thousands of yummy recipes.
          </p>
          <p class="text-gray-600">Enjoy cooking :)</p>
        </div>
        <div class="m-4">
          <input type="email" v-model="login.email" placeholder="Email" />
        </div>
        <div class="m-4">
          <input type="password" v-model="login.password" placeholder="Email" />
        </div>
        <div class="m-4">
          <Btn
            :text="isLoading ? 'Please wait...' : 'LOGIN'"
            class="w-full text-sm"
            :disabled="isLoading"
          />
        </div>
      </form>
      <div class="my-4">
        <ErrorMessage v-if="error" :error="error" />
        <SuccessMessage v-if="success" :msg="success" />
      </div>
      <div
        class="flex flex-col md:flex-row justify-between text-sm m-4 text-teal-700"
      >
        <a href="#">Dont have an account?</a>
        <a href="#">Forgot password?</a>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from "@vue/reactivity";
import router from "@/router";

import Btn from "@/components/buttons/Btn.vue";
import ErrorMessage from "@/components/messages/ErrorMessage.vue";
import SuccessMessage from "@/components/messages/SuccessMessage.vue";
import Loading from "@/components/Loading.vue";
import { userService } from "@/composables/userServices";

export default {
  components: { Btn, Loading, ErrorMessage, SuccessMessage },
  setup() {
    const error = ref(null);
    const success = ref(null);
    const isLoading = ref(false);
    const login = ref();

    login.value = {
      email: "",
      password: "",
    };
    async function handleSubmit() {
      isLoading.value = true;
      error.value = null;
      success.value = null;

      userService
        .login(login.value.email, login.value.password)
        .then(
          (user) => {
            success.value = "Successful Login. ";
            router.push("/");
          },
          (error) => {
            error.value = err.message;
          }
        )
        .finally(() => {
          isLoading.value = false;
        });

      try {
      } catch (err) {
        error.value = err.message;
      }
    }

    return {
      login,
      handleSubmit,
      error,
      success,
      isLoading,
    };
  },
};
</script>

<style>
.bg-login {
  background: url("~@/assets/images/cooking-bg-3.jpg");
  background-position: center;
  background-size: cover;
}
</style>
