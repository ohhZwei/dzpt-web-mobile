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
                     label-width="100px"  class="demo-ruleForm"
                     >
              <el-form-item label="用户名" prop="userName" style="width: 450px;margin-top:10px">
                <el-input v-model="ruleForm.userName"
                          prefix-icon="el-icon-user-solid"></el-input>
              </el-form-item>
              <el-form-item label="登录密码" prop="password" style="width: 450px;">
                <el-input v-model="ruleForm.password" show-password
                          prefix-icon="el-icon-lock" @keyup.enter.native="submitForm('ruleForm')"></el-input>
              </el-form-item>
            </el-form>
          <br/>
            <div slot="footer">
              <el-button type="primary" @click="submitForm('ruleForm')">登 录</el-button>
              <el-button @click="resetForm('ruleForm')">重 置</el-button>
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
  margin: 0px auto;
  width: 100%;
  height: 500px;
  display: flex;
  align-items: center;
  background-color: #eeeeee;
}
.freeback-img-box {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}
.freeback-img-box img {
  width: 80%;
}
.freeback-box-border {
  width: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto;
}
.freeback-box {
  width: 630px;
}
.freback-content {
  background-color: #ffffff;
  width:500px;
  margin: 15px auto;
  border-radius: 5px;
}

</style>
