<template>
  <v-row justify="center">
    <v-dialog v-model="dialog" persistent width="1024">
      <v-card>
        <v-card-title>
          <span class="text-h5">ルームの新規作成</span>
        </v-card-title>
        <v-card-text> 🐧これはサンプルダイアログ </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="blue-darken-1"
            variant="text"
            @click="handleCancelBtnTap"
          >
            Close
          </v-btn>
          <v-btn
            color="blue-darken-1"
            variant="text"
            @click="handleConfirmBtnTap"
          >
            Save
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
export default {
  data: () => ({
    dialog: false,
  }),
  methods: {
    handleCancelBtnTap() {
      this.dialog = false;
      this.$emit("eventCancel");
    },
    handleConfirmBtnTap() {
      this.dialog = false;
      this.$emit("eventConfirm");
    },
    newOpen() {
      this.dialog = true;
    },
  },
};
</script>
