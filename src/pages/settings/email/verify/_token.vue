<template>
  <div class="flex flex-col justify-center flex-grow">
    <template v-if="isLoading">
      <Label :text="$t('settings_email_verify_verifying')" align="center" />
      <ProgressIndicator class="self-center mt-[16px]" />
    </template>
    <Label v-else-if="walletHasVerifiedEmail" :text="$t('settings_email_verify_verified')" align="center" />
    <Label v-else-if="error" align="center">
      {{ $t('settings_email_verify_error_message', { error }) }}
    </Label>
    <Label v-else align="center">
      {{ $t('settings_email_verify_error_message_unknown') }}
    </Label>
    <ButtonV2
      class="self-center mt-[16px]"
      :text="$t('settings_email_verify_verified_back_button')"
      preset="secondary"
      @click="handleClickBack"
    />
  </div>
</template>

<script>
import { mapActions } from 'vuex';

import alertMixin from '~/mixins/alert';
import walletMixin from '~/mixins/wallet';

export default {
  name: 'SettingsEmailVerifyPage',
  mixins: [alertMixin, walletMixin],
  data() {
    return {
      isLoading: true,
      error: '',
    };
  },
  computed: {
    token() {
      return this.$route.params.token;
    },
  },
  async mounted() {
    try {
      this.isLoading = true;
      if (!this.walletHasLoggedIn) {
        await this.connectWallet();
      }
      if (!this.walletHasVerifiedEmail) {
        await this.walletVerifyEmail(this.token);
      }
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error);
      this.error = error.response?.data || error.message;
      this.alertPromptError(
        this.$t('settings_email_verify_error_message', {
          error: this.error,
        })
      );
    } finally {
      this.isLoading = false;
    }
  },
  methods: {
    ...mapActions(['walletVerifyEmail']),
    handleClickBack() {
      this.$router.push({ name: 'settings' });
    },
  },
};
</script>