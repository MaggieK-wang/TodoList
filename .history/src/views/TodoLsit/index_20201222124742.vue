<template>
  <div class="page">
    <div class="page-input">
      <el-input v-model="newTodo"></el-input>
    </div>
  </div>
</template>

<script>
import {getList } from "@/api";
export default {
data(){
  return{
newTodo:'';
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