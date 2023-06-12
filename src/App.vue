<template>
  <MenuBar />
  <MemoEditor v-if="store.isShow" />
  <ItemList />
</template>

<script setup lang="ts">
import MenuBar from '@/components/MenuBar.vue'
import ItemList from './components/ItemList.vue'
import MemoEditor from './components/MemoEditor.vue'
import { useStickyNoteStore } from '@/store'
const store = useStickyNoteStore()
</script>
