<template>
  <div class="update-avator">
    <img :src="photo" ref="image" />
    <footer>
      <span @click="$parent.$parent.isShowAvatar = false">取消</span>
      <span @click="uploadAvatar">完成</span>
    </footer>
  </div>
</template>

<script>
import Cropper from 'cropperjs'
import 'cropperjs/dist/cropper.css'
import { uploadAvatar } from '@/apis'
export default {
  props: {
    photo: {
      type: String,
      required: true
    }
  },
  methods: {
    init () {
      this.myCropper = new Cropper(this.$refs.image, {
        viewMode: 1,
        dragMode: 'none',
        initialAspectRatio: 1,
        aspectRatio: 1,
        preview: '.before',
        background: false,
        autoCropArea: 0.6,
        zoomOnWheel: false
      })
    },
    // 点击完成上传头像
    uploadAvatar () {
      this.myCropper.getCroppedCanvas().toBlob(async (blob) => {
        this.$toast.loading({
          message: '图片上传中',
          forbidClick: true
        })
        try {
          // 1.发送请求
          const { data } = await uploadAvatar(blob)
          // console.log(data)
          // 2.子传父修改头像信息
          this.$emit('update-avatar', data.data.photo)
          // 3.关闭弹层
          this.$parent.$parent.isShowAvatar = false
          // 4.提示
          this.$toast.success('图片上传成功')
        } catch (error) {
          this.$toast.fail('图片上传失败')
        }
      })
    }
  },
  mounted () {
    this.init()
  }
}
</script>

<style scoped lang="less">
.update-avator {
  height: 100%;
  position: relative;

  .img {
    position: absolute;
    top: 50%;
    left: 0;
    transform: translateY(-50%);
    width: 100%;
    height: 65%;
  }

  footer {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    display: flex;
    justify-content: space-between;
    color: #fff;
    font-size: 40px;
  }
}
</style>
