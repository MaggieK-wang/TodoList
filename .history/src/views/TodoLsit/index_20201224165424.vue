<template>
  <div class="Todo">
    <div class="Todo-all">
    <div class="Todo-head">
      <h1>TodoList</h1>
    </div>
    <div class="Todo-input">
      <el-input v-model="newTodo" @change="add" placeholder="今日TODO"/>
      <!-- <el-button @click="add" size="mini">添加TODO</el-button> -->
    </div>
     <div class="Todo-list-all">
         <el-checkbox-group 
          v-model="checkbox">
          <el-checkbox 
          :value="item.id"
          v-for="(item,index) in filteredTodoList"
           @change="checkboxed(item)" 
          :class="{'change-color': item.task_status==='1'}" 
          :label="item.task_Name" :key="item.id">
         <label> {{item.task_Name}}</label>
         <div class="btn">
          <i class="el-icon-close" @click="del(item.id)" disabled="fasle" title="删除计划"/>
          <i class="el-icon-check" @click="completeSinge(item)" disabled="fasle" title="完成计划"  />
          </div>
           </el-checkbox>
         </el-checkbox-group>
      </div>
    </div>
        <!-- footer -->

        <ul class="Todo-statution">
        <el-button @click="complete"><span>选中完成</span></el-button>
        <li v-for="(val, key) in filters">
          <el-button
            :class="{ selected: visibility === key }"
            @click="visibility = key">{{ key}}</el-button>
        </li>
      </ul>
    <!-- <div class="Todo-statution" v-for="(val, key) in filters">
      <el-button @click="complete" type="success" size="mini"><span>全部完成</span></el-button>
      <el-button @click="filters.all" size="mini"><span>全部</span></el-button>
      <el-button @click="filters.active" type="warning" size="mini"><span>待完成</span></el-button>
      <el-button @click="filters.completed" type="success"size="mini"><span>已完成</span></el-button>
    </div> -->
  </div>
</template>

<script>
import {getList,deleteTodo } from "@/api";
import { mapActions,mapState,mapGetters } from 'vuex';
export default {
data(){
  return{
    newTodo:'',
    disabled:false,
    isActive:false,
    checkbox:[],
    arr:[],
    TodoList:[],
    visibility: '全部',
    filters:{
      '全部': todo => todo,
      '待完成': todo => todo.filter(todo => (todo.task_status=='0')),
      '已完成': todo=> todo.filter(todo => (todo.task_status=='1'))
    },
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
    todo(){
      return this.$store.state.TodoList;
    },
    filteredTodoList(){
      return this.filters[this.visibility](this.TodoList)
      console.log(this.filters[this.visibility](this.TodoList),'hh');
    },
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
// 获取点中
 checkboxed(status){
   
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

},
}
</script>

<style lang="scss" scoped>
.Todo{
  padding: 20px;
  width: 100%;
  height: 100vh;
  font-weight:400 !important;
  box-sizing: border-box;
  margin: auto;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background: rgba(243, 197, 197, 0.3);
  &-input{
    display: flex;
    .el-button{
      margin-left: 5px;
    }
  }
  &-list-all{
    // font-size: 18px;
    display: flex;
    height: 80vh;
    overflow: auto;
    .el-checkbox-group{
    display: flex;
    flex-direction: column;
    width: 100%;
    .el-checkbox{
      margin: 10px;
      display: flex;
      justify-content: flex-start;
      /deep/.el-checkbox__label{
       font-size: 1rem;
      display: flex;
      width: 100%;
      justify-content: space-between;
      }
     i{
      //  margin: 0 10px;
      margin-right:10px ;
        &:hover{
          color: red;
        }
     }
    }
    }
  }
  &-statution{
    display: flex;
    justify-content: space-around;
  }
}
.change-color{
  color: red;
  text-decoration:line-through;
}
// 滚动条样式
    ::-webkit-scrollbar {
      /*滚动条整体样式*/
      width: 8px;
      height: 8px;
    }

    ::-webkit-scrollbar-thumb {
      /*滚动条里面小方块*/
      border-radius: 8px;
      background: rgba(144, 147, 153, .5)
    }

    ::-webkit-scrollbar-track {
      /*滚动条里面轨道*/
      border-radius: 8px;
      background: #ededed;
    }
</style>