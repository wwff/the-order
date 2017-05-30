<template>
  <section id="app" class="lists">
    <ul>
      <li v-for="shop in shops" @click="order">
        <figure>
          <!--<img src="/static/banner-1.jpg" alt="商家店铺" />-->
          <img v-bind:src="shop.shopUrl" width="350" height="234" />
          <figcaption>
            <h2>{{shop.shopName}}</h2>
            <p>{{shop.shopAddress}}</p>
            <p style="display:none;" class="shop-id">{{shop.shopId}}</p>
          </figcaption>
        </figure>
        <!--<button type="button" @click="order">进入店铺</button>-->
      </li>
    </ul>
  </section>
</template>
<script>
  export default{
    created() {
      var that = this;
      //that.$router.go(0);
      console.log(that);
      $.ajax({
        url: 'http://localhost:8187/queryAllShop',
        type: 'post',
        success: function (data) {
          console.log(data);
          $.each(data, function (i, v) {
            v.shopUrl = "/static/" + v.shopUrl;
            console.log(v.shopUrl);
          });
          that.shops = data;
          //debugger
        }
      });
    },
    data () {
      return {
        shops: '',
        isShow: false,
        curShop: '12345678',
        lijun:'lijunzi'
      };
    },
    methods: {
      order: function(event) {
        var that = this;
        var cur = event.currentTarget;
        var shopId = $(cur).find('.shop-id').text();
        that.curShop = shopId;
        console.log($(cur).find('.shop-id').text() + 'pp');
        $.ajax({
          url: 'http://localhost:8187/queryShop',
          type: 'post',
          data: {'id': shopId},
          success: function (data) {
             that.$router.push({path: 'e/' + shopId});
             //that.curShop = shopId;
              console.log(that.curShop);
          }
        });
        //this.$router.push({path: 'f'});
      }
    }
  }
</script>
<style lang="less">
  .lists{
    width:100%;
    overflow: scroll;
  ul{
    list-style-type: none;
    margin:0;
    padding:0;
  li{
    width:100%;
    height:auto;
    margin: 5px 0;
    border:1px solid rgba(2, 12, 15, 0.89);
    position:relative;
  figure{
    margin:0;
  img{
    display: inline-block;
    width:30%;
    height: auto;
    margin:5px 2px 3px 3px;
    vertical-align: top;
  }
  figcaption{
    display: inline-block;
    width:60%;
   font-size:14px;
  h2{
    font-size: 0.8em;
  }
  }
  }
  button{
    position: absolute;
    right: 10px;
    bottom: 6px;
    border-radius: 5px;
    background-color: #f7edd9;
  }
  }
  }
  }
</style>
