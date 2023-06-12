// DataHelper 類，負責 localStorage 操作

class DataHelper {
  dataKey: string
  primaryKey: string

  // let dh = new DataHelper('plData', 'id')

  // 構造函數
  constructor(
    dataKey: string,
    primaryKey: string
  ) {
    this.dataKey = dataKey
    this.primaryKey = primaryKey
  }

  // 一、讀取全部數據，返回數組(如果沒有讀到數據，就返回空數組)
  readData(): any {
    // 1. 讀取本地數據(根據 dataKey 讀取)
    let strData: string | null = localStorage.getItem(this.dataKey)

    // 2. 將讀取的 json 數組字符串轉成數組對象
    let arrData: any = []
    if (strData != null) {
      arrData = JSON.parse(strData)
    }

    // 3. 返回數組對象
    return arrData
  }

  // 二、存入本地數據
  saveData(arrData: Array<Object>): void {
    // 1. 將數組轉成 JSON
    let str: string = JSON.stringify(arrData)

    // 2. 將字符串保存到本地 localStorage
    localStorage.setItem(this.dataKey, str)
  }

  // 三、新增數據
  addData(conStr: string): number {
    // 1. 讀取本地現有數據
    let arr: any = this.readData()

    // 2. 創建一個評論對象，並設置評論內容屬性
    let obj: any = {
      content: conStr
    }

    // obj.id = 1
    // obj['id'] = 1
    // obj[this.primaryKey] = 1

    // 3.1 自動生成主鍵值(id值) {content: 'abc'}
    let newId = arr.length > 0
      ? arr[arr.length - 1][this.primaryKey] + 1
      : 1

    // 3.2 將 id值通過中括號訪問法添加到對象 {content: 'abc', id: 1}
    obj[this.primaryKey] = newId

    // 4. 將添加了主鍵值的對象追加到數據
    arr.push(obj)

    // 5. 將數組保存到 localStorage 中
    this.saveData(arr)

    // 6. 返回 id
    return newId
  }

  // 四、刪除數據
  removeDataById(id: string | number): boolean {
    // 讀取本地數組
    let arr = this.readData()

    // 查找要刪除評論對象的下標，並保存到本地
    let index = arr.findIndex((ele: any) => {
      return ele[this.primaryKey] == id
    })

    // 如果下標大於 -1，則刪除數組中該下標元素對象，並返回 true
    if (index > -1) {
      arr.splice(index, 1)
      // 保存到本地
      this.saveData(arr)
      return true
    }

    // 否則返回 true
    return false
  }
}

export default DataHelper