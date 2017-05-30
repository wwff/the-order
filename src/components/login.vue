<template>
  <div id="app">
    <!--  <v-banner v-show="isShow"></v-banner>-->
    <!--<router-view></router-view>-->
    <div class="login" v-show="!isShow">
      <h1>短信验证登录</h1>
      <ul class="message">
        <li>
          <input type="search" class="user-phone" name="user-phone" placeholder="请输入手机号" />
          <button class="obtain" v-on:click="gain(this)">获取验证码</button>
        </li>
        <li>
          <input type="search" class="verification" name="verification" placeholder="请输入短信中的验证码" />
        </li>
      </ul>
      <input class="submit" type="submit" value="登录" v-on:click="logined" />
    </div>
  </div>
</template>
<script>
  /* import banner from './components/banner';*/

  export default {
    data() {
      return {
        phone:'',
        pwd:'',
        isShow: false
      }
    },
    /* components: {
     "v-banner":banner
     },*/
    methods:{
      gain: function () {
        this.phone = $('.user-phone').val();
        console.log(this.phone);
        $.ajax({
          url:'http://localhost:8187/getValidator',
          data:{'userTel': this.phone},
          method: 'post',
          success: function (data) {
            console.log(data);

            var countdown=60;
            settime();
            function settime() {
              if (countdown == 0) {
                $('.obtain').prop("disabled",false);
                //obj.value="免费获取验证码";
                $('.obtain').html("获取验证码");
                countdown = 60;
                return;
              } else {
                $('.obtain').attr("disabled", true);
                $('.obtain').html( countdown + "秒");
                //console.log($('.obtain').html());
                countdown--;
              }
              setTimeout(function() {
                  settime() }
                ,1000)
            }

          }
        });
      },
      logined: function() {
        this.phone = $('.user-phone').val();
        this.pwd = $('.verification').val();
        console.log(this.pwd);
        var that = this;
        //登陆验证
        $.ajax({
          url:'http://localhost:8187/userLogin',
          data:{
            'userTel': this.phone,
            'validator': this.pwd
          },
          method: 'post',
          success: function (data) {
            console.log(data);
            that.phone = '';
            that.pwd = '';
            if (data) {
              that.isShow = !that.isShow;
              that.$router.push({path: 'a'});
            } else {
              alert('请输入正确的用户名和验证码！！！');
            }
          },
          error: function (error) {
            console.log(error);
          }
        });

        /*this.$http({
         method:'POST',
         url:'http://172.33.29.208:80/userLogin',
         data:{
         'userTel': this.phone,
         'validator': this.pwd
         }
         }).then(function (response) {
         /!*   this.phone = '';
         this.pwd = '';*!/
         if (response.body != null & response.body.length > 0) {
         this.$router.push({path: 'e'});
         } else {
         alert('请输入正确的用户名和验证码！！！');
         }
         },function(error){
         console.log(error);
         });*/
        /* this.$http.jsonp('http://127.0.0.1:8187/ssm-1.0-SNAPSHOT/userLogin',{
         'phone': this.phone,
         'pwd': this.pwd
         }).then(function (response) {
         if(response.body != null & response.body.length > 0){
         this.name='';
         this.pwd= '';
         this.$router.push({ path: 'e'});
         }else{
         alert('请输入正确的用户名和验证码！！！');
         this.name=''
         this.pwd= ''
         }
         }).then(function (error) {
         console.log(error);
         });*/
      }
    }
  }
</script>

<style lang="less" scoped>
  html,body{
    margin: 0;
    padding: 0;
    font-size: 22px;

  }
  .active{
    display: none;
  }
  .login {
    width: 100%;
    height: 100%;
    background-color: #f9f9f9;
  h1{
    height: 36px;
    line-height: 36px;
    width: 100%;
    border-bottom: 1px solid #ecebeb;
    font-weight: 100;
    text-align: center;
    background-color: #ffffff;
    font-size: 20px;
  }
  ul{
    list-style: none;
    background-color: #ffffff;
  li{
    background-color: #ffffff;
    width: 100%;
    height: 40px;
    line-height:40px;
    border-bottom: 1px solid #dcdbdb;
    font-size: 14px;
    text-align: center;
  }
  }
  }
  .submit{
    background-color: #ffffff;
    width: 96%;
    height: 40px;
    margin-left: 2%;
    margin-top:15px;
    border-bottom: 1px solid #dcdbdb;
    font-size: 24px;
    text-align: center;
  }
  .login ul li input{
    width: 75%;
    height: 35px;
    line-height: 35px;
    border: none;
  }
  .login .verification{
    width:98%;
  }
  .obtain{
    border: none;
    background: none;
    height: 35px;
    display: inline-block;
    width: 22%;
    font-size: 14px;
  }
  .submit{
    background-color: #eae9e9;
    border-radius: 5px;
    color: #aba6a6;
    border: none;
  }
</style>
