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
              <v-carousel cycle height="300" :show-arrows="false">
                <v-carousel-item>
                  <v-sheet height="100%">
                    <v-card
                      variant="flat"
                      @click="
                        navigateTo('https://qiita.com/ynetlabo', {
                          external: true,
                          open: {
                            target: '_blank',
                          },
                        })
                      "
                    >
                      <v-card-title>Qiita始めました</v-card-title>
                      <v-card-subtitle>2024.01.21</v-card-subtitle>
                      <v-card-text
                        >ラボで作成したアプリのノウハウ備忘録のために、Qiita始めました。ぜひ覗いてみてください。</v-card-text
                      >
                      <v-card-actions>
                        <v-list-item class="w-100">
                          <template v-slot:prepend>
                            <v-avatar
                              color="grey-darken-3"
                              image="https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/273836/profile-images/1705771716"
                            ></v-avatar>
                          </template>
                          <v-list-item-title>@ynetlabo</v-list-item-title>
                        </v-list-item>
                      </v-card-actions>
                    </v-card>
                  </v-sheet>
                </v-carousel-item>
                <v-carousel-item>
                  <v-sheet height="100%">
                    <v-card
                      variant="flat"
                      @click="
                        navigateTo('https://wari.ynetlabo.net', {
                          external: true,
                          open: {
                            target: '_blank',
                          },
                        })
                      "
                    >
                      <v-card-title>wa/riを公開しました</v-card-title>
                      <v-card-subtitle>2024.01.20</v-card-subtitle>
                      <v-card-text
                        >みんなの建て替え、簡単に割り勘。旅行・飲み会・パーティ後の精算をお手伝いします。シンプルなデザインで使いやすく仕上げました。もちろん無料でご利用いただけます。</v-card-text
                      >
                      <v-card-actions>
                        <v-list-item class="w-100">
                          <template v-slot:prepend>
                            <v-avatar
                              color="grey-darken-3"
                              image="https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/273836/profile-images/1705771716"
                            ></v-avatar>
                          </template>
                          <v-list-item-title>@ynetlabo</v-list-item-title>
                        </v-list-item>
                      </v-card-actions>
                    </v-card>
                  </v-sheet>
                </v-carousel-item>
                <v-carousel-item>
                  <v-sheet height="100%">
                    <v-card
                      variant="flat"
                      @click="
                        navigateTo('https://mapengu.ynetlabo.net', {
                          external: true,
                          open: {
                            target: '_blank',
                          },
                        })
                      "
                    >
                      <v-card-title>mapenguを公開しました</v-card-title>
                      <v-card-subtitle>2023.04.04</v-card-subtitle>
                      <v-card-text
                        >maPenguでペンギンスポットの詳細を確認しよう！。laboのおすすめペンギン🐧スポットを紹介！。可愛いペンギンとマッチング／マッピングしてます！。スポット選定に活用してみてください。</v-card-text
                      >
                      <v-card-actions>
                        <v-list-item class="w-100">
                          <template v-slot:prepend>
                            <v-avatar
                              color="grey-darken-3"
                              image="https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/273836/profile-images/1705771716"
                            ></v-avatar>
                          </template>
                          <v-list-item-title>@ynetlabo</v-list-item-title>
                        </v-list-item>
                      </v-card-actions>
                    </v-card>
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
