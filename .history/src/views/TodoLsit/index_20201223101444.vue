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
          <span>{{item.task_Name}}</span></el-checkbox>
         </el-checkbox-group>
      </div>
    <div class="Todo-statution" >
      <el-button @click="complete" type="success"><span>完成</span></el-button>
      <el-button @click="del" type="success"><span>删除</span></el-button>
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
  // 删除计划
  del(){
    if(this.checkbox){
      // console.log(this.checkbox,'this.checkbox');
      // console.log(this.checkbox.length,'this.checkbox.length');
      this.checkbox.forEach(v=>{
        this.TodoList.splice(v,this.checkbox.length);
      });
       this.checkbox=[];
    }
  },
  // 全部计划
  all(){
    this.getList();
  },
// 
checkboxed(status){
  console.log(status,'status');
  console.log(this.checkbox,'this.checkbox');
},
  // 待完成
  wait(){},
  // 完成
  complete(){
    console.log(this.checkbox);
    // if(this.checkbox)
  },
  // 已完成
  completed(){
    if(this.checkbox){
      
    }
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