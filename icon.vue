<template>
  <div
    v-bind:style="{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', backgroundColor: data.backgroundColor }"
  >
    <input v-model="name" placeholder="edit me">
    <a v-on:click="generate">generate</a>
    <h2>Icon Vue:</h2>

    <div
      v-for="(item,key) in data.items"
      :key="key"
      v-bind:style="{display: 'flex', flexDirection: 'row'}"
    >
      <div
        v-for="(i,ikey) in item"
        :key="ikey"
        v-bind:style="{ backgroundColor: i == 1 ? `#${data.firstColor}` : `#${data.secondColor}`, width: '80px', height: '80px', borderRadius: 0 }"
      ></div>
    </div>
  </div>
</template>

<script>
import algorithm from "./algorithm";

export default {
  name: "icon",
  data() {
    return {
      data: {
        items: [],
        firstColor: "fff",
        secondColor: "#fff",
        backgroundColor: "#fff"
      },
      name: ""
    };
  },
  methods: {
    generate() {
      const { name } = this;
      this.data = {
        ...this.data,
        ...algorithm(name)
      };
    }
  }
};
</script>


<style>
.div-main {
  display: "flex";
  justify-content: "center";
  align-items: "center";
  flex-direction: "column";
}
</style>