<template>
  <v-app dark>
    <!-- <v-navigation-drawer app v-model="drawer" dark color="#272727">
      <SystemLeftNavigation />
    </v-navigation-drawer> -->
    <v-app-bar app color="#272727" dark :collapse="!isLoggined">
      <v-app-bar-nav-icon
        icon="mdi-login"
        variant="text"
        @click="navigateTo('/entrance')"
        color="orange"
      ></v-app-bar-nav-icon>
      <SystemHeader v-show="isLoggined" />
      <v-spacer></v-spacer>
      <v-row>
        <v-slide-y-reverse-transition>
          <v-avatar>
            <v-img
              @click="dialog = true"
              src="@/assets/images/laboicon.png"
            ></v-img>
          </v-avatar>
        </v-slide-y-reverse-transition>
        <v-slide-y-reverse-transition>
          <v-btn v-if="isLoggined" @click="handleSignOut" icon>
            <v-icon>mdi-logout</v-icon>
          </v-btn>
        </v-slide-y-reverse-transition>
      </v-row>
    </v-app-bar>
    <v-main>
      <slot />
    </v-main>
    <SystemFooter />
    <v-dialog v-model="signOutWarn" width="auto">
      <v-card prepend-icon="mdi-logout" title="サインアウトしますか？">
        <v-card-text>
          <div>SNSアカウントと連携していない場合はMyRoomを復元できません。</div>
        </v-card-text>
        <v-card-actions>
          <v-row>
            <v-col>
              <v-btn color="primary" block @click="handleSignOutConfirm"
                >サインアウト</v-btn
              >
            </v-col>
            <v-col>
              <v-btn color="primary" block @click="signOutWarn = false"
                >キャンセル</v-btn
              >
            </v-col>
          </v-row>
        </v-card-actions>
      </v-card>
    </v-dialog>
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

<script>
const authStore2 = useAuthStore();
export default {
  name: "DefaultLayout",
  data() {
    return {
      dialog: false,
      signOutWarn: false,
      clipped: false,
      drawer: false,
      fixed: false,
      items: [
        {
          icon: "mdi-apps",
          title: "Welcome",
          to: "/",
        },
        {
          icon: "mdi-chart-bubble",
          title: "Inspire",
          to: "/inspire",
        },
      ],
      miniVariant: false,
      right: true,
      rightDrawer: false,
      title: "Vuetify.js",
    };
  },
  computed: {
    isLoggined: () => {
      return authStore2.isLoggedIn;
    },
  },
  methods: {
    handleSignOut() {
      this.signOutWarn = true;
    },
    handleSignOutConfirm() {
      this.signOutWarn = false;
      authStore2.signOut();
    },
  },
};
</script>
