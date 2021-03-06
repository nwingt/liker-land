<template lang="pug">
  Spinner.mx-auto.my-96(v-if="!hasFetched")

  .px-8.pb-32(v-else)

    h2.text-like-green.font-24.font-500 {{ $t('SettingsSupportPage.Title.CreatorPitch') }}

    .bg-white.rounded-8.mt-24.p-32.text-12.text-gray-4a.leading-1_5(
      class="laptop:flex items-start laptop:pl-64"
    )
      Identity.flex-no-shrink(
        :avatar-size="88"
        :avatar-url="user.avatar"
        :is-avatar-outlined="user.isSubscribedCivicLiker"
      )

      .flex-grow(class="laptop:ml-24")
        .text-like-green.text-32 {{ user.displayName }}
        .mt-8(class="laptop:mr-32")
          .whitespace-pre-wrap.text-14.font-600.w-full(
            v-if="!isEditingPitch"
            :class="pitch ? 'text-gray-4a' : 'text-gray-9b'"
            @click="startPitchEditing"
          )
            | {{ pitchPreview }}
          textarea.text-14.text-gray-4a.font-600.w-full.bg-transparent(
            v-else
            ref="creatorPitchInput"
            v-model="pitch" rows="5" cols="50"
            :placeholder="$t('SettingsSupportPage.PitchPreview.Placeholder')"
          )
        .flex.items-center.mt-12
          .flex-grow.text-gray-9b.text-12
            span(:class="{ 'text-danger': pitchCharCount > pitchCharLimit }") {{ pitchCharCount }}
            | /{{ pitchCharLimit }}
          Button.ml-24.text-like-green.underline.flex-shrink-0(
            v-if="!isEditingPitch"
            preset="plain"
            :disabled="isUpdatingPitch"
            @click="isShowPitchPreview = true"
          )
            .px-4
              EyeIcon.w-16.h-16.align-middle
              span.ml-4.leading-1.text-12.font-bold {{ $t('preview') }}
          Button.ml-8.text-like-green.underline.flex-shrink-0(
            v-if="!isEditingPitch"
            preset="plain"
            :disabled="isUpdatingPitch"
            @click="startPitchEditing"
          )
            .px-4
              EditIcon.w-14.h-14.align-middle
              span.ml-4.leading-1.text-12.font-bold {{ $t('edit') }}
          Button.ml-24(
            v-else
            preset="primary"
            :disabled="isUpdatingPitch || pitchCharCount > pitchCharLimit"
            @click="finishPitchEditing"
          )
            .px-8.font-600 {{ $t('confirm') }}

        CivicSubscriptionView(
          v-if="isShowPitchPreview"
          initial-state="new"
          :liker-id="likerId"
          :is-preview="true"
          :is-show-backdrop="true"
          @click-back-button="isShowPitchPreview = false"
          @click-backdrop="isShowPitchPreview = false"
        )

    h2.mt-32.text-like-green.font-24.font-500(v-if="count")
      | {{ $t('SettingsSupportPage.Title.SponsorLink') }}
    EasySetup.mt-24(
      preset="sponsor-link"
      :liker-id="likerId"
    )

    h2.mt-32.text-like-green.font-24.font-500 {{ $t('SupportersDashboard.Summary.Title') }}
    ul.list-reset.flex.bg-white.rounded-8.mt-24.px-16.py-8.text-12.text-gray-4a.leading-1_5(
      :class="['phone:px-8', { 'opacity-50 select-none': !count }]"
    )
      li.flex-1.m-8
        .text-24.text-gray-4a
          | {{ $t('SupportersDashboard.Summary.Data.Amount.Value', { amount: totalAmount }) }}
        .text-12.text-gray-4a
          | {{ $t('SupportersDashboard.Summary.Data.Amount.Label') }}
      li.flex-1.m-8
        .text-24.text-gray-4a
          | {{ count }}
        .text-12.text-gray-4a
          | {{ $tc('SupportersDashboard.Summary.Data.Subscribers', count, { count }) }}

    template(v-if="count")
      h2.mt-32.text-like-green.font-24.font-500 {{ $t('SupportersDashboard.List.Title') }}
      SupportersList(class="laptop:mx-32 tablet:mx-32")

    template(v-else)
      .bg-white.rounded-8.mt-48.pt-32.pb-48.text-center
        h2.text-like-green.font-24.font-500 {{ $t('SupportersDashboard.Empty.Setup') }}

        EasySetup.mt-24.rounded-8.px-48(
          class="phone:px-16"
          preset="grow-supporters"
          :liker-id="likerId"
        )

      .text-center.mt-16
        NuxtLink.text-like-green.text-14(
          class="hover:underline"
          :to="{ name: 'creators-setup' }"
        )
          | {{ $t('learnMore') }}
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

import { CIVIC_LIKER_UNIT_PRICE } from '~/constant';

import Button from '~/components/Button/Button';
import CivicSubscriptionView from '~/components/CivicSubscriptionView/CivicSubscriptionView';
import EasySetup from '~/components/CreatorsPage/sections/EasySetup/EasySetup';
import EditIcon from '~/components/Icon/Edit';
import EyeIcon from '~/components/Icon/Eye';
import Identity from '~/components/Identity/Identity';
import Spinner from '~/components/Spinner/Spinner';
import SupportersList from '~/components/SupportersList/SupportersList';

export default {
  middleware: 'authenticated',
  components: {
    Button,
    CivicSubscriptionView,
    EasySetup,
    EditIcon,
    EyeIcon,
    Identity,
    Spinner,
    SupportersList,
  },
  data() {
    return {
      hasFetched: false,
      pitch: '',
      isEditingPitch: false,
      isUpdatingPitch: false,
      isShowPitchPreview: false,
    };
  },
  computed: {
    ...mapGetters({
      likerId: 'getUserId',
      user: 'getUserInfo',
      count: 'getMySupportersCount',
      totalQuantity: 'getMySupportersTotalQuantity',
    }),
    totalAmount() {
      return this.totalQuantity * CIVIC_LIKER_UNIT_PRICE;
    },
    pitchPreview() {
      return this.pitch || this.$t('CreatorPitch.Default');
    },
    pitchCharCount() {
      return [
        ...`${this.isEditingPitch ? this.pitch : this.pitchPreview}`,
      ].reduce((count, char) => count + (char.charCodeAt(0) < 127 ? 1 : 2), 0);
    },
    pitchCharLimit() {
      return 150;
    },
  },
  mounted() {
    // eslint-disable-next-line no-console
    this.pitch = this.user.creatorPitch || '';
    this.fetchSupportersIfNecessary();
  },
  methods: {
    ...mapActions(['fetchMySupporters', 'updatePreferences']),

    async fetchSupportersIfNecessary() {
      try {
        if (!this.count) {
          await this.fetchMySupporters();
        }
      } finally {
        this.hasFetched = true;
      }
    },

    startPitchEditing() {
      this.isEditingPitch = true;
      this.$nextTick(() => {
        if (this.$refs.creatorPitchInput) {
          this.$refs.creatorPitchInput.focus();
        }
      });
    },
    async finishPitchEditing() {
      this.isEditingPitch = false;
      if (
        this.pitch !== this.user.creatorPitch &&
        this.pitchCharCount <= this.pitchCharLimit
      ) {
        try {
          this.isUpdatingPitch = true;
          await this.updatePreferences({ creatorPitch: this.pitch });
        } catch (error) {
          // eslint-disable-next-line no-console
          console.error(error);
        } finally {
          this.isUpdatingPitch = false;
        }
      }
    },
  },
};
</script>
