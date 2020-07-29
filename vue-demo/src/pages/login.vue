<template>
  <div class="login-wrap">
    <div class="ms-login">
      <div class="ms-title">后台管理系统</div>
      <el-form :model="param" :rules="rules" ref="login" label-width="0px" class="ms-content">
        <el-form-item prop="username">
          <el-input
            id="username1"
            prefix-icon="el-icon-user"
            v-model="param.username"
            placeholder="请输入用户号"/>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            id="password1"
            prefix-icon="el-icon-lock"
            type="password"
            placeholder="请输入密码"
            v-model="param.password"
            @keyup.enter.native="submitForm()"
          >
          </el-input>
        </el-form-item>
        <div class="login-btn">
          <el-button type="primary" @click="submitForm()">登录</el-button>
        </div>
      </el-form>
    </div>
  </div>
</template>

<script>
  import Qs from 'qs'
  export default {
    data: function() {
      return {
        param: {
          username: '',
          password: '',
        },
        rules: {
          // 预提示消息
          username: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
          password: [{ required: true, message: '请输入密码', trigger: 'blur' }],
        },
      };
    },
    methods: {

      submitForm() {
        var data = Qs.stringify({});
        var user2=document.getElementById("username1");
       this.username=user2.value;
        var password2=document.getElementById("password1");
        this.password=password2.value;

    var params=new URLSearchParams();
    params.append('id',this.username);
    params.append('password',this.password);
       this.$axios.post('/login',params
       ).then( (response)=>{  //注意使用箭头函数
            // handle success
       // this.responseResult=JSON.stringify(response);
       // if(response.status)
           if(response.status==200){
             if(response.data==true){
               console.log(response);
               console.log(response.data);
               this.$notify({
                 title:'成功',
                 message:'登录成功',
                 type:'success'
               })
               // alert(response.data);
               // this.check=response.data;
               this.$router.push({path:'/home'});
             }else {
               alert("密码错误，请重新输入");
             }
           }else{
             console.log('失败');
             alert("连接服务器失败")
           }

          })
          .catch(function (error) {
            // handle error
            console.log(error);
            alert("连接服务器失败")
          })
      },
    },
  };
</script>

<style scoped>
  .login-wrap {
    position: relative;
    width: 100%;
    height: 100%;
    background-image: url(../assets/background/bg.jpg);
    background-size: 100%;
  }
  .ms-title {
    width: 100%;
    line-height: 50px;
    text-align: center;
    font-size: 20px;
    color: #fff;
    border-bottom: 1px solid #ddd;
  }
  .ms-login {
    position: absolute;
    left: 50%;
    top: 50%;
    width: 350px;
    margin: -190px 0 0 -175px;
    border-radius: 5px;
    background: rgba(255, 255, 255, 0.3);
    overflow: hidden;
  }
  .ms-content {
    padding: 30px 30px;
  }
  .login-btn {
    text-align: center;
  }
  .login-btn button {
    width: 100%;
    height: 36px;
    margin-bottom: 10px;
  }
  .login-tips {
    font-size: 12px;
    line-height: 30px;
    color: #fff;
  }
</style>
