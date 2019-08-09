<template>
<div>
<div class="search">
  <!-- <el-form :inline="true" :model="formInline" class="demo-form-inline">
  <el-form-item label="挂牌单号：">
    <el-input v-model="formInline.user" placeholder="请输入挂牌单号"></el-input>
  </el-form-item>
  <el-form-item>
    <el-button type="primary" @click="onSubmit()">查询</el-button>
  </el-form-item>
</el-form> -->
</div>
<div class="address-box">
  <el-table
    :data="tableData"
    height="530"
    border
    style="width: 100%"
    :row-class-name="tableRowClassName">
    <el-table-column
      prop="createDate"
      label="交易日期"
      align="center">
    </el-table-column>
    <el-table-column
      prop="id"
      label="交易id"
      align="center">
    </el-table-column>
    <el-table-column
      prop="buyerName"
      label="买方"
      align="center">
    </el-table-column>
    <el-table-column
      prop="sellerName"
      label="卖方"
      align="center">
    </el-table-column>
    <el-table-column
      prop="listedGoodsId"
      label="挂牌单号"
      align="center">
    </el-table-column>
    <el-table-column
      fixed="right"
      label="操作"
      align="center"
      width="70">
      <template slot-scope="scope">
        <el-button @click="H(scope.row)" type="text" size="small">查看</el-button>
        <!-- <el-button @click="del(scope.row,scope.$index,tableData)" type="text" size="small">删除</el-button> -->
      </template>
    </el-table-column>
  </el-table>
</div>
  <el-dialog
    title="交易详情"
    :visible.sync="dialogVisible"
    width="300px">
    <el-image :src=this.negotiateData.image style="width:200px"></el-image>
    <p>交易号：{{this.negotiateData.tradingId}}</p>
    <p>挂牌商品号：{{this.negotiateData.listedGoodsId}}</p>
    <p>商品名称：{{this.negotiateData.goodsName}}</p>
    <p>商品来源：{{this.negotiateData.region}}</p>
    <p>质量标准：{{this.negotiateData.quality}}</p>
    <p>商品单价：{{this.negotiateData.price}}</p>
    <p>商品数量：{{this.negotiateData.amount}}</p>
    <p>交易金额：{{this.negotiateData.total}}</p>
    <p>卖家：{{this.negotiateData.seller}}</p>
    <p>买家：{{this.negotiateData.buyer}}</p>
    <p>交易时间：{{this.negotiateData.createDate}}</p>
    <span slot="footer" class="dialog-footer">
      <el-button type="primary" @click="affirm()">我知道了</el-button>
    </span>
  </el-dialog>
</div>
</template>

<script>
import store from '@/vuex/store'
import { mapMutations, mapActions, mapState } from 'vuex'
export default {
  computed: {
    ...mapState(['userInfo'])
  },
  data () {
    return {
      formInline: {
        user: '',
        region: ''
      },
      tableData: [],
      params: {
        userId: ''
      },
      goodData: {
        listedGoodsId: ''
      },
      info: {
        listedGoodsId: '',
        tradingId: '',
        status: '',
        createDate: ''
      },
      res1: {
        code: '',
        msg: ''
      },
      parmas1: {
        userId: '',
        tradingId: ''
      },
      negotiateData: {
        tradingId: '',
        listedGoodsId: '',
        region: '',
        quality: '',
        price: '',
        amount: '',
        total: '',
        goodsName: '',
        buyerName: '',
        sellerName: ''
      },
      dialogVisible: false,
      affirmData: {
        tradingId: '',
        negotiateId: ''
      },
      DATA: {
        id: ''
      },
      activeName: '',
      INFO: {}
    }
  },
  created () {
    this.isLogin()
    this.params.userId = this.userInfo.userId
    console.log(this.params)
    this.getRequest('/mine/getMyTrading', this.params)
      .then((response) => {
        console.log(response.data.data.tradingList)
        for (const i in response.data.data.tradingList) {
          response.data.data.tradingList[i].createDate = this.dateFormat(response.data.data.tradingList[i].createDate)
        }
        for (const i in response.data.data.tradingList) {
          if (response.data.data.tradingList[i].status === 4) {
            this.tableData.push(response.data.data.tradingList[i])
          }
        }
      })
      .catch(function (error) {
        console.log(error)
      })
  },
  methods: {
    ...mapMutations(['SET_GOODS_INFO']),
    ...mapActions(['loadGood', 'isLogin']),
    ...mapState(['goodInfo']),
    tableRowClassName ({ row, rowIndex }) {
      if (row.createDate === this.$route.params.createDate) {
        return 'unread-row'
      } else {
      }
    },
    handleClick (row) {
      console.log(row)
    },
    get () {
      this.params.userId = this.userInfo.userId
      console.log(this.params)
      this.getRequest('/mine/getMyTrading', this.params)
        .then((response) => {
          console.log(response.data.data.tradingList)
          for (const i in response.data.data.tradingList) {
            response.data.data.tradingList[i].createDate = this.dateFormat(response.data.data.tradingList[i].createDate)
          }
          console.log(response.data.data.tradingList)
          console.log(response.data)
          this.tableData = response.data.data.tradingList
          for (const i in this.tableData) {
            if (this.tableData[i].status === 0) {
              this.tableData[i].status = '议价'
            } else if (this.tableData[i].status === 1) {
              this.tableData[i].status = '订单'
            } else if (this.tableData[i].status === 2) {
              this.tableData[i].status = '合同'
            } else if (this.tableData[i].status === 3) {
              this.tableData[i].status = '交收单'
            } else if (this.tableData[i].status === 4) {
              this.tableData[i].status = '交易完成'
            } else if (this.tableData[i].status === -1) {
              this.tableData[i].status = '交易已取消'
            }
          }
        })
        .catch(function (error) {
          console.log(error)
        })
    },
    affirm () {
      this.dialogVisible = false
    },
    H (row) {
      this.DATA.id = row.id

      this.goodData.listedGoodsId = row.listedGoodsId
      this.getRequest('/search/searchHangGood', this.goodData)
        .then((response) => {
          console.log('1111response.data')
          console.log(response.data)
          this.INFO = response.data.data
          this.INFO.image = this.getBaseUrl() + '/upload/' + this.INFO.image
          this.total = parseInt(this.INFO.price) * parseInt(this.INFO.amount)
          console.log('11212response.data')
          console.log(this.INFO)
          this.negotiateData.createDate = row.createDate
          this.negotiateData.buyer = row.buyerName
          this.negotiateData.seller = row.sellerName
          this.negotiateData.tradingId = row.id
          this.negotiateData.listedGoodsId = row.listedGoodsId
          this.negotiateData.goodsName = this.INFO.goodsName
          this.negotiateData.image = this.INFO.image
          this.negotiateData.amount = this.INFO.amount
          this.negotiateData.region = this.INFO.region
          this.negotiateData.price = this.INFO.price
          this.negotiateData.quality = this.INFO.quality
          this.negotiateData.total = this.total
          console.log('1214444response.data')
          console.log(this.negotiateData)
        })
        .catch(function (error) {
          console.log(error)
        })

      this.dialogVisible = true
    }
  },
  store
}
</script>

<style>
.el-table .unread-row {
  background: rgb(247, 172, 122);
}
.address-box {
  padding: 15px;
  margin: 15px;
  margin-top: 5px;
  border-radius: 5px;
  box-shadow: 0px 0px 10px #545c64;
}
.search {
    margin-top: 20px;
}
</style>
