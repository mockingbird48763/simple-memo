<template>
  <div>
    <div class="list">
      <button @click="showAdd">新建</button>
      <select @change="doFilterByCateId">
        <option v-for="(item, index) in ['全部', '工作', '生活', '學習']" :key="item" :value="index - 1">{{ item }} {{
          doFilter(index - 1) }}</option>
      </select>
    </div>
  </div>
</template>

<script setup lang="ts">
import ItemData from '@/model/ItemData';
import { useStickyNoteStore } from '@/store'
const store = useStickyNoteStore()

// 顯示編輯框
const showAdd = () => {
  store.transMemo = new ItemData(-1, 0)
  store.isShow = true
}

const doFilter = (cid: number): number => {
  if (cid == -1) {
    return store.aHelper.memoList.length
  } else {
    return store.aHelper.memoList.filter((ele: any) => {
      return ele.categoryId == cid
    }).length
  }
}

// 其實可以直接雙向綁定 filterCatedId
const doFilterByCateId = (e: Event) => {
  const target = e.target as HTMLSelectElement
  // 獲取選中索引
  const index = target.selectedIndex;
  // 獲取選中索引的值
  store.filterCatedId = +target.options[index].value;
}

</script>

<style scoped>
.list {
  display: flex;
}
</style>