<template>
  <div class="personcneter_wraper">
     <div class="header">
          <div class="useravatart">
               <img :src="$store.state.userinfo.avatarUrl" width='100%' alt="">
          </div>
          <div class="usermessage">
               <p>{{$store.state.userinfo.nickname}}</p>
               <p><i></i></p>
          </div>
     </div>
     <div>
         
     </div>
  </div>   
</template>
    
<script>
export default
{
    name:'personcenter',
    methods:{
        // 获取用户的所有信息
      getuser(){
            this.$axios.get('/api/user/subcount').then(res=>{
              console.log(res)
            })
      }
    },
    created(){
        this.getuser()
    }
}
    
</script>

<style scoped lang ='scss'>
.personcneter_wraper{
    position: absolute;
    top: 0;
    bottom: 0;
    width: 100%;

    background-color: #fff;
    z-index: 1003;
    .header{
        padding: 10px;
        height: 200px;
        font-size: 0;
        background:linear-gradient(red, rgb(151, 29, 90), rgb(45, 86, 163))
    }
 .useravatart{
     width: 100px;
     height: 100px;
     border-radius: 50%;
     overflow: hidden;
     display: inline-block;
     vertical-align: top;
     .img{
         width: 100%;

     }
 }
 .usermessage{
     display: inline-block;
     font-size: 15px;
     color: #f2f2f2;
  
     vertical-align: top;
     margin-left: 20px;
     padding: 20px;
     
 }
}
</style>
