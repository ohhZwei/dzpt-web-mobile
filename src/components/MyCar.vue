<template>
<div class="box121">
  <el-table
    :data="tableData"
    border
    max-height="600"
    style="width: 100%">
    <el-table-column
      prop="createDate"
      label="加入进货单日期"
      align="center">
    </el-table-column>
    <el-table-column
      prop="listedGoodsId"
      label="商品挂牌号"
      align="center">
    </el-table-column>
    <el-table-column
      prop="goodsName"
      label="商品名称"
      align="center">
    </el-table-column>
     <el-table-column
      prop="amount"
      label="数量"
      align="center">
    </el-table-column>
    <el-table-column
      prop="price"
      label="金额"
      align="center">
    </el-table-column>
    <el-table-column
      prop="supplierName"
      label="卖家"
      align="center">
    </el-table-column>
    <el-table-column
      fixed="right"
      label="操作"
      align="center"
      width="70">
      <template slot-scope="scope">
            <el-button @click="buy(scope.row,scope.$index,tableData)" type="text" size="small">去购买</el-button>
            <el-button @click="del(scope.row,scope.$index,tableData)" type="text" size="small">删除</el-button>
      </template>
    </el-table-column>
  </el-table>
</div>
</template>

<script>
import store from '@/vuex/store'
import { mapMutations, mapActions, mapState } from 'vuex'
export default {
  computed: {
    ...mapState(['goodInfo', 'userInfo'])
  },
  data () {
    return {
      tableData: [],
      DATA: {
        listedGoodsId: '',
        status: ''
      },
      params: {
        userId: ''
      },
      params1: {
        listedGoodsId: '',
        userId: ''
      },
      res1: {
        code: '',
        msg: ''
      }
    }
  },
  created () {
    this.isGood()
    this.isLogin()
    console.log(this.userInfo)
    this.params.userId = this.userInfo.userId
    this.getRequest('/mine/getMyCar', this.params)
      .then((response) => {
        for (const i in response.data.data.goodsList) {
          response.data.data.goodsList[i].createDate = this.dateFormat(response.data.data.goodsList[i].createDate)
        }
        console.log(response.data)
        this.tableData = response.data.data.goodsList
      })
      .catch(function (error) {
        console.log(error)
      })
  },
  methods: {
    ...mapMutations(['SET_GOODS_INFO']),
    ...mapActions(['loadGood', 'isLogin', 'isGood']),
    ...mapState(['goodInfo', 'userInfo']),
    handleClick (row) {
      console.log(row)
    },
    buy (row) {
      this.DATA.listedGoodsId = row.listedGoodsId
      this.DATA.status = 'MyCar'
      this.loadGood(this.DATA)
      this.$router.push({
        path: '/Product',
        name: 'Product'
      })
    },
    del (row, index, tableData) {
      console.log(this.userInfo)
      this.params1.userId = this.userInfo.userId
      this.params1.listedGoodsId = row.listedGoodsId
      console.log(this.params1)
      this.postRequest('/mine/deleteMyCar', this.params1).then((res) => {
        console.log(res.data)
        this.res1 = res.data
        if (this.res1.code === '1') {
          this.$alert('删除成功！', '执行结果', {
            confirmButtonText: '确定'
          })
          tableData.splice(index, 1)
        } else {
          this.$alert('删除失败！', '执行结果', {
            confirmButtonText: '确定'
          })
          return false
        }
      })
    }
  },
  store
}
</script>

<style>
.box121 {
  padding: 15px;

  margin: 20px 10px 5px 10px;
  border-radius: 5px;
  height: 600px;
  box-shadow: 0px 0px 10px #545c64;
}
</style>
