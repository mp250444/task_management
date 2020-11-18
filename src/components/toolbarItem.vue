
<template>
<div>
    
      <v-toolbar dense color="#55b949" height=55>
         <v-btn icon @click.stop="sendDrawerInfo"> 
            <v-icon color="#ffffff"> mdi-menu</v-icon>
         </v-btn>
         <v-toolbar-title class="itemsColor">Logo</v-toolbar-title>
         <v-spacer></v-spacer>
         <v-btn icon> 
            <v-icon color="#ffffff"> mdi-magnify</v-icon>
         </v-btn>

         <v-btn icon> 
            <v-icon color="#ffffff"> mdi-view-grid</v-icon>
         </v-btn>

         <v-btn icon> 
            <v-icon color="#ffffff">mdi-view-sequential</v-icon>
         </v-btn>
      </v-toolbar>
       
    

  <navigationItem></navigationItem>
</div>
</template>

<script>
import { eventBus } from "../main";
import navigationItem from '@/components/navigationItem.vue';
export default {
  data() {
     return {
        openDrawer: false,     
        }
  },

  components: {
      'navigationItem':navigationItem,
  },



  methods: {
      sendDrawerInfo() {
         this.openDrawer = true;
         eventBus.$emit('drawerInfo', this.openDrawer);
     }
  },
  
}
</script>


<style scoped>
  .itemsColor {
      color:white;
  }
</style>
