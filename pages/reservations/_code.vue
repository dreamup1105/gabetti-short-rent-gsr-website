<template>
  <div class="gsr-reservation">
    <main class="gsr-reservation__list">
      <div class="gsr-reservation__list-inner">
        <div class="grid grid-cols-1 gap-6" v-if="isLoading">
          <GsrSkeletonCard direction="vertical"/>
          <GsrSkeletonCard direction="vertical"/>
          <GsrSkeletonCard direction="vertical"/>
        </div>
        <div v-else>
          <div class="gsr-back-button" @click="$router.push({path: localePath(`/reservations`)})">
            <svg-icon name="arrow-left" class="h-4 w-4"/>
          </div>
          <GsrSlider
            class="md:rounded-t-lg"
            v-if="reservation.accommodation.media.length > 0 "
            :data="reservation.accommodation.media"
            :per-page="1"
            :slideLength="reservation.accommodation.media.length"
            arrows
            pagination-on-content
          >
            <div
              slot-scope="item" class="cursor-pointer md:rounded-t-lg w-full h-full"
            >
              <picture class="h-full w-full">
                <source :srcset="item.data.src_set" type="image/webp">
                <source :srcset="item.data.fallback_url" type="image/jpeg">
                <img class="md:rounded-t-lg"
                     loading="lazy"
                     style="height: 100%;width: 100%;aspect-ratio: 4/3"
                     :src="item.data.fallback_url"
                     :alt="item.data.alt"
                     :title="reservation.accommodation.title"
                     onerror="this.src='/fallback-accommodation-image.jpeg'"
                >
              </picture>
            </div>
          </GsrSlider>
          <!-- reservation data -->
          <GsrReservationDetailBlock :title="reservation.accommodation.title">
            <div class="flex flex-row items-center w-full pt-4">
              <div class="flex flex-col w-full">
                <span class="font-medium text-base pb-2">Check-in</span>
                <span class="text-base font-normal">{{ moment(reservation.start_date).format("D MMM YYYY") }}</span>
              </div>
              <div class="flex flex-col w-full border-l border-gray-200 pl-4 ml-4">
                <span class="font-medium text-base pb-2">Checkout</span>
                <span class="text-base font-normal">{{ moment(reservation.end_date).format("D MMM YYYY") }}</span>
              </div>
            </div>
            <GsrReservationDetailActionsList v-if="reservation.has_blocking_status" @onElementClick="onElementClick"
                                             :items="reservationDataActions"/>
          </GsrReservationDetailBlock>
          <!-- Reservation details -->
          <GsrReservationDetailBlock :title="$t('reservation.detail.reservation_details')" bordered>
            <div class="flex flex-col space-y-2 w-full">
              <div class="flex flex-col w-full border-b border-gray-200 py-4">
                <span class="font-medium text-base pb-2">{{ $t('common.guests') }}</span>
                <div class="flex flex-row items-center">
                  <span class="text-base font-normal">{{ reservation.adults }} {{ $t('common.adults') }}</span>
                  <span v-if="reservation.children" class="text-base font-normal">, {{
                      reservation.children
                    }} {{ $t('common.children') }}</span>
                  <span v-if="reservation.newborns" class="text-base font-normal">, {{
                      reservation.newborns
                    }} {{ $t('common.newborns') }}</span>
                  <span v-if="reservation.pets" class="text-base font-normal">, {{
                      reservation.pets
                    }} {{ $t('common.pets') }}</span>
                </div>
              </div>
              <div class="flex flex-col w-full py-4 border-b border-gray-200" v-if="'status' in reservation">
                <span class="font-medium text-base pb-2">Status</span>
                <span class="text-base font-normal">{{
                    $t(`reservation.status.${reservation.status.toLowerCase()}`)
                  }}</span>
              </div>
              <div class="flex flex-col w-full py-4">
                <span class="font-medium text-base pb-2">{{ $t('reservation.detail.confirmation_code') }}</span>
                <span class="text-base font-normal">{{ reservation.code }}</span>
              </div>
            </div>
            <!--            <GsrReservationDetailActionsList @onElementClick="onElementClick" :items="reservationDetailsActions"/>-->
          </GsrReservationDetailBlock>
          <!-- Guests -->
          <GsrReservationDetailBlock v-if="reservation" class="md:rounded-b-lg" :title="$t('reservation.detail.guests')" bordered>
            <GsrReservationGuestsList @updated="onReservationGuestsListUpdate" :reservation="reservation"/>
          </GsrReservationDetailBlock>
          <!-- Getting there -->
          <GsrReservationDetailBlock v-if="reservation.has_blocking_status"
                                     :title="$t('reservation.detail.getting_there')" bordered>
            <div class="flex flex-col space-y-2 w-full">
              <div class="flex flex-col w-full py-4">
                <span class="font-medium text-base pb-2">{{ $t('common.address') }}</span>
                <span class="text-base font-normal">{{ reservation.accommodation.address.street }}</span>
              </div>
            </div>
            <GsrReservationDetailActionsList @onElementClick="onElementClick" :items="reservationGettingThereActions"/>
          </GsrReservationDetailBlock>
          <!-- Payment info -->
          <GsrReservationDetailBlock class="md:rounded-b-lg" :title="$t('reservation.detail.payment_info')" bordered
                                     v-if="reservation.currency">
            <div class="flex flex-col space-y-2 w-full">
              <div class="flex flex-col w-full py-4">
                <span class="font-medium text-base pb-2">{{ $t('reservation.detail.payment_detail') }}</span>
                <span class="text-base font-normal">{{ $t('common.total') }} {{ reservation.currency.symbol }} {{
                    reservation.price_with_vat
                  }} {{ reservation.currency.name }}</span>
              </div>
              <div class="flex flex-col w-full py-4" v-if="'payment_data' in reservation && reservation.payment_method === 'BANK_TRANSFER'">
                <span class="font-medium text-base pb-2">{{ $t('reservation.detail.detail_for_payment') }}</span>
                <ul>
                  <li><strong>{{ $t('common.bank') }}: </strong>{{reservation.payment_data.bank}}</li>
                  <li><strong>Cab: </strong>{{reservation.payment_data.cab}}</li>
                  <li><strong>Iban: </strong>{{reservation.payment_data.iban}}</li>
                  <li><strong>Abi:</strong>{{reservation.payment_data.abi}}</li>
                  <li><strong>Swift: </strong>{{reservation.payment_data.swift}}</li>
                  <li><strong>{{ $t('common.bank_account') }}: </strong>{{reservation.payment_data.bank_account}}</li>
                </ul>
              </div>
            </div>
            <GsrReservationDetailActionsList v-if="reservation.has_blocking_status" @onElementClick="onElementClick"
                                             :items="reservationPaymentInfoActions"/>
          </GsrReservationDetailBlock>
          <!-- Support -->
          <!--          <GsrReservationDetailBlock class="md:rounded-b-lg" :title="$t('common.support')" bordered>
                      <GsrReservationDetailActionsList @onElementClick="onElementClick" :items="reservationHelpActions"/>
                    </GsrReservationDetailBlock>-->
        </div>
      </div>
    </main>
    <div class="gsr-reservation__map-container">
      <div class="gsr-reservation__map-container-inner">
        <GsrLeaflet class="hidden md:block" :zoom-control="false" :map-center="reservation.accommodation.address" v-if="!reservation.has_blocking_status"
                    :entities="[reservation.accommodation]">
          <template v-slot:tooltip="item" class="cursor-pointer text-center p-4">
            <div class="cursor-pointer text-center p-4">
              <span>{{ $t('reservation.exact_position_message') }}</span>
            </div>
          </template>
          <template v-slot:marker="item">
            <div style="background-color: rgba(185, 28, 28, 0.30);"
                 class="flex flex-row w-24 h-24 shadow-lg rounded-full transition-all duration-200 ease-in-out text-white">
              <div class="w-10 h-10 bg-red-600 m-auto flex flex-row shadow-lg font-bold rounded-full">
                <div class="m-auto">
                  <svg-icon class="h-4 w-4" name="location-outline"/>
                </div>
              </div>
            </div>
          </template>
        </GsrLeaflet>
        <GsrLeaflet v-else class="hidden md:block" :map-center="reservation.accommodation.address" :entities="[reservation.accommodation]">
          <template v-slot:marker="item">
            <div class="w-8 h-8 bg-red-600 m-auto flex flex-row shadow-lg font-bold rounded-full">
              <div class="m-auto text-white">
                <svg-icon class="h-4 w-4" name="location-outline"/>
              </div>
            </div>
          </template>
        </GsrLeaflet>
      </div>
    </div>
  </div>
</template>

<script>
import moment from "moment";
import {compact} from "lodash";
import FileSaver from 'file-saver';
import GsrReservationGuestsList from "../../components/reservation/GsrReservationGuestsList";

const GsrSlider = () => import('@/components/common/GsrSlider');
const GsrSkeletonCard = () => import('@/components/cards/GsrSkeletonCard');
const GsrDivider = () => import('~/components/common/GsrDivider.vue');
const GsrReservationDetailBlock = () => import('~/components/reservation/GsrReservationDetailBlock.vue');
const GsrReservationDetailActionsList = () => import('~/components/reservation/GsrReservationDetailActionsList.vue');

export default {
  name: "Code",
  middleware: "logged",
  components: {
    GsrReservationGuestsList,
    GsrSlider,
    GsrSkeletonCard,
    GsrDivider,
    GsrReservationDetailBlock,
    GsrReservationDetailActionsList,
    GsrLeaflet: () => process.client ? import('@/components/common/GsrLeaflet') : null,
  },
  data() {
    const actions = {
      getDirections: 'get_directions',
      changeReservation: 'change_reservation',
      cancelReservation: 'cancel_reservation',
      printReservation: 'print_reservation',
      copyAddress: 'copy_address',
      getReceipt: 'get_receipt',
      getHelp: 'get_help',
    };
    return {
      moment,
      isLoading: false,
      actions,
      reservation: {
        accommodation: {
          media: [],
          address: {
            latitude: 0,
            longitude: 0
          }
        }
      },
      reservationDataActions: [
        {
          icon: 'pin-bold',
          title: this.$t('reservation.detail.get_directions'),
          action: actions.getDirections,
        }
      ],
      reservationDetailsActions: [
        {icon: 'edit', title: this.$t('reservation.detail.change_reservation'), action: actions.changeReservation},
        {
          icon: 'clipboard-close-bold',
          title: this.$t('reservation.detail.cancel_reservation'),
          action: actions.cancelReservation
        },
        {icon: 'printer-bold', title: this.$t('reservation.detail.print_details'), action: actions.printReservation},
      ],
      reservationGettingThereActions: [
        {icon: 'document-copy-bold', title: this.$t('reservation.detail.copy_address'), action: actions.copyAddress},
        {icon: 'pin-bold', title: this.$t('reservation.detail.get_directions'), action: actions.getDirections},
      ],
      reservationPaymentInfoActions: [
        {icon: 'receipt-bold', title: this.$t('reservation.detail.get_receipts'), action: actions.getReceipt}
      ],
      reservationHelpActions: [
        {icon: 'message-question-bold', title: this.$t('reservation.detail.help_center'), action: actions.getHelp},
        //{icon: 'house-plus', title: this.$t('reservation.detail.solution_center')},
      ],
    }
  },
  mounted() {
    this.getReservation()
  },
  methods: {
    /**
     * @desc On reservation guests list update callback
     * @returns {Promise<void>}
     */
    async onReservationGuestsListUpdate(){
      this.reservation.guests = (await this.$services.reservations.getReservationGuests(this.reservation.code, this.$i18n.locale)).data;
    },
    /**
     * @desc On element click
     * @param action
     */
    onElementClick(action) {
      switch (action) {
        case this.actions.getDirections:
          window.open(`https://www.google.com/maps/place/${this.reservation.accommodation.address.latitude},${this.reservation.accommodation.address.longitude}`)
          break;
        case this.actions.copyAddress:
          const accommodationAddress = this.reservation.accommodation.address
          const address = compact([accommodationAddress.street, accommodationAddress.city, accommodationAddress.region, accommodationAddress.postal_code, accommodationAddress.country]).join(', ')
          navigator.clipboard.writeText(address)
          this.$toast.success(this.$t('common.copied_to_clipboard'))
          break;
        case this.actions.getHelp:
          const routedData = this.$router.resolve({path: this.localePath(`/help`)})
          window.open(routedData.href, '_blank')
          break;
        case this.actions.getReceipt:
          this._downloadMedia('order');
          break;
        default:
          this.$t('common.error')
      }
    },

    /**
     * @desc Get reservation
     * @returns {Promise<void>}
     */
    async getReservation() {
      this.isLoading = true
      try {
        window.scrollTo({top: 0, behavior: 'smooth'});
        this.reservation = (await this.$services.reservations.getReservation(this.$route.params.code, this.$i18n.locale)).data
      } catch (e) {
        console.error(e)
      } finally {
        this.isLoading = false
      }
    },
    /**
     * @desc On download
     * @returns {Promise<void>}
     * @param type
     */
    async _downloadMedia(type) {
      try {
        this.loading = true;
        const response = await this.$services.reservations.downloadOrder(this.reservation.code, this.$i18n.locale);
        const filename = response.headers['content-disposition']
          .split(';')
          .find(n => n.includes('filename='))
          .replace('filename=', '')
          .trim();
        FileSaver.saveAs(response.data, filename);
      } catch (e) {
        this.$toast.error(this.$t('common.error'));
      } finally {
        this.loading = false;
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/css/_variables.scss';

.gsr-reservation {
  @apply flex w-full h-full;

  &__list {
    @apply bg-gray-100 w-full;

    @screen md {
      @apply pt-4;
    }

    @screen lg {
      width: 60%;
    }

    @screen xl {
      @apply w-full max-w-screen-md;
    }

    &-inner {
      @apply shadow-lg rounded-b-lg;

      @screen md {
        @apply mx-4;
      }
    }
  }

  &__map-container {
    @apply hidden;
    width: 0;
    display: block;
    height: unset;
    position: unset;
    top: unset;
    visibility: unset;

    &-inner {
      @apply sticky z-10 w-full inline-block;
      top: $navbar-height;
      height: calc(100vh - #{$navbar-height});
    }

    @screen lg {
      width: 40%;
    }
    @screen xl {
      @apply w-full;
    }
  }

  .gsr-back-button {
    color: $primary-dark;
    @apply bg-white rounded-full shadow-lg w-8 h-8 border border-gray-200 transition-all duration-100 ease-in-out cursor-pointer absolute flex m-4;
    z-index: 11;

    svg {
      @apply m-auto;
    }

    &:active {
      -webkit-animation: zoomTransition 500ms linear;
    }
  }
}
</style>
