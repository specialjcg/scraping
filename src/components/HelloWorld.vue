<template>
<div>
<button @click="start()">start recherche</button>
<button @click="start2()">contenu recherche</button>
<div v-if="visibl" class="vue-test" id="vue-posts">
  <h1>Vue Test</h1>
  <ul v-for="item in posts">
    <li>
      <p>{{item}}</p>
      
      <hr />
    </li>
  </ul>
</div>
<div v-if="visibl2" class="vue-test" id="vue-posts">
  <h1>Vue Test</h1>
  <ul v-for="item in textdiv">
    <li v-text="item.site"></li>
      <p v-for="option in item.text1">{{option}}</p>
      
      <hr />
   
  </ul>
</div>
{{info}}
</div>
</template>

<script>
import axios from 'axios';
const url = "https://www.googleapis.com/customsearch/v1?key=AIzaSyApYY9Rb5ZaVZbN-NxKNhLXhPcqL4VOFdo&cx=017707841406861961804:gopdwxkowac&filter=0&q=site sur mesure blog"

export default {
  name: "HelloWorld",
  
data() {
    return {
      visibl:false,
       visibl2:false,
      a:1,
      posts: [],
      textdiv:[],
      errors: [],
      info:'bonjour',
       isConnected: false,
      socketMessage: ''
    }
  },

 sockets: {
    connect() {
      // Fired when the socket connects.
      this.isConnected = true;
    },

    disconnect() {
      this.isConnected = false;
    },
message(dmes){



         this.textdiv=dmes;

}
  },
methods:{
convert(vm){
for (var i=0;i<vm.items.length;i++){
this.posts.push(vm.items[i].link);}},



 start2(){
this.visibl=false;
   this.visibl2=true;

for (var j=0;j<40;j++){
/*url3='https://www.lafabriquedunet.fr/blog/cout-creation-site-internet/'*/
this.$socket.emit('lancerecherche', this.posts[j]);
/*this.$socket.emit('lancerecherche', url3);*/
}

/*axios
      .get('/home/specialjcg/site web/scrapperso/sitesurmesure.json')
      .then(response => (this.info = response))*/


   

},
 async start() {
   this.visibl=true;
   this.visibl2=false;
 this.$socket.emit('lanceconnect');
this.posts=[];
for (var i=0 ;i<4;i++){
     var url2='';
      if (i===0){
 url2=url;


      }else{
        this.a=this.a+10
       url2=url+"&start="+this.a;}
     await axios
      .get(url2)
      .then(response => {
        this.convert( response.data)
      })
  }


 
}
  // Fetches posts when the component is created.
 
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.vue-test {
  margin: 20px auto;
  width: 800px;
  background: #f2f2f2;
  padding: 20px;
  box-sizing: border-box;
  font-family: 'Lato', sans-serif;
  h1 {
    text-transform: uppercase;
    text-align: center;
    font-size: 1.2em;
    font-weight: 900;
    padding-bottom: 20px;
    border-bottom: 2px solid #404040;
    color: #404040;
    margin-bottom: 40px;
  }
  ul {
    margin: 0;
    padding: 0;
    list-style: none;
    li {
      h1 {
        font-weight: 400;
        text-align: left;
        font-size: 1.4em;
        margin: 0;
        padding: 0;
        color: #505050;
        border-bottom: none;
      }
      p {
        font-weight: 300;
        font-size: 1em;
        line-height: 1em;
        color: #808080;
      }
    }
    hr {
      border: 0;
      height: 2px;
      background: #fff;
    }
  }
}
</style>
