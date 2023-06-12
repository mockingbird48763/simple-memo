// 業務相關
import DataHelper from "./DataHelper"
import ItemData from '@/model/ItemData'
import Category from "@/model/CateEnums"

class ActionHelper {

  // 1. 負責數據處理
  dataHelper: DataHelper = new DataHelper('memoData', 'id')

  // 1.1 筆記數組
  memoList!: Array<ItemData>

  // 構造函數，讀取本地數據，並設置給成員變量 memoList
  constructor() {
    // 讀取本地數據，將筆記數據保存到 this.memoList 變量中
    this.memoList = this.readData()
  }

  // 讀取本地數據，並返回 ItemData 類型數組
  readData(): Array<ItemData> {
    // 1. 讀取本地的 Object 數組 - dataHelper
    let arrObj = this.dataHelper.readData()

    // 2. 將 Objectd 數組轉成 ItemData 數組
    let arrItem = arrObj.map((ele: ItemData) => {
      let item: ItemData = new ItemData()
      item.id = ele.id
      item.categoryId = ele.categoryId
      item.title = ele.title
      item.content = ele.content
      item.createTime = ele.createTime
      return item
    })

    // 3. 返回 itemData 數組
    return arrItem
  }

  // 2. 負責業務處理
  // 2.1 新增筆記
  add(item: ItemData): number {
    // a. 保存到本地 dataHelper.addData，會返回生成的 id 值
    item.id = this.dataHelper.addData(JSON.stringify(item))
    // b. 將筆記添加到筆記數組中
    this.memoList.push(item)
    // c. 將筆記數組重新保存到本地
    this.dataHelper.saveData(this.memoList)
    // d. 返回新筆記的 id
    return item.id
  }

  // 2.2 修改筆記
  edit(item: ItemData): void {
    // a. 找出數組中 id 相同的對象
    let editItem: ItemData | undefined = this.memoList.find((ele) => ele.id == item.id)
    // b. 修改對象的值，將傳入對象 item 各個屬性的值覆蓋設置給數組中找到對象的屬性
    if (editItem) {
      editItem.categoryId = item.categoryId
      editItem.title = item.title
      editItem.content = item.content
      // c. 將更新後的數組重新保到本地 localstorage
      this.dataHelper.saveData(this.memoList)
    }
  }

  // 2.3 刪除筆記
  // 業務方法不用告訢是否刪除成功
  remove(id: number): void {
    // a. 根據 id 找出要刪除的對象在數組中的下標
    let index: number = this.memoList.findIndex((ele) => ele.id == id)

    // b. 根據下標調用數組的 splice 方法來刪除對象
    if (index > -1) {
      this.memoList.splice(index, 1)
      // c. 將前除對象後的數組重新保存回 localstorage
      this.dataHelper.saveData(this.memoList)
    }
  }

  getCategoryName(cateId: Category): string {
    const arrNames = ['工作', '生活', '學習']
    return arrNames[cateId]
  }
}

export default ActionHelper