//登陆组件

<template>
    <div class="login_wraper">
        <div class="login-header">
             <span @click="jumptoindex">&lt;</span>
        </div>
        <div class="mylogo">
            <img :src="logo" alt="">
        </div>
        <div class="form_wraper">
            <mu-form ref="form" 
              :model="validateForm" 
              class="mu-demo-form"
              label-position='left'
              label-width="60"
               >
              <mu-form-item label="手机号" prop="phone" :rules="phoneRules">
              <mu-text-field v-model="validateForm.phone" prop="phone" placeholder='请输入手机号'></mu-text-field>
              </mu-form-item>
              <mu-form-item label="密码" prop="password" :rules="passwordRules">
                  <mu-text-field type="password" v-model="validateForm.password" prop="password" placeholder='请输入密码'></mu-text-field>
              </mu-form-item>
              <mu-form-item prop="isAgree" :rules="argeeRules">
              <mu-checkbox label="同意用户协议" v-model="validateForm.isAgree"></mu-checkbox>
              </mu-form-item>
             
              <mu-button color="#ff5722"
              v-loading="isloading" data-mu-loading-size="24"
               @click="submit" class="loginbutton">登陆</mu-button>
           
          </mu-form>
        </div>
    </div>
</template>
<script>
    import 'muse-ui-loading/dist/muse-ui-loading.css'; // load css
    import Toast from 'muse-ui-toast'
    import Vue from 'vue';
    import Loading from 'muse-ui-loading';
    Toast.config({
       position: 'top',               // 弹出的位置
      time: 2000,                       // 显示的时长
      close:'true'   
    })
    Vue.use(Loading,Toast);
    import logo from '../../../static/img/logo.png'
    export default {
        name:'login',
  data () {
    return {
      logo,
      isloading:false,
      phoneRules: [
        { validate: (val) => !!val, message: '必须填写手机号'},
        { validate: (val) => val.length >10 && val.length <12, message: '手机号不合法'}
      ],
      passwordRules: [
        { validate: (val) => !!val, message: '必须填写密码'},
        { validate: (val) => val.length >= 3, message: '密码长度大于3'}
      ],
      argeeRules: [{ validate: (val) => !!val, message: '必须同意用户协议'}],
      validateForm: {
        phone: '',
        password: '',
        isAgree: false
      }
    }
  },
  methods: {
    submit () {
     this.$refs.form.validate().then((result) => {
        this.login()
      });
    },

    jumptoindex(){
      this.$router.push('/recommend')
    },

    login(){
      this.isloading = true;
      this.$axios.get('/api/login/cellphone',{phone:this.validateForm.phone,password:this.validateForm.password}).then(res=>{
        console.log(res)
        if(res.data.code == 200){ 
          this.$store.commit('SETUSERINFO',res.data.profile)
           this.isloading = false
          setTimeout(()=>{
             this.$router.push('/person')
          },1000)
         Toast.success('登陆成功！')
        }
        else{
            Toast.error('登陆失败')
            this.isloading =false
        }
      })
    }
  }
};
</script>

<style scoped lang = 'scss'>
.login_wraper{
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  bottom: 0;
  z-index: 1003;
  background-color: #f1f2f2;
  .login-header{
    height: 46px;
    background-color: #D44439;
    font-size: 20px;
    line-height: 46px;
    width: 100%;
    color: #fff;
    padding-left: 10px;
  }
  .mylogo{
    height: 160px;
    padding: 10px 20px 10px;
    border-radius: 3px;
    overflow: hidden;
    margin: 0 auto;
    text-align: center;
    img{
      height: 100%;
      box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.4)
    
    }
  }
  .form_wraper{
    margin-top: 20px;
    padding: 0 20px 0px;;
   .loginbutton{
     width: 100%;
     box-sizing: border-box;
   }
  }

}
</style>
