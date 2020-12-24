<template>
  <div class="Todo">
    <div class="Todo-input">
      <el-input v-model="newTodo" @keyup.enter="add" placeholder="今日TODO"/>
      <el-button @click="add">添加TODO</el-button>
    </div>
     <div class="Todo-list">
         <el-checkbox-group 
         :disabled="disabled"
          v-model="checkbox"   >
          <el-checkbox 
          :value="item.id"
          v-for="(item,index) in TodoList"
           @change="toggleAll(item.task_status)" 
          :class="{'change-color': item.task_status==='1'}" 
          :label="item.task_Name" :key="item.id">
         <label> {{item.task_Name}}</label>
          <i class="el-icon-close" @click="del(index)" disabled="fasle"/>
          <i class="el-icon-check" @click="completeSinge(item)" disabled="fasle"   />
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
      'editTodo',
      'toggleTodo',
      'removeTodo',
      'toggleAll',
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
    console.log(this.TodoList);
  },
  // 单个完成
  completeSinge(status,index){
    console.log( status.task_status);
      status.task_status='1';
  },
  // 删除
  del(index){
        console.log(this.TodoList.indexOf(index),'===');
        this.TodoList.splice(this.TodoList.indexOf(index),1);
        // this.$store.dispatch('removeTodo',index)
  },
  // 全部计划
  all(){
    // this.getList();
  },
// 获取点中
 checkboxed(status){
  console.log(status,'status');
  console.log(this.checkbox,'this.checkbox');
  if(status.task_status==='1'){
    status.task_status='0';
  }
},
  // 待完成
  wait(){},
  // 批量完成
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
  width: 300px;
  height: 100%;
  margin: auto;
  &-input{
    display: flex;
  }
  &-list{
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