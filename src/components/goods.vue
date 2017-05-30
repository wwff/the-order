<template>
  <section class="goods-wrap">
    <section class="pay-order"><img class="close" src="../assets/close.png" alt="关闭" /></section>
      <img class="pay-code" src="../assets/qrcode.png" alt="付款二维码" />
    <section class="banner">
     <!--<input class="search" type="text" placeholder="输入菜品" @keyup.enter="sendData" />
      <img src="../assets/search.png" alt="搜索" @click="sendData" />-->
    </section>
    <div class="goods">
      <div class="left" ref="meunWrapper">
        <ul>
          <li class="food-type" @click="go(index)" v-for="list,index in datas">{{list.foodType}}</li>
        </ul>
      </div>
      <div ref="foodWrapper" class="right">
        <ul>
          <li class="foods-list" v-for="lists in foods">
            <figure class="foods-list">
              <img class="img" v-bind:src="lists.foodUrl" alt="">
              <figcaption>
                <span class="describe">
                 <h3 class="title">{{lists.foodName}}</h3>
                  <p>{{lists.foodDescribe}}</p>
                  <p class="food-price">单价：￥{{lists.foodPrice}}</p>
                </span>
                <span class="amount">
                  <input type="image" @click="add" src="/static/add.png" alt="加"/>
                  <span>0</span><!--{{ammounts}}-->
                  <input type="image" @click="reduce" src="/static/pop.png" alt="减" />
                </span>
              </figcaption>
        </figure>
         </li>
        </ul>
      </div>
      <div class="shopping-cart">
        <div class="car_img">
          <div class="order-food" @click="preview"><img src="../assets/gouwuche.png" alt="" /></div>
          <input type="text" class="total-count" value="0" />
        </div>
        <div class="box">
          <span class="total_price">￥0</span>
          <!--<span class="border"></span>
          <span class="instructions"></span>-->
        </div>
        <div @click="pay" class="buy_btn">立即支付</div>
      </div>
    </div>
  </section>
</template>

<script>
  import BScroll from 'better-scroll';

  export default{
    methods:{
      //增减food
      add: function () {
        this.amounts = this.amounts + 1 ;
        let countVal = $(event.currentTarget).siblings('span').text();
        let foodP = $(event.currentTarget).parent('span').siblings('.describe').find('.food-price').text();
        //let foodName = $(event.currentTarget)
        this.foodPrice= foodP.slice(4, foodP.length );
//        let allPrice = 0;
        console.log(foodP + "0009");
          countVal ++;
        this.totalPrice += Number(this.foodPrice);
        console.log(this.foodPrice);
        $(event.currentTarget).siblings('span').text( countVal ) ;
        $('.total-count').val( this.amounts );
        $('.total_price').text( '￥' + this.totalPrice );
      },
      reduce: function () {
        let countVal = $(event.currentTarget).siblings('span').text();
        let foodP = $(event.currentTarget).parent('span').siblings('.describe').find('.food-price').text();
        this.foodPrice= foodP.slice(4, foodP.length );
        if( countVal > 0 ){
          countVal --;
        } else {
          return false;
        }
        this.amounts = this.amounts - 1;
        this.totalPrice -= Number(this.foodPrice);
        $(event.currentTarget).siblings('span').text( countVal );
        $('.total-count').val( this.amounts );
        $('.total_price').text( '￥' + this.totalPrice );
      },
      //浏览所点食物详情
      preview: function () {
        console.log("22");

      },
      //立即支付
      pay: function () {
        $('.pay-order').css('display','block');
        $('.pay-code').css('display', 'block');
        $('.close').click(function () {
          $('.pay-order').css('display','none');
          $('.pay-code').css('display', 'none');
        });
        console.log("pay");
        /*var dataOrder = {
          'menus':[
            {
              'userTel': 1234,
              'foodId': 1,
              'number':2,
              'sprice': 12,
              'price':35
            },
            {
              'userTel': 1234,
              'foodId': 3,
              'number':2,
              'sprice': 23,
              'price':35
            }
           ]
        };
        $.ajax({
          url: 'http://localhost:8187/saveOrderDetail',
          data: dataOrder,
          success: function (response) {
             console.log(response + 'ok');
          },
          error: function (error) {
            console.log(error);
          }
        });*/
      },

      //侧边栏菜品种类切换
      go:function(index){
        $('.amount span').text(0);
        $('.total-count').val(this.amounts);
        var foodUrl = "";
        /*console.log(this.listHeight);*/
        this.foods = this.datas[index].menuList;
        //导航变色
        $(event.currentTarget).addClass('active').siblings().removeClass("active");
      },
      change(){
        this.isShow = !this.state;
        this.$emit('changeShow',this.isShow);
      },
      initScroll:function(){
        this.menuScroll = new BScroll(this.$refs.meunWrapper,{
          click:true,
          scrollY: true
        });
        this.foodScroll = new BScroll(this.$refs.foodWrapper,{
          probeType:3
        });
      },
      cheight:function(){
        let height = 0;
        this.listHeight.push(height);
        let list = this.$refs.foodWrapper.querySelectorAll('.foods-list');
        console.log(list.length);
        for(let i = 0;i<list.length;i++){
          let liHeight = list[i].clientHeight;
          height += liHeight;
          this.listHeight.push(height);
        }
        console.log(height + "009");
      },
      //搜素功能
      sendData: function() {
        let keyword;
        var that = this;
        keyword = $('.search').val();
        console.log(keyword);
        $.ajax({
          url: 'http://localhost:8187/queryMenu',
          type: 'post',
          data: {'foodName': keyword},
          success: function (response) {
            if (response!= 0 && response != null){
              that.datas = response;
              that.$nextTick(function () {
                that.textContent = response;
                that.datas = response; // => '更新完成'
                console.log("lwf");
              });
              console.log(that.datas);
            }else {
              console.log('获取数据为空值');
            }
          },
          error: function (error) {
            console.log(error);
          }
        });
      },
    },
    created(){
      let timer = null;
      clearInterval(timer);
      timer = setInterval(function () {
        move();
      }, 5000);
      let curIndex=0;
      let bgImg = ['banner-1.jpg', 'banner-2.jpg', 'banner-3.jpg'];
      let len = bgImg.length;
      function move() {
        if(curIndex == len-1){
          curIndex = 0;
        }else{curIndex += 1;}
        $('.banner').css("background-image","url(/static/" + bgImg[curIndex] + ")");
      }

      var that = this;
      //that.$router.go(0);

      console.log(that);
      $.ajax({
      url: 'http://localhost:8187/queryAllMenu',
        method: 'post',
        success: function (data) {
          $.each(data, function (i,v) {
            $.each(v.menuList, function (index, value) {
              value.foodUrl = "/static/" + value.foodUrl;
            });
          });
          that.datas = data;
          console.log(data);
          that.go(0);
          $('.food-type')[0].addClass('active').siblings().removeClass("active");
/*          this.$nextTick(function(){
            console.log("ok");
            this.initScroll();
            this.foodScroll.on('scroll',(pos)=>{
              console.log("let");
              this.scrollY = Math.abs(Math.round(pos.y));

            });
            this.cheight();

          })*/
        }
      });
    },
    computed:{
      getIndex:function(){
        let index = 0;
        for(let i = 0;i<this.listHeight.length;i++){
          let height1 = this.listHeight[i];
          let height2 = this.listHeight[i+1];
          if(this.scrollY >= height1 && this.scrollY <= height2){
            return i;
          }
        }
        return index;
      }
    },
    data(){
      return {
        datas:"",
        isShow: false,
        classN:['','type1','type2'],
        scrollY: 0,
        listHeight: [],
        foods: [],
        foodId: '',
        foodName: '',
        amounts: 0,
        foodPrice: 0,
        totalPrice: 0,
        orderDatas: ""
      }
    }
  }
</script>

<style lang="less" scoped>
  .goods .left .active{
    background: #ffffff;
  }
  .goods .left .active p{
    border:none;
  }
  .goods{
    width: 100%;
    display: flex;
    overflow: hidden;
  }
  .left{
    width: 20%;
    height: 100%;
    ul{
      margin:auto;
      list-style-type:none;
      li{
        padding: 0 8px;
        font-size: 12px;
        background: #f3f5f7;
        height: 35px;
        line-height: 35px;
        border-bottom: 1px solid darkgrey;
      }
    }
  }
  .left li .type1{
    display: inline-block;
    width: 12px;
    height:12px;
    vertical-align: middle;
    margin-right: 2px;
    background: url('../assets/discount_3@2x2.png') no-repeat;
    background-size: cover;
  }
  .left li .type2{
    display: inline-block;
    width: 12px;
    height:12px;
    vertical-align: middle;
    margin-right: 2px;
    background: url('../assets/special_3@2x1.png') no-repeat;
    background-size: cover;
  }
  .left li p{
    display: table-cell;
    vertical-align: middle;
    width: 56px;
    height: 54px;
    line-height: 14px;
    border-bottom: 1px solid rgba(7,17,27,0.1);
  }
  .goods .right{
    flex: 1;
    height: 100%;
    margin-left: 5%;
    ul{
      box-sizing: border-box;
      margin:0;
      padding: 0;
      list-style:none;
      li{
        padding: 0;
        padding-top: 10px;
        height:56px;
        overflow: hidden;
        border-bottom: 1px solid rgba(7,17,27,0.1);
        display: flex;
        figure{
          margin:0;
          width:100%;
          img{
            width:50px;
            height:50px;
            vertical-align: top;
          }
          figcaption{
            display: inline-block;
            width:79%;
            font-size:12px;
            .describe{
              display: inline-block;
              width:60%;
              h3{
                margin:0;
                font-size: 16px;
              }
            .food-price{color: #ff3960;}
          }
            .amount {
              display: inline-block;
              float: right;
              input {
                width: 30px;
                height: 30px;
                vertical-align: bottom;
              }
              span{
                display: inline-block;
                vertical-align: super;
              }
            }
          }
        }
      }
    }
  }
  .goods .right div .title{
    height: 26px;
    color: rgb(147,153,159);
    line-height: 26px;
    padding-left: 14px;
    border-left: 2px solid #d9dde1;
    background: #f3f5f7;
  }
  .goods .right .ul .li .details {
    /*float: left;*/
    flex: 1;
  }
  .goods .right .ul .li .details p:nth-child(1){
    margin-top: 2px;
    font-size: 14px;
    color: rgb(7,17,27);
    line-height: 14px;
  }
  .goods .right .ul .li .details .description,.goods .right .ul .li .details .sell{
    font-size: 10px;
    color: rgb(147,153,159);
    line-height: 12px;
    margin-top: 8px;
    width: 150px;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
  }
  .goods .right .ul .li .details .sell span{
    margin-left: 12px;
  }
  .goods .right .ul .li .details .price{
    margin-top: 8px;
    font-size: 14px;
    color: #f01414;
    font-weight: 700;
    display: flex;
    justify-content: space-between;
  }
  .goods .right .ul .li .details .price img{
    width: 20px;
    height: 20px;
    vertical-align: middle;
  }
  .goods .right .ul .li .details .price .spanTwo{
    font-size: 10px;
    text-decoration: line-through;
    font-weight: 700;
    color: rgb(147,153,159);
    margin-left: 8px;
    line-height: 14px;
  }
  .goods .right div .ul .img{
    width: 57px;
    height: 57px;
    float: left;
    margin-right: 10px;
  }
  .shopping-cart{
    height: 48px;
    background: rgb(20,29,39);
    position:fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    line-height: 48px;
    .car_img{
      width: 56px;
      height:56px;
      border-radius: 50%;
      background: rgb(20,29,39);
      position: absolute;
      left: 12px;
      top: -10px;
      .total-count{
        border: none;
        text-align: center;
        color: #ffffff;
        position: absolute;
        left: 35px;
        top: 5px;
        width: 19px;
        height: 17px;
        border-radius: 9px;
        -webkit-border-radius:9px;
        -moz-border-radius:9px;
        background-color: indianred;
        z-index: 9999;
        font-size: 12px;
      }
    }
  }
  .shopping-cart .box{
    display: flex;
    align-items: center;
  }
  .shopping-cart .car_img .order-food{
    width: 44px;
    height: 44px;
    background: rgb(43,51,59);
    border-radius: 50%;
    margin: 6px 0 0 6px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .shopping-cart .car_img div img{
    width: 20px;
    height: 20px;
  }
  .buy_btn {
    position: absolute;
    right: 0;
    top: 0;
    width: 105px;
    height: 48px;
    text-align: center;
    line-height: 48px;
    color: rgba(255,255,255,0.4);
    background: rgb(43,51,59);
    font-size: 12px;
  }
  .shopping-cart .total_price{
    font-size: 16px;
    color: rgba(255,255,255,0.4);
    font-weight: 700;
    margin-left: 80px;
  }
  .shopping-cart .border{
    padding:24px 0 0 1px;
    background: rgba(255,255,255,0.1);
    margin: 0 12px;

  }
  .shopping-cart .instructions{
    font-size: 10px;
    color: rgba(255,255,255,0.4);
    /*font-weight: 700;*/
  }
  .img{
    width:35px;
    height:35px;
  }

  /*banner样式*/
  .banner{
    width:100%;
    height:186px;
    background-image: url("../assets/banner-1.jpg");
    background-repeat: no-repeat;
    background-size: 100% 186px;
    text-align: center;
    position: relative;
  .search{
    width:80%;
    height: 30px;
    line-height: 30px;
    border-radius: 15px;
    border: none;
    margin-top: 6px;
    text-align: center;
    background-color: #f7f4f4;
  }
  img{
    position: absolute;
    /* left: 20px; */
    width: 25px;
    height: 25px;
    right: 46px;
    top: 10px;
  }
  }
  /*付款二维码样式*/
  .pay-order {
    display: none;
    position: absolute;
    z-index: 9998;
    width: 100%;
    height: 100%;
    background-color: #141d27;
    opacity: 0.5;
    filter: alpha(opacity=50);
    img{
      position: absolute;
      width:40px;
      height: auto;
      top:0;
      right: 0;
    }
  }
  .pay-code{
    display:none;
    width: auto;
    position: absolute;
    z-index: 9999;
    top: 30%;
    left: 14%;
  }

</style>
