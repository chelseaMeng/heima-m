<template>
  <div>
    <van-nav-bar
      title="更新昵称"
      left-text="取消"
      right-text="保存"
      @click-left="$emit('close')"
      @click-right="UpdateNickname"
    />
    <div class="fieldWrap">
      <van-field
        v-model.trim="localName"
        rows="2"
        autosize
        type="textarea"
        maxlength="7"
        placeholder="请输入新的昵称"
        show-word-limit
      />
    </div>
  </div>
</template>

<script>
import { editUserProfile } from '@/apis'
export default {
  name: 'UpdateNickname',
  data () {
    return {
      localName: this.value
    }
  },
  // value是prop数据,prop数据除了数组和对象类型可以修改,布尔,字符串等都不可以被修改,所以这里v-model中不可以绑定value
  props: {
    value: {
      type: String,
      required: true
    }
  },
  methods: {
    async UpdateNickname () {
      this.$toast.loading({
        message: '加载中...',
        forbidClick: true,
        duration: 0 // 展示时长(ms)，值为 0 时，toast 不会消失
      })
      // this.$emit('save', this.localName)
      // 发送请求
      try {
        const localName = this.localName
        if (!localName.length) {
          this.$toast('昵称不能为空')
          return
        }
        // const { data } = await editUserProfile({
        await editUserProfile({
          name: localName
        })
        // console.log(data)
        this.$toast.success('更新成功')
      } catch (err) {
        this.$toast.fail('更新失败')
      }
      // 更新视图
      this.$emit('input', this.localName)
      // 关闭弹层
      this.$parent.$parent.isShowNickname = false
    }
  }
}
</script>

<style scoped lang="less">
.fieldWrap {
  padding: 20px;
}
</style>
