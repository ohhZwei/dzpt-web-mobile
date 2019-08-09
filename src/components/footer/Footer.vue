<template>
<el-row :gutter="10">
  <el-col :xs="24" :sm="6" :md="4" :lg="24" :xl="10">
  <div>
    <footer class="footer">
      <div class="service-intro">
        <!-- <div class="servece-type">
          <div class="servece-type-info" v-for="(guide, index) in guideArr" :key="index">
            <ul>
              <li v-for="(item, index) in guide" :key="index">{{item}}</li>
            </ul>
          </div>
        </div> -->
        <div class="friend-link">
          <div class="friend-link-item">
            <ul>
              <li>ICBC软件开发中心    大宗商品交易平台</li>
            </ul>
          </div>
        </div>

      </div>
    </footer>
  </div>
  </el-col>
</el-row>
</template>

<script>
export default {
  name: 'Footer',
  data () {
    return {
      linkItemClass: 'link-item',
      guideArr: [
        // ['商品种类齐全'],
        // ['买卖直接洽谈'],
        // ['支付方式快捷'],
        // ['正品商家销售']
      ]
    }
  }
}
</script>

<style scoped>
.footer {
  width: 100%;
  height: 120px;
  margin-top: 0px;
  background-color: #4488a7;
}
.service-intro {
  width: 100%;
  border-top: 1px solid #b2dfdb;
}
.servece-type {
  margin: 15px auto;
  /* height: 140px; */
  height: 40px;
  width: 70%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}
.servece-type-info {
  color: #F8F8FF;
}
.servece-type-info ul {
  list-style: none;
}
.servece-type-info li {
  cursor: pointer;
  line-height: 26px;
}
.servece-type-info li:first-child {
  line-height: 28px;
  font-weight: bold;
}
.friend-link {
  margin-top:50px;
  display: flex;
  align-items: center;
  width: 100%;
  height: 30px;
  margin: 0px auto;
  color: #F8F8FF;
  border-top: 1px solid #b2dfdb;
}
.friend-link-item {
  margin: 0px auto;
  /* text-align: left */
}
.friend-link-item ul {
  list-style: none;
}
.friend-link-item li {
  margin-top:100px;
  /* float: left; */
}

.copyright {
  width: 100%;
  color: #F8F8FF;
  line-height: 30px;
  text-align: center;
}
.copyright a{
  color: #F8F8FF;
  font-size: 20px;
}
</style>
