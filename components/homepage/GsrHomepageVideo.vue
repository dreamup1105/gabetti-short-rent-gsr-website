<template>
  <div class="w-full flex px-6 xl:px-0" v-if="'video' in data && data['video']">
    <section class="flex w-full m-auto justify-center max-w-screen-xl">
      <div
        class="gsr-inner-container"
        :class="{'gsr-expanded':isExpanded}"
      >
        <video id="video" class="rounded-xl w-full" controlsList="nodownload noplaybackrate" playsinline controls @ended="onEnd()" preload="none" poster="https://gabettishortrent.fra1.digitaloceanspaces.com/static/cover.png" posterloading="lazy">
            <source :src="data['video'].original_url" :type="data['video'].mime_type">
            <source v-for="item in data['video'].additional" :key="item.original_url" :src="item.original_url" :type="item.mime_type">
            Sorry, your browser doesn't support embedded videos.
        </video>
      </div>
    </section>
  </div>
</template>
<script>

export default {
  name: "GsrHomepageVideo",
  props: {
    data: {
      type: Object,
      default: () => {
      }
    },
  },
  mounted() {
    //this.init()
  },
  data() {
    return {
      observer: null,
      isExpanded: false
    }
  },
  computed: {
    computedVideoUrl() {
      return this.data['video-url'] + '?controls=0&amp;showinfo=0&amp;modestbranding=0&amp;wmode=transparent&amp;rel=0&amp;enablejsapi=1&amp;origin=https%3A%2F%2Fgabettishortrent.it&amp'
    }
  },
  methods: {
    init() {
      var vm = this
      this.observer = new IntersectionObserver(function (entries) {
        //vm.isExpanded = entries[0].isIntersecting
        /*if (entries[0].isIntersecting === true) {
          console.log('Element is fully visible in screen');
        } else {
          console.log('Element partially visible');
        }*/
      }, {threshold: [1]});

      this.observer.observe(document.querySelector("#youtube-player"));
    },
    onEnd: function() {
        let player = document.getElementById('video')
        player.load();
    }
  }
}
</script>

<style lang="scss" scoped>

.gsr-inner-container {
    @apply overflow-hidden h-full w-full transition-all duration-300 ease-in-out;

    &.gsr-expanded {
        @screen lg {
            transform: scale(1.04);
        }
    }
}

</style>
