<template>
  <div class="Todo">
    <div class="Todo-head">
      <h1>TodoList</h1>
    </div>
    <div class="Todo-input">
      <el-input v-model="newTodo" @change="add" placeholder="今日TODO"/>
      <el-button @click="add" size="mini">添加TODO</el-button>
    </div>
     <div class="Todo-list-all">
         <el-checkbox-group 
          v-model="checkbox">
          <el-checkbox 
          :value="item.id"
          v-for="(item,index) in TodoList"
           @change="checkboxed(item)" 
          :class="{'change-color': item.task_status==='1'}" 
          :label="item.task_Name" :key="item.id">
         <label> {{item.task_Name}}</label>
          <i class="el-icon-close" @click="del(item.id)" disabled="fasle"/>
          <i class="el-icon-check" @click="completeSinge(item)" disabled="fasle" title="完成"  />
           </el-checkbox>
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
import { mapActions,mapState } from 'vuex';
const filters = {
  all: todos => todos,
  active: todos => todos.filter(todo => !todo.done),
  completed: todos => todos.filter(todo => todo.done)
}
export default {
data(){
  return{
    newTodo:'',
    disabled:false,
    isActive:false,
    checkbox:[],
    arr:[],
    TodoList:[]
  }
},
mounted(){ 
  this.getList();
  // console.log(mapActions);
},
computed:{
  ...mapActions([
      'removeTodo',
      'addTodo',
      "changeStatus"
    ]),  
},
methods:{
  //查询数据
  /**
   * task_status 状态：0：待完成, 1:已完成
   */
  async getList(){
    const res=await getList();
    this.TodoList=res.data;
    this.$store.state.TodoList=this.TodoList;
    console.warn( this.TodoList);
  },
  // 添加TODO
  add(){
    if(this.newTodo!==''){
      this.$store.dispatch('addTodo',{id:this.TodoList.length+1,task_Name:this.newTodo,task_status:'0'});
    };
    this.newTodo='';
  },
  // 单个完成
  completeSinge(status,index){
      this.$store.dispatch('changeStatus',status);
  },
  // 删除
  del(id){
        console.log(id,'===');
        // this.TodoList.splice(this.TodoList.indexOf(index),1);
        this.$store.dispatch('removeTodo',id)
  },
  // 全部计划
  all(){
    // this.getList();
  },
// 获取点中
 checkboxed(status){
},
  // 待完成
  wait(){
    // console.log(this.TodoList,'daiban');
    // this.TodoList.filter(v=>(v.task_status='0')).map(v=>{
    //   return this.TodoList
    // })
  },
  // 批量完成
  complete(){
    console.log(this.checkbox);
      for(let i of this.checkbox){
        this.TodoList.forEach(v=>{
          if(v.task_Name===i){
             v.task_status='1';
            } 
          });
        };
        this.isActive=true;
       this.checkbox=[];
  },
  // 已完成
  completed(){
  },
}
}
</script>

<style lang="scss" scoped>
.Todo{
  padding: 10px;
  width: 300px;
  height: 100%;
  margin: auto;
  &-input{
    display: flex;
  }
  &-list-all{
    display: flex;
    .el-checkbox-group{
    display: flex;
    flex-direction: column;
    
    .el-checkbox{
      margin: 10px;
      display: flex;
      justify-content: flex-start;
     i{
      //  margin: 0 10px;
        &:hover{
          color: red;
        }
        &:first-child{
          // margin-left: 57px;
        }
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