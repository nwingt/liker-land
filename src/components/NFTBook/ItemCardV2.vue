<template>
  <div class="relative flex flex-col">
    <client-only>
      <lazy-component
        class="absolute inset-0 pointer-events-none -top-full"
        @show.once="fetchInfo"
      />
    </client-only>

    <NFTBookCoverWithFrame
      tag="NuxtLink"
      class="group"
      :class-aspect-ratio="classCoverFrameAspectRatio"
      cover-class="group-hover:scale-[1.02] transition-transform"
      :cover-resize="coverResize"
      :src="NFTImageUrl"
      :alt="NFTName"
      :to="nftCollectRoute"
      :event="isLinkDisabled ? '' : 'click'"
      @click.native="$emit('click-cover', $event)"
    />

    <div
      class="mt-[8px] text-[#333] text-[1rem] font-[500] laptop:text-[1.125rem]"
    >
      {{ NFTName }}
    </div>

    <div class="text-[#8B8B8B] text-[0.875rem] laptop:text-[1rem]">
      {{ (iscnWorkAuthor || creatorDisplayName) | ellipsis }}
    </div>

    <div class="mt-[16px] text-[#1F1F1F] text-[0.875rem] laptop:text-[1rem]">
      {{ nftBookAvailablePriceLabel || $t('nft_details_page_label_sold_out') }}
    </div>
  </div>
</template>

<script>
import nftMixin from '~/mixins/nft';

import { ellipsis } from '~/util/ui';

export default {
  filters: {
    ellipsis,
  },
  mixins: [nftMixin],
  props: {
    classId: {
      type: String,
      required: true,
    },
    classCoverFrameAspectRatio: {
      type: String,
      default: 'aspect-[4/5]',
    },
    coverResize: {
      type: Number,
      default: 300,
    },
    isLinkDisabled: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    creatorDisplayName() {
      return (
        this.getUserInfoByAddress(this.iscnOwner)?.displayName || this.iscnOwner
      );
    },
  },
  methods: {
    async fetchInfo() {
      await this.lazyFetchNFTClassAggregatedData();
    },
  },
};
</script>
