<template>
  <div class="container">
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

    <!-- 昵称 -->
    <van-cell
      title="昵称"
      is-link
      :value="nickname"
      @click="isShowNickname = true"
    >
    </van-cell>
    <!-- 昵称弹出层 -->
    <van-popup
      v-model="isShowNickname"
      position="bottom"
      :style="{ height: '100%', width: '100%' }"
    >
      <!-- 更新昵称组件挂载点 -->
      <UpdateNickname
        v-if="isShowNickname"
        @close="isShowNickname = false"
        v-model="nickname"
      ></UpdateNickname>
      <!-- v-model="nickname"  nickname在父组件中既要传递给子组件,子组件的数据改动之后也要传递给父组件 所以用v-model-->
    </van-popup>

    <!-- 性别 -->
    <van-cell
      title="性别"
      is-link
      :value="gender == 0 ? '男' : '女'"
      @click="isShowGender = true"
    >
    </van-cell>

    <!--  性别弹层-->
    <!-- 弹出层中的v-model意思是是否显示弹出层 -->
    <van-popup
      v-model="isShowGender"
      position="bottom"
      :style="{ height: '40%', width: '100%' }"
    >
      <!-- 更新性别组件挂载点 -->
      <UpdateGender
        v-if="isShowGender"
        v-model="gender"
        @close="isShowGender = false"
      ></UpdateGender>
      <!-- v-model="gender"  gender在父组件中既要传递给子组件,子组件的数据改动之后也要传递给父组件 所以用v-model 子组件用input事件触发-->
    </van-popup>

    <!-- 生日 -->
    <van-cell
      title="生日"
      is-link
      :value="birthday"
      @click="isShowBirthday = true"
    />
    <!-- 生日弹出层 -->
    <van-popup
      v-model="isShowBirthday"
      position="bottom"
      :style="{ height: '40%' }"
    >
      <!-- 更新生日挂载点 -->
      <UpdateBirthday
        v-model="birthday"
        @close="isShowBirthday = false"
      ></UpdateBirthday>
    </van-popup>
  </div>
</template>

<script>
import { getUserInfo, getUserProfile } from '@/apis'
import UpdateAvatar from './components/UpdateAvatar'
import UpdateNickname from './components/UpdateNickname'
import UpdateGender from './components/UpdateGender'
import UpdateBirthday from './components/UpdateBirthday'
import { resolveToBase64 } from '@/utils/index'

export default {
  name: 'User',
  data () {
    return {
      userInfo: {},
      isShowAvatar: false,
      isShowNickname: false,
      isShowGender: false,
      isShowBirthday: false,
      photo: '',
      nickname: '',
      gender: '',
      birthday: ''
    }
  },
  created () {
    this.getUserInfo()
    this.getUserProfile()
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
    },
    // 获取用户个人信息
    async getUserProfile () {
      const { data } = await getUserProfile()
      // console.log(data)
      this.nickname = data.data.name
      this.gender = data.data.gender
      this.birthday = data.data.birthday
    }
    // saveNickname (msg) {
    //   this.nickname = msg
    //   this.isShowNickname = false
    // }
  },
  components: {
    UpdateAvatar,
    UpdateNickname,
    UpdateGender,
    UpdateBirthday
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
.van-popup {
  background-color: #f5f7f9;
}
</style>
