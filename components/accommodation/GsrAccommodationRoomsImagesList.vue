<template>
  <div class="flex w-full pt-16 overflow-auto md:px-4 md:pb-4"
       v-if="accommodation && 'rooms' in accommodation && accommodation.rooms.length">
    <div class="m-auto max-w-screen-lg h-screen">
      <section class="pb-6 md:pb-20 grid grid-cols-1">
        <h2 class="pb-6 pl-6 md:pl-0">{{$t('common.overview_of_accommodation')}}</h2>
        <div class="hidden md:grid gap-4 grid-cols-4 xl:grid-cols-5">
          <div class="relative cursor-pointer w-full shadow-lg"
               @click="onRoomClick(room.id)"
               v-for="(room, index) in accommodation.rooms"
               :key="room.id"
          >
            <picture>
              <source sizes="310px" :srcset="room.media[0].src_set" type="image/webp">
              <source sizes="310px" :srcset="room.media[0].fallback_url" type="image/jpeg">
              <img class="h-full w-full object-cover bg-gray-200"
                   style="aspect-ratio:3/2"
                   loading="eager"
                   width="250"
                   height="200"
                   sizes="310px"
                   :src="room.media[0].fallback_url"
                   :alt="room.media[0].alt"
                   :title="room.title"
                   onerror="this.src='/img-loading-bg.jpg'"
              >
            </picture>
            <div class="opacity-0 rounded-lg hover:opacity-20 duration-300 absolute inset-0 bg-gray-700"></div>
            <span class="pt-3 block font-light text-base">{{ room.title }}</span>
          </div>
        </div>
        <GsrScroller :data="accommodation.rooms" class="md:hidden">
          <div slot-scope="item">
            <div class="relative cursor-pointer w-full"
                 style="width: 18rem"
                 @click="onRoomClick(item.data.id)"
            >
              <picture>
                <source sizes="310px" :srcset="item.data.media[0].src_set" type="image/webp">
                <source sizes="310px" :srcset="item.data.media[0].fallback_url" type="image/jpeg">
                <img class="h-full w-full object-cover rounded-lg hover:opacity-20 bg-gray-200"
                     style="aspect-ratio:3/2"
                     loading="eager"
                     width="250"
                     height="200"
                     sizes="310px"
                     :src="item.data.media[0].fallback_url"
                     :alt="item.data.media[0].alt"
                     :title="item.data.title"
                     onerror="this.src='/img-loading-bg.jpg'"
                >
              </picture>
              <div class="opacity-0 rounded-lg duration-300 absolute inset-0 bg-gray-700"></div>
              <span class="pt-3 block font-light text-base">{{ item.data.title }}</span>
            </div>
          </div>
        </GsrScroller>
      </section>
      <div class="px-6 py-2 md:hidden">
      <GsrDivider/>
      </div>
      <div v-for="(room, index) in accommodation.rooms" style="">
        <div class="flex items-stretch justify-start flex-wrap w-full mx-0">
          <div class="w-full h-full" style="--maxWidth:1120px;">
            <section>
              <div class="py-4">
                <div>
                  <div class="flex flex-wrap justify-start">
                    <div class="relative w-full md:w-2/5">
                      <div :id="`scrollToRoom_${room.id}`" class="sticky top-2 pb-8">
                        <section>
                          <div class="md:pb-4 relative">
                            <div class="md:pb-2 pl-6 md:pl-0">
                                <h2>{{ room.title }}</h2>
                            </div>
                          </div>
                        </section>
                      </div>
                    </div>
                    <div class="relative w-full md:w-3/5">
                      <div class="grid grid-cols-2 gap-3 pb-24 w-full">
                        <div class="relative cursor-pointer w-full shadow"
                             :class="{'col-span-2':index%3===0}"
                             v-for="(media, index) in room.media"
                             :key="index"
                             @click="onRoomImageClick(media.id)"
                        >
                          <picture>
                            <source :sizes="index%3===0 ? '600px':'300px'" :srcset="media.src_set" type="image/webp">
                            <source :sizes="index%3===0 ? '600px':'300px'" :srcset="media.fallback_url"
                                    type="image/jpeg">
                            <img class="h-full w-full object-cover bg-gray-200"
                                 style="aspect-ratio:3/2"
                                 loading="lazy"
                                 :width="index%3===0 ? 600 : 300"
                                 :height="index%3===0 ? 500 : 200"
                                 :sizes="index%3===0 ? '600px':'300px'"
                                 :src="media.fallback_url"
                                 :alt="media.alt"
                                 :title="room.title"
                                 onerror="this.src='/img-loading-bg.jpg'"
                            >
                          </picture>
                          <div
                            class="opacity-0 rounded-lg hover:opacity-20 duration-300 absolute inset-0 bg-gray-700"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import GsrScroller from "../common/GsrScroller";
import GsrDivider from "../common/GsrDivider";

export default {
  name: "GsrAccommodationRoomsImagesList",
  components: {GsrDivider, GsrScroller},
  props: {
    accommodation: {
      type: Object,
      default: 0
    },
  },
  methods: {
    /**
     * @desc On room click
     * @param id
     */
    onRoomClick(id) {
      let elmntToView = document.getElementById(`scrollToRoom_${id}`);
      elmntToView.scrollIntoView({behavior: "smooth"});
    },
    /**
     * @desc On room image click
     * @param id
     */
    onRoomImageClick(id) {
      const index = this.accommodation.media.findIndex(media => {
        return media.id === id;
      });
      this.$emit('input', index)
    }
  }
}
</script>

<style lang="scss" scoped>
.gsr-images-dialog-body {
  padding: 0 !important;

  @screen md {
    @apply p-4;
  }
}
</style>
