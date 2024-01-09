<template>
  <q-layout view="lHh Lpr lFf">
    <q-page-container>
      <q-page padding class="row justify-center">
        <Suspense>
          <router-view />
          <template #fallback>
            <q-skeleton height="90vh" class="col-12 col-md-8" />
          </template>
        </Suspense>
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script setup lang="ts"></script>
