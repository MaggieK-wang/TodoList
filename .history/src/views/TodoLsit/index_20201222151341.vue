<template>
  <div class="Todo">
    <div class="Todo-input">
      <el-input v-model="newTodo" @keyup.enter="add" />
      <el-button @click="add">添加TODO</el-button>
    </div>
     <div class="Todo-list">
         <el-checkbox-group 
          v-model="checkbox">
          <el-checkbox :value="checkboxed" v-for="item in TodoList" :label="item.name" :key="item.id" :class="changeStyle" @change="checkboxed"><span>{{item.name}}</span></el-checkbox>
         </el-checkbox-group>
        </ul>
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
    checkbox:[],
    checkboxed:false,
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
    };
  },
  // 删除计划
  del(){
    if(this.checkbox){
       this.TodoList.splice(1);
    }
  },
  // 全部计划
  all(){
    
  },
  checkboxed(){


  },
  // 待完成
  wait(){},
  // 完成
  complete(){
    if(this.checkbox){
      document.getElementsByTagName('el-checkbox').color='red';
    }
  },
  // 已完成
  completed(){},
  // 样式改变
  changeStyle(){
    if(this.checkboxed){
      return 'change-color';
    }
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
    }
    }
  }
  &-statution{
    display: flex;
  }
}
.change-color{
  color: red;
}
</style>