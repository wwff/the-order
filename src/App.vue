<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
  export default {
    /*data(){

    },*/
    created() {
      this.$router.push({path: 'l'});
    }
  }
</script>

<style>
  .tab{
    height: 40px;
    display: flex;
    border-bottom:1px solid rgba(7,17,27,0.1);
  }
  .tab div{
    flex: 1;
    text-align: center;
    line-height: 40px;
  }
  .tab div a{
    text-decoration: none;
    font-size: 14px;
    color: rgb(77,88,93);
  }
  .tab .router-link-active{
    color: rgb(240,20,20);
    line-height: 14px;
  }
  .fuzzy{
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(7,17,27,0.8);
    /*-webkit-filter: blur(10px);
    -moz-filter: blur(10px);
    -ms-filter: blur(10px);*/
    /*filter: blur(10px);*/
  }
  .mask{
    position: absolute;
    top: 0;
    left: 0;
    overflow: hidden;
    width: 100vw;
    height: 100vh;
    z-index: 60;
  }
  .mask .close{
    display: block;
    width: 32px;
    height: 32px;
    position: fixed;
    bottom: 32px;
    left: 50%;
    margin-left: -16px;
    text-align: center;
    line-height: 32px;
    font-size: 32px;
    color: rgba(255,255,255,0.5);
    transform: rotate(45deg);
  }
  .mask .main{
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 1;
    overflow: scroll;
  }
  .main .name{
    text-align: center;
    font-size: 16px;
    font-weight: 700;
    color: white;
    line-height: 16px;
    margin: 64px 0 16px 0;
  }
  .main .star {
    height: 24px;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 28px;
  }
  .main .star img{
    width: 20px;
    height: 19px;
    margin-right: 20px;
  }
  .main .star img:nth-child(5){
    margin-right: 0;
  }
  .preferential{
    height: 14px;
    font-size: 14px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 24px;
  }
  .preferential p{
    margin: 0 12px;
    color: white;
    font-weight: 700;
  }
  .preferential div{
    width: 112px;
    height: 1px;
    background: rgba(255,255,255,0.2);
  }
  .information {
    margin: 0 36px 28px 36px;
    padding-left: 12px;
    font-size: 12px;
    font-weight: 200;
    color: white;
    line-height: 12px;
  }
  .information div{
    height: 16px;
    margin-bottom: 12px;
  }
  .information img{
    width: 16px;
    height: 16px;
    margin-right: 6px;
    vertical-align: middle;
  }
  .announcement{
    margin: 0 36px 28px 36px;
    padding-left: 12px;
    font-size: 12px;
    color: white;
    line-height: 24px;
    font-weight: 200;
  }
</style>
