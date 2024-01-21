<template>
  <v-app dark>
    <v-app-bar app collapse>
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
      <slot />
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

<script>
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
    handleShareBtnTap() {
      navigator.share({
        url: "https://wari.ynetlabo.net/",
        title: "wa/riで割り勘",
      });
    },
  },
};
</script>
