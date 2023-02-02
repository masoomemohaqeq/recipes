<template>
  <div
    class="w-full md:w-72 mx-auto relative border border-gray-300 rounded-md"
  >
    <div class="min-h-[100px] rounded-t-md bg-gray-500/10">
      <img class="w-full h-auto" :src="fileOutput" v-show="fileOutput" />
    </div>
    <div
      v-show="fileOutput"
      @click="deleteImagePrev"
      class="absolute top-2 right-2 cursor-pointer px-4 py-2 border bg-black/20 text-white"
    >
      <font-awesome-icon icon="fa-solid fa-xmark" />
    </div>

    <div
      class="relative hover:bg-yellow-500 hover:text-white hover:border-teal-600/20 transition p-5 text-center cursor-pointer"
    >
      <font-awesome-icon icon="fa-solid fa-upload" />
      <input
        type="file"
        class="rounded-none opacity-0 absolute inset-0 cursor-pointer"
        ref="fileInput"
        @change="$emit('initImage', fileInput.files)"
      />
    </div>
  </div>
</template>

<script>
import { ref } from "@vue/reactivity";
import { onMounted, watch } from "@vue/runtime-core";

export default {
  props: ["img", "isLoading"],
  setup(props) {
    const fileInput = ref();
    const fileOutput = ref(null);
    const error = ref(null);
    let image = null;
    onMounted(() => {
      console.log(props.img);
      fileOutput.value = props.img;
      fileInput.value.addEventListener("change", () => {
        const file = fileInput.value.files;
        image = file[0];
        fileOutput.value = URL.createObjectURL(image);
        error.value = null;
      });
    });
    watch(
      () => props.isLoading,
      () => {
        fileOutput.value = props.img;
      }
    );
    function deleteImagePrev() {
      fileOutput.value = null;
    }
    return { fileInput, fileOutput, deleteImagePrev, error };
  },
};
</script>

<style></style>
