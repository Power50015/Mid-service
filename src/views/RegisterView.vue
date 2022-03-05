<template>
  <div class="home">
    <section class="hero is-primary is-fullheight">
      <div class="hero-body">
        <div class="container">
          <h1 class="has-text-centered is-size-1 pb-6 is-block">
           عمل حساب مستشفى جديد
          </h1>
          <div class="columns is-centered">
            <div class="column is-5-tablet is-4-desktop is-3-widescreen">
              <form class="box" @submit.prevent="">
                <div class="field">
                  <label for="" class="label">أسم المستشفى</label>
                  <div class="control has-icons-left">
                    <input type="text" class="input" required />
                    <span class="icon is-small is-left">
                      <i class="fa fa-envelope"></i>
                    </span>
                  </div>
                </div>
                <div class="field">
                  <label for="" class="label">المنطقه</label>
                  <div class="control has-icons-left">
                    <div class="select is-primary is-full">
                      <select class="is-full">
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
                  <label for="" class="label">العنوان تفصيلا</label>
                  <div class="control has-icons-left">
                    <input type="text" class="input" required />
                    <span class="icon is-small is-left">
                      <i class="fa fa-envelope"></i>
                    </span>
                  </div>
                </div>
                <div class="field">
                  <label for="" class="label">البريد الإلكترونى</label>
                  <div class="control has-icons-left">
                    <input
                      type="email"
                      placeholder="e.g. bobsmith@gmail.com"
                      class="input"
                      required
                    />
                    <span class="icon is-small is-left">
                      <i class="fa fa-envelope"></i>
                    </span>
                  </div>
                </div>
                <div class="field">
                  <label for="" class="label">كلمه السر</label>
                  <div class="control has-icons-left">
                    <input
                      type="password"
                      placeholder="*******"
                      class="input"
                      required
                    />
                    <span class="icon is-small is-left">
                      <i class="fa fa-lock"></i>
                    </span>
                  </div>
                </div>
                <div class="field">
                  <button class="button is-success" type="submit">
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
<script lang="ts" setup></script>
