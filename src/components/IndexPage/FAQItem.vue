<template>
  <div class="bg-white rounded-[24px] overflow-hidden font-[500]">
    <div
      class="
        flex
        items-center
        px-[2rem]
        py-[1.5rem]
        cursor-pointer
      "
      @click="isOpen = !isOpen"
    >
      <h3
        :class="[
          'flex-grow',

          'text-like-green',
          'text-[1.125rem] desktop:text-[1.25rem]',
        ]"
      >
        <slot name="question" />
      </h3>
      <svg
        :class="[
          'transform transition-transform duration-[0.2s] shrink-0',
          {
            'rotate-180': !isOpen,
          },
        ]"
        width="16"
        height="16"
        viewBox="0 0 16 16"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M12.8 10.7943C12.4686 11.2362 11.8418 11.3257 11.4 10.9943L8 8.44434L4.6 10.9943C4.15817 11.3257 3.53137 11.2362 3.2 10.7943C2.86863 10.3525 2.95817 9.72571 3.4 9.39434L7.4 6.39434C7.75555 6.12767 8.24444 6.12767 8.6 6.39434L12.6 9.39434C13.0418 9.72571 13.1314 10.3525 12.8 10.7943Z"
          fill="#28646E"
        />
      </svg>
    </div>

    <Transition @enter="onEnter" @leave="onLeave">
      <div v-show="isOpen">
        <div class="px-[2rem] pb-[1.5rem]">
          <slot name="answer" />
        </div>
      </div>
    </Transition>
  </div>
</template>

<script>
export default {
  name: 'NFTFAQItem',
  props: {
    number: {
      type: Number,
      default: 1,
    },
    isInitialOpen: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      isOpen: this.isInitialOpen,
    };
  },
  methods: {
    onEnter(el, done) {
      this.$gsap.gsap.from(el, {
        height: 0,
        duration: 0.25,
        clearProps: 'height',
        onComplete: () => {
          done();
        },
      });
    },
    onLeave(el, done) {
      this.$gsap.gsap.to(el, {
        height: 0,
        duration: 0.15,
        onComplete: () => {
          done();
        },
      });
    },
  },
};
</script>
