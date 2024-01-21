<template>
  <VitePwaManifest />
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<script setup>
useHead({
  titleTemplate: (titleChunk) => {
    return titleChunk
      ? `${titleChunk} - Y.NetLabp`
      : "Y.NetLabo | アプリ開発の情報発信ラボ";
  },
});
</script>
