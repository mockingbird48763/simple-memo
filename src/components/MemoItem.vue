<template>
  <div class="memo-item">
    <h2>{{ memo.title }}</h2>
    <p>日期：{{ memo.createTime }}</p>
    <p>分類：{{ store.aHelper.getCategoryName(memo.categoryId) }}</p>
    <p>{{ memo.content }}</p>
    <button @click="showEdit">編輯</button>
    <button @click="doDel">刪除</button>
  </div>
</template>

<script setup lang="ts">
import ItemData from '@/model/ItemData';
import { useStickyNoteStore } from '@/store'

const props = defineProps({
  memo: {
    type: ItemData,
    required: true
  }
})

const store = useStickyNoteStore()

// 刪除方法
const doDel = () => {
  // 1. 詢問確認刪除
  if (!window.confirm(`確認刪除 ${props.memo.title} 的筆記嗎？`)) return

  // 2. 如果確認，則調用 actionHelper 中的刪除方法
  store.aHelper.remove(props.memo.id)
}

// 修改方法
const showEdit = () => {
  // 複製當前 memo 複本，給 store 的 transMemo
  // 1. 創建副本
  const newMemo = JSON.parse(JSON.stringify(props.memo))
  // 2. 傳遞給 transMemo
  store.showEditMemo(newMemo)
}

</script>

<style>
.memo-item {
  margin-bottom: 8px;
  padding: 4px;
  border: 1px solid #000;
}
</style>