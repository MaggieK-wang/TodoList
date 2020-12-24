<template>
  <div class="Todo">
    <div class="Todo-input">
      <el-input v-model="newTodo" @keyup.enter="add" />
      <el-button @click="add">添加TODO</el-button>
    </div>
     <div class="Todo-list">
         <el-checkbox-group 
          v-model="value">
          <el-checkbox v-for="item in TodoList" :label="item.name" :key="item.id">{{item.name}}</el-checkbox>
         </el-checkbox-group>
        </ul>
      </div>
    <div class="Todo-statution">
      <el-button @click="all" type="primary"><span>全部</span></el-button>
      <el-button @click="wait" type="warning"><span>待完成</span></el-button>
      <el-button @click="complete" type="success"><span>已完成</span></el-button>
    </div>
  </div>
</template>

<script>
import {getList } from "@/api";
export default {
data(){
  return{
newTodo:'',
value:[],
TodoList:[
  {id:1,name:'写作业'},
  {id:2,name:'做计划'}
]
  }
},
mounted(){
  // async getList(){
    //  const res=await getList()
    //  console.warn(res);
  // }
},
methods:{
      add(){
        var TodoList =  this.TodoList;
        var id = this.list.length + 1//因为已完成中的每一项 并不是 已完成的每一项的索引 ，所以手动添加 id，来获取id所对应的独一无二的数据
//         this.list.unshift({id:id,title:task,done:false,del:false}); //在数组头添加  done:false 为未打钩 del:false 为未删除
//         this.TodoList = ""
    },
  all(){},
  wait(){},
  complete(){},
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
    }
  }
  &-statution{
    display: flex;
  }
}
</style>