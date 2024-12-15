<template>
  <q-page>
    <div
      class="hero-section"
      :style="{ backgroundImage: 'url(https://cetpinamar.com.ar/images/demo/backgrounds/03.png)' }"
    >
      <div class="content">
        <h1>TRAVEL TIME</h1>
        <p>Don't let the loud noise scare you, let the rhythms of the dance amuse you...</p>
      </div>
    </div>
    <q-tabs>
      <q-tab name="main" label="Main" />
      <q-tab name="about" label="About Us" />
      <q-tab name="tours" label="Tours" />
      <!-- Add more tabs as needed -->
    </q-tabs>
  </q-page>
</template>

<script setup lang="ts">
// export default {}
</script>

<style scoped>
.hero-section {
  width: 100%;
  height: 100vh;
  background-size: cover;
  background-position: center;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
}

.content {
  text-align: center;
}
</style>
