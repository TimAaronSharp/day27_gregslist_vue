<script setup>
import { housesService } from '@/services/HousesService.js';
import { logger } from '@/utils/Logger.js';
import { Pop } from '@/utils/Pop.js';
import { onMounted } from 'vue';


onMounted(() => {
  getAllHouses()
})

async function getAllHouses() {
  try {
    await housesService.getAllHouses()
  }
  catch (error) {
    Pop.error(error);
  }
}


</script>


<template>
  <div></div>
</template>


<style lang="scss" scoped></style>