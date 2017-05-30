<template>
  <section class="foods">
    <ul class="left">
      <li v-for="good,index in goods" @click="show($event, index)"><p>{{good[0].name}}</p></li>
    </ul>
    <ul class="right">
      <li v-for="dish in dishs" v-show="isCur">
        <figure>
          <img src="../assets/pizza.jpg" alt="dishes">
          <figcaption>
            <h3>{{dish.food}}</h3>
            <p>{{dish.price}}</p>
          </figcaption>
        </figure>
      </li>
    </ul>
  	<div class="shopping-cart">
  		<div class="car_img"><div><img src="../assets/gouwuche.png" alt=""></div></div>
  		<div class="box">
  			<span class="total_price">￥0</span>
  			<span class="border"></span>
  			<span class="instructions">另需配送费￥4元</span>
  		</div>
  		<div class="buy_btn">￥20起送</div>
  	</div>
  </section>
</template>

<script>
/* import $ from "zepto.min.js"*/

  export default{
    data() {
      return {
        goods: "",
        dishs: [],
        isCur: true
      }
    },
    created() {
      this.$http.get("/static/foods.json")
        .then(function(response) {
          this.goods = response.data;
          $.each(this.goods, function(i, v){
            console.log(v[0]);
          });
          console.log(this.goods);
        }, function () {
          console.log("lwf回掉成功")
        })
    },
    methods: {
      show: function(event, index) {
       let iTarget = $(event.srcElement).text();
        let dishes = this.dishs;
        $.each(this.goods[index], function(i, v){
          console.log(v.name);
          if(v.name) {
            console.log("type" + v.name);
          } else {
            dishes.push(v);
          }
        });
        console.log(dishes);

        /*$.each(this.goods, function(i, v) {
          console.log(index);
          console.log(iTarget + v[0].name + "90");
          console.log(v[0].name == iTarget);
          if (v[0].name == iTarget) {
            $.each(v, function(key, item) {
              console.log(key, item);
              if(key !== 0){
                dishes.push(item);
              }else {
                console.log("why");
              }
            });
            this.isCur = true;
            console.log(dishes);
          } else {
            this.isCur = false;
            console.log(index);
            console.log("nnn");
          }
        });*/
      },
    }
  }
</script>

<style lang="less">
.foods{
  width:100%;
  height:auto;
  .left{
    list-style: none;
    margin:0;
    padding:0;
    width:20%;
    border:1px solid gray;
    height: 385px;
    display: inline-block;
    li{
      display: table;
      width:100%;
      border-bottom: 1px solid #dad9d9;
      p{
        width: 100%;
        height: 45px;
        line-height: 45px;
        text-align: center;
        background-color: #f3f1f1;
      }
    }
  }
  .right{
    list-style: none;
    margin:0;
    padding:0;
    width:75%;
    border:1px solid greenyellow;
    margin-left: 2%;
    height: 385px;
    display: inline-block;
    li{
      display: table;
      width:100%;
      height:125px;
      border-bottom: 1px solid darkgray;
      figure{
        margin:0;
        img{
          width:20%;
          height:auto;
          margin: 0;
        }
        figcaption{
          display: inline-block;
          h3{
            margin: 0;
            font-size: 14px;
          }
        }
      }
    }
  }
}
.shopping-cart{
	height: 48px;
	background: rgb(20,29,39);
	position:fixed;
	bottom: 0;
	left: 0;
	width: 100%;
	line-height: 48px;
}
.shopping-cart .box{
	display: flex;
	align-items: center;
}
.shopping-cart .car_img{
	width: 56px;
	height:56px;
	border-radius: 50%;
	background: rgb(20,29,39);
	position: absolute;
	left: 12px;
	top: -10px;
}
.shopping-cart .car_img div{
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
</style>
