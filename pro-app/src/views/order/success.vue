<template>
  <div class="success">
    <h1>支付结果</h1>
    <div class="info">
        <img src="https://axhub.im/pro/221031c5a692ef70/images/%E6%94%AF%E4%BB%98%E6%88%90%E5%8A%9F/u24.png" alt="">
        <p>支付成功啦！</p>
    </div>
    <p class="order" @click="orderAction" >查看订单</p>
    <p class="return" @click="returnAction">返回首页</p>
  </div>
</template>

<script>
export default {
    methods: {
        orderAction(){
            this.$router.push({
                name: 'orderList',
                params: {
                    id: this.$route.params.id
                }
            });
        },
        returnAction(){
            this.$router.push({
                name: 'home'
            })
        }
    }
}
</script>

<style scoped lang="scss">
.success{
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    background: #f5f5f5;
    h1{
        width: 100%;
        height: 0.52rem;
        line-height: 0.52rem;
        font-size: 0.2rem;
        font-weight: bold;
        color: #333;
        text-align: center;
        background: #fff;
        margin: 0;
        border-bottom: 1px solid #d7d7d7;
    }
    .info{
        width: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        img{
            width: 0.7rem;
            height: 0.7rem;
            margin-top: 0.75rem;
        }
        p{
            font-size: 0.18rem;
            color: #666;
            margin-top: 0.3rem;
            line-height: 0.24rem;
        }
    }
    .order{
        margin: 0 auto;
        margin-top: 1.3rem;
        width: 2.45rem;
        height: 0.42rem;
        line-height: 0.42rem;
        font-size: 0.12rem;
        color: #fff;
        text-align: center;
        border-radius: 0.21rem;
        background: #3BB19C;
    }
    .return{
        width: 2.45rem;
        margin: 0 auto;
        height: 0.42rem;
        border-radius: 0.21rem;
        font-size: 0.12rem;
        line-height: 0.42rem;
        color: #fff;
        text-align: center;
        margin-top: 0.2rem;
        background: #D7D7D7;
    }
}
</style>