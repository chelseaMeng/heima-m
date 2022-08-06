// 在index.js中导入二次封装的本地存储函数文件 导出后 main.js中统一导入
// 1.从@/utils/auth引入所有   按需导出的东西
// 2.把这些东西,原封不动的按需暴露出去
// 3.不会导出默认暴露的东西 (export default..... 不导出)
export * from './auth'

export const resolveToBase64 = (file) => {
  return new Promise((resolve) => {
    // 以Promise形式进行管理
    // 通过FileReader读取文件对象
    const fr = new FileReader()
    // 将文件对象转换成base64
    fr.readAsDataURL(file)
    // 通过onload函数异步resolve输出base64结果
    fr.onload = (e) => {
      resolve(e.target.result)
    }
  })
}
