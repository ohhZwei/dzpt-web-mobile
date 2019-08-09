<template>
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
        <div class="friend-link">
          <div class="friend-link-item">
            <ul>
              <li>中国工商银行软件开发中心    大宗商品交易平台</li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  </div>
</template>

<script>
export default {
  name: 'Footer',
  data () {
    return {
      linkItemClass: 'link-item',
      guideArr: [
        ['商品种类齐全', '特价商品大全', '搜索方式多样', '涵盖范围广泛'],
        ['买卖直接洽谈', '每日特价推荐', '多买多送优惠', '配送服务查询']
      ]
    }
  }
}
</script>

<style scoped>
.footer {
  width: 100%;
  height: 13rem;
  margin-top: 0px;
  background-color: #4488a7;
}
.service-intro {
  width: 100%;
  border-top: 1px solid #b2dfdb;
}
.servece-type {
  margin: 1rem auto;
  height: 8rem;
  width: 70%;
  display: flex;
  flex-direction: row;
  text-align: center;
}
.servece-type-info {
  margin: 0 auto;
  color: #F8F8FF;
}
.servece-type-info ul {
  padding: 0;
  margin: 0 auto;
  list-style: none;
}
.servece-type-info li {
  font-size: 14px;
  cursor: pointer;
  line-height: 26px;
}
.servece-type-info li:first-child {
  font-size: 1rem;
  line-height: 2rem;
  font-weight: bold;
}
.friend-link {
  display: flex;
  align-items: center;
  width: 100%;
  height: 3rem;
  margin: 0px auto;
  color: #F8F8FF;
  border-top: 1px solid #b2dfdb;
}
.friend-link-item {
  margin: 0px auto;
}
.friend-link-item ul {
  padding-left: 0;
  list-style: none;
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
