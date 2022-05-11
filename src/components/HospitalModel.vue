<template>
  <div class="modal" v-if="show">
    <div class="modal-background" @click="$emit('closeModel')"></div>
    <div class="modal-content has-background-white" v-if="isload">
      <img :src="data[0].image" alt="" width="250" height="250" />
      <h2>{{ data[0].name }}</h2>
      <h2>البريد ألكترونى : {{ data[0].email }}</h2>
      <h2>المنطقه : {{ data[0].area }}</h2>
      <h2>العنوان : {{ data[0].address }}</h2>
      <h2>الخدمات المتاحه</h2>
      <div class="columns is-12 is-variable">
      <Card
        field="nurseries"
        title="حضانات"
        :count="data[0].nurseries"
        img-data = "baby-room.jpg"
        color-class="has-background-dark"
      />
      <Card
        field="isolation"
        title="غرفه عزل كرونا"
        :count="data[0].isolation"
        img-data = "covid-19.jpg"
        color-class="has-background-primary	"
      />
      <Card
        field="room"
        title="غرفه عاديه"
        :count="data[0].room"
        img-data = "hospital-room.jpg"
        color-class="has-background-link"
      />
      <Card
        field="intensive"
        title="عنايه مركزه"
        :count="data[0].intensive"
        img-data = "intensive-care.jpg"
        color-class="has-background-info"
      />
      <Card
        field="apositive"
        title="فصيله دم A+"
        :count="data[0].apositive"
        color-class="has-background-success"
        img-data = "blood-types.jpg"
      />
      <Card
        field="anegative"
        title="فصيله دم A-"
        :count="data[0].anegative"
        color-class="has-background-grey"
        img-data = "blood-types.jpg"
      />
      <Card
        field="bpositive"
        title="فصيله دم B+"
        :count="data[0].bpositive"
        color-class="has-background-danger"
        img-data = "blood-types.jpg"
      />
      <Card
        field="bnegative"
        title="فصيله دم B-"
        :count="data[0].bnegative"
        color-class="has-background-primary-dark"
        img-data = "blood-types.jpg"
      />
      <Card
        field="abpositive"
        title="فصيله دم AB+"
        :count="data[0].abpositive"
        color-class="has-background-link-dark"
        img-data = "blood-types.jpg"
      />
      <Card
        field="abnegative"
        title="فصيله دم AB-"
        :count="data[0].abnegative"
        color-class="has-background-info-dark"
        img-data = "blood-types.jpg"
      />
      <Card
        field="opositive"
        title="فصيله دم O+"
        :count="data[0].opositive"
        color-class="has-background-success-dark"
        img-data = "blood-types.jpg"
      />
      <Card
        field="onegative"
        title="فصيله دم O-"
        :count="data[0].onegative"
        color-class="has-background-danger-dark"
        img-data = "blood-types.jpg"
      />
    </div>
      <iframe
        :src="GoogleMapsURLToEmbedURL"
        style="width: 100%"
        allowfullscreen="fasle"
        loading="lazy"
        referrerpolicy="no-referrer-when-downgrade"
      ></iframe>
    </div>
  </div>
</template>
<script setup lang="ts">
import Card from "@/components/CardData.vue";
import app from "@/firebase";
import { getFirestore } from "firebase/firestore";
import { collection, getDocs, query, where } from "firebase/firestore";

import { reactive, ref } from "@vue/reactivity";
import { computed } from "@vue/runtime-core";

const db = getFirestore();

const props = defineProps({
  showModel: Boolean,
  email: String,
});

const isload = ref(false);
const show = computed(() => {
  getdata();
  return props.showModel;
});

const data = reactive([]);
const map = ref();

async function getdata() {
  data.length = 0;
  const q = query(
    collection(db, "hospitals"),
    where("email", "==", props.email)
  );

  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    data.push(doc.data());
    map.value = doc.data().map;
    isload.value = true;
  });
}

const GoogleMapsURLToEmbedURL = computed(() => {
  var coords = /\@([0-9\.\,\-a-zA-Z]*)/.exec(map.value);
  if (coords != null) {
    var coordsArray = coords[1].split(",");
    return (
      "https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d20000!2d" +
      coordsArray[1] +
      "!3d" +
      coordsArray[0] +
      "!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2suk!4v1486486434098"
    );
  }
});
</script>

<style scoped>
h2 {
  font-size: 1.8rem;
  padding: 18px 0;
}
.modal-content {
  width: 80%;
}
.is-variable {
  flex-wrap: wrap;
}
</style>
