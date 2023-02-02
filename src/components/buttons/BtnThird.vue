<template>
  <button
    class="bg-red-700 text-white hover:bg-transparent hover:border-red-700 hover:text-red-700"
  >
    {{ text }}
  </button>
</template>

<script>
export default {
  props: ["text"],
};
</script>

<style></style>
