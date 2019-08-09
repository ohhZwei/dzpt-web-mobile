<template>
  <div>
    <div class="freeback-container">
      <div class="freeback-box-border">
        <div class="freeback-box">
        <el-card shadow="always">
          <div class="freback-content">
            <div class="freeback-title">
              <h1>登录</h1>
              <h2>欢迎使用大宗商品交易平台</h2>
            </div>
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm"
                     class="demo-ruleForm">
              <el-form-item label="" prop="userName" style="margin-top: 1rem">
                <el-input v-model="ruleForm.userName" placeholder="请输入用户名"
                          prefix-icon="el-icon-user-solid"></el-input>
              </el-form-item>
              <el-form-item label="" prop="password" style="">
                <el-input v-model="ruleForm.password" show-password placeholder="请输入密码"
                          prefix-icon="el-icon-lock" @keyup.enter.native="submitForm('ruleForm')"></el-input>
              </el-form-item>
            </el-form>
          <br/>
            <div slot="footer">
              <el-button type="primary" @click="submitForm('ruleForm')">登录</el-button>
              <el-button @click="resetForm('ruleForm')">重置</el-button>
            </div>
          </div>
        </el-card>

          </div>
      </div>
    </div>
  </div>
</template>

<script>
import store from '@/vuex/store'
import { mapMutations, mapActions, mapState } from 'vuex'
export default {
  name: 'Login',
  data () {
    return {
      ruleForm:
        {
          userName: '',
          password: ''
        },
      rules: {
        userName: [
          { required: true, message: '请填写用户名', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请填写密码', trigger: 'change' }
        ]
      },
      res1: {
        code: '',
        msg: '',
        data: {
          userId: ''
        }
      },
      userData: {
        userName: '',
        userId: ''
      },
      DATA: {
        userName: '',
        password: ''
      },
      COUNT: {
        count: 0
      },
      COUNT1: {
        count: 21
      },
      tableData: {},
      params: {
        userId: ''
      }
    }
  },
  methods: {
    ...mapMutations(['SET_USER_LOGIN_INFO', 'SET_MESSAGE_INFO']),
    ...mapActions(['login', 'setMsg', 'isMessage', 'isLogin']),
    ...mapState(['userInfo', 'messageInfo']),
    onSubmit () {
      console.log('submit!')
    },
    handleSelect (key, keyPath) {
      console.log(key, keyPath)
    },
    getMsg () {
      this.isMessage()
      this.isLogin()
      console.log('msg66663')
      this.COUNT.count = 0
      console.log('qqq' + this.params.userId)
      this.getRequest('/message/getMessageList', this.params)
        .then((response) => {
          console.log('response.data')
          console.log(response.data)
          for (const i in response.data.data.messageList) {
            response.data.data.messageList[i].createDate = this.dateFormat(response.data.data.messageList[i].createDate)
            if (response.data.data.messageList[i].isRead) {
              response.data.data.messageList[i].isRead = '已读'
            } else {
              this.COUNT.count = this.COUNT.count + 1
              response.data.data.messageList[i].isRead = '未读'
            }
          }
          this.tableData = response.data.data.messageList
          this.setMsg(this.COUNT)
          console.log('msg' + this.COUNT.count)
          console.log('msg1' + this.messageInfo.count)
          console.log('msg1' + this.userInfo.userName)
        })
        .catch(function (error) {
          console.log(error)
        })
    },
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.DATA.userName = this.ruleForm.userName
          this.DATA.password = this.ruleForm.password
          // alert(this.params)
          console.log(this.DATA)
          this.postRequest('/login', this.DATA).then((res) => {
            this.res1 = res.data
            console.log(res.data)
            if (this.res1.code === '1') {
              this.$message({
                message: '登陆成功',
                type: 'success'
              })
              if (this.ruleForm.userName === 'root') {
                this.userData.userName = this.ruleForm.userName
                this.login(this.userData)
                this.$router.push({
                  path: '/Management/UserList',
                  name: 'UserList',
                  params: {
                    manager: this.ruleForm.name
                  }
                })
              } else {
                this.userData.userId = this.res1.data.userId
                this.userData.userName = this.ruleForm.userName
                this.params.userId = this.res1.data.userId
                this.login(this.userData)
                this.getMsg()
                // this.setMsg(this.COUNT)
                // console.log('zheli' + this.COUNT.count)
                this.$router.push({
                  path: '/',
                  name: 'Sell',
                  params: {
                    username: this.ruleForm.userName
                  }
                })
              }
            } else {
              this.$alert('登录失败！', '执行结果', {
                confirmButtonText: '确定',
                callback: action => {
                  return false
                }
              })
            }
          }).catch(function (error) {
            console.log(error)
          })
        } else {
          // console.log('error submit!!');
          this.$alert('登录失败！', '执行结果', {
            confirmButtonText: '确定',
            callback: action => {
              return false
            }
          })
        }
      })
    },
    resetForm (formName) {
      this.$refs[formName].resetFields()
    }
  },
  store
}
</script>

<style scoped>

.freeback-container {
  margin: 2rem auto;
  padding: 0 2rem;
  /*display: flex;*/
  /*align-items: center;*/
  background-color: #eeeeee;
  font-weight: bold;
}
.freeback-box-border {
  /*display: flex;*/
  /*align-items: center;*/
  /*justify-content: center;*/

}
.freeback-box {
  margin: 0 auto;
  min-width: 15rem;
  max-width: 30rem;
}
.freback-content {
  background-color: #ffffff;
  border-radius: 5px;
}

</style>
