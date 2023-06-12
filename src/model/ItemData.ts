import Category from "./CateEnums"

// 每條筆記的數據
class ItemData {
  id!: number
  categoryId!: Category
  title!: string
  content!: string
  createTime!: string

  constructor(id: number = -1, categoryId: Category = -1, title: string = '', content: string = '') {
    this.id = id
    // 在此需要使用枚舉類型代表筆記分類
    this.categoryId = categoryId
    this.title = title
    this.content = content
    this.createTime = this.toSelfDataStr(Date.now())
  }

  // timsStamp 轉成日期時間字符串
  toSelfDataStr(timeSpan: number): string {
    // 1. 時間戳 => 日期對象
    const date = new Date(timeSpan)
    // 2. 日期對象的 getXxx 方法依次獲取 年月日 時分秒 拼接格式
    const str = date.getFullYear() + '-'
      + (date.getMonth() + 1) + '-'
      + (date.getDate()) + ' '
      + date.getHours() + ':'
      + date.getMinutes() + ''
    // 3. 最後將日期字符串返回
    return str
  }
}

export default ItemData