<template>
  <button
    class="bg-teal-600 text-white hover:bg-transparent hover:border-teal-600 hover:text-teal-900"
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
