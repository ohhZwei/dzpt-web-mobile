<template>
<el-row :gutter="10">
  <el-col :xs="24" :lg="24">
  <div class="child1">
    <div class='BigBOX'>
    <div class="address">
      <div class="icon">
        <el-avatar style="width:65px;height:65px;margin-top:35px;margin-left:5px" src="static/img/商品.png"></el-avatar>
      </div>
      <div class="content">
        <p>挂牌单号：{{goodInfo.listedGoodsId}}</p>
        <p>商品名称：{{info.goodsName}}</p>
        <p>挂牌时间：{{info.createDate}}</p>
      </div>
    </div>
    <div class="back" >
        <span @click="Back()"><i class="el-icon-circle-close"></i></span>
    </div>
    </div>
     <div class="block">
        <el-image :src=info.image style="width:200px"></el-image>
      </div>
    <div class="Goods" style="height:190px">
      <div class="details">
        <p class="text">商品名：{{info.goodsName}}</p>
        <p class="text">商品单价：¥{{info.price}}</p>
        <p class="text">整单价格：¥{{this.total}}</p>
        <p class="text">质量标准：{{info.quality}}</p>

      </div>
      <div class="details2">
        <p class="text">挂牌方：{{info.supplierName}}</p>
        <p class="text">数量：{{info.amount}} {{info.unit}}</p>
        <p class="text">商品来源：{{info.region}}</p>
      </div>
    </div>
    <div style="height:80px">
          <el-row class="Btn" style="margin-top:5px">
            <el-button v-if="this.goodInfo.status==='MyCar'" type="primary" plain class="btn" @click="add()" disabled="">加入进货单</el-button>
            <el-button v-else type="primary" plain class="btn" @click="add()">加入进货单</el-button>

            <el-button type="success" plain class="btn" @click="buy()" >立即购买</el-button>
          </el-row>
      </div>

    </div>
</el-col>
</el-row>

</template>

<script>
import store from '@/vuex/store'
import { mapState, mapActions } from 'vuex'
export default {
  data () {
    return {
      formData: {
        nickname: '',
        age: '',
        province: '',
        city: '',
        area: '',
        address: '',
        postalcode: '',
        phone: ''
      },
      OrderData: {},
      src: '',
      dialogTableVisible: false,
      dialogFormVisible: false,
      info: {},
      talkform: {
        price: '',
        amount: ''
      },
      formLabelWidth: '100px',
      form: {},
      unit: '',
      params: {
        listedGoodsId: ''
      },
      addCar: {
        userId: '',
        listedGoodsId: ''
      },
      buyData: {
        listedGoodsId: '',
        buyer: ''
      },
      buyData1: {
        listedGoodsId: '',
        payChannel: ''
      },

      DATA: {
        sender: '',
        receiver: '',
        title: '',
        type: '',
        content: '',
        listedGoodsId: '',
        price: ''
      },
      total: '',
      CAR: {
        userId: ''
      },
      mobile: '',
      url: ''
    }
  },
  computed: {
    ...mapState(['goodInfo']),
    ...mapState(['userInfo']),
    talktotalprice: function () {
      return this.talkform.price * this.talkform.amount
    },
    getunit: function () {
      return this.form.unit
    }
  },
  created () {
    this.isLogin()
    this.isGood()
    this.params.listedGoodsId = this.goodInfo.listedGoodsId
    this.getRequest('/search/searchHangGood', this.params)
      .then((response) => {
        console.log(response.data)
        this.info = response.data.data
        this.info.createDate = this.dateFormat(this.info.createDate)
        this.info.image = this.getBaseUrl() + '/upload/' + this.info.image
        this.total = parseInt(this.info.price) * parseInt(this.info.amount)
      })
      .catch(function (error) {
        console.log(error)
      })
  },
  methods: {
    ...mapActions(['goodOut', 'isGood', 'isLogin']),
    isMobile () {
      if (navigator.userAgent.match(/Android/i) ||
      navigator.userAgent.match(/webOS/i) ||
      navigator.userAgent.match(/iPhone/i) ||
      navigator.userAgent.match(/iPad/i) ||
      navigator.userAgent.match(/iPod/i) ||
      navigator.userAgent.match(/BlackBerry/i) ||
      navigator.userAgent.match(/Windows Phone/i)
      ) return true
      return false
    },

    handleInput (e) {
      this.talkform.price = e.target.value.replace(/[^\d]/g, '')
    },
    buy () {
      if (this.userInfo.userId === this.info.supplier) {
        this.$alert('不可以购买自己挂牌的商品哦~', '执行结果', {
          confirmButtonText: '我知道了'
        })
        return false
      } else {
        this.buyData.buyer = this.userInfo.userId
        this.buyData.listedGoodsId = this.goodInfo.listedGoodsId
        console.log(this.buyData)
        this.postRequest('/order/createOrder', this.buyData).then((res) => {
          console.log(res.data)
          this.res1 = res.data
          if (this.res1.code === '1') {
            this.mobile = this.isMobile()
            if (this.mobile === true) {
              this.buyData1.payChannel = '2'
            } else {
              this.buyData1.payChannel = '1'
            }
            this.buyData1.listedGoodsId = this.goodInfo.listedGoodsId
            console.log('this.buyData1')
            console.log(this.buyData1)
            this.postRequest('/bank/pay', this.buyData1).then((res) => {
              console.log(res.data)
              const res1 = res.data

              if (res1.code === '1') {
                this.url = res1.data.url
                window.location = this.url
              } else {
                window.location = 'http://www.icbc.com.cn/ICBC/%E4%BC%81%E4%B8%9A%E4%B8%9A%E5%8A%A1/default.htm'

                return false
              }
            })
          } else {
            // this.$alert('生成订单失败！', '执行结果', {
            //   confirmButtonText: '确定'
            // })
            window.location = 'http://www.icbc.com.cn/ICBC/%E4%BC%81%E4%B8%9A%E4%B8%9A%E5%8A%A1/default.htm'

            return false
          }
        })
      }
    },
    chat () {
      if (this.userInfo.userId === this.info.supplier) {
        this.$alert('不可以购买自己挂牌的商品哦~', '执行结果', {
          confirmButtonText: '我知道了'
        })
        return false
      } else {
        this.dialogFormVisible = true
        this.talkform.amount = this.info.amount
        this.talkform.price = this.info.price
        this.unit = this.info.unit
      }
    },
    Back () {
      this.$router.push({
        path: '/Sell',
        name: 'Sell'
      })
    },
    add () {
      if (this.userInfo.userId === this.info.supplier) {
        this.$alert('不可以购买自己挂牌的商品哦~', '执行结果', {
          confirmButtonText: '我知道了'
        })
        return false
      } else {
      // 判断进货单中是否已经存在该商品
        this.isLogin()
        console.log(this.userInfo)
        this.CAR.userId = this.userInfo.userId
        this.getRequest('/mine/getMyCar', this.CAR)
          .then((response) => {
            for (const i in response.data.data.goodsList) {
              if (response.data.data.goodsList[i].listedGoodsId === this.goodInfo.listedGoodsId) {
                this.$message({
                  message: '进货单中已存在该商品，请勿重复添加!',
                  type: 'error'
                })
                return false
              }
            }

            this.addCar.userId = this.userInfo.userId
            this.addCar.listedGoodsId = this.goodInfo.listedGoodsId
            console.log(this.addCar)
            this.postRequest('/mine/addMyCar', this.addCar).then((res) => {
              console.log(res.data)
              this.res1 = res.data
              if (this.res1.code === '1') {
                this.$message({
                  message: '加入进货单成功!',
                  type: 'success'
                })
              } else {
                this.$message({
                  message: '加入进货单失败!',
                  type: 'error'
                })
                return false
              }
            })
          })
          .catch(function (error) {
            console.log(error)
          })
      }
    }
  },
  store
}
</script>

<style>
  .BigBOX {
    display: flex;
    background-color: darkgrey;
  }
  .address {
    display: flex;
    background-color: darkgrey;
    margin: 0 auto
  }

  .icon {
    margin:0 auto;
  }
  .content {
    margin-top: 10px;
    margin-left: 15px;
    text-align: left;
  }

  .Goods {
    display: flex;
  }

  .block {
    margin-top: 30px;
    margin-left: 0px
  }

  .details {
    margin-top: 7px;
    margin: 0 auto
  }

  .details2 {
    margin-top: 7px;
    margin: 0 auto
  }

  .text {
    text-align: left;
  }

  .Btn {
    margin-top: 50px
  }
  .back{
    margin:0 auto
  }
  .back span{
  margin-left: 50px;
  font-size: 20px;
  color: white;
  cursor: pointer;
  float: right;
}

</style>
