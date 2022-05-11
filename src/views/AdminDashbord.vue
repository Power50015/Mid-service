<template>
  <div class="home">
    <section class="hero is-fullheight">
      <div class="hero-body hero-body-x">
        <div class="modal" v-if="showModel">
          <div class="modal-background" @click="showModel = ''"></div>
          <div class="modal-card">
            <header class="modal-card-head">
              <p class="modal-card-title">المريض</p>
              <button
                class="delete"
                aria-label="close"
                @click="showModel = ''"
              ></button>
            </header>
            <section class="modal-card-body">
              <form class="box" @submit.prevent="saveUser">
                <h1 class="has-text-centered is-size-1 pb-6 is-block">
                  عمل حساب مستشفى جديد
                </h1>
                <div class="field">
                  <label for="name" class="label">أسم المستشفى</label>
                  <div class="control has-icons-left">
                    <input
                      type="text"
                      class="input"
                      id="name"
                      required
                      v-model="name"
                    />
                  </div>
                </div>
                <div class="field">
                  <label for="email" class="label">البريد الإلكترونى</label>
                  <div class="control has-icons-left">
                    <input
                      type="email"
                      placeholder="e.g. bobsmith@gmail.com"
                      class="input"
                      required
                      id="email"
                      v-model="email"
                    />
                  </div>
                </div>
                <div class="field">
                  <label for="password" class="label">كلمه السر</label>
                  <div class="control has-icons-left">
                    <input
                      type="password"
                      placeholder="*******"
                      class="input"
                      id="password"
                      v-model="password"
                      required
                    />
                  </div>
                </div>
                <div class="field">
                  <label for="area" class="label">المنطقه</label>
                  <div class="control has-icons-left">
                    <div class="select is-primary is-full">
                      <select class="is-full" v-model="area" id="area">
                        <option>القاهره</option>
                        <option>الإسكندريه</option>
                        <option>الجيزة</option>
                        <option>السويس</option>
                        <option>الإسماعيلية</option>
                      </select>
                    </div>
                  </div>
                </div>
                <div class="field">
                  <label for="address" class="label">العنوان تفصيلا</label>
                  <div class="control has-icons-left">
                    <input
                      type="text"
                      class="input"
                      required
                      v-model="address"
                      id="address"
                    />
                  </div>
                </div>
                <!-- Start image-->
                <div class="mb-3">
                  <label for="formFile" class="form-label"
                    >الصورة الشخصيه</label
                  >
                  <template v-if="imgPreview">
                    <img :src="imgPreview" class="img-fluid" height="300" />
                    <p class="mb-0">file name: {{ imgData.value.name }}</p>
                    <p class="mb-0">
                      size: {{ Math.round(imgData.value.size / 1024) }}KB
                    </p>
                  </template>
                  <div class="flex">
                    <h6 class="mb-3 text-white">
                      حاله رفع الصوره :
                      <span v-if="imgUpload == 100">أكتمل</span>
                    </h6>
                  </div>
                  <input
                    class="form-control"
                    type="file"
                    id="formFile"
                    accept="image/jpeg"
                    @change="DetectFiles($event.target.files)"
                  />
                </div>
                <!-- End image-->
                <div class="field">
                  <label for="map" class="label">رابط الخريطه</label>
                  <div class="control has-icons-left">
                    <input
                      type="text"
                      class="input"
                      required
                      v-model="map"
                      id="map"
                    />
                  </div>
                </div>
                <div class="field" v-if="map != ''">
                  <iframe
                    :src="GoogleMapsURLToEmbedURL"
                    style="width: 100%"
                    allowfullscreen="fasle"
                    loading="lazy"
                    referrerpolicy="no-referrer-when-downgrade"
                  ></iframe>
                </div>
                <div class="field">
                  <progress
                    class="progress is-primary"
                    :value="imgUpload"
                    max="100"
                    v-if="!btn"
                  >
                    15%
                  </progress>
                  <button class="button is-success" type="submit" v-if="btn">
                    عمل حساب مستشفى
                  </button>
                </div>
              </form>
            </section>
          </div>
        </div>
        <div class="container">
          <div class="box-area">
            <button class="button is-primary" @click="showModel = true">
              عمل حساب مستشفى
            </button>
          </div>
          <div class="columns is-12 is-variable">
            <div v-for="hospital in hospitalData" class="column is-3">
              <div class="box-x">
                <img
                  class="bd-placeholder-img rounded-circle"
                  width="140"
                  height="140"
                  role="img"
                  :src="hospital.image"
                />
                <h2>{{ hospital.name }}</h2>
                <button
                  class="button is-primary"
                  @click="hospital.Usermodel = true"
                >
                  بيانات المستشفى
                </button>

                <HospitalModel
                  v-if="hospital.Usermodel"
                  :showModel="hospital.Usermodel"
                  :email="hospital.email"
                  @close-model="hospital.Usermodel = false"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
<script lang="ts" setup>
import HospitalModel from "@/components/HospitalModel.vue";
import { useAuthStore } from "@/stores/auth";
import { reactive, ref } from "@vue/reactivity";
import { computed } from "@vue/runtime-core";
import { useRouter } from "vue-router";

import app from "@/firebase";
import { getFirestore } from "firebase/firestore";
import { collection, getDocs, query, where } from "firebase/firestore";

import {
  getStorage,
  ref as refire,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
const showModel = ref(false);
const db = getFirestore();
const storage = getStorage();

const name = ref<string>("");
const email = ref<string>("");
const area = ref<string>("القاهره");
const address = ref<string>("");
const map = ref<string>("");
const password = ref<string>("");
const imgURL = ref<string>("");
const imgData = reactive([]);
const imgPreview = ref<any>("");

const btn = ref(true);
const imgUpload = ref(0);

const router = useRouter();
const auth = useAuthStore();
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

function saveUser() {
  btn.value = false;
  const storageRef = refire(storage, `${imgData.value.name}`);
  const uploadTask = uploadBytesResumable(storageRef, imgData.value);

  uploadTask.on(
    "state_changed",
    (snapshot) => {
      imgUpload.value = Math.floor(
        (snapshot.bytesTransferred / snapshot.totalBytes) * 100
      );
    },
    (error) => {
      alert(error);
    },
    () => {
      getDownloadURL(uploadTask.snapshot.ref).then((URL) => {
        btn.value = true;

        imgURL.value = URL;

        auth.adminAddHostpital(
          name.value,
          address.value,
          map.value,
          area.value,
          email.value,
          password.value,
          imgURL.value
        );
        name.value = "";
        address.value = "";
        area.value = "القاهره";
        email.value = "";
        password.value = "";
        setTimeout(function () {
          getHospitalData();
        }, 2000);

        showModel.value = false;
      });
    }
  );
}

function DetectFiles(input) {
  imgData.value = input[0];
  if (input) {
    var reader = new FileReader();
    reader.onload = (e) => {
      imgPreview.value = e.target.result;
    };
    reader.readAsDataURL(input[0]);
  }
}

const hospitalData = reactive([]);

getHospitalData();

async function getHospitalData() {
  hospitalData.length = 0;

  const querySnapshot = await getDocs(collection(db, "hospitals"));

  querySnapshot.forEach((doc) => {
    hospitalData.push({
      docId: doc.id,
      ...doc.data(),
      Usermodel: false,
    });
  });
}
</script>

<style scoped>
.section,
.table {
  width: 100%;
}
.modal {
  display: flex;
}
.modal-background {
  background-color: rgb(10 10 10 / 25%);
}
.hero-body-x {
  display: block !important;
}
.box-x {
  text-align: center;
  background: #eee;
  padding: 10px;
  border-radius: 15px;
}
.box-x h2 {
  margin: 20px 0;
  color: #000;
}
.box-area {
  text-align: center;
  padding: 0 0 25px 0;
}
.is-variable {
  flex-wrap: wrap;
}
</style>
