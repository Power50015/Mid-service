<template>
  <div class="column is-3">
    <div
      :style="{
        'background-image': 'url(' + getImageUrl(props.imgData) + ')',
      }"
      style="background-size: cover;"
    >
      <div class="overlay"></div>
      <div class="content flex">
        <div class="data-container">
          <h3 class="has-text-white">{{ props.title }}</h3>
          <h3 class="has-text-white">{{ props.count }}</h3>
        </div>
        <div class="btn-container">
          <button class="button is-link" @click="increase">+</button>
          <button class="button is-danger" @click="decrease">-</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useAuthStore } from "@/stores/auth";
const AuthData = useAuthStore();
const props = defineProps({
  field: { type: String, required: true },
  title: { type: String, required: true },
  count: [Number, String],
  colorClass: String,
  imgData: String,
});

const getImageUrl = (name) => {
  return new URL(`../assets/${name}`, import.meta.url).href;
};

function increase() {
  const number = Number(props.count) + 1;
  var myobj = JSON.parse('{ "' + props.field + '":' + number + "}");
  console.log(myobj);

  AuthData.editData(myobj);
  // alert("تم الإضافه")
}
function decrease() {
  if (Number(props.count) > 0) {
    const number = Number(props.count) - 1;
    var myobj = JSON.parse('{ "' + props.field + '":' + number + "}");
    AuthData.editData(myobj);
    // alert("تم الإنقاص")
  }
}
</script>

<style scoped>
.flex {
  height: 120px;
  padding: 15px;
  border-radius: 5px;
  
}
.content {
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  background-color: #eeeeeeb8;
}
h3 {
  text-align: center;
  font-size: larger;
  font-weight: bold;
  color: #000 !important;
}
.flex {
  display: flex;
  flex-direction: row-reverse;
  justify-content: space-around;
}
.data-container {
  width: 70%;
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.btn-container {
  display: flex;
  width: 30%;
  flex-direction: column;
  justify-content: space-between;
}
.button {
  border: 1px solid #fff;
}
</style>
