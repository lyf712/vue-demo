import Vue from 'vue'
import Router from 'vue-router'
// import HelloWorld from '@/components/HelloWorld'

import dailyInfo from "../pages/layout/healthRecord/dailyInfo";
import examInfo from "../pages/layout/healthRecord/examInfo";
import mentalhealth from "../pages/layout/healthRecord/mentalhealth";
import epidemicModule from "../pages/layout/healthRecord/epidemicModule";

import healthWarning from "../pages/layout/infoAnalysis/healthWarning";
import dailyAnalysis from "../pages/layout/infoAnalysis/dailyAnalysis";
import physicalExam from "../pages/layout/infoAnalysis/physicalExam";
import workAnalysis from "../pages/layout/infoAnalysis/workAnalysis";

import newUser from "../pages/layout/userManage/newUser";
import logs from "../pages/layout/logs";
 Vue.use(Router)


export default new Router({
  routes: [
    {
      path: '/',
      name: 'login',
      component: () => import('@/pages/login')

    }
    ,{
    path: '/home',
      name: 'home',
      component: ()=>import('@/pages/layout/home'),
      // children:[
      //   {
      //
      //   }
      // ]
    },{
      path: '/test1',
      name: 'test',
      component: ()=>import('@/pages/test/test1')

    }

    ,{//用户模块
      path:'/userTable',
      name:'userTable',
      component:()=>import('@/pages/layout/userManage/userTable')
    },

    {//健康档案模块
      path:'/examInfo',
      name:'examInfo',
      component:examInfo
    },
    {
      path:'/dailyInfo',
      name:'dailyInfo',
      component:dailyInfo
    },
    {
      path:'/epidemicModule',
      name:'epidemicModule',
      component:epidemicModule
    },
    {
      path:'/mentalhealth',
      name:'mentalhealth',
      component:mentalhealth
    },

    {
      path: '/healthWarning',
      name: 'healthWarning',
      component:healthWarning
    },


    {//统计分析
      path:'/healthWarning',
      name:'healthWarning',
      component:healthWarning
    },
    {
      path:'/dailyAnalysis',
      name:'dailyAnalysis',
      component:dailyAnalysis
    },
    {
      path:'/physicalExam',
      name:'physicalExam',
      component:physicalExam
    },
    {
      path:'/workAnalysis',
      name:'workAnalysis',
      component:workAnalysis
    },

    {
      path: '/healthWarning',
      name: 'healthWarning',
      component:healthWarning
    },

    {
      path: '/logs',
      name: 'logs',
      component: logs

    },

    {
      path: '/newUser',
      name: 'newUser',
      component: newUser

    },

    {
      path:'/task',
      name:'task',
      component:()=>import('@/pages/test/task')
    }
  ]
})
