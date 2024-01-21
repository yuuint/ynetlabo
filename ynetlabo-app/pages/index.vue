<template>
  <div>
    <v-container>
      <v-lazy
        min-height="350"
        :options="{ threshold: 0.5 }"
        transition="slide-y-transition"
      >
        <v-row>
          <v-col cols="12">
            <v-img
              contain
              src="@/assets/images/ynetlabo-logo.png"
              height="200px"
            ></v-img>
            <div class="ftext-ht2 text-center mb-1">
              アプリ開発の情報発信ラボ
            </div>
            <div class="ftext-ht1g text-center mb-1">
              はじめまして、Y.NetLaboです。私たちは企業ではありません。
            </div>
            <div class="ftext-ht1g text-center mb-1">
              アプリ開発好きな個人が作品を作ってます。
            </div>
          </v-col>
        </v-row>
      </v-lazy>
      <v-lazy
        min-height="400"
        :options="{ threshold: 0.5 }"
        transition="slide-y-reverse-transition"
      >
        <v-row>
          <v-col cols="12">
            <v-card variant="outlined" color="orange-darken-1">
              <v-card-title
                ><v-icon icon="mdi-new-box" />Whats New!?</v-card-title
              >
              <v-carousel cycle height="300" show-arrows="hover">
                <v-carousel-item>
                  <v-sheet height="100%">
                    <div class="d-flex fill-height justify-center align-center">
                      <div class="text-h2">{{ slide }} Slide</div>
                    </div>
                  </v-sheet>
                </v-carousel-item>
              </v-carousel>
            </v-card>
          </v-col>
        </v-row>
      </v-lazy>
      <v-lazy
        min-height="450"
        :options="{ threshold: 0.5 }"
        transition="slide-y-reverse-transition"
      >
        <v-row>
          <v-col cols="12">
            <div class="ftext-ht2 text-center mb-1">出会った技術要素</div>
          </v-col>
          <v-col cols="12">
            <div class="ftext-ht1g text-center mb-1">Language & Framework</div>
          </v-col>
          <v-col cols="12">
            <div class="text-center">
              <v-chip
                class="ma-2"
                color="pink-darken-1"
                prepend-icon="mdi-application-brackets"
              >
                Nuxt.js
              </v-chip>
              <v-chip
                class="ma-2"
                color="pink-darken-1"
                prepend-icon="mdi-application-brackets"
              >
                Vuetify
              </v-chip>
              <v-chip
                class="ma-2"
                color="pink-darken-1"
                prepend-icon="mdi-application-brackets"
              >
                Vue.js
              </v-chip>
              <v-chip
                class="ma-2"
                color="indigo"
                prepend-icon="mdi-application-brackets"
              >
                Type Script
              </v-chip>
              <v-chip
                class="ma-2"
                color="indigo"
                prepend-icon="mdi-application-brackets"
              >
                flutter
              </v-chip>
              <v-chip
                class="ma-2"
                color="indigo"
                prepend-icon="mdi-application-brackets"
              >
                swift
              </v-chip>
              <v-chip
                class="ma-2"
                color="indigo"
                prepend-icon="mdi-application-brackets"
              >
                React.js
              </v-chip>
              <v-chip
                class="ma-2"
                color="indigo"
                prepend-icon="mdi-application-brackets"
              >
                React Native
              </v-chip>
              <v-chip
                class="ma-2"
                color="indigo"
                prepend-icon="mdi-application-brackets"
              >
                shell
              </v-chip>
              <v-chip
                class="ma-2"
                color="pink-darken-1"
                prepend-icon="mdi-application-brackets"
              >
                SQL
              </v-chip>
              <v-chip
                class="ma-2"
                color="indigo"
                prepend-icon="mdi-application-brackets"
              >
                MyBatis
              </v-chip>
              <v-chip
                class="ma-2"
                color="pink-darken-1"
                prepend-icon="mdi-application-brackets"
              >
                Thymeleaf
              </v-chip>
              <v-chip
                class="ma-2"
                color="pink-darken-1"
                prepend-icon="mdi-application-brackets"
              >
                Spring Boot
              </v-chip>
              <v-chip
                class="ma-2"
                color="pink-darken-1"
                prepend-icon="mdi-application-brackets"
              >
                java
              </v-chip>
              <v-chip
                class="ma-2"
                color="pink-darken-1"
                prepend-icon="mdi-application-brackets"
              >
                VB.Net
              </v-chip>
              <v-chip
                class="ma-2"
                color="pink-darken-1"
                prepend-icon="mdi-application-brackets"
              >
                VBA
              </v-chip>
              <v-chip
                class="ma-2"
                color="indigo"
                prepend-icon="mdi-application-brackets"
              >
                VB6
              </v-chip>
              <v-chip
                class="ma-2"
                color="pink-darken-1"
                prepend-icon="mdi-application-brackets"
              >
                java script
              </v-chip>
              <v-chip
                class="ma-2"
                color="indigo"
                prepend-icon="mdi-application-brackets"
              >
                css
              </v-chip>
              <v-chip
                class="ma-2"
                color="pink-darken-1"
                prepend-icon="mdi-application-brackets"
              >
                html
              </v-chip>
            </div>
          </v-col>
          <v-col cols="12">
            <div class="ftext-ht1g text-center mb-1">
              Infrastructure & Cloud Service
            </div>
          </v-col>
          <v-col cols="12">
            <div class="text-center">
              <v-chip
                class="ma-2"
                color="pink-darken-1"
                prepend-icon="mdi-cloud"
              >
                AWS
              </v-chip>
              <v-chip
                class="ma-2"
                color="pink-darken-1"
                prepend-icon="mdi-cloud"
              >
                Firebase
              </v-chip>
              <v-chip class="ma-2" color="indigo" prepend-icon="mdi-cloud">
                GitHub
              </v-chip>
              <v-chip class="ma-2" color="indigo" prepend-icon="mdi-cloud">
                IBM Cloud
              </v-chip>
              <v-chip
                class="ma-2"
                color="pink-darken-1"
                prepend-icon="mdi-server"
              >
                nginx
              </v-chip>
              <v-chip class="ma-2" color="indigo" prepend-icon="mdi-server">
                docker
              </v-chip>
              <v-chip
                class="ma-2"
                color="pink-darken-1"
                prepend-icon="mdi-server"
              >
                Apache
              </v-chip>
              <v-chip
                class="ma-2"
                color="pink-darken-1"
                prepend-icon="mdi-server"
              >
                Tomcat
              </v-chip>
              <v-chip class="ma-2" color="indigo" prepend-icon="mdi-database">
                mySQL
              </v-chip>
              <v-chip
                class="ma-2"
                color="pink-darken-1"
                prepend-icon="mdi-database"
              >
                PostgreSQL
              </v-chip>
              <v-chip class="ma-2" color="indigo" prepend-icon="mdi-database">
                SQLServer
              </v-chip>
              <v-chip class="ma-2" color="indigo" prepend-icon="mdi-database">
                Oracle
              </v-chip>
              <v-chip class="ma-2" color="indigo" prepend-icon="mdi-database">
                MS Access
              </v-chip>
            </div>
          </v-col>
        </v-row>
      </v-lazy>
    </v-container>

    <!-- Welcome templeate -->

    <v-slide-y-reverse-transition>
      <v-btn
        style="display: block; position: fixed; right: 10px; top: 5px"
        color="orange-darken-1"
        size="large"
        icon="mdi-share-variant-outline"
        @click="handleShareBtnTap"
        elevation="5"
      >
      </v-btn>
    </v-slide-y-reverse-transition>
  </div>
</template>

<!-- <script>
import moneyAnimeJson from "@/assets/lottie/money-animation.json";
import { Vue3Lottie } from "vue3-lottie";
const authStore = useAuthStore();

export default {
  components: {
    Vue3Lottie,
  },
  data() {
    return {
      moneyAnimeJson,
    };
  },
};
</script> -->

<script setup>
import signInJson from "~/assets/lottie/signin-anime.json";
import splashJson from "~/assets/lottie/splash.json";
import { ref } from "vue";

const isSplashActive = ref(false);

import { Vue3Lottie } from "vue3-lottie";

function handleShareBtnTap() {
  navigator.share({
    url: "https://web.ynetlabo.net/",
    title: "Y.NetLabo",
  });
}
</script>
