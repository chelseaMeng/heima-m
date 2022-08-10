<template>
  <div>
    <van-picker
      title="更新性别"
      show-toolbar
      :default-index="value"
      :columns="columns"
      @cancel="$emit('close')"
      @confirm="onConfirm"
      @change="onPickerChange"
    />
  </div>
</template>

<script>
import { editUserProfile } from '@/apis'
export default {
  name: 'UpdateGender',
  data () {
    return {
      columns: ['男', '女'],
      localGender: this.value
    }
  },
  props: {
    value: {
      type: Number,
      required: true
    }
  },
  methods: {
    async onConfirm () {
      this.$toast.loading({
        message: '加载中...',
        forbidClick: true,
        duration: 0 // 展示时长(ms)，值为 0 时，toast 不会消失
      })

      // 发送请求
      try {
        const localGender = this.localGender

        // const { data } = await editUserProfile({
        await editUserProfile({
          gender: localGender
        })
        // console.log(data)
        this.$toast.success('更新成功')
      } catch (err) {
        this.$toast.fail('更新失败')
      }
      // 更新视图
      this.$emit('input', this.localGender)
      // 关闭弹层
      this.$parent.$parent.isShowGender = false
    },
    onPickerChange (picker, value, index) {
      console.log(picker, value, index)
      this.localGender = index
    }
  }
}
</script>

<style></style>
