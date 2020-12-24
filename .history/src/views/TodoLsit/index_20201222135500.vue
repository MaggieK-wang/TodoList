<template>
  <div class="Todo">
    <div class="Todo-input">
      <el-input v-model="newTodo"><span>添加TODO</span></el-input>
      <div class="Todo-input_list">
        <ul v-for="item in TodoList" :key="item.id">
          <li>{{item.name}}</li>
        </ul>
      </div>
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
TodoList:[
  {id:1,name:'写作业'},
  {id:2,name:'写作业'}
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
  all(){},
  wait(){},
  complete(){},
}
}
</script>

<style>

</style>