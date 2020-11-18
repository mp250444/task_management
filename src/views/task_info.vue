<template>
 <v-container>

  <v-tabs class="aligner"  v-model="tab" centered show-arrows slider-color="#55b949" slider-size="4">
   <v-tab v-for="item in items" :key="item.tab" @click="activeTab(item.id)" >{{ item.tab }}</v-tab>
  </v-tabs>

   <v-tabs-items v-model="tab" class="aligner">
     <v-tab-item v-for="item in items" :key="item.tab">
       <v-row >
         <v-col>
        <v-card width="500" v-for="(task, index) in currentTabArray" :key="task.id" style="margin-bottom:50px">
          <v-card-title >{{task.title}}</v-card-title>
          <v-card-text style="text-align:left">{{task.desc}}
          </v-card-text>
          <v-card-text>
              <v-checkbox  v-model="completedArray" ripple label="Completed" :value="task.title" class="alignTxt1" color="#55b949" ></v-checkbox>
             <span v-if="task.time !==null" class="alignTxt"> Due date: {{task.date}}</span>
          </v-card-text>
       
        <v-row>
     <v-col style="margin-top:20px">
       <v-btn small class="editBtn" @click='editTask' outlined color="#55b949">Edit</v-btn>
       <v-btn small class="deleteBtn"  @click='deleteTask(task, index)' outlined color="#55b949">Delete</v-btn>
     </v-col>
   </v-row>
        </v-card>
      
        </v-col>
           </v-row>
     </v-tab-item>
   </v-tabs-items>

  

  </v-container>
</template>

<script>
 import { eventBus } from '../main';


export default {


   data() {
     return {

       items:[
         {tab:'all tasks',id:0},
         {tab:'pending tasks',id:1},
         {tab:'completed tasks',id:2},
         {tab:'overdue tasks', id:3}
       ],
        
        all_tasks_array:JSON.parse(localStorage.getItem("all")) || [],
        pending_tasks_array: [],
        completed_tasks_array:[],
        overdue_tasks_array:[],
        tab:null,
        completedArray:[],
        currentTabArray:[],
        currentActiveTab:0,
        taskIsCreated:false,
        tempArray:[],
        deletionObject:{},   

     }
   },

   mounted () {
   
    this.activeTab(0) 
    eventBus.$on('anyNewValues', (data)=> {
        this.taskIsCreated = data;
    });
   
     eventBus.$on('anyNewValues1', (data)=> {
         this.tempArray = data;
            this.initiate();
    });

   },

    beforeDestroy(){
        eventBus.$off('anyNewValues', this.listener)
        eventBus.$off('anyNewValues1', this.listener)
    },

   methods: {
     
     initiate() {
 
          if(this.all_tasks_array.length ==0) this.all_tasks_array = this.tempArray;
          else this.all_tasks_array = [...this.all_tasks_array,...this.tempArray];
    
          this.manageTasks();
          this.setLocalStorage();
     },

    
    deleteTask(clickedTask, idx) {
        // localStorage.clear();
     console.log(this.all_tasks_array)
     this.deletionObject[clickedTask.id] = clickedTask;
     console.log(this.deletionObject)
     console.log(clickedTask)
     console.log(idx)
    },


    editTask(){

    },

     activeTab(id) {
         this.currentActiveTab = id;
         
         switch(id) {
           case 0:

             //should run update method and then set storage method 
           this.all_tasks_array = JSON.parse(localStorage.getItem("all"));
           this.currentTabArray = this.all_tasks_array; 
           if(Object.keys(this.deletionObject).length !== 0) this.updateTasks(); 
            break;
          case 1:
            this.pending_tasks_array = JSON.parse(localStorage.getItem("pending"));
            this.currentTabArray = this.pending_tasks_array;
            break;
          case 2:
          this.currentTabArray = this.completed_tasks_array;
            break;
          case 3:
            this.overdue_tasks_array = JSON.parse(localStorage.getItem("overdue"));
            this.currentTabArray = this.overdue_tasks_array;
            break;

          default:
         
          
         }
        
      },

      manageTasks() {
        let today = new Date().toISOString().slice(0, 10)
        let currentItem = null;
        for(let i = 0; i < this.all_tasks_array.length;i++) {
          currentItem = this.all_tasks_array[i];

           if(currentItem.date >= today) {
             this.pending_tasks_array.push(currentItem)
           }
           else {
             this.overdue_tasks_array.push(currentItem);
           }
          
        }

        this.setLocalStorage();
      },

      updateTasks() {
         console.log(this.deletionObject)
      },

  
      setLocalStorage() {
        localStorage.setItem('all', JSON.stringify(this.all_tasks_array));
        localStorage.setItem('pending', JSON.stringify(this.pending_tasks_array))
        localStorage.setItem('overdue', JSON.stringify(this.overdue_tasks_array))
      }

   },


}
</script>

<style>
.aligner {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top:50px;
}

.alignTxt {
  float: right;
  font-size: 16px;
}

.alignTxt1 {
  float: left;
  margin-top: -4px !important;
}

.editBtn {
  margin-right: 20px;
  transition: all 0.2s ease-in-out;}
.deleteBtn {
  margin-right: -60px;
transition: all 0.2s ease-in-out;
}
.editBtn:hover {
  color:white !important;
  background-color:#55b949 !important;
}
.deleteBtn:hover {
  color:white !important;
  background-color:#55b949 !important;
}


</style>
