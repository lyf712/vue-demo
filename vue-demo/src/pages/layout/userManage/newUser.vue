<template>
  <el-container style="height: 100%; border: 1px solid #eee">

    <el-header style="
  text-align: right;
   font-size: 12px;
   background-color: cadetblue;
">
      <el-spinner style="float: left"></el-spinner>
      <div style="
   float:left;
   border-radius:
    3px; color: lightcoral;
    font-size: 20px;
">E-Hys</div>
      <span style="float: left; font-size: 20px; margin-left: 70px; color: #f5f7fa">企业员工健康管理系统</span>

      <!-- 消息中心 -->
      <div style="float:right; padding-right: 30px; padding-top: 10px">
        <!--   用户头像-->
        <img src="../../../assets/logos/logo.jpg" style="
         width: 40px;
         height: 40px;
         border-radius: 50%;
           ">
      </div>

      <!-- 用户名下拉菜单 -->
      <el-dropdown class="user-name" trigger="click" @command="handleCommand" style="
    margin-right: 10px;
    float:right">
                    <span class="el-dropdown-link">
                        {{username}}
                        <i class="el-icon-caret-bottom"></i>
                    </span>
        <el-dropdown-menu slot="dropdown">
          <!--                        <a href="https://github.com/lin-xin/vue-manage-system" target="_blank">-->
          <!--                            <el-dropdown-item>项目仓库</el-dropdown-item>-->
          <!--                        </a>-->
          <router-link to="/">
            <el-dropdown-item>密码管理</el-dropdown-item>
          </router-link>

          <router-link to="/">
            <el-dropdown-item divided command="loginout">退出登录</el-dropdown-item>
          </router-link>

        </el-dropdown-menu>
      </el-dropdown>


      <!-- 消息中心 -->
      <div style="float:right;padding-right: 20px; padding-top: 0px; color: #f5f7fa">
        <el-tooltip
          effect="dark"
          :content="message?`有${message}条未读消息`:`消息中心`"
          placement="bottom"
          style="font-size: 25px;
            color: #f5f7fa"
        >
          <router-link to="/">
            <i class="el-icon-bell"></i>
          </router-link>
        </el-tooltip>
        <span class="btn-bell-badge" v-if="message"></span>
      </div>
    </el-header>

    <el-container>
      <el-aside width="200px" style="background-color: #f5f7fa">
        <el-menu :default-openeds="['1', '5']">
          <router-link to="/home">
            <el-menu-item index="1">
              <template slot="title"><i class="el-icon-house"></i>系统首页</template>
            </el-menu-item>
          </router-link>
          <el-submenu index="2">
            <template slot="title"><i class="el-icon-user"></i>用户管理</template>
            <router-link to="/userTable"><el-menu-item index="2-1">用户列表</el-menu-item></router-link>
            <el-menu-item index="2-2">用户录入</el-menu-item>
          </el-submenu>

          <el-submenu index="3">
            <template slot="title"><i class="el-icon-apple"></i>健康档案</template>

            <router-link to="/examInfo">
              <el-menu-item index="3-1">体检信息</el-menu-item>
            </router-link>

            <router-link to="/dailyInfo">
              <el-menu-item index="3-2">日常信息</el-menu-item>
            </router-link>

            <router-link to="/mentalhealth">
              <el-menu-item index="3-3">心理模块</el-menu-item>
            </router-link>

            <router-link to="/epidemicModule">
              <el-menu-item index="3-4">疫情模块</el-menu-item>
            </router-link>

          </el-submenu>

          <el-submenu index="4">
            <template slot="title"><i class="el-icon-data-analysis"></i>统计分析</template>

            <router-link to="/healthWarning">
              <el-menu-item index="3-1">健康预警名单</el-menu-item>
            </router-link>

            <router-link to="/dailyAnalysis">
              <el-menu-item index="3-2">日常作息分析</el-menu-item>
            </router-link>

            <router-link to="/physicalExam">
              <el-menu-item index="3-3">心理健康分析</el-menu-item>
            </router-link>

            <router-link to="/workAnalysis">
              <el-menu-item index="3-4">工作表现分析</el-menu-item>
            </router-link>

          </el-submenu>

          <router-link to="/logs">
            <el-menu-item index="5">
              <i class="el-icon-setting"></i>操作日志
            </el-menu-item>
          </router-link>


        </el-menu>
      </el-aside>

      <el-container>

        <el-main>

            <div class="crumbs">
              <el-breadcrumb separator="/">
                <el-breadcrumb-item>
                  <i class="el-icon-lx-cascades"></i> 用户录入
                </el-breadcrumb-item>
              </el-breadcrumb>
            </div>
<el-row>

<el-col span="12">
          <el-upload
            class="upload-demo"
            drag
            action="https://jsonplaceholder.typicode.com/posts/"
            multiple>
            <i class="el-icon-upload"></i>
            <div class="el-upload__text"><em>照片上传</em></div>
            <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div>
          </el-upload>
</el-col>
  <el-col span="12">
          <div style="margin-top: 20px">

            <el-upload
              class="upload-demo"
              action="https://jsonplaceholder.typicode.com/posts/"
              :on-preview="handlePreview"
              :on-remove="handleRemove"
              :before-remove="beforeRemove"
              multiple
              :limit="3"
              :on-exceed="handleExceed"
              :file-list="fileList">
              <el-button size="small" type="primary">批量录入</el-button>
              <div slot="tip" class="el-upload__tip">只能上传excel文件，且不超过500kb</div>
            </el-upload>
          </div>
  </el-col>
</el-row>

<el-row gutter="36">
  <el-col span="4">
  <li> 职工号<el-input></el-input></li>
  </el-col>

  <el-col span="4">
    <li> 部门<el-select>
     <el-option>
       人力资源部
     </el-option>
      <el-option>
       技术部
      </el-option>

    </el-select></li>
  </el-col>

</el-row>

<el-row gutter="12" style="margin-top: 20px">
  <el-col span="4">

    <li>联系电话<el-input></el-input></li>
  </el-col>
  <el-col span="4">

    <li>身份证号<el-input></el-input></li>
  </el-col>
</el-row>

 <el-row style="margin-top: 20px">
   <el-col>

     <el-button style="margin-left: 120px; float: left; width: 100px">提交</el-button>
   </el-col>

 </el-row>



        </el-main>

      </el-container>
    </el-container>
  </el-container>
</template>


<style>
  .el-header {
    background-color: #B3C0D1;
    color: #333;
    line-height: 60px;
  }

  .el-aside {
    color: #333;
  }

  .grid-content {
    display: flex;
    align-items: center;
    height: 100px;
  }

  .grid-cont-right {
    flex: 1;
    text-align: center;
    font-size: 14px;
    color: #999;
  }

  .grid-num {
    font-size: 30px;
    font-weight: bold;
  }

  .grid-con-icon {
    font-size: 50px;
    width: 100px;
    height: 100px;
    text-align: center;
    line-height: 100px;
    color: #fff;
  }

  .grid-con-1 .grid-con-icon {
    background: rgb(45, 140, 240);
  }

  .grid-con-1 .grid-num {
    color: rgb(45, 140, 240);
  }

  .grid-con-2 .grid-con-icon {
    background: rgb(100, 213, 114);
  }

  .grid-con-2 .grid-num {
    color: rgb(45, 140, 240);
  }

  .grid-con-3 .grid-con-icon {
    background: rgb(242, 94, 67);
  }

  .grid-con-3 .grid-num {
    color: rgb(242, 94, 67);
  }

  .user-info {
    display: flex;
    align-items: center;
    padding-bottom: 20px;
    border-bottom: 2px solid #ccc;
    margin-bottom: 20px;
  }

  .user-avator {
    width: 120px;
    height: 120px;
    border-radius: 50%;
  }

  .user-info-cont {
    padding-left: 50px;
    flex: 1;
    font-size: 14px;
    color: #999;
  }

  .user-info-cont div:first-child {
    font-size: 30px;
    color: #222;
  }

  .user-info-list {
    font-size: 14px;
    color: #999;
    line-height: 25px;
  }

  .user-info-list span {
    margin-left: 70px;
  }

  .mgb20 {
    margin-bottom: 20px;
  }

  .todo-item {
    font-size: 14px;
  }

  .todo-item-del {
    text-decoration: line-through;
    color: #999;
  }
  .handle-box {
    margin-bottom: 20px;
  }

  .handle-select {
    width: 120px;
  }

  .handle-input {
    width: 300px;
    display: inline-block;
  }
  .table {
    width: 100%;
    font-size: 14px;
  }
  .red {
    color: #ff0000;
  }
  .mr10 {
    margin-right: 10px;
  }
  .table-td-thumb {
    display: block;
    margin: auto;
    width: 40px;
    height: 40px;
  }

</style>

<script>
  export default {
    data() {
      return { fileList: [{name: 'food.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'}, {name: 'food2.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'}]}
    },


    methods: {

      handleRemove(file, fileList) {
        console.log(file, fileList);
      },
      handlePreview(file) {
        console.log(file);
      },
      handleExceed(files, fileList) {
        this.$message.warning(`当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
      },
      beforeRemove(file, fileList) {
        return this.$confirm(`确定移除 ${ file.name }？`);
      }

    }


  }
</script>
