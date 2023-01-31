<template>
  <button
    class="bg-yellow-500 text-blackhover:bg-transparent hover:border-yellow-500 hover:text-black"
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
