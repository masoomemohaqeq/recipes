<template>
  <div class="md:w-1/2 mx-auto text-center">
    <div class="bg-red-500 text-white text-2xl py-10">
      <font-awesome-icon
        class="text-9xl my-4"
        icon="fa-solid fa-face-sad-cry"
      /><br />
      Error Occured!
    </div>
    <div class="bg-black/20 py-10 space-y-6">
      <p>{{ error }}</p>
      <button
        @click="$emit('retry')"
        class="block mx-auto rounded-full bg-red-500 px-5 py-3 text-white"
      >
        Try Again
      </button>
    </div>
  </div>
</template>

<script>
export default {
  props: ["error"],
};
</script>
