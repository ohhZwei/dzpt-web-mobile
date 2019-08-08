<template>
<el-row :gutter="10">
  <el-col :xs="30" :sm="6" :md="4" :lg="24" :xl="10">
  <div>
    <footer class="footer">
      <div class="service-intro">
        <div class="servece-type">
          <div class="servece-type-info" v-for="(guide, index) in guideArr" :key="index">
            <ul>
              <li v-for="(item, index) in guide" :key="index">{{item}}</li>
            </ul>
          </div>
        </div>
        <div class="clearfix"></div>
        <div class="friend-link">
          <div class="friend-link-item">
            <ul>
              <li>中国工商银行软件开发中心    大宗商品交易平台</li>
            </ul>
          </div>
        </div>
        <div class="clearfix"></div>

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
        ['商品种类齐全', '特价商品大全', '搜索方式多样', '涵盖范围广泛'],
        ['买卖直接洽谈', '每日特价推荐', '多买多送优惠', '配送服务查询'],
        ['支付方式快捷', '一键在线支付', '支付安全保护', '支持退款退货'],
        ['正品商家销售', '商家审核严格', '非法商家封禁', '后台管理严格']
      ]
    }
  }
}
</script>

<style scoped>
.footer {
  width: 100%;
  height: 230px;
  margin-top: 0px;
  background-color: #4488a7;
}
.service-intro {
  width: 100%;
  border-top: 1px solid #b2dfdb;
}
.servece-type {
  margin: 15px auto;
  height: 140px;
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
  font-size: 14px;
  cursor: pointer;
  line-height: 26px;
}
.servece-type-info li:first-child {
  font-size: 16px;
  line-height: 28px;
  font-weight: bold;
}
.friend-link {
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
  text-align: left
}
.friend-link-item ul {
  list-style: none;
}
.friend-link-item li {
  padding: 5px 0px;
  float: left;
}
.link-item {
  padding: 0px 8px;
  cursor: pointer;
  border-right: 1px solid #ccc;
}
.link-last-item {
  border: none;
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
