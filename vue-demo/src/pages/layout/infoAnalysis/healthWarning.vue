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
            <router-link to="/newUser"> <el-menu-item index="2-2">用户录入</el-menu-item></router-link>
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

          <div class="crumbs" style="margin-bottom: 20px">
            <el-breadcrumb separator="/">
              <el-breadcrumb-item>
                <i class="el-icon-data-analysis"></i> 健康预警名单
              </el-breadcrumb-item>
            </el-breadcrumb>
          </div>


          <el-table
            :data="tableData"
            border
            style="text-align: center"
          >
            <el-table-column
              fixed
              prop="date"
              label="注册日期"
              width="180">
            </el-table-column>
            <el-table-column
              prop="id"
              label="职工号"
              width="140">
            </el-table-column>
            <el-table-column
              prop="name"
              label="姓名"
              width="140">
            </el-table-column>
            <el-table-column
              prop="department"
              label="部门"
              width="140">
            </el-table-column>
            <el-table-column
              prop="status"
              label="健康状态"
              width="150">
            </el-table-column>
            <el-table-column
              prop="address"
              label="家庭地址"
              width="260">
            </el-table-column>
            <el-table-column
              label="操作"
              width="130">
              <template slot-scope="scope">
                <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>
                <el-button type="text" size="small">编辑</el-button>
              </template>
            </el-table-column>
          </el-table>
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

</style>

<script>
  export default {
    data() {
      return {
        tableData: [{
          date: '2020-05-02',
          id: '00002',
          name: '王屹阳',
          department: '人力资源部',
          status: '工作表现异常',
          address: '上海市普陀区金沙江路 1518 弄'
        },
          {
            date: '2020-05-01',
            id: '00001',
            name: '王屹阳',
            department: '人力资源部',
            status: '工作表现异常',
            address: '上海市普陀区金沙江路 1518 弄'
          },
          {
            date: '2020-05-01',
            id: '00001',
            name: '王屹阳',
            department: '人力资源部',
            status: '工作表现异常',
            address: '上海市普陀区金沙江路 1518 弄'
          },
          {
            date: '2020-05-01',
            id: '00001',
            name: '王屹阳',
            department: '人力资源部',
            status: '工作表现异常',
            address: '上海市普陀区金沙江路 1518 弄'
          }



        ]
      }
    },

    methods: {
      handleClick(row) {
        console.log(row);
      },
    }
  }
</script>
