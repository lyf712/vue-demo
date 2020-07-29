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
          <div>
            <div class="crumbs">
              <el-breadcrumb separator="/">
                <el-breadcrumb-item>
                  <i class="el-icon-lx-cascades"></i> 用户管理
                </el-breadcrumb-item>
              </el-breadcrumb>
            </div>
            <div class="container">
              <div class="handle-box">
                <el-button
                  type="primary"
                  icon="el-icon-delete"
                  class="handle-del mr10"
                  @click="delAllSelection"
                >批量删除</el-button>
                <el-select v-model="query.address" placeholder="部门" class="handle-select mr10">
                  <el-option key="1" label="人力资源部" value="人力资源部"></el-option>
                  <el-option key="2" label="销售部" value="销售部"></el-option>
                </el-select>
                <el-input v-model="query.name" placeholder="姓名" class="handle-input mr10"></el-input>
                <el-button type="primary" icon="el-icon-search" @click="handleSearch">搜索</el-button>
              </div>
              <el-table
                :data="tableData"
                border
                class="table"
                ref="multipleTable"
                header-cell-class-name="table-header"
                @selection-change="handleSelectionChange"
              >
                <el-table-column type="selection" width="55" align="center"></el-table-column>
                <el-table-column prop="id" label="ID" width="55" align="center">
                  <template slot-scope="scope">{{scope.row.id}}</template>
                </el-table-column>
                <el-table-column prop="name" label="姓名">
                  <template slot-scope="scope">{{scope.row.name}}</template>
                </el-table-column>
                <el-table-column label="所在部门">
                  <template slot-scope="scope">{{scope.row.partment}}</template>
                </el-table-column>
                <!--                <el-table-column label="照片" align="center">-->
                <!--                    <template slot-scope="scope">-->
                <!--                        <el-image-->
                <!--                            class="table-td-thumb"-->
                <!--                            :src="scope.row.thumb"-->
                <!--                            :preview-src-list="[scope.row.thumb]"-->
                <!--                        ></el-image>-->
                <!--                    </template>-->
                <!--                </el-table-column>-->
                <el-table-column prop="address" label="密码">
                  <template slot-scope="scope">{{scope.row.password}}</template>
                </el-table-column>
                <el-table-column label="健康状态" align="center">
                  <!--                    <template slot-scope="scope">-->
                  <!--                        <el-tag-->
                  <!--                            :type="scope.row.state==='健康'?'success':(scope.row.state==='不健康'?'danger':'')"-->
                  <!--                        >{{scope.row.state}}</el-tag>-->
                  <!--                    </template>-->
                  <template slot-scope="scope">{{scope.row.status}}</template>
                </el-table-column>

                <el-table-column prop="date" label="注册时间">
                  <template slot-scope="scope">{{scope.row.register}}</template>
                </el-table-column>
                <el-table-column label="操作" width="180" align="center">
                  <template slot-scope="scope">
                    <el-button
                      type="text"
                      icon="el-icon-edit"
                      @click="handleEdit(scope.$index, scope.row)"
                    >编辑</el-button>
                    <el-button
                      type="text"
                      icon="el-icon-delete"
                      class="red"
                      @click="handleDelete(scope.$index, scope.row)"
                    >删除</el-button>
                  </template>
                </el-table-column>
              </el-table>
              <div class="pagination">
                <el-pagination
                  background
                  layout="total, prev, pager, next"
                  :current-page="query.pageIndex"
                  :page-size="query.pageSize"
                  :total="pageTotal"
                  @current-change="handlePageChange"
                ></el-pagination>
              </div>
            </div>

            <!-- 编辑弹出框 -->
            <el-dialog title="编辑" :visible.sync="editVisible" width="30%">
              <el-form ref="form" :model="form" label-width="70px">
                <el-form-item label="姓名">
                  <el-input v-model="form.name"></el-input>
                </el-form-item>
                <el-form-item label="部门">
                  <el-input v-model="form.address"></el-input>
                </el-form-item>
              </el-form>
              <span slot="footer" class="dialog-footer">
                <el-button @click="editVisible = false">取 消</el-button>
                <el-button type="primary" @click="saveEdit">确 定</el-button>
            </span>
            </el-dialog>
          </div>
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
      return {
        query: {
          address: '',
          name: '',
          pageIndex: 1,
          pageSize: 10
        },
        tableData: [{
          id:'1',
          name:'史可心',
          partment:'人力部',
          password:'123456',
          status:'健康',
          register:'2020/7/01'
        },{
          id:'1',
          name:'李云飞',
          partment:'技术部',
          password:'123456',
          status:'健康',
          register:'2020/7/01'
        }],
        multipleSelection: [],
        delList: [],
        editVisible: false,
        pageTotal: 4,
        form: {},
        idx: -1,
        id: -1
      };
    },


    methods:{
      // 触发搜索按钮
      handleSearch() {
        this.$set(this.query, 'pageIndex', 1);
        this.getData();
      },
      // 删除操作
      handleDelete(index, row) {
        // 二次确认删除
        this.$confirm('确定要删除吗？', '提示', {
          type: 'warning'
        })
          .then(() => {
            this.$message.success('删除成功');
            this.tableData.splice(index, 1);
          })
          .catch(() => {});
      },
      // 多选操作
      handleSelectionChange(val) {
        this.multipleSelection = val;
      },
      delAllSelection() {
        const length = this.multipleSelection.length;
        let str = '';
        this.delList = this.delList.concat(this.multipleSelection);
        for (let i = 0; i < length; i++) {
          str += this.multipleSelection[i].name + ' ';
        }
        this.$message.error(`删除了${str}`);
        this.multipleSelection = [];
      },
      // 编辑操作
      handleEdit(index, row) {
        this.idx = index;
        this.form = row;
        this.editVisible = true;
      },
      // 保存编辑
      saveEdit() {
        this.editVisible = false;
        this.$message.success(`修改第 ${this.idx + 1} 行成功`);
        this.$set(this.tableData, this.idx, this.form);
      },
      // 分页导航
      handlePageChange(val) {
        this.$set(this.query, 'pageIndex', val);
        this.getData();
      }
    }

  };
</script>
