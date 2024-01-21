<script lang="ts" setup>
import mainteJson from "~/assets/lottie/mainte.json";
import { Vue3Lottie } from "vue3-lottie";

useHead({
  titleTemplate: (titleChunk) => {
    return "Y.NetLabo | ErrorPage:" + props.error.statusCode;
  },
});

// Props
interface Props {
  error: Error;
}
const props = defineProps<Props>();

// Functions
const handleError = () => {
  navigateTo("/");
};
</script>

<template>
  <v-app dark>
    <v-app-bar app collapse color="orange-darken-4">
      <v-app-bar-nav-icon icon="mdi-home" variant="text"></v-app-bar-nav-icon>

      <v-app-bar-title>
        <systemHeader />
      </v-app-bar-title>

      <v-btn icon>
        <v-avatar>
          <v-img
            @click="dialog = true"
            src="@/assets/images/laboicon.png"
          ></v-img>
        </v-avatar>
      </v-btn>
    </v-app-bar>
    <v-main>
      <v-container>
        <v-row justify="center">
          <v-col cols="12">
            <v-sheet border rounded elevation="0" min-width="15rem">
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
                    <div class="ftext-ht5">
                      {{ "statusCode:" + props.error.statusCode }}
                    </div>
                  </v-sheet>
                </v-col>
              </v-row>
              <v-row>
                <v-col>
                  <v-sheet rounded class="pl-5 pr-5 pt-0">
                    <div class="ftext-ht1">
                      トップページへ移動してください。
                    </div>
                    <div class="ftext-ht1g">{{ props.error }}</div>
                  </v-sheet>
                </v-col>
              </v-row>
              <v-row justify="center">
                <v-col cols="auto" class="mb-3">
                  <v-btn
                    size="large"
                    variant="outlined"
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
    </v-main>
    <SystemFooter />

    <v-dialog v-model="dialog" width="500">
      <v-card>
        <v-card-title class="text-h7"> Author </v-card-title>
        <v-card-subtitle>Copyright 2024 Y.NetLabo</v-card-subtitle>
        <v-row>
          <v-col>
            <v-container>
              <v-img
                contain
                src="@/assets/images/ynetlabo-logo.png"
                height="120px"
              ></v-img>
              <v-avatar>
                <v-img
                  @click="
                    () => {
                      navigateTo('https://mapengu.ynetlabo.net/', {
                        external: true,
                        open: {
                          target: '_blank',
                        },
                      });
                    }
                  "
                  src="https://mapengu.ynetlabo.net/favicon.ico"
                ></v-img>
              </v-avatar>
            </v-container>
          </v-col>
        </v-row>
        <v-divider></v-divider>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" text @click="dialog = false"> OK </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-app>
</template>
