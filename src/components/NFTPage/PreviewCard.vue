<template>
  <CardV2
    :class="[
      'flex',
      'flex-col',

      'overflow-hidden',

      'border-[1px]',
      'border-shade-gray',
    ]"
    :has-padding="false"
  >
    <div
      v-if="imageUrl"
      class="h-[180px]"
      :style="`background-color: ${imageBgColor}`"
    >
      <img
        class="object-cover w-full max-h-[180px]"
        :src="imageUrl"
      >
    </div>
    <div
      v-else
      class="h-[180px]"
    >
      <img
        class="object-cover h-full max-h-[180px]"
        src="~/assets/images/nft/primitive-nft.png"
      >
    </div>
    <div
      :class="[
        'flex',
        'flex-col',
        'justify-center',
        'items-center',
        'whitespace-pre-line',
        'break-all',
        'px-[24px]',
        'pt-[48px]',
        'py-[24px]',
        'relative',
      ]"
    >
      <div class="flex flex-col items-center justify-center mt-[-70px]">
        <Identity
          :avatar-url="avatarUrl"
          :avatar-size="avatarSize"
          :is-avatar-outlined="isAvatarOutlined"
        />
        <NuxtLink
          class="flex mt-[8px]"
          :to="`/${iscnOwner}`"
        >
          <Label class="text-medium-gray" text="by" />
          <Label class="text-like-green ml-[4px] font-600">{{
            displayName | ellipsis
          }}</Label>
        </NuxtLink>
      </div>
      <Label
        class="mt-[12px]"
        content-class="line-clamp-2"
        preset="h5"
        align="center"
        :text="nftName"
      />
      <Label
        class="mt-[12px]"
        content-class="line-clamp-4"
        preset="p5"
        :text="nftDescription | ellipsisDescription"
      />
      <ButtonV2
        v-if="nftPrice"
        class="mt-[16px]"
        :text="formattedNFTPrice"
        preset="secondary"
        @click="handleClickCollect"
      >
        <template #prepend>
          <IconPrice />
        </template>
      </ButtonV2>
      <hr v-if="nftPrice && nftExternalUrl" class="w-[32px] border-shade-gray mt-[12px]">
      <div v-if="nftExternalUrl" class="flex justify-center">
        <ButtonV2
          preset="outline"
          class="my-[16px]"
          :href="nftExternalUrl"
          :text="$t('nft_details_page_button_view')"
        >
          <template #prepend>
            <IconView />
          </template>
          <template #append>
            <IconNorthEast />
          </template>
        </ButtonV2>
      </div>
      <!-- Metadata desktop:hidden -->
      <div :class="['flex', 'desktop:hidden', 'justify-center']">
        <ButtonV2 preset="outline" :href="iscnUrl" :text="$t('nft_details_page_button_metadata')">
          <template #prepend>
            <IconCode />
          </template>
          <template #append>
            <IconNorthEast />
          </template>
        </ButtonV2>
      </div>
    </div>
  </CardV2>
</template>

<script>
import { ellipsis, ellipsisDescription } from '~/util/ui';

export default {
  name: 'ItemCard',
  filters: {
    ellipsis,
    ellipsisDescription,
  },
  props: {
    // BackgroundImg
    imageBgColor: {
      type: String,
      default: undefined,
    },
    imageUrl: {
      type: String,
      default: undefined,
    },

    // Identity
    avatarUrl: {
      type: String,
      default: undefined,
    },
    avatarSize: {
      type: Number,
      default: 40,
    },
    isAvatarOutlined: {
      type: Boolean,
      default: false,
    },

    // Creater Info
    iscnOwner: {
      type: String,
      default: undefined,
    },
    displayName: {
      type: String,
      default: undefined,
    },

    // NFT Info
    nftName: {
      type: String,
      default: undefined,
    },
    nftDescription: {
      type: String,
      default: undefined,
    },
    nftPrice: {
      type: Number,
      default: undefined,
    },
  },
  computed: {
    formattedNFTPrice() {
      return `${this.nftPrice || '-'} LIKE`;
    },
  },
  methods: {
    handleClickCollect() {
      this.$emit('collect');
    },
  },
};
</script>