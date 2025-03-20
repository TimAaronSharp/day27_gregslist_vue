<script setup>
import { AppState } from '@/AppState.js';
import { housesService } from '@/services/HousesService.js';
import { logger } from '@/utils/Logger.js';
import { Pop } from '@/utils/Pop.js';
import { computed, onMounted } from 'vue';
import HouseListing from '@/components/HouseListing.vue';
import HouseForm from '@/components/HouseForm.vue';

onMounted(() => {
  getAllHouses()
})

const houses = computed(() => AppState.houses)
const account = computed(() => AppState.account)

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
  <section class="container">
    <div class="row">
      <div class="col-12">
        <div class="text-center">
          <h1 class="display-3">Houses</h1>
        </div>
      </div>
    </div>
  </section>
  <section v-if="account" class="container">
    <div class="row align-items-center">
      <div class="col-md-6">
        <HouseForm />
      </div>
    </div>
  </section>
  <section class="container">
    <div class="row">
      <div v-for="house in houses" :key="house.id" class="col-12">
        <HouseListing :houseProp="house" />
      </div>
    </div>
  </section>
</template>


<style lang="scss" scoped></style>