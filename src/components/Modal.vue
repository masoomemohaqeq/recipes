<template>
  <div class="fixed inset-0">
    <div class="fixed inset-0 bg-black/30 z-30" for="modalToggle"></div>
    <div
      class="w-full md:w-96 bg-white rounded-sm p-6 absolute z-40 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
    >
      <!-- <div class="relative h-8">
        <span for="modalToggle" class="absolute top-0 right-0"
          ><font-awesome-icon icon="fa-solid fa-xmark"
        /></span>
      </div> -->
      <div class="mb-6">
        <slot name="content"></slot>
      </div>
      <div class="space-x-4">
        <slot name="actions"></slot>
      </div>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style></style>
