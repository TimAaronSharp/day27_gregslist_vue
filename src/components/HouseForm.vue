<script setup>
import { housesService } from '@/services/HousesService.js';
import { logger } from '@/utils/Logger.js';
import { Pop } from '@/utils/Pop.js';
import { ref } from 'vue';


const editableHouseData = ref({
  year: 0,
  bedrooms: 0,
  bathrooms: 0,
  levels: 1,
  imgUrl: '',
  price: 0,
  description: ''

})

async function createHouse() {
  try {
    const houseData = editableHouseData.value
    await housesService.createHouse(houseData)
  }
  catch (error) {
    Pop.error(error);
  }
}

</script>


<template>
  <form @submit.prevent="createHouse()">
    <div class="mb-3">
      <label for="houseYear">Year</label>
      <input v-model="editableHouseData.year" id="houseYear" name="year" type="number" required min="0" max="2030">
    </div>
    <div class="mb-3">
      <label for="houseBedrooms">Bedrooms</label>
      <input v-model="editableHouseData.bedrooms" id="houseBedrooms" name="bedrooms" type="number" min="0" max="1000"
        required>
    </div>
    <div class="mb-3">
      <label for="houseBathrooms">Bathrooms</label>
      <input v-model="editableHouseData.bathrooms" id="houseBathrooms" name="bathrooms" type="number" min="0" max="1000"
        required>
    </div>
    <div class="mb-3">
      <label for="houseLevels">Levels</label>
      <input v-model="editableHouseData.levels" id="houseLevels" name="levels" type="number" required min="1"
        max="1000">
    </div>
    <div class="mb-3">
      <label for="housePrice">Price</label>
      <input v-model="editableHouseData.price" id="housePrice" name="price" type="number" required min="0"
        max="1000000000">
    </div>
    <div class="mb-3">
      <label for="houseDescription">Description</label>
      <textarea v-model="editableHouseData.description" id="houseDescription" name="description" type="text-field"
        maxlength="5000"></textarea>
    </div>
    <div class="mb-3">
      <label for="houseImgUrl">Image URL</label>
      <input v-model="editableHouseData.imgUrl" id="houseImgUrl" name="imgUrl" type="url" maxlength="500">
    </div>
    <div>
      <button class="btn btn-outline-danger me-2" type="reset">Reset Form</button>
      <button class="btn btn-outline-dark" type="submit">Submit</button>
    </div>
  </form>
</template>


<style lang="scss" scoped>
label {
  display: block;
}
</style>