<template>
<el-row :gutter="10">
  <el-col :xs="24" :lg="24">
  <div class="child1">
    <div class="address">
      <div class="icon">
        <el-avatar style="width:65px;height:65px;margin-top:45px" src="static/img/商品.png"></el-avatar>
      </div>
      <div class="content">
        <p>挂牌单号：{{goodInfo.listedGoodsId}}</p>
        <p>商品名称：{{info.goodsName}}</p>
        <p>挂牌时间：{{info.createDate}}</p>
      </div>
      <div class="back">
               <span @click="back()"><i class="el-icon-circle-close"></i></span>
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

            <el-button type="success" plain class="btn" >立即购买</el-button>
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
        buyer: '',
        listedGoodsId: ''
      },
      res1: {
        code: '',
        msg: ''
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
      total: ''
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
            this.$alert('生成订单成功！', '执行结果', {
              confirmButtonText: '确定'
            })
            this.$router.push({
              path: '/Order',
              name: 'Order'
            })
          } else if (this.res1.code === 'E0006') {
            this.$alert('进入已存在订单', '执行结果', {
              confirmButtonText: '确定'
            })
            this.$router.push({
              path: '/Order',
              name: 'Order'
            })
          } else {
            this.$alert('生成订单失败！', '执行结果', {
              confirmButtonText: '确定'
            })
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
    back () {
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
              type: 'erro'
            })
            return false
          }
        })
      }
    }
  },
  store
}
</script>

<style>
  .address {
    display: flex;
    background-color: darkgrey
  }

  .content {
    margin-top: 10px;
    margin-left: 20px;
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
    margin-left: 0px;
  }

  .details2 {
    margin-top: 7px;
    margin-left: 40px;
  }

  .text {
    text-align: left;
  }

  .Btn {
    margin-top: 50px
  }
  .back span{
  margin-left: 50px;
  font-size: 20px;
  color: white;
  cursor: pointer;
  float: right;
}

</style>
