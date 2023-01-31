<template>
  <div class="text-lg" v-html="getStars"></div>
</template>

<script>
import { computed } from "@vue/runtime-core";
export default {
  props: ["score"],
  setup(props) {
    const getStars = computed(() => {
      let starEls = [];

      for (let i = 0; i < props.score; i++) {
        starEls += '<i class="fa-solid fa-star text-teal-700"></i>';
      }
      for (let i = props.score; i <= 5; i++) {
        starEls += '<i class="fa-solid fa-star text-teal-700/50"></i>';
      }

      return starEls;
    });

    return { getStars };
  },
};
</script>

<style></style>
