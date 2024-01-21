<template>
  <div>
    <v-footer padless>
      <v-col class="text-center text-caption" cols="12">
        <div @click="dialog = true">Copyright 2024 Y.NetLabo</div>
      </v-col>
    </v-footer>
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
  </div>
</template>

<script>
export default {
  data: () => ({
    dialog: false,
  }),
};
</script>

<style>
.title-text {
  display: inline-block;
}
</style>
