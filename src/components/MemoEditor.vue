<template>
  <div>
    <input type="text" placeholder="標題" v-model="memo.title">
    <select v-model="memo.categoryId">
      <option v-for="(item, index) in ['工作', '生活', '學習']" :value="index" :selected="memo.categoryId == index" :key="item">
        {{ item }}
      </option>
    </select>
    <div>
      <textarea cols="30" rows="10" placeholder="內容" v-model="memo.content"></textarea>
    </div>
    <div>
      <button @click="saveNew">Save</button>
      <button @click="closeWin">Cancel</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import ItemData from '@/model/ItemData';
import { reactive } from 'vue';
import { useStickyNoteStore } from '@/store'
const store = useStickyNoteStore()

// const memo: ItemData = reactive({}) as ItemData
let memo: ItemData = reactive(new ItemData(-1, 0))

// created 當組件每次創建顯示時都會被執行
memo = store.transMemo as ItemData

const closeWin = () => {
  store.isShow = false
}

const saveNew = () => {
  // 1. 驗證 memo 數據是否合格
  if (
    memo &&
    memo.categoryId > -1 &&
    memo.title.trim() &&
    memo.content.trim()
  ) {
    // 操作業務的判斷
    // 2. 將驗證合格的 memo 對象添加到 memoList 數組，並保存到本地 localStorage 中
    if (memo.id <= -1) {
      // 新增操作
      store.aHelper.add(memo)
    } else {
      // 編輯保存操作
      store.aHelper.edit(memo)
    }
    store.isShow = false
  } else {
    window.alert('格式錯誤')
  }
}

</script>