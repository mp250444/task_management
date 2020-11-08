<template>
 <v-container>

  <v-tabs class="aligner"  v-model="tab" centered show-arrows slider-color="#55b949" slider-size="4">
   <v-tab v-for="item in items" :key="item.tab" @click="activeTab(item.id)">{{ item.tab }}</v-tab>
  </v-tabs>

   <v-tabs-items v-model="tab" class="aligner">
     <v-tab-item v-for="item in items" :key="item.tab">
       <v-row >
         <v-col>
        <v-card width="500" v-for="(task, index) in currentTabArray" :key="task.title" style="margin-bottom:50px">
          <v-card-title>{{task.title}}</v-card-title>
          <v-card-text style="text-align:left">{{task.desc}}
          </v-card-text>
          <v-card-text>
              <v-checkbox  v-model="completedArray" ripple label="Completed" :value="task.title" class="alignTxt1" color="#55b949" ></v-checkbox>
             <span v-if="task.time !==null" class="alignTxt"> Due date: {{task.date}}</span>
          </v-card-text>
       
        <v-row>
     <v-col style="margin-top:20px">
       <v-btn small class="editBtn" @click='editTask' outlined color="#55b949">Edit</v-btn>
       <v-btn small class="deleteBtn"  @click='deleteTask(index, item)' outlined color="#55b949">Delete</v-btn>
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


export default {

props: { 
  someValueToPass: Array,
  btnClickedValue:Boolean,
 }, 
   data() {
     return {

       items:[
         {tab:'all tasks',id:0},
         {tab:'pending tasks',id:1},
         {tab:'completed tasks',id:2},
         {tab:'overdue tasks', id:3}
       ],
        
        all_tasks_array: [],
        pending_tasks_array:[],
        completed_tasks_array:[],
        overdue_tasks_array: [],
        tab:null,
        completedArray:[],
        currentTabArray:[],
        currentActiveTab:0,

        

     }
   },

   mounted () {

   
    this.all_tasks_array = [...this.someValueToPass];
    console.log(this.all_tasks_array)
     this.pendingTasks();
     this.currentTabArray = this.all_tasks_array;
     this.pending_tasks_array.filter(this.overdueTasks);
     this.setLocalStorage();
   
   },

   methods: {

     allTasks() {
       this.all_tasks_array = this.someValueToPass.slice() || JSON.parse(localStorage.getItem("all"));
     },
     pendingTasks(){
       this.pending_tasks_array = this.someValueToPass.slice() || JSON.parse(localStorage.getItem("pending"));
     },

      
      activeTab(id) {
         this.currentActiveTab = id;
         
         switch(id) {
           case 0:
           this.all_tasks_array = JSON.parse(localStorage.getItem("all"));
           this.currentTabArray = this.all_tasks_array; 
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
          // console.log('all')
          
         }
        
      },

      editTask() {

      },

      deleteTask(index, tab) {
       let currentArray = this.selectArrayForDeletion();
           console.log(tab);
          console.log(index);
          currentArray.splice(index,1);
          // console.log(this.all_tasks_array);
           localStorage.clear();
      
      //  this.currentTabArray.filter(this.overdueTasks)
       

       
      },

      selectArrayForDeletion(){
         let result = {};
          if( this.currentActiveTab ==0) result = this.all_tasks_array;
          if( this.currentActiveTab ==1) result = this.pending_tasks_array;
          if( this.currentActiveTab ==2) result = this.completed_tasks_array;
          if( this.currentActiveTab ==3) result = this.overdue_tasks_array;
         return result;
      },

      overdueTasks(val,idx) {
       let todaysDate = new Date().toISOString().substr(0, 10);
         console.log(val)
         if(val.date < todaysDate) {
            this.overdue_tasks_array.push(val);
            this.pending_tasks_array.splice(idx,1);
            localStorage.setItem("overdue", JSON.stringify(this.overdue_tasks_array));
         }


      },
     

      setLocalStorage() {
         
        
        if(this.someValueToPass.length !== 0){
         localStorage.setItem("all", JSON.stringify(this.all_tasks_array));
         localStorage.setItem("pending", JSON.stringify(this.pending_tasks_array));
        }
        else {
          this.activeTab(0);
        }
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
