<script setup>
import { AppState } from '@/AppState.js';
import { House } from '@/models/House.js';
import { housesService } from '@/services/HousesService.js';
import { logger } from '@/utils/Logger.js';
import { Pop } from '@/utils/Pop.js';
import { computed } from 'vue';

defineProps({
  houseProp: { type: House, required: true }
})

const account = computed(() => AppState.account)

async function deleteHouse(houseProp) {
  try {
    const confirmed = await Pop.confirm(`Are you sure you want to delete ${houseProp.year} ${houseProp.bedrooms} Bed ${houseProp.bathrooms} Bath?`, "This action cannot be undone.", "Yes, delete it", "No, don't delete it")
    if (!confirmed) {
      return
    }
    await housesService.deleteHouse(houseProp.id)
  }
  catch (error) {
    Pop.error(error);
  }
}

</script>


<template>
  <div class="row shadow-lg mb-3">
    <div class="col-md-5 px-0">
      <img :src="houseProp.imgUrl" :alt="houseProp.description" class="w-100">
    </div>
    <div class="col-md-7">
      <div class="h-100 d-flex flex-column justify-content-between p-3">
        <div>
          <div class="d-flex justify-content-between">
            <p class="fs-2">{{ houseProp.year }} {{ houseProp.bedrooms }} Bed {{ houseProp.bathrooms }} Bath</p>
            <p>Posted: {{ houseProp.createdAt.toLocaleDateString() }}</p>
          </div>
          <p class="fs-5">{{ houseProp.levels }} levels</p>
          <p class="fs-5">{{ houseProp.price.toLocaleString('en-US', { style: 'currency', currency: 'USD' }) }}</p>
          <p class="fs-5">{{ houseProp.description }}</p>
        </div>
        <div class="d-flex justify-content-between align-items-center">
          <div>
            <button v-if="houseProp.creatorId == account?.id" @click="deleteHouse(houseProp)" type="button"
              class="btn btn-danger">Delete House</button>
          </div>
          <div class="d-flex align-items-center gap-3">
            <p class="mb-0">{{ houseProp.creator.name }}</p>
            <img :src="houseProp.creator.picture" :alt="`${houseProp.creator.name}'s account picture`"
              class="creator-img">
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


<style lang="scss" scoped>
img {
  height: 45dvh;
  object-fit: cover;
}

.creator-img {
  height: 3.7em;
  aspect-ratio: 1/1;
  border-radius: 50%;
}
</style>