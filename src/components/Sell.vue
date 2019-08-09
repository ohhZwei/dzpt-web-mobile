<template>
  <div>
    <div class="container">
      <el-card shadow="hover">
        <div>
          <el-menu
            :default-active="activeIndex2"
            class="el-menu-demo"
            mode="horizontal"
            @select="handleSelect"
            background-color="#545c64"
            text-color="#fff"
            active-text-color="#FFFAFA">
            <el-menu-item index="1" style="font-size:1.2rem"><i class="el-icon-s-goods"></i>卖方挂牌商品</el-menu-item>
          </el-menu>
        </div>
        <div>
          <el-table
            :data="tableData"
            style="width: 100%"
            max-height="20rem"
            :align="center">
            <el-table-column
              prop="createDate"
              label="挂牌日期"
              align="center">
            </el-table-column>
            <el-table-column
              prop="listedGoodsId"
              label="挂牌号"
              align="center">
            </el-table-column>
            <el-table-column
              prop="goodsName"
              label="商品名"
              align="center">
            </el-table-column>
            <el-table-column
              prop="supplier"
              label="挂单方ID"
              align="center">
            </el-table-column>
            <el-table-column
              prop="supplierName"
              label="挂单方"
              align="center">
            </el-table-column>

            <el-table-column
              prop="amount"
              label="挂单数量"
              align="center">
            </el-table-column>
            <el-table-column
              prop="price"
              label="商品单价"
              align="center">
            </el-table-column>
            <el-table-column
              prop="region"
              label="商品来源"
              align="center">
            </el-table-column>
            <el-table-column
              prop="quality"
              label="质量标准"
              align="center">
            </el-table-column>
            <el-table-column
              fixed="right"
              label="操作"
              width="50">
              <template slot-scope="scope">
                <el-button @click.native.prevent="buy(scope.row, tableData)" type="text" size="small"> 购买</el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </el-card>
    </div>
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
      promotionTags: [],
      dataimg: [{
        src: require('../assets/img/3.jpg')
      },
      {
        src: require('../assets/img/1.jpg')

      },
      {
        src: require('../assets/img/6.jpg')
      }
      ],
      formInline: {
        user: '',
        region: ''
      },
      activeIndex: '1',
      activeIndex2: '1',
      tableData: [],
      tableData1: [],
      dialogFormVisible: false,

      form: {
        listedGoodsId: '',
        qq: ''
      },
      formLabelWidth: '120px',
      params: {
        hangType: '售出'
      },
      params2: {
        hangType: '需求'
      },
      DATA: {
        listedGoodsId: '',
        status: ''
      },
      DATA1: {
        sender: '',
        receiver: '',
        title: '',
        type: '',
        content: ''
      },
      LXid: '',
      LXName: '',
      rules: {
        listedGoodsId: [
          { required: true, message: '请填写您的商品信息', trigger: 'blur' }
        ],
        qq: [
          { required: false, message: '请填写您的联系方式', trigger: 'blur' }
        ]
      },
      res1: {
        code: '',
        msg: ''
      },
      get: { userId: '' },
      count: 0
    }
  },
  created () {
    this.isGood()
    this.isLogin()
    // eslint-disable-next-line no-unused-expressions
    // 获取卖家挂牌
    this.getRequest('/hang/getSellerHangList', this.params)
      .then((response) => {
        for (const i in response.data.data.hangList) {
          response.data.data.hangList[i].createDate = this.dateFormat(response.data.data.hangList[i].createDate)
        }
        console.log(response.data)
        this.tableData = response.data.data.hangList
      })
      .catch(function (error) {
        console.log(error)
      })
    // 获取买家挂牌
    this.getRequest('/hang/getBuyerHangList', this.params2)
      .then((response) => {
        for (const i in response.data.data.hangList) {
          response.data.data.hangList[i].createDate = this.dateFormat(response.data.data.hangList[i].createDate)
        }
        console.log(response.data)
        this.tableData1 = response.data.data.hangList
      })
      .catch(function (error) {
        console.log(error)
      })

    // 获取我的挂牌
    this.promotionTags = []
    this.get.userId = this.userInfo.userId
    this.getRequest('/hang/getMyHangList', this.get)
      .then((response) => {
        console.log(response.data)
        console.log(response.data.data.hangList)
        const hangList = response.data.data.hangList
        for (const i in hangList) {
          hangList[i].createDate = this.dateFormat(hangList[i].createDate)
          if (hangList[i].hangType === '售出') {
            this.count = this.count + 1
            this.tableData1.push(hangList[i])
            this.promotionTags.push(hangList[i].goodsName + ' — 挂牌单号：' + hangList[i].listedGoodsId)
          }
        }
      })
      .catch(function (error) {
        console.log(error)
      })
  },
  methods: {
    ...mapMutations(['SET_GOODS_INFO']),
    ...mapActions(['loadGood', 'isLogin', 'isGood']),
    ...mapState(['goodInfo', 'userInfo']),
    onSubmit () {
      console.log('submit!')
    },
    handleSelect (key, keyPath) {
      console.log(key, keyPath)
    },
    selectTags (index) {
      this.form.listedGoodsId = this.promotionTags[index]
    },
    buy (row) {
      if (!this.userInfo.userId) {
        this.$alert('您还未登录，不可以购买商品哦~', '执行结果', {
          confirmButtonText: '我知道了'
        })
        return false
      } else if (this.userInfo.userId === row.supplier) {
        this.$alert('不可以购买自己挂牌的商品哦~', '执行结果', {
          confirmButtonText: '我知道了'
        })
        return false
      } else {
        this.DATA.listedGoodsId = row.listedGoodsId
        this.DATA.status = 1
        this.loadGood(this.DATA)

        this.$router.push({
          path: '/Product',
          name: 'Product'
        })
      }
    },
    success () {
      this.dialogFormVisible = false
      //  alert("议价单已提交！")
    },
    chat (row, tableData1) {
      if (this.userInfo.userId === row.supplier) {
        this.$alert('你确定要联系自己吗~', '执行结果', {
          confirmButtonText: '不联系了'
        })
        return false
      } else {
        if (this.count === 0) {
          this.$alert('您还没有售出挂牌商品，无法进行联系！', '执行结果', {
            confirmButtonText: '确定'
          })
        } else {
          console.log('this21212')
          this.dialogFormVisible = true
          this.LXid = row.supplier
          this.form.name = row.supplierName
        }
      }
    },
    commit (formName) {
      if (this.form.listedGoodsId === '') {
        return false
      } else {
        this.DATA1.sender = this.userInfo.userId
        this.DATA1.receiver = this.LXid
        this.DATA1.title = '有货提醒'
        this.DATA1.type = '提醒'
        if (this.form.qq === '') {
          this.DATA1.content = '我的商品信息是：' + this.form.listedGoodsId + ' 您可以搜索挂牌号了解详情哦~'
        } else {
          this.DATA1.content = '我的商品信息是：' + this.form.listedGoodsId + ' 您可以搜索挂牌号了解详情哦~ 我的联系方式为：' + this.form.qq
        }
        console.log(this.DATA1)
        this.postRequest('/message/sendMessage', this.DATA1).then((res) => {
          console.log(res.data)
          this.res1 = res.data
          if (this.res1.code === '1') {
            this.dialogFormVisible = false
            this.$alert('联系成功!', '执行结果', {
              confirmButtonText: '确定'
            })
          } else {
            this.$alert('联系失败！', '执行结果', {
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
.nav-body {
  width: 100%;
  height: 380px;
  margin: 0px auto;
  background-color:#6e6568
}
.play {
    margin-right: 130px;
    margin-left:0px;
    background-color:#7aaff5
}
.button1 {
    width:20px;
    margin-top:20px;
}
/*导航内容*/
.nav-content {
  width: 100%;
  overflow: hidden;
  float: left;
}
/*导航图片*/
.nav-show-img {
  margin-top: 10px;
  float: left;
}
.nav-show-img:nth-child(2) {
  margin-left: 12px;
}
.container {
  margin: 1.5rem auto;
  padding: 0 1.5rem;
  max-width: 1200px;
}
.content {
  width: 1008px;
  margin: 0px auto;
}

</style>
