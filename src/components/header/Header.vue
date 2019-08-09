<template>
  <div class="box">
    <div class="test">
      <el-row>
        <el-col :xs="24" :sm="6" :md="4" :lg="12" :xl="12"><div id="logo">大宗商品交易平台</div></el-col>
        <el-col :xs="12" :sm="6" :md="4" :lg="2" :xl="1">
          <div  v-show="!userInfo.userName"><router-link to="/Login"><i class="el-icon-user"></i>登  录</router-link></div>
        </el-col>
        <el-col :xs="6" :sm="6" :md="4" :lg="2" :xl="1">
          <div  v-show="!!userInfo.userName&&userInfo.userName!=='root'" @click="Mine()">
            <router-link to=""> <i class="el-icon-s-custom"></i> {{userInfo.userName}}</router-link>
          </div>
        </el-col>
        <el-col :xs="12" :sm="6" :md="4" :lg="2" :xl="1">
          <div v-show="!userInfo.userName">
            <router-link to="/"> 网站导航</router-link>
          </div>
        </el-col>
        <el-col :xs="6" :sm="6" :md="4" :lg="2" :xl="1">
          <div v-show="!!userInfo.userName">
            <router-link to="/"> 网站导航</router-link>
          </div>
        </el-col>
        <el-col :xs="6" :sm="6" :md="4" :lg="2" :xl="1">
          <div v-show="!!userInfo.userName&&userInfo.userName!=='root'" @click="MyCar">
            <router-link to=""><i class="el-icon-shopping-cart-2"></i> 进货单</router-link>
          </div>
        </el-col>
        <el-col :xs="6" :sm="6" :md="4" :lg="2" :xl="1">
          <div v-show="!!userInfo.userName" @click="signOutFun">
            <router-link to=""> <i class="el-icon-caret-right"></i> 退出登录</router-link>
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import store from '@/vuex/store'
import { mapMutations, mapState, mapActions } from 'vuex'
export default {
  created () {
    this.isLogin()
    this.isMessage()
  },
  data () {
    return {
      count: 0,
      params: {
        userId: ''
      },
      dot: false,
      COUNT: {
        count: '123132'
      },
      tableData: {}
    }
  },
  computed: {
    ...mapState(['userInfo']),
    ...mapState(['messageInfo'])
  },
  methods: {
    ...mapMutations(['SET_MESSAGE_INFO']),
    ...mapState(['messageInfo', 'userInfo']),
    ...mapActions(['setMsg', 'isMessage', 'isLogin', 'signOut', 'goodOut']),
    signOutFun () {
      this.$confirm('是否注销登录?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$message({
          message: '已注销登录',
          type: 'success'
        })
        this.signOut()
        this.goodOut()
        this.$router.push('/')
      }).catch(() => {
        this.$message({
          message: '已取消'
        })
      })
      // this.$router.push({
      //   path: '/Order',
      //   name: 'Order',
      //   params: {
      //     activeName: 'first'
      //   }

      // })
    },
    Mine () {
      this.$router.push({
        path: '/MyTrading',
        name: 'MyTrading',
        params: {
          red: 'PER'
        }
      })
    },
    MyCar () {
      this.$router.push({
        path: '/Mine/MyCar',
        name: 'MyCar',
        params: {
          red: 'MC'
        }
      })
    }
  },
  store
}
</script>

<style scoped>
.box {
  width: 100%;
  background-color: #4488a7;
}
.test {
  color: #F8F8FF;
  font-weight: bold;
}
.test #logo {
  font-size: 1.8rem;
  color: #F8F8FF;
}
.test a{
  text-decoration: none;
  color: #F8F8FF;
  font-size: 1.05rem;
  line-height: 3rem;
  /*border: 1px solid #ccc;*/
}
.nav {
  margin: 0% auto;
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}
.nav ul {
  list-style: none;
}
.nav li {
  float: left;
  font-size: 14px;
  line-height: 35px;
  margin-right: 15px;
  font-weight: bold;
}
.nav a {
  text-decoration: none;
  color: #F8F8FF;
  padding-left: 15px;
  border-left: 1px solid #ccc;
  cursor: pointer;
}
.location a {
  border-left: none;
}
.username-p {
  cursor: pointer;
}
.location li {
  font-size: 1.5rem;
}
.nav a:hover {
  color: #d9534f;
}
.location {
  margin-top: 6px;
  margin-left: 20px;
  color: #F8F8FF;
}
.details {
    margin-top: 9px;
}
.details li{
    color: #F8F8FF;
}

</style>
