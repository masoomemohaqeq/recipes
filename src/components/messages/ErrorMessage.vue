<template>
  <div class="bg-red-500 text-white rounded-md px-4 py-2">{{ error }}</div>
</template>

<script>
export default {
  props: ["error"],
};
</script>
