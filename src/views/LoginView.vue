<template>
  <div class="home">
    <section class="hero is-primary is-fullheight">
      <div class="hero-body">
        <div class="container">
          <h1 class="has-text-centered is-size-1 pb-6 is-block">
            تسجيل الدخول للمستشفى
          </h1>
          <div class="columns is-centered">
            <div class="column is-5-tablet is-4-desktop is-3-widescreen">
              <form class="box" @submit.prevent="">
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
                to="/register"
                >عمل حساب مستشفى جديده</router-link
              >
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script lang="ts"></script>
