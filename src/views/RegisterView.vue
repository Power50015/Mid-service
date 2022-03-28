<template>
  <div class="home">
    <section class="hero is-primary is-fullheight">
      <div class="hero-body">
        <div class="container">
          <h1 class="has-text-centered is-size-1 pb-6 is-block">
            عمل حساب مستشفى جديد
          </h1>
          <div class="columns is-centered">
            <div class="column is-5-tablet is-4-desktop is-6-widescreen">
              <form class="box" @submit.prevent="saveUser">
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
                    تسجيل الدخول
                  </button>
                </div>
              </form>
              <router-link
                class="link text-center fw-bold"
                aria-current="page"
                to="/login"
                >تسجيل الدخول</router-link
              >
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
<script lang="ts" setup>
import { useAuthStore } from "@/stores/auth";
import { reactive, ref } from "@vue/reactivity";
import { computed } from "@vue/runtime-core";
import { useRouter } from "vue-router";
import {
  getStorage,
  ref as refire,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";

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

        auth.addHostpital(
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

        router.push("/dashborad");
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
</script>
