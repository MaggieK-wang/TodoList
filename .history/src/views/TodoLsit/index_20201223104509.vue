<template>
  <div class="Todo">
    <div class="Todo-input">
      <el-input v-model="newTodo" @keyup.enter="add" />
      <el-button @click="add">添加TODO</el-button>
    </div>
     <div class="Todo-list">
         <el-checkbox-group 
         :disabled="disabled"
          v-model="checkbox">
          <el-checkbox 
          :value="item.id"
           @change="checkboxed(item)" 
          :class="{'change-color': item.task_status==='1'}" 
          v-for="(item,index) in TodoList" 
          :label="item.task_Name" :key="item.id">
          <span>{{item.task_Name}}</span>
          <el-button @click="del(index)" type="success" class="icon el-icon-close"></el-button>
           <el-button @click="completeSinge(item)" type="success"><span>完成</span></el-button></el-checkbox>
         </el-checkbox-group>
          
      </div>
    <div class="Todo-statution" >
      <el-button @click="complete" type="success"><span>完成</span></el-button>
     
      <el-button @click="all" type="primary"><span>全部</span></el-button>
      <el-button @click="wait" type="warning"><span>待完成</span></el-button>
      <el-button @click="completed" type="success"><span>已完成</span></el-button>
    </div>
  </div>
</template>

<script>
import {getList,deleteTodo } from "@/api";
export default {
data(){
  return{
    newTodo:'',
    disabled:false,
    isActive:false,
    checkbox:[],
    TodoList:[],
    arr:[],
  }
},
mounted(){ 
  this.getList();
},
methods:{
  //查询数据
  /**
   * task_status 状态：0：待完成, 1:已完成
   */
  async getList(){
    const res=await getList();
    this.TodoList=res.data;
    console.warn(this.TodoList);
  },
  // 添加TODO
  add(){
    if(this.newTodo!==''){
      this.TodoList.push({id:this.TodoList.length+1,task_Name:this.newTodo,task_status:'0'});
      this.newTodo='';
      console.log(this.TodoList);
    };
  },
  // 单个完成
  completeSinge(status){
     status.task_status==='0';
  },
  // 删除计划
  del(index){
    if(this.checkbox){
        this.TodoList.splice(index,1);
        this.checkbox=[];
    }
  },
  // 全部计划
  all(){
    // this.getList();
  },
// 
checkboxed(status){
  console.log(status,'status');
  console.log(this.checkbox,'this.checkbox');
  if(status.task_status==='1'){
    status.task_status==='0';
  }
},
  // 待完成
  wait(){},
  // 完成
  complete(){
    console.log(this.checkbox);
      for(let i of this.checkbox){
        this.TodoList.forEach(v=>{
          if(v.task_Name===i){
             v.task_status='1';
             this.disabled=true;
            } 
          });
        }
      //  this.checkbox=[];
  },
  // 已完成
  completed(){
  },
  // 样式改变
  changeStyle(){
   this.complete();
  }
}
}
</script>

<style lang="scss" scoped>
.Todo{
  padding: 10px;
  &-input{
    display: flex;
  }
  &-list{
    display: flex;
    .el-checkbox-group{
    display: flex;
    flex-direction: column;
    .el-checkbox{
      display: flex;
      justify-content: flex-start;
      span{

      }
    }
    }
  }
  &-statution{
    display: flex;
  }
}
.change-color{
  color: red;
  text-decoration:line-through;
}
</style>