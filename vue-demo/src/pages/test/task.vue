<template xmlns:el-col="http://www.w3.org/1999/html">
  <el-container>
<el-header style="background-color: #97a8be; position: center; text-align: center; padding-top: 15px; font-weight: bold;">X-Y 实时显示测试</el-header>
   <el-row :gutter="35" style="margin-top: 100px">

     <el-col :span="12">
       <el-card  shadow="hover" style="height: 350px; padding-left: 100px">

       <div id="myChart" style="width: 400px; height: 300px;
padding-top: 25px;
padding-left: 60px;
/*background-color: #f56c6c;*/
"></div>

       </el-card>
     </el-col>

     <el-col :span="12">
       <el-card shadow="hover" style="height: 350px; padding-left: 100px">


           <el-table
             :data="tableData"
             max-height="300"
             style="width: 100%; float: right; padding-right: 100px"
          >
             <el-table-column
               prop="date"
               label="日期"
               width="140">
             </el-table-column>

             <el-table-column
               prop="x"
               label="X"
               width="120">
             </el-table-column>
             <el-table-column
               prop="y"
               label="Y"
               width="120">
             </el-table-column>
             <el-table-column
               label="操作"
               width="100">
               <template slot-scope="scope">
                 <el-button
                   @click.native.prevent="deleteRow(scope.$index, tableData)"
                   type="text"
                   size="small">
                   移除
                 </el-button>
               </template>
             </el-table-column>
           </el-table>
<!--         </div>-->

       </el-card>
     </el-col>

   </el-row>

    <el-row style="margin-top: 100px">
      <el-col>
        <el-input
          id="idX"
          placeholder="请输入坐标X"
          v-model="input"
          clearable
          style="float: left; width:160px; padding-left: 500px"
        >
        </el-input>

        <el-input
          id="idY"
          placeholder="请输入坐标Y"
          v-model="input2"
          clearable
          style="float: right; width:160px; padding-right: 500px"
        >
        </el-input>

      </el-col>
    </el-row>

    <el-row style="margin-top: 50px; position: center; text-align: center;">
      <el-col>

        <el-button @click="submit" style="background-color: darkcyan; color: #f5f7fa">提 交</el-button>

      </el-col>
    </el-row>



</el-container>
</template>

<script>

    export default {
        data(){
        return{
          XX:[],
          YY:[],
          message:"",
          input:"",
          input2:"",
          tableData:[
          ]
      }
        },
      mounted(){
       this.drawline();
      },
      methods:{
        deleteRow(index, rows) {
          rows.splice(index, 1);
        },
        submit(){
          const thisTime=new Date();
          const Time=(thisTime.getMonth()+1).toString()
            +'-'+thisTime.getDate().toString()+" "+(thisTime.getHours()).toString()
            +':'+(thisTime.getMinutes()+1).toString()+":"+(thisTime.getSeconds()+1).toString();

          const XXX=document.getElementById('idX').value;
          const YYY=document.getElementById('idY').value;

          const params=new URLSearchParams();
          params.append("Date",Time);
          params.append("x",XXX);
          params.append("y",YYY);
          //

          this.$axios.post("/xyCommit5",params).then(
            (response)=>{
              if(response.status==200){
                console.log("连接正常");

              const X1=response.data.x;
              const Y1=response.data.y;
              const date1=response.data.date;//与totring里面的对应？？
                console.log(response)
                this.XX.unshift(parseInt(X1));
                this.YY.unshift(parseInt(Y1));
                this.drawline();
                // this.tableData.appendArrow({date:'2',x:'4',y:'5'});
                this.tableData.unshift({date:date1,x:X1,y:Y1});
                //
                alert("提交成功！！");
              }else{
                console.log("连接失败")
              }

            }
          )

          //
          // this.XX.unshift(parseInt(XXX));
          // this.YY.unshift(parseInt(YYY));
          // this.drawline();
          // // this.tableData.appendArrow({date:'2',x:'4',y:'5'});
          // this.tableData.unshift({date:Time,x:XXX,y:YYY});
          // alert("提交成功！！");
       // console.log(this.XX);
       //    console.log(this.YY);
        },
       drawline(){
         console.log("draw"+this.XX);
         console.log("draw"+this.YY);

         var myChart = this.$echarts.init(document.getElementById('myChart'));

         // 指定图表的配置项和数据
         var option = {
           title: {
             text: 'X-Y 统计图'
           },
           tooltip: {},
           legend: {
             data:['x-y']
           },
           xAxis: {
             data: this.XX,
           },
           yAxis: {},
           series: [{
             name: '销量',
             type: 'scatter',
             data: this.YY,
           }]
         };

         // 使用刚指定的配置项和数据显示图表。
         myChart.setOption(option);

       }

      }
    }
</script>

<style scoped>

</style>
