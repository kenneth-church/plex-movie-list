<template>
  <q-card unelevated bordered class="col-12 col-md-6">
    <template v-if="'error' in movies">
      <q-card-section class="text-center">
        <div>Error:</div>
        <div>{{ movies.error }}</div>
      </q-card-section>
    </template>

    <template v-else>
      <q-card-section class="row q-col-gutter-x-sm">
        <q-input
          clearable
          dense
          standout
          v-model="search"
          label="Search"
          class="col"
        />
        <q-select
          standout
          dense
          v-model="sort"
          :options="sortOptions"
          style="min-width: 9rem"
          class="col-auto"
        />
        <div class="col-auto">
          <q-btn
            flat
            dense
            :icon="sortAsc ? mdiArrowUpThin : mdiArrowDownThin"
            @click="sortAsc = !sortAsc"
            class="fit"
          />
        </div>
      </q-card-section>
      <q-separator />
      <q-list separator>
        <q-expansion-item v-for="movie in computedMovies" :key="movie.key">
          <template v-slot:header>
            <q-item-section class="text-h6">{{ movie.title }}</q-item-section>
            <q-chip :ripple="false" outline class="q-my-auto">
              {{ movie.year }}
            </q-chip>
          </template>

          <div class="row q-col-gutter-x-md q-pa-md">
            <div class="col-4">
              <q-img
                :ratio="2 / 3"
                :src="`${baseURL}/img/${movie.key}`"
                placeholder-src="data:image/webp;base64,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"
              />
            </div>
            <div class="col">
              <div>{{ movie.summary }}</div>
              <div class="q-mt-sm">
                <q-chip
                  :ripple="false"
                  v-for="res in movie.resolutions"
                  :key="res"
                  :color="res === '4k' ? 'red-14' : 'blue-14'"
                  class="glossy non-selectable"
                >
                  {{ res === '4k' ? 'UHD' : 'HD' }}
                </q-chip>
              </div>
            </div>
          </div>
        </q-expansion-item>
      </q-list>
    </template>
  </q-card>
</template>

<script setup lang="ts">
import { mdiArrowUpThin, mdiArrowDownThin } from '@quasar/extras/mdi-v7';

import { ref, computed } from 'vue';
import { baseURL, api } from 'boot/axios';

interface VideoData {
  title: string;
  titleSort?: string;
  key: string;
  year: string;
  summary: string;
  resolutions: string[];
  addedAt: string;
}

const movies = ref<VideoData[] | { error: string }>((await api.get('')).data);

const sortOptions: { label: string; value: keyof VideoData }[] = [
  { label: 'Title', value: 'titleSort' },
  { label: 'Date Added', value: 'addedAt' },
];

const sort = ref<(typeof sortOptions)[number]>(sortOptions[0]);
const sortAsc = ref(false);
const search = ref('');

const computedMovies = computed(() => {
  if (!('error' in movies.value)) {
    let sortArr = movies.value;

    if (search.value !== '') {
      sortArr = movies.value.filter((movie) => {
        return (
          movie.title.toLowerCase().indexOf(search.value.toLowerCase()) >= 0
        );
      });
    }

    return sortArr.toSorted((a, b) => {
      if ((a[sort.value.value] ?? a.title) < (b[sort.value.value] ?? b.title)) {
        let val = sortAsc.value ? 1 : -1;
        return sort.value.value === 'addedAt' ? val * -1 : val;
      } else if (
        (a[sort.value.value] ?? a.title) > (b[sort.value.value] ?? b.title)
      ) {
        let val = sortAsc.value ? -1 : 1;
        return sort.value.value === 'addedAt' ? val * -1 : val;
      }
      return 0;
    });
  } else {
    return [];
  }
});
</script>
