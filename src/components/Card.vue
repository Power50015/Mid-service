<template>
  <div class="column is-3">
    <div
      :style="{
        'background-image': 'url(' + getImageUrl(props.imgData) + ')',
      }"
      style="background-size: cover"
    >
      <div class="overlay"></div>
      <div class="content">
        <div class="flex">
          <div class="data-container">
            <h3 class="has-text-white">{{ props.title }}</h3>
            <h3 class="has-text-white">{{ props.count }}</h3>
          </div>
          <div class="btn-container">
            <button class="button is-link" @click="increase">+</button>
            <button class="button is-danger" @click="decrease">-</button>
          </div>
        </div>
        <div class="">
          <div class="">
            <h3 class="has-text-white">سعر الخدمه</h3>
            <h3 class="has-text-white">{{ props.priceCount }}</h3>
            <input
              type="number"
              name="price"
              id="price"
              v-model="cardPrice"
              required
              min="1"
            />
            <button class="button price-button is-link" @click="addPrice">
              حفظ السعر
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useAuthStore } from "@/stores/auth";
import { ref } from "@vue/reactivity";
const AuthData = useAuthStore();
const props = defineProps({
  field: { type: String, required: true },
  priceField: { type: String, required: true },
  title: { type: String, required: true },
  count: [Number, String],
  priceCount: [Number, String],
  colorClass: String,
  imgData: String,
});

const cardPrice = ref(props.priceCount);


const getImageUrl = (name: any) => {
  return new URL(`../assets/${name}`, import.meta.url).href;
};

function increase() {
  const number = Number(props.count) + 1;
  var myobj = JSON.parse('{ "' + props.field + '":' + number + "}");

  AuthData.editData(myobj);
}

function decrease() {
  if (Number(props.count) > 0) {
    const number = Number(props.count) - 1;
    var myobj = JSON.parse('{ "' + props.field + '":' + number + "}");
    AuthData.editData(myobj);
  }
}

function addPrice() {
  const number = Number(cardPrice.value);
  var myobj = JSON.parse('{ "' + props.priceField + '":' + number + "}");

  AuthData.editData(myobj);
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
  padding: 15px;
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
#price {
  width: 100%;
  font-size: 30px;
}
.price-button {
  width: 100%;
  margin: 10px 0px;
  border: 1px solid #fff;
}
</style>
