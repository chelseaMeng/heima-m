<template>
  <div>
    <!-- 双向绑定了日期选择器 v-model="currentDate" -->
    <van-datetime-picker
      v-model="currentDate"
      type="date"
      title="选择年月日"
      :min-date="minDate"
      :max-date="maxDate"
      @cancel="$emit('close')"
      @confirm="onBirthdayConfirm"
    />
  </div>
</template>

<script>
import { editUserProfile } from '@/apis'
import dayjs from 'dayjs'
export default {
  name: 'UpdateBirthday',
  data () {
    return {
      minDate: new Date(1970, 0, 1),
      maxDate: new Date(),
      currentDate: new Date(this.value),
      localBirthday: this.value
    }
  },
  props: {
    value: {
      type: String,
      required: true
    }
  },
  methods: {
    async onBirthdayConfirm () {
      // 将本地的日期对象转化成可以传递给后端的日期格式例如:2017-7-2
      const currentDate = dayjs(this.currentDate).format('YYYY-MM-DD')
      const localBirthday = currentDate
      try {
        this.$toast.loading({
          message: '加载中...',
          forbidClick: true,
          duration: 0 // 持续展示
        })
        await editUserProfile({
          birthday: localBirthday
        })
        // 更新视图
        this.$emit('input', localBirthday)
        // 关闭弹层
        this.$emit('close')
        // 提示用户
        this.$toast.success('更新成功')
      } catch (err) {
        this.$toast.fail('更新失败')
      }
    }
  }
}
</script>

<style></style>
