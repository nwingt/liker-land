<template lang="pug">
  mixin Separator
    hr.w-48.h-px.my-40.bg-gray-d8

  main.max-w-desktop.w-full.mx-auto.pb-72
    FeatureImageSection
    +Separator
    EffectiveSection.mt-16
    +Separator
    BetterWorldSection
    +Separator
    SuggestedCreatorsSection(:contents="contents")

</template>

<script>
import { mapActions, mapGetters } from 'vuex';

import Button from '../Button/Button';

import BetterWorldSection from './sections/BetterWorldSection';
import EffectiveSection from './sections/EffectiveSection';
import FeatureImageSection from './sections/FeatureImageSection';
import SuggestedCreatorsSection from './sections/SuggestedCreatorsSection';

export default {
  name: 'CivicLikerPageWithoutCreator',
  components: {
    BetterWorldSection,
    Button,
    EffectiveSection,
    FeatureImageSection,
    SuggestedCreatorsSection,
  },
  computed: {
    ...mapGetters(['getSuggestedArticles']),
    contents() {
      return this.getSuggestedArticles.slice(0, 6);
    },
  },
  mounted() {
    this.fetchSuggestedArticles();
  },
  methods: {
    ...mapActions(['fetchSuggestedArticles']),
  },
};
</script>
