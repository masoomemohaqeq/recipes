<template>
  <div class="w-fit mx-auto relative">
    <div class="w-80 min-h-[100px] rounded-t-md bg-gray-500/20">
      <img
        class="w-full h-auto"
        accept="image/jpeg, image/png, image/jpg, image/webp"
        :src="fileOutput"
        v-show="fileOutput"
      />
    </div>
    <div
      v-show="fileOutput"
      @click="deleteImage"
      class="absolute top-2 right-2 cursor-pointer p-4 border bg-black/30 text-white"
    >
      <font-awesome-icon icon="fa-solid fa-xmark" />
    </div>

    <div
      class="relative border border-gray-400 hover:bg-teal-600/20 hover:border-teal-600/20 transition p-5 text-center rounded-b-md"
    >
      <font-awesome-icon icon="fa-solid fa-upload" class="text-gray-800" />
      <input
        type="file"
        class="rounded-none opacity-0 absolute inset-0"
        ref="fileInput"
      />
    </div>
  </div>
</template>

<script>
import { ref } from "@vue/reactivity";
import { onMounted } from "@vue/runtime-core";
export default {
  setup() {
    const fileInput = ref();
    const fileOutput = ref("");

    let image = null;

    onMounted(() => {
      fileInput.value.addEventListener("change", () => {
        const file = fileInput.value.files;
        image = file[0];
        fileOutput.value = URL.createObjectURL(image);
        console.log(image);
      });
    });

    function deleteImage() {
      fileOutput.value = null;
    }
    return { fileInput, fileOutput, deleteImage };
  },
};
</script>

<style>
/* input[type="file"] {
  @apply rounded-none opacity-0;
} */
</style>
