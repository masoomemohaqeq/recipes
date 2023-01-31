<template>
  <button
    class="rounded-md bg-teal-600 text-white px-4 py-3 border transition hover:bg-transparent hover:border-teal-600 hover:text-teal-900"
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
