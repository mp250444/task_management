<template>
<div>

       <v-navigation-drawer v-model="drawer" temporary absolute>
           <v-list-item>
             <v-list-item-avatar height="55" width="55" class="centerAvatar">
               <v-img src="..\images\ncr.png"></v-img>
             </v-list-item-avatar>  
          </v-list-item>

          <v-divider></v-divider>

          <v-list dense>
             <v-list-item 
              v-for="item in items"
              :key="item.title"
              link
              :to="item.route"
              v-on="item.id == 2 ? { click:sendData} : {}">
            <v-list-item-icon>
                <v-icon size="26">{{item.icon}}</v-icon>
            </v-list-item-icon>

            <v-list-item-content>
                <v-list-item-title :style="{fontSize:'16px'}">{{item.title}}</v-list-item-title>
            </v-list-item-content>
             </v-list-item>  
          </v-list>

       </v-navigation-drawer>

</div>  
</template>

<script>

 import {eventBus} from '../main'
    export default {
       
        data() {
            return {
                drawer: false,
                items:[
                    {title:'Create task', icon:'mdi-playlist-plus',route:'/create_task',id:1},
                    {title:'Task information',icon:'mdi-format-list-checks',route:'/task_info',id:2}
                ],
                temp:[],
                tempClick:false,
                
            }
        },

        mounted () {
        eventBus.$on('drawerInfo', (data) => {
            this.drawer = data;
        });

          eventBus.$on('task_information', (data)=> {
         
            this.temp.push(data);
           
        });

          eventBus.$on('isClicked', (data)=> {
          this.tempClick = data;
        });
        
      
        },

        methods:{
           sendData() {
               eventBus.$emit('anyNewValues', this.tempClick)
               eventBus.$emit('anyNewValues1', this.temp)
               this.tempClick = false;
               this.temp = [];
           },
         
         
        },

        

   

    }
</script>

<style scoped>

 .centerAvatar {
    margin-left:35%;
    margin-right: auto;
 }

</style>
