<template>
  <div>
    <!-- 标题 -->
    <van-nav-bar
      class="navbar"
      title="个人信息"
      left-arrow
      @click-left="$router.back()"
    />
    <!-- 头像 -->
    <van-cell title="头像" is-link @click="$refs.file.click()">
      <!-- van-cell包裹额内容是一个默认插槽 -->
      <van-image width="0.8rem" height="0.8rem" round :src="userInfo.photo" />
      <!-- input:type='file' 上传文件  hidden属性:隐藏input:file-->
      <!-- accept:显示选择上传的文件的后缀名 -->
      <!-- el.click()原生点击事件  -->
      <input
        type="file"
        hidden
        accept=".png,.jfif,jpg"
        ref="file"
        @change="selectPhoto"
      />
      <!--上传图片时展示弹层,暨input:file触发change事件时展示弹层 -->
    </van-cell>

    <!-- 头像弹层 -->
    <van-popup
      class="avatar-popup"
      v-model="isShowAvatar"
      closeable
      :style="{ height: '100%', width: '100%' }"
    >
      <!-- 更新头像组件挂载点 -->
      <UpdateAvatar
        @update-avatar="userInfo.photo = $event"
        :photo="photo"
        v-if="isShowAvatar"
      ></UpdateAvatar>
    </van-popup>
  </div>
</template>

<script>
import { getUserInfo } from '@/apis'
import UpdateAvatar from './components/UpdateAvatar'
import { resolveToBase64 } from '@/utils/index'

export default {
  name: 'User',
  data () {
    return {
      userInfo: {},
      isShowAvatar: false,
      photo: ''
    }
  },
  created () {
    this.getUserInfo()
  },
  methods: {
    async getUserInfo () {
      const { data } = await getUserInfo()
      //   console.log(data)

      this.userInfo = data.data
    },
    async selectPhoto (e) {
      // 1.获取用户选择的图片的文件对象
      // e.target触发事件对象的元素
      // HTMLInputElement.files 是一个伪数组,存储的是用户选择的所有的文件对象
      const file = e.target.files[0]
      // console.log(file)
      // 2.把file文件对象处理成img标签可识别的url
      // URL.createObjectURL(file对象)-->img标签可识别的url
      // const url = window.URL.createObjectURL(file)
      // // console.log(url)
      // // 3.传递url
      // this.photo = url
      // // 4.清空value,让用户可以选择同一张图片
      // e.target.value = ''
      //  this.isShowAvatar = true
      // 展示弹层组件
      const url = await resolveToBase64(file)
      this.photo = url
      // e.target.value = ''
      this.isShowAvatar = true
    }
  },
  components: {
    UpdateAvatar
  }
}
</script>

<style scoped lang="less">
:deep(.navbar) {
  background-color: #3296fa;
  .van-nav-bar__title {
    color: white;
  }
  .van-icon {
    color: white;
  }
}
.avatar-popup {
  background-color: #000;
}
</style>
