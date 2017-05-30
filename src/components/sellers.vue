<template>
  <section class="lists">
    <img src="/static/banner-1.jpg" style="width: 100%;height: auto;" alt="商家店铺" />
    <div class="merchant-name">
      <h3>{{list.shopName}}</h3>
      <div>
        <img src="../assets/star36_on@2x.png" alt=""><img src="../assets/star36_on@2x.png" alt=""><img src="../assets/star36_on@2x.png" alt=""><img src="../assets/star36_on@2x.png" alt=""><img src="../assets/star36_off@2x.png" alt=""><span>人均：￥15</span>
      </div>
      <button type="button" @click="order">进入店铺</button>
    </div>
    <div class="xinxi">
      <p class="title">商家信息</p>
      <div>
        <p>店铺地址：{{list.shopAddress}}</p>
        <p>店铺联系电话：{{list.managerTel}}</p>
      </div>
    </div>

    <div class="selle_bottom">
      <p class="title">公告与活动</p>
      <p class="content">粥品香坊其烹饪粥料的秘方源于中国千年古法，在融和现代制作工艺，由世界烹饪大师屈浩先生领衔研发。坚守纯天然、0添加的良心品质深得消费者青睐，发展至今成为粥类的引领品牌。是2008年奥运会和2013年园博会指定餐饮服务商。</p>

      <div class="box">
        <img src="../assets/decrease_3@2x.png" alt="">
        <span>每单满100减20</span>
      </div>
    </div>
  </section>
</template>
<script>
  export default{
    props : ['id'],
    created() {
      var that = this;
      console.log(that);
      var id = that.$route.params.id;
      console.log(id + "op");
      $.ajax({
        url: 'http://localhost:8187/queryShop',
        type: 'post',
        data: {'id': id},
        success: function (data) {
          console.log(data);
          that.list = data;
          //that.isShow = true;
        }
      });
      //that.$router.go(0);
    },
    data() {
      return {
        list: "",
        isShow: false
      }
    },
    methods: {
      order: function() {
        this.$router.push('/f');
      }
    }
  }
</script>
<style lang="less">
  .lists{
    width:100%;
    overflow: scroll;
    img {
      display: inline-block;
      width: 100%;
      height: 185px;
      margin: 5px 2px 3px 3px;
    }
  }
  /*商家活动与公告css*/
  .selle_bottom{
    padding: 18px;
    .title {
      font-size: 14px;
      color: rgb(7, 17, 27);
      margin-bottom: 8px;
    }
    .content{
       margin: 0 12px 16px;
       font-size: 12px;
       font-weight: 200;
       color: rgb(240,20,20);
       line-height: 24px;
     }
    .box{
        height: 48px;
        display: flex;
        align-items: center;
        border-top: 1px solid #e6e7e8;
        padding-left: 12px;
        img {
          width: 16px;
          height: 16px;
          margin-right: 6px;
        }
        span{
           font-size: 12px;
           font-weight: 200;
           color: rgb(7,17,27);
         }
      }
    }
  .merchant-name{
    padding: 0 18px;
    padding-bottom: 18px;
    border-bottom: 1px solid darkgray;
    h3{
      display: inline-block;
      width: 100%;
    }
    div{
      display: inline-block;
      width: 75%;
      img{
        width:20px;
        height: auto;
        vertical-align: text-top;
      }
      span{
        height: 20px;
        display: inline-block;
        margin-left: 5px;
        line-height: 20px;
      }
    }
    button{
      border-radius: 5px;
      background-color: orange;
      border: none;
      padding: 5px;
      color: white;
    }
  }
  /*商家信息css*/
    .xinxi{
      padding: 18px;
      .title {
        font-size: 14px;
        color: rgb(7, 17, 27);
        margin-bottom: 12px;
      }
      div {
         height: auto;
        /*line-height: 16px;
        display: flex;*/
         align-items: center;
         padding-left: 12px;
         border-top: 1px solid rgba(7,17,27,0.1);
         font-size: 12px;
         font-weight: 200;
         color: rgb(7,17,27);
        p{
          display: block;
          width:100%;
          margin: 0;
          line-height: 35px;
        }
       }
    }
</style>
