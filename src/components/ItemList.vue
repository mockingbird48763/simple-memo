<template>
  <div>
    <MemoItem v-for="item in filterMemo()" :key="item.id" :memo="item" />
  </div>
</template>

<script setup lang="ts">
import ItemData from '@/model/ItemData'
import { useStickyNoteStore } from '@/store'
import MemoItem from './MemoItem.vue'

const store = useStickyNoteStore()

// a. 聲明筆記數組(方便當前組件中調用)
// ActionHelper 構造函數已經初始化 memoLIst
const memoArr: Array<ItemData> = store.aHelper.memoList

const filterMemo = () => {
  if (store.filterCatedId == -1) {
    return memoArr
  } else {
    return memoArr.filter((item: any) => {
      return item.categoryId == store.filterCatedId
    })
  }
}

</script>