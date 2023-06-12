import { defineStore } from 'pinia'
import { ref } from 'vue'
import ActionHelper from './ActionHelper'

// setup store 形式
// setup() {return{}}
// 第二參數是一個 Setup 函數
export const useStickyNoteStore = defineStore('StickyNote', () => {
  // state
  const title = ref('前途無亮')
  const aHelper = new ActionHelper()
  // 控制編輯框顯示
  const isShow = ref(false)
  // 傳遞數據的橋梁
  const transMemo = ref({})
  // 篩選分類 id
  const filterCatedId = ref(-1)

  // geters
  /* const gettersCounter = computed(() => {
    return counter.value + 5
  }) */

  // actions
  function showEditMemo(editMemo: any) {
    // 1. 將傳遞過來的 editMemo 設置給 transMemo
    transMemo.value = editMemo
    // 2. 顯示編輯框
    isShow.value = true
  }

  return {
    title,
    isShow,
    transMemo,
    filterCatedId,
    showEditMemo,
    aHelper
  }
})