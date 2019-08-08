<template>
  <div>

    <div id="product">
      <div class="address-box">
        <div class="address-header">
            <div class="product-title">挂牌单号:{{goodInfo.listedGoodsId}}</div>
            <div class="address-action">
               <span @click="back()"><i class="el-icon-circle-close"></i></span>
            </div>
        </div>
        <div class="block" style="text-align:left">
            <el-image :src=info.image style="width:200px"></el-image>
        </div>
        <!-- <div class="Bigtitle">
          <p><span class="product-title">挂牌号 :</span> {{info.username}}</p>
        </div>
        <div class="address-action">
          <span @click="edit()"><Icon type="edit"></Icon> 修改</span>
        </div> -->
        <div class="box">
        <div class="address-content">
           <p><span class="address-content-title">商品名称 : {{info.goodsName}}</span></p>
           <p><span class="address-content-title">挂牌数量 : {{info.amount}} {{info.unit}}</span> </p>
           <p><span class="address-content-title">商品来源 : {{info.region}}</span> </p>
           <p><span class="address-content-title">商品供应商ID : {{info.supplier}}</span> </p>
        </div>
        <div class="address-content1">
           <p><span class="address-content-title">挂牌日期 : {{info.createDate}}</span> </p>
           <p><span class="address-content-title">商品单价 : {{info.price}}</span> </p>
           <p><span class="address-content-title">质量标准 : {{info.quality}}</span> </p>
           <p><span class="address-content-title">商品供应商姓名 : {{info.supplierName}}</span> </p>
        </div>
        </div>
        <div>
          <el-row class="Btn" style="margin-top:20px">
            <el-button v-if="this.goodInfo.status==='MyCar'" type="primary" plain class="btn" @click="add()" disabled="">加入进货单</el-button>
            <el-button v-else type="primary" plain @click="add()">加入进货单</el-button>

            <el-button type="success" plain class="btn" @click="buy()">立即购买</el-button>
            <el-button type="danger" plain class="btn" @click="chat()">议  价</el-button>
          </el-row>
      </div>
      </div>

    </div>

    <el-dialog title="议价单" :visible.sync="dialogFormVisible" :center="true">
      <el-form :model="talkform" :inline="true" :rules="rules">
        <el-form-item label="期望价格" prop="price" :label-width="formLabelWidth" >
          <el-input  v-model="talkform.price" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="购买数量" :label-width="formLabelWidth">
          <el-input disabled v-model="talkform.amount" autocomplete="off">
            <template slot="append">{{this.unit}}</template>
          </el-input>
        </el-form-item>
        <br/>
        <el-form-item label="总价" :label-width="formLabelWidth">{{talktotalprice}} 元</el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="success(talkform)">确 定</el-button>
      </span>
    </el-dialog>

  </div>
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
      src: '',
      dialogTableVisible: false,
      dialogFormVisible: false,
      info: {},
      talkform: {
        price: '',
        amount: ''
      },
      formLabelWidth: '100px',
      rules: {
        price: [
          { required: true, message: '请输入议价的期望价格', trigger: 'blur' },
          { min: 1, message: '最小价格为1', trigger: 'blur' }
        ]
      },
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
      }
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
    back () {
      console.log(this.goodInfo)
      if (this.goodInfo.status === 'MyCar') {
        this.goodOut()
        this.$router.push({
          path: '/Mine/MyCar',
          name: 'MyCar',
          params: {
            red: 'MC'
          }
        })
      } else if (this.goodInfo.status === 'Home') {
        this.goodOut()
        this.$router.push({
          path: '/',
          name: 'Home'
        })
      } else {
        this.goodOut()
        this.$router.push({
          path: '/Sell',
          name: 'Sell'
        })
      }
    },
    buy () {
      if (this.userInfo.userId === this.info.supplier) {
        this.$alert('不可以购买自己挂牌的商品哦~', '执行结果', {
          confirmButtonText: '我知道了'
        })
        return false
      } else {
        // this.buyData.buyer = this.userInfo.userId
        // this.buyData.listedGoodsId = this.goodInfo.listedGoodsId
        // console.log(this.buyData)
        // this.postRequest('/order/createOrder', this.buyData).then((res) => {
        //   console.log(res.data)
        //   this.res1 = res.data
        //   if (this.res1.code === '1') {
        //     this.$alert('生成订单成功！', '执行结果', {
        //       confirmButtonText: '确定'
        //     })
        //     this.$router.push({
        //       path: '/Order',
        //       name: 'Order'
        //     })
        //   } else if (this.res1.code === 'E0006') {
        //     this.$alert('进入已存在订单', '执行结果', {
        //       confirmButtonText: '确定'
        //     })
        //     this.$router.push({
        //       path: '/Order',
        //       name: 'Order'
        //     })
        //   } else {
        //     this.$alert('生成订单失败！', '执行结果', {
        //       confirmButtonText: '确定'
        //     })
        //     return false
        //   }
        // })
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
    success (formName) {
      this.DATA.sender = this.userInfo.userId
      this.DATA.receiver = this.info.supplier
      this.DATA.listedGoodsId = this.goodInfo.listedGoodsId
      this.DATA.price = parseInt(this.talkform.price)
      this.DATA.title = '议价相关商品挂牌号：' + this.goodInfo.listedGoodsId
      this.DATA.type = '议价'
      this.DATA.content = '期望价格：' + this.talkform.price
      console.log(this.DATA)
      this.postRequest('/message/negotiate', this.DATA).then((res) => {
        this.res1 = res.data
        console.log('1111')
        if (this.res1.code === '1') {
          this.$alert('发送议价消息成功！', '执行结果', {
            confirmButtonText: '确定',
            callback: action => {
              this.dialogFormVisible = false
            }
          })
        } else if (this.res1.code === 'E0011') {
          this.$alert('您已议价，请勿重复议价！', '执行结果', {
            confirmButtonText: '确定',
            callback: action => {
              return false
            }
          })
        } else {
          this.$alert('发送议价消息失败！', '执行结果', {
            confirmButtonText: '确定'
          })
          return false
        }
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
            this.$alert('加入进货单成功!', '执行结果', {
              confirmButtonText: '确定'
            })
          } else {
            this.$alert('加入进货失败！', '执行结果', {
              confirmButtonText: '确定'
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

<style scoped>
.address-header {
    display:flex;
}
#product {
    max-width: 1200px;
    margin: 20px auto;
}

.address-box {
  padding: 15px;
  margin: 15px;
  border-radius: 5px;
  background-color: darkslategray;
  box-shadow: 0px 0px 10px #545c64;
}
.box {
  display: flex;
}
.address-content-title {
  color: white;
  font-size:18px
}
.product-title {
  color: white;
  font-size:22px
}
.Bigtitle {
  text-align: left;
  display: flex;
}
.address-content {
    width:650px;
    text-align: left;
}
.address-content1 {
    width:500px;
    text-align: left;
}
.Btn {
    margin-top:20px;
}
.btn {
    margin-left:100px
}
.address-action span{
  margin-left: 15px;
  font-size: 20px;
  color: white;
  cursor: pointer;
}
.address-header {
  height: 35px;
  display: flex;
  justify-content: space-between;
  color: #232323;
  font-size: 18px;
}
</style>
