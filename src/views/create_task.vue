<template>
<v-container>
   <v-row class="Aligner">
       <v-col cols=4>
            <h1>Create a task</h1>
       </v-col>
   </v-row>

    <v-row  class="Aligner ">
       <v-col cols=12 sm=8 md=4>
           <v-text-field
               v-model="task_title"
               clearable
               counter="80"
               label="Enter Task Title"
               filled
               color="#55b949"
           ></v-text-field>
       </v-col>
   </v-row>

    <v-row class="Aligner addMargin">
       <v-col cols=12 sm=8 md=4>
          <v-textarea
          v-model='task_description'
               clearable
               counter="1000"
               label="Enter Task Description"
               filled
               color="#55b949"
           ></v-textarea>
       </v-col>
   </v-row>
   
    <v-row class="Aligner addMargin">
       <v-col cols=8 sm=6 md=4 xl=2>
            <h3 align="left" class="paddingForTitle">Enter date for task completion (optional)</h3>
            <v-date-picker scrollable v-model="picker" color="#55b949"></v-date-picker>
       </v-col>
   </v-row>

   <v-row class="Aligner">
       <v-col cols=4>
           <v-btn outlined class="button2" color="#55b949" dark @click="getTaskInfo();">Create task</v-btn>
       </v-col>
       <v-col cols=4>
           <v-btn outlined  class="button1" color="#55b949" dark @click="clear_fields">Clear Fields</v-btn>
       </v-col>
       
   </v-row>

</v-container>
</template>

<script>
// import Vue from 'vue';
import { eventBus } from '../main';
    export default {
        data() {
            return {
              picker: new Date().toISOString().substr(0, 10),
              task_title:'',
              task_description:'',
              clicked:false,
              
              
            }
        },

        methods: {

           
          
            getTaskInfo() {
              let d = new Date();
              let id = d.getTime(); 

              let task_info_object = {};
              task_info_object.title = this.task_title;
              task_info_object.desc = this.task_description;
              task_info_object.date = this.picker;
              task_info_object.id = id; 
            
              eventBus.$emit('task_information',task_info_object);
              this.clicked = true;
              eventBus.$emit('isClicked',this.clicked);
              this.task_title = '';
              this.task_description ='';
              this.picker =new Date().toISOString().substr(0, 10);
              this.clicked = false;
             
            },

            clear_fields () {
              this.task_title = '';
              this.task_description ='';
              
            },

        },

      
    }
</script>

<style>
.Aligner {
  display: flex;
  align-items:center;
  justify-content:center;
}
.button1 {
  float:left;
  transition: all 0.2s ease-in-out;}
.button2 {
float:right;
transition: all 0.2s ease-in-out;
}
.button2:hover {
  color:white !important;
  background-color:#55b949 !important;
}
.button1:hover {
  color:white !important;
  background-color:#55b949 !important;
}
.addMargin {
  margin-top:-20px !important;
}
.paddingForTitle {
  padding-bottom:30px;
}
</style>
