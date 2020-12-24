<template>
  <div class="Todo">
    <div class="Todo-input">
      <el-input v-model="newTodo" @keyup.enter="add" />
      <el-button @click="add">添加TODO</el-button>
    </div>
     <div class="Todo-list">
         <el-checkbox-group 
          v-model="checkbox">
          <el-checkbox v-for="item in TodoList" :label="item.name" :key="item.id">{{item.name}}</el-checkbox>
         </el-checkbox-group>
        </ul>
      </div>
    <div class="Todo-statution">
      <el-button @click="complete" type="success"><span>完成</span></el-button>
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
    checkbox:[],
    TodoList:[
      {id:1,name:'写作业'},
      {id:2,name:'做计划'}
    ]
  }
},
mounted(){},
methods:{
  add(){
    if(this.newTodo!==''){
      this.TodoList.push({id:this.TodoList.length+1,name:this.newTodo});
      this.newTodo='';
    };
  },
  all(){
    
  },
  wait(){},
  complete(){
    if(this.checkbox){
      document.getElementsByTagName('el-checkbox').color='red';
    }
  },
  completed(){},
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
    }
    }
  }
  &-statution{
    display: flex;
  }
}
</style>