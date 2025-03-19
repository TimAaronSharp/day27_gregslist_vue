<script setup>
import { AppState } from '@/AppState.js';
import { House } from '@/models/House.js';
import { computed } from 'vue';

defineProps({
  houseProp: { type: House, required: true }
})

const account = computed(() => AppState.account)


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
            <button v-if="houseProp.creatorId == account?.id" type="button">Delete House</button>
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
  // width: 100%;
  object-fit: cover;
}

.creator-img {
  height: 3.7em;
  aspect-ratio: 1/1;
  border-radius: 50%;

}
</style>