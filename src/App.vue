<template>
  <div id="app">
     <toolbarItem></toolbarItem>
     <router-view :some-value-to-pass="localValue" :btn-clicked-value="changeInfo"></router-view> 
    
  </div>
</template>
  
<script>
import toolbarItem from '@/components/toolbarItem.vue';
import { eventBus } from './main';

export default {
  components: {
    'toolbarItem':toolbarItem,
  },
  data() {
    return {
      localValue:[],
      changeInfo:false,
    }
  },

  created () {

   
    eventBus.$on('task_information', (data)=> {
      
       this.localValue.push(data);
      //  console.log(this.localValue)
       
    });

      eventBus.$on('isClicked', (data)=> {
      
       this.changeInfo = data;
       console.log(this.changeInfo)
       
    });

    
  },
  
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>