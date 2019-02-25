<template>
  <div>
    <button @click="startgoogle()">start recherche</button>
    <button @click="start2()">contenu recherche</button>
    <button @click="start3()">reload recherche</button>
    <button @click="start4()">reload url</button>

    <button @click="reset()">
      {{ loadingencour }}/{{ loading2 }} {{ lancementbrowser }}
    </button>
    <div id="myProgress">
      <div id="myBar"></div>
    </div>
    <div class="pageContact">
      <div class="message1">
        <textarea
          class="large"
          v-model="message"
          type="text"
          autocomplete="on"
          placeholder="message"
          required
        />
      </div>

      <div class="name">
        <input
          v-model="choix"
          id="idname"
          type="text"
          placeholder="Nom"
          required
        />
      </div>
    </div>

    <div v-if="visibl" class="vue-test" id="vue-posts">
      <h1>Vue Test</h1>
      <ul v-for="item in posts" :key="item.site">
        <li>
          <p>{{ item }}</p>

          <hr />
        </li>
      </ul>
    </div>
    <div v-if="visibl2" class="vue-test" id="vue-posts">
      <h1>Vue Test</h1>
      <ul v-for="item in textdiv" :key="item.site">
        <li v-text="item.site"></li>
        <p v-for="option in item.text1" :key="option">{{ option }}</p>

        <hr />
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: "HelloWorld",

  data() {
    return {
      visibl: false,
      message: "blog+codeur+développeur",

      visibl2: false,
      a: 1,
      posts: [],
      textdiv: [],
      urlexclu: [],
      errors: [],
      info: "bonjour",
      isConnected: false,
      socketMessage: "",
      loadingencour: 0,
      loading2: 30,
      loadinggoogle: 0,
      lancementbrowser: 0,
      monjson: "",
      monjson2: "",
      choix: "blog code développeur art création parfait bon"
    };
  },

  sockets: {
    connect() {
      // Fired when the socket connects.
      this.isConnected = true;
    },

    disconnect() {
      this.isConnected = false;
    },
    messagetext(dmes) {
      this.textdiv = dmes;
    },
    googlesearch(dmes) {
      this.visibl = true;
      this.visibl2 = false;
      this.convert(dmes);
    },

    loadingencour(dmes) {
      this.loadingencour = dmes;
    },
    loadinggoogle(dmes) {
      this.loadinggoogle = dmes;
      var elem = document.getElementById("myBar");
      var width = (this.loadinggoogle / 20) * 100;
      elem.style.width = width + "%";
    },
    browserfermer(dmes) {
      this.lancementbrowser++;

      var elem = document.getElementById("myBar");
      var width = (this.loadingencour / this.loading2) * 100;
      elem.style.width = width + "%";
    }
  },
  mounted() {
    localStorage.clear();
    if (localStorage.getItem("posts"))
      this.posts = JSON.parse(localStorage.getItem("posts"));
    if (localStorage.getItem("choix"))
      this.choix = JSON.parse(localStorage.getItem("choix"));
    if (localStorage.message) {
      this.message = localStorage.message;
    }
    if (localStorage.getItem("lancementbrowser"))
      this.lancementbrowser = JSON.parse(
        localStorage.getItem("lancementbrowser")
      );
    if (localStorage.loadingencour) {
      this.loadingencour = localStorage.loadingencour;
    }

    if (localStorage.getItem("loading2"))
      this.loading2 = JSON.parse(localStorage.getItem("loading2"));
  },
  watch: {
    posts: {
      message(newmessage) {
        localStorage.message = newmessage;
      },
      loading(newloading) {
        localStorage.loadingencour = newloading;
      },
      handler() {
        localStorage.setItem("posts", JSON.stringify(this.posts));
        localStorage.setItem("choix", JSON.stringify(this.choix));

        localStorage.setItem(
          "lancementbrowser",
          JSON.stringify(this.lancementbrowser)
        );

        localStorage.setItem("loading2", JSON.stringify(this.loading2));
      },
      deep: true
    }
  },
  methods: {
    convert(vm) {
      for (var i = 0; i < vm.length; i++) {
        this.posts.push(vm[i]);
      }
    },
    convertjson(vm) {
      this.textdiv = [];
      for (var i = 0; i < vm.length; i++) {
        this.textdiv.push(vm[i]);
      }
    },
    convertexclujson(vm) {
      this.visibl = true;
      this.visibl2 = false;
      this.posts = [];
      for (var i = 0; i < vm.length; i++) {
        this.posts.push(vm[i]);
      }
    },
    startgoogle() {
      this.visibl = true;
      this.visibl2 = false;

      /*url3='https://www.lafabriquedunet.fr/blog/cout-creation-site-internet/'*/
      this.$socket.emit(
        "lancerecherche2",
        "https://duckduckgo.com/",
        this.message
      );
    },
    start2() {
      this.visibl = false;
      this.visibl2 = true;

      /*url3='https://www.lafabriquedunet.fr/blog/cout-creation-site-internet/'*/
      this.$socket.emit(
        "lancerecherche",
        this.posts,
        this.choix,
        this.loading2
      );
    },
    start3() {
      this.monjson = require("/home/specialjcg/site web/scrapperso/sitesurmesure.json");
      this.convertjson(this.monjson); // this will show the info it in firebug console
      this.visibl = false;
      this.visibl2 = true;
    },
    start4() {
      this.monjson1 = require("/home/specialjcg/site web/scrapperso/sitedoublon.json");
      this.convertexclujson(this.monjson1); // this will show the info it in firebug console
    },
    reset() {
      this.visibl = true;
      this.visibl2 = false;
      this.posts = [];
      this.$socket.emit("lanceconnect2");
      this.$socket.emit("lanceconnect");
    }
  }
};
// Fetches posts when the component is created.
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
#myProgress {
  width: 100%;
  background-color: grey;
}

#myBar {
  width: 1%;
  height: 30px;
  background-color: green;
  color: #404040;
  font-size: 1em;
  font-weight: 800;
}

.pageContact {
  position: relative;
  display: flex;
  justify-content: flex-start;
  align-content: center;
  align-items: center;
  flex-direction: row;
  flex-wrap: wrap;
  top: 0vh;
  left: 28vw;
  width: 42vw;
}
textarea {
  width: 41vw;
  color: #007100;
  outline: none;
  padding-left: 1vw;
  font-size: 1em;
  font-family: "Lato", sans-serif;
  font-weight: 400;
  line-height: 1.45;
  background: transparent;
  border: #007100;
  text-align: left;
  height: 20vh;
}
input {
  width: 41vw;
  color: #007100;
  outline: none;
  padding-left: 1vw;
  font-size: 1em;
  font-family: "Lato", sans-serif;
  font-weight: 400;
  line-height: 1.45;
  background: transparent;
  border: black;
  text-align: left;
  height: 5vh;
}
.message1 {
  border-radius: 4px;
  min-width: 41vw;
  align-self: auto;
  flex: 0 1 auto;
  height: 25vh;
  border: 1px solid #ccc;
  font-family: "Lato", sans-serif;
  background-color: #d6f49d;
}

.name {
  margin-bottom: 2vh;
  font-family: "Lato", sans-serif;
  border-radius: 4px;
  min-width: 42vw;
  align-self: auto;
  flex: 0 1 auto;
  height: 8vh;
  top: 15vh;
  left: 28vw;
  width: 42vw;

  border: 1px solid #ccc;

  background-color: #d6f49d;

  border-radius: 4px;
  text-align: left;
}
.vue-test {
  margin: 20px auto;
  width: 800px;
  background: #f2f2f2;
  padding: 20px;
  box-sizing: border-box;
  font-family: "Lato", sans-serif;
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
    text-align: left;
    li {
      h1 {
        font-size: 1.8em;
        font-weight: 400;
        text-align: left;
        font-size: 1.8em;
        margin: 0;
        padding: 0;
        color: #505050;
        border-bottom: none;
      }
      p {
        font-weight: 300;
        font-size: 1em;
        line-height: 1em;
        text-align: left;
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
