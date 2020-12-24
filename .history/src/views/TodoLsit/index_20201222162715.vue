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
          @change="checkboxed(item.name)" 
          :class="{'change-color': isActive}" 
          v-for="(item,index) in TodoList" 
          :label="item.name" :key="item.id">
          <span>{{item.name}}</span></el-checkbox>
         </el-checkbox-group>
      </div>
    <div class="Todo-statution">
      <el-button @click="complete" type="success"><span>完成</span></el-button>
      <el-button @click="del" type="success"><span>删除</span></el-button>
      <el-button @click="all" type="primary"><span>全部</span></el-button>
      <el-button @click="wait" type="warning"><span>待完成</span></el-button>
      <el-button @click="completed" type="success"><span>已完成</span></el-button>
    </div>
  </div>
</template>

<script>
import {getList } from "@/api";
export default {
data(){
  return{
    newTodo:'',
    disabled:false,
    isActive:false,
    checkbox:[],
    TodoList:[
      {id:1,name:'写作业'},
      {id:2,name:'做计划'}
    ]
  }
},
mounted(){},
methods:{
  // 添加TODO
  add(){
    if(this.newTodo!==''){
      this.TodoList.push({id:this.TodoList.length+1,name:this.newTodo});
      this.newTodo='';
      console.log(this.TodoList);
    };
  },
  // 删除计划
  del(){
    if(this.checkbox){
      console.log(this.checkbox,'this.checkbox');
      console.log(this.checkbox.length,'this.checkbox.length');
      this.checkbox.forEach(v=>{
        this.TodoList.splice(v,this.checkbox.length);
      });
       this.checkbox=[];
    }
  },
  // 全部计划
  all(){
    
  },
// 
checkboxed(index){
  console.log(this.checkbox);
},
  // 待完成
  wait(){},
  // 完成
  complete(){
    this.checkbox.forEach(v=>{
    if(v){
      this.isActive=true;
    }
    else this.isActive=false;
    });
    this.checkbox=[];
  },
  // 已完成
  completed(){},
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
  // display: flex;
  // font-display: column;
  // justify-content:space-around;
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