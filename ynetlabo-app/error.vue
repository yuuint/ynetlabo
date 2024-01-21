<script lang="ts" setup>
import mainteJson from "~/assets/lottie/mainte.json";
import { Vue3Lottie } from "vue3-lottie";
// import error403 from "~/components/403.vue";
// import error404 from "~/components/404.vue";
// import error500 from "~/components/500.vue";

// Props
interface Props {
  error: Error;
}
const props = defineProps<Props>();

// Valiables
// const errorPage = computed(() => {
//   if (props.error.statusCode === 403) {
//     return error403;
//   } else if (props.error.statusCode === 404) {
//     return error404;
//   } else {
//     return error500;
//   }
// });

// Functions
const handleError = () => {
  location.href = "/";
};

onMounted(() => {
  setTimeout(() => {
    location.href = "/";
  }, 2000);
});
</script>

<template>
  <v-app dark>
    <!-- <v-navigation-drawer app v-model="drawer" dark color="#272727">
      <SystemLeftNavigation />
    </v-navigation-drawer> -->
    <v-app-bar app color="#272727" dark>
      <v-app-bar-nav-icon
        icon="mdi-home"
        variant="text"
        @click="handleError"
        color="orange"
      ></v-app-bar-nav-icon>
      <systemHeader />
    </v-app-bar>
    <v-main>
      <v-container>
        <v-row justify="center">
          <v-col cols="12">
            <v-sheet border rounded elevation="1" min-width="15rem">
              <v-row>
                <v-col cols="12">
                  <client-only>
                    <Vue3Lottie
                      :animationData="mainteJson"
                      :loop="true"
                      :height="200"
                      :width="200"
                    />
                  </client-only>
                </v-col>
              </v-row>
              <v-row>
                <v-col>
                  <v-sheet rounded class="pl-5 pr-5 pt-0">
                    <div class="ftext-ht5">処理に失敗しました</div>
                  </v-sheet>
                </v-col>
              </v-row>
              <v-row>
                <v-col>
                  <v-sheet rounded class="pl-5 pr-5 pt-0">
                    <div class="ftext-ht1">最初からやり直してください</div>
                    <div class="ftext-ht1">※2秒後に自動的に遷移します</div>
                  </v-sheet>
                </v-col>
              </v-row>
              <v-row justify="center">
                <v-col cols="auto" class="mb-3">
                  <v-btn
                    size="large"
                    variant="flat"
                    color="red-darken-2"
                    @click="handleError"
                  >
                    <v-icon start icon="mdi-home"></v-icon>
                    トップに戻る
                  </v-btn>
                </v-col>
              </v-row>
            </v-sheet>
          </v-col>
        </v-row>
      </v-container>
      <v-container>
        <v-row justify="center">
          <v-col cols="12">
            <v-sheet
              color="#88888850"
              border
              rounded
              elevation="0"
              min-width="15rem"
            >
              <div class="ftext-ht0">
                {{ "statusCode:" + props.error.statusCode }}
              </div>
              <div class="ftext-ht0">{{ props.error }}</div>
            </v-sheet>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
    <SystemFooter />
  </v-app>
</template>
