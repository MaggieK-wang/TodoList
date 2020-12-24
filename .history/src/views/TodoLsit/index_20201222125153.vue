<template>
  <div class="page">
    <div class="page-input">
      <el-input v-model="newTodo"><span>添加TODO</span></el-input>
      <div class="Todo-list">
        <ul>
          <li>{{item.name}}</li>
        </ul>
      </div>
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
  {id:1,name:'写作业'}
]
  }
},
  async mounted(){
  // async getList(){
    //  const res=await getList()
    //  console.warn(res);
  // }
}
}
</script>

<style>

</style>