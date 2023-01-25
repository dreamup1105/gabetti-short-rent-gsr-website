<template>
  <div class="gsr-accommodation-page max-w-screen-xl">
    <!-- Breadcrumb -->
    <div class="grid grid-cols-1 gap-4 mt-8">
      <h1 class="text-xl lg:text-4xl">{{ accommodation ? accommodation.title : null }}</h1>

      <div class="flex flex-row headline items-center">
        <div v-for="attribute in accommodation.attributes.headline" :key="attribute.id">
          <span class="lowercase text-sm text-gray-500"
                v-if="attribute.value !== true && attribute.value !== false">{{ attribute.value }} {{
              attribute.name
            }}</span>
          <span class="lowercase text-sm text-gray-500" v-if="attribute.value === true">{{ attribute.name }}</span>
          <span class="lowercase text-sm text-gray-500 line-through" v-if="attribute.value === false">{{
              attribute.name
            }}</span>
        </div>
      </div>

      <div class="flex flex-row justify-between items-center">
        <div class="flex flex-row items-center">
          <svg-icon class="h-4 w-4 mr-2" name="location-outline"/>
          <span class="text-sm text-gray-500 underline" v-if="computedAddress">{{
              computedAddress.city
            }} - {{ computedAddress.region }} ({{ computedAddress.country }})</span>
        </div>
        <div class="flex justify-end items-center flex-row">
          <div
            :class="{'pointer-events-none opacity-50':isWishlistLoading}"
            @click="onWishlistButtonClick"
            class="flex flex-row items-center hover:bg-gray-50 rounded-lg py-2 px-2 cursor-pointer">
            <GsrHeartIcon class="h-4 w-4 md:mr-2" :selected="!!wishlist"/>
            <span class="underline font-medium text-sm hidden md:block">{{
                wishlist ? $t('common.saved') : $t('common.save_to_favourites')
              }}
            </span>
          </div>
          <!--          <div class="md:ml-4 flex flex-row items-center hover:bg-gray-50 rounded-lg py-2 px-2 cursor-pointer">
                      <svg-icon class="h-4 w-4 md:mr-2" name="share-outline"/>
                      <span class="underline font-medium text-sm hidden md:block">{{ $t('common.share') }}</span>
                    </div>-->
        </div>
      </div>
    </div>
    <!-- Media -->
    <div class="gsr-main-media" @click="isImagesDialogOpen = true">
      <figure
          :style="{backgroundImage: `url(${blurImageURL(accommodation.media[0].fallback_url)})`}"
      >
      <nuxt-img
        :class="imageIsLoaded ? 'opacity-100' : 'opacity-0'"
        :src="pathURL(accommodation.media[0].fallback_url)"
        :alt="accommodation.media[0].alt"
        :title="accommodation.title"
        loading="eager"
        provider="twicpics"
        @load="onImageLoad"
        onerror="this.src='/img-loading-bg.jpg'"
      />
      </figure>


      <div class="opacity-0 rounded-lg hover:opacity-20 duration-300 absolute inset-0 bg-gray-700"></div>
      <div class="absolute bottom-0 left-0 right-0 z-20 flex mb-4 cursor-pointer">
        <div class="m-auto bg-white rounded-lg py-2 px-4 shadow-lg border border-gray-600 text-sm">
          {{ $t('common.show_all_pictures') }}
        </div>
      </div>
    </div>

    <!-- Main Container -->
    <div class="gsr-columns-wrapper">
      <!-- LEFT COLUMN -->
      <div class="gsr-left-column">
        <!--        Description-->
        <section class="flex flex-col" v-if="accommodation">
          <h2 style="overflow-wrap: break-word;" class="text-2xl md:text-4xl font-normal"
              v-html="$sanitize(accommodation.short_description)"/>
          <GsrDivider class="my-8" v-if="accommodation.short_description"/>
          <div class="inline-block">
            <div class="font-normal text-base leading-relaxed" v-html="$sanitize(computedDescription)"/>
            <button
              v-if="!isFullDescriptionVisible && accommodation.description && accommodation.description.length >=300"
              @click="isFullDescriptionVisible = true" class="text-base underline font-medium">
              {{ $t('common.continue_to_read') }}
            </button>
          </div>
        </section>
        <!-- Video -->
        <div v-if="accommodation.video">
          <GsrDivider class="my-8"/>
          <video style="aspect-ratio: 16/9"
                 class="w-full h-full rounded-lg"
                 playsinline
                 controls
                 controlsList="nodownload"
                 preload="metadata"
          >
            <source
              :src="accommodation.video.original_url"
              :type="'video/'+accommodation.video.extension"
            >
            Your browser does not support the video tag.
          </video>
        </div>
        <GsrDivider class="my-8"/>
        <!-- Main Services -->
        <AccommodationSection v-show="accommodation.attributes.main.length > 0" class="mt-12"
                              :title="$t('common.main_features')">
          <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div class="flex flex-row items-center" v-for="attribute in accommodation.attributes.main"
                 :key="attribute.key">
              <span class="capitalize font-normal text-base">
                        <span v-if="attribute.value !== true && attribute.value !== false">{{
                            attribute.value
                          }} {{ attribute.name }}</span>
                        <span v-if="attribute.value === true">{{ attribute.name }}</span>
                    </span>
            </div>
          </div>
        </AccommodationSection>
        <GsrDivider class="my-8"/>
        <!-- Amenities -->
        <AccommodationSection
          v-show="accommodation.attributes.essentials.length > 0 || accommodation.attributes.indoor.length > 0 || accommodation.attributes.outdoor.length > 0"
          class="mt-12" :title="$t('common.services_and_amenities')">
          <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div v-show="accommodation.attributes.essentials.length > 0" class="flex flex-col">
              <span class="font-semibold text-base">{{ $t('common.essential_services') }}</span>
              <div class="grid grid-cols-1 gap-4 mt-8">
                <span class="capitalize font-normal text-base" v-for="attribute in accommodation.attributes.essentials"
                      :key="attribute.key">{{
                    attribute.name
                  }}</span>
              </div>
            </div>
            <div v-show="accommodation.attributes.indoor.length > 0" class="flex flex-col">
              <span class="font-semibold text-base">{{ $t('common.indoor') }}</span>
              <div class="grid grid-cols-1 gap-4 mt-8">
                <span class="capitalize font-normal text-base" v-for="attribute in accommodation.attributes.indoor"
                      :key="attribute.key">{{
                    attribute.name
                  }}</span>
              </div>
            </div>
            <div v-show="accommodation.attributes.outdoor.length > 0" class="flex flex-col">
              <span class="font-semibold text-base">{{ $t('common.outdoor') }}</span>
              <div class="grid grid-cols-1 gap-4 mt-8">
                <span class="capitalize font-normal text-base" v-for="attribute in accommodation.attributes.outdoor"
                      :key="attribute.key">{{
                    attribute.name
                  }}</span>
              </div>
            </div>
          </div>
        </AccommodationSection>

        <GsrDivider class="my-8"/>
        <!-- ADDONS -->
        <AccommodationSection class="mt-12" v-show="accommodation.attributes.addons.length > 0"
                              :title="$t('common.additional_services')">
          <div class="grid grid-cols-1">
            <div class="flex flex-col">
              <div class="grid grid-cols-3 gap-4">
                        <span class="capitalize font-normal text-base"
                              v-for="attribute in accommodation.attributes.addons"
                              :key="attribute.key">{{
                            attribute.name
                          }}</span>
              </div>
            </div>
          </div>
        </AccommodationSection>
      </div>

      <!-- RIGHT COLUMN -->
      <div class="gsr-right-column">
        <!--        Preview price box for small devices-->
        <div class="gsr-preview-price-box">
          <div class="gsr-preview-price-box__inner">
            <div @click.prevent="isPriceBoxVisible = true" class="flex flex-row w-full justify-between items-center">
              <div class="flex justify-start items-center">
              <span class="text-md" v-if="!isDateSelected">{{
                  $t('common.add_dates_for_prices')
                }}</span>
                <span v-else><strong class="text-xl">{{ price.total }} &euro; </strong> {{ $t('common.total') }}</span>
              </div>
              <GsrButton :loading="isLoading" :disabled="!accommodation.has_minimum_reservable_nights"
                         @click="onButtonClick;isPriceBoxVisible=true">
                <div class="text-center w-full">
                  <span v-if="!computedIsPayable && isDateSelected">{{
                      loggedIn ? $t('common.reservation_request') : $t('common.login_and_reserve')
                    }}</span>
                  <span v-else-if="accommodation.has_minimum_reservable_nights && isDateSelected">{{
                      loggedIn ? $t('common.reserve') : $t('common.login_and_reserve')
                    }}</span>
                  <span v-else-if="!accommodation.has_minimum_reservable_nights">{{ $t('common.not_available') }}</span>
                  <span v-else>{{ $t('common.check_availability') }}</span>
                </div>
              </GsrButton>
            </div>
          </div>
        </div>
        <!--        Price box full form-->
        <div class="gsr-price-box" :class="{'gsr-visible':isPriceBoxVisible}">
          <div v-if="computedIsReservableOnlyRequest">
            <div class="flex flex-col space-y-4">
              <span>{{ $t('reservation.reservable_only_with_request') }}</span>
                <div class="w-full">
                  <GsrButton class="w-full"  :loading="isLoading" @click="$router.push({path: localePath(`/contact-request`),query:{'destination':accommodation.title}})">
                    <div class="text-center w-full">
                      <span>{{ $t('common.send_request') }}</span>
                    </div>
                  </GsrButton>
                </div>
            </div>
          </div>
          <div v-else class="flex flex-col">
            <div class="flex flex-row items-center justify-between">
              <GsrLoader v-if="isFetchingBlockedDays || isFetchingPrice || isFetchingPrices"/>
              <div v-else>
                <span class="text-lg" v-if="!isDateSelected">{{
                    $t('common.add_dates_for_prices')
                  }}</span>
                <span v-else><strong class="text-lg">{{
                    price.per_night_without_taxes
                  }} &euro; </strong> &#47; {{ $t('common.night') }}</span>
              </div>
              <svg-icon class="h-4 w-4 cursor-pointer lg:hidden"
                        @click="isPriceBoxVisible=false" name="arrow-down"/>
            </div>
            <div class="flex flex-col border border-gray-400 rounded-lg mt-4">
              <div class="p-2">
                <label class="uppercase text-xs font-medium">CHECK-IN / CHECK-OUT *</label>
                <GsrDatepicker ref="datepicker"
                               @input="onDateChange"
                               :half-day="false"
                               :starting-date-value="computedStartingDateValue"
                               :ending-date-value="computedEndingDateValue"
                               :min-nights="accommodation.minimum_stay ? accommodation.minimum_stay : 1"
                               :max-nights="accommodation.maximum_stay ? accommodation.maximum_stay : 0"
                               position-right
                               disable-checkout-on-checkin
                               :disabled-dates="blockedDays"
                               v-model="form.date"
                />
              </div>
              <div class="p-2 border-t border-gray-400">
                <label class="uppercase text-xs font-medium">{{ $t('common.guests') }} *</label>
                <GsrGuestsDropdown :max-guests="accommodation.maximum_guests || Infinity" v-model="form.guests"/>
              </div>
              <div class="p-2 border-t border-gray-400" v-if="isDateSelected && computedIsPayable">
                <label class="uppercase text-xs font-medium">{{ $t('common.payment_method') }} *</label>
                <GsrSelect :options="paymentMethods" v-model="form.payment_method"/>
              </div>
              <div class="p-2 border-t border-gray-400"
                   v-if="accommodation.is_reservable_with_deposit && isDateSelected && form.payment_method === 'CREDIT_CARD' && computedIsPayable">
                <label class="uppercase text-xs font-medium">{{ $t('common.payment_solution') }} *</label>
                <GsrSelect :options="paymentSolutions"
                           @input="onPaymentSolutionChange"
                           v-model="form.payment_solution"
                />
              </div>
              <div class="p-2 border-t border-gray-400" v-if="isDateSelected">
                <GsrInput
                  style="padding: 0"
                  class="border-none"
                  v-model="form.coupon"
                  @input.native="onCouponInput"
                  :disabled="isLoading"
                  :placeholder="$t('common.add_coupon')"
                  :error="!!form.coupon && price && price.coupon && !price.coupon.is_valid"
                  :label="$t('common.coupon')"
                />
              </div>
            </div>
            <GsrButton :loading="isLoading"
                       class="mt-4"
                       :disabled="!accommodation.has_minimum_reservable_nights"
                       :bg-color="isDateSelected && loggedIn ? 'red':'default'"
                       @click="onButtonClick">
              <div class="text-center w-full py-1">
                <span v-if="!computedIsPayable && isDateSelected">{{
                    loggedIn ? $t('common.reservation_request') : $t('common.login_and_reserve')
                  }}</span>
                <span v-else-if="accommodation.has_minimum_reservable_nights && isDateSelected">{{
                    loggedIn ? $t('common.reserve') : $t('common.login_and_reserve')
                  }}</span>
                <span v-else-if="!accommodation.has_minimum_reservable_nights">{{ $t('common.not_available') }}</span>
                <span v-else>{{ $t('common.check_availability') }}</span>
              </div>
            </GsrButton>
            <div class="text-sm font-light mt-4 text-center flex flex-col" v-if="isDateSelected">
              <span v-if="!computedIsPayable">{{ $t('reservation.confirm_message_not_payable') }}</span>
              <div v-else class="flex flex-col">
              <span
                v-if="isDateSelected && form.payment_method === 'BANK_TRANSFER'">
                {{ $t('reservation.confirm_message_bank_transfer') }}
              </span>
                <p class="mb-3 font-medium"
                   v-if="isDateSelected && form.payment_method === 'CREDIT_CARD'">{{
                    $t('reservation.confirm_message_pos')
                  }}
                  <nuxt-link class="underline" :to="getPermalink('Terms')"
                             v-if="isDateSelected && form.payment_method === 'CREDIT_CARD'">{{ $t('common.readmore') }}
                  </nuxt-link>
                </p>
              </div>


              <span v-if="isDateSelected">{{ $t('reservation.total_price_vat_message') }}</span>
              <span v-if="!isDateSelected">{{ $t('reservation.insert_date_message') }}</span>
            </div>
            <!-- Price details list -->
            <div class="flex flex-col w-full space-y-4 mt-6" v-if="isDateSelected">
              <GsrAccordion title="Servizi Extra" v-if="extraServices.length">
                <div class="flex flex-col font-light">
                  <div v-for="extraService in extraServices" :key="'extra-service-'+extraService.id"
                       class="py-4 border-t border-gray-200">
                    <!-- Checkboxes -->
                    <div class="flex flex-col w-full"
                         v-if="!extraService.has_multiple_options &&
                         extraService.type !=='QUANTITY' && extraService.type !=='QUANTITY_DAY'">
                      <div class="flex flex-row w-full justify-between items-center">
                        <span class="text-sm">{{ extraService.title }}</span>
                        <input v-model="form.extraServices[extraService.id]" type="checkbox">
                      </div>
                    </div>
                    <!-- Quantity -->
                    <div v-if="(extraService.type ==='QUANTITY' || extraService.type ==='QUANTITY_DAY')"
                         class="flex flex-col w-full text-left">
                      <span class="text-sm">{{ extraService.title }}</span>
                      <GsrSelect
                        v-model="form.extraServices[extraService.id]"
                        class="pl-2"
                        placeholder-option
                        :options="getExtraServiceOptions(extraService)"
                      />
                    </div>

                    <!--                    Quantity with per person option choice-->
                    <div v-if="(extraService.type ==='QUANTITY' || extraService.type ==='QUANTITY_DAY')
                    && extraService.has_maximum_quantity === 'YES_PER_PERSON'"
                         class="flex flex-col w-full text-left">
                      <span class="text-sm">{{ extraService.title }}</span>
                      <div class="pl-2">
                        <small>{{ $t('common.adults') }}</small>
                        <GsrSelect
                          v-model="form.extraServices[extraService.id].adults"
                          class="pl-2"
                          placeholder-option
                          :options="getExtraServiceOptions(extraService)"
                        />
                      </div>
                      <div class="pl-2">
                        <small>{{ $t('common.children') }}</small>
                        <GsrSelect
                          class="pl-2"
                          v-model="form.extraServices[extraService.id].children"
                          placeholder-option
                          :options="getExtraServiceOptions(extraService,'children')"
                        />
                      </div>
                    </div>
                    <div v-if="extraService.has_multiple_options" class="flex flex-col w-full text-left">
                      <span class="text-sm">{{ extraService.title }}</span>
                      <GsrSelect
                        v-model="form.extraServices[extraService.id]"
                        class="pl-2"
                        placeholder-option
                        :options="getExtraServiceOptions(extraService)"
                      />
                    </div>
                  </div>
                </div>
              </GsrAccordion>
              <GsrDivider/>
              <GsrAccordion title="Dettagli prezzo" is-initially-open v-if="price">
                <div class="grid grid-cols-1 gap-2 text-base font-light mt-2"
                     style="color:rgb(34,34,34)">
                  <div class="flex flex-row justify-between w-full">
                    <span class="text-sm underline cursor-pointer" @click="isPricePerNightDialogOpen = true">{{
                        price.per_night_without_taxes
                      }}&euro; x {{ price.nights }} {{ $t('common.nights') }} </span>
                    <span class="text-sm">{{ price.accommodation_price }} &euro;</span>
                  </div>
                  <div class="flex flex-row justify-between w-full"
                       v-if="price && price.coupon && price.coupon.is_valid">
                    <span class="text-sm"> {{ $t('common.coupon') }} <small>({{
                        price.coupon.coupon.title
                      }} - {{
                        price.coupon.coupon.amount
                      }}{{ price.coupon.coupon.amount_type === 'PERCENTAGE' ? '%' : '\u20AC' }})</small> </span>
                    <span class="text-sm">- {{ price.total_discount }} &euro;</span>
                  </div>
                  <div class="flex flex-row justify-between w-full" v-if="price && 'tax_rate' in price">
                    <span class="text-sm">{{ $t('common.security_deposit') }}</span>
                    <span class="text-sm">{{ price.security_deposit_price }} &euro;</span>
                  </div>
                  <div class="flex flex-row justify-between w-full" v-if="price && 'tax_rate' in price">
                    <span class="text-sm">{{ $t('common.vat') }} {{ price.tax_rate }}%</span>
                    <span class="text-sm">{{ price.tax_total }} &euro;</span>
                  </div>
                  <div class="flex flex-row justify-between w-full"
                       v-for="(commission, index) in computedCommissions" :key="'computed-commission-'+commission.id">
                    <span class="text-sm">{{ commission.title }}</span>
                    <span class="text-sm">{{ commission.amount }} &euro;</span>
                  </div>
                  <div class="flex flex-row justify-between w-full"
                       v-for="extraService in computedExtraServices" :key="'computed-extra-service-'+extraService.id">
                    <span class="text-sm">{{ extraService.title }}</span>
                    <span class="text-sm">{{ extraService.amount }} &euro;</span>
                  </div>
                  <div class="flex flex-row justify-between w-full"
                       v-for="discount in computedDiscounts" :key="'computed-discount-'+discount.id">
                    <span class="text-sm">{{ discount.title }}</span>
                    <span class="text-sm">- {{ discount.amount }} &euro;</span>
                  </div>
                </div>
              </GsrAccordion>
              <div class="border-t border-gray-200 pt-4">
                <div class="flex flex-row justify-between text-base font-medium">
                  <span>{{ $t('common.total') }}</span>
                  <GsrLoader v-if="isFetchingBlockedDays || isFetchingPrice || isFetchingPrices"/>
                  <span v-else>{{ form.payment_solution === 'DEPOSIT' ? price.deposit_price : price.total }} &euro;</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Map -->
    <AccommodationSection class="mt-12" :title="$t('common.location_and_directions')"
                          v-if="computedAddress"
    >
      <GsrLeaflet :entities="[accommodation]" :map-center="accommodation.address" :zoom-control="false" class="gsr-map">
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
    </AccommodationSection>

    <!-- CTA -->
    <AccommodationSection class="my-10" title="">
      <GsrContactRequestCta/>
    </AccommodationSection>

    <!-- Reservation saved dialog -->
    <GsrDialog
      style="z-index: 99999"
      :title="$t('common.reservation_saved')"
      :opened="isSuccessModalOpen"
      @close="onSuccessModalClose"
    >
      <div class="flex flex-col w-full pt-6">
        <span class="font-medium text-2xl pb-8" v-if="user">{{ $t('common.congratulations') }} {{ user.name }},</span>
        <span>
          {{ $t('reservation.your_reservation_with_code') }} <strong>{{
            reservation.code
          }}</strong> {{ $t('reservation.your_reservation_with_code_confirmed_message') }}
        </span>
      </div>

      <template v-slot:footer>
        <div class="w-full flex flex-row items-center justify-end">
          <GsrButton @click="onSuccessModalRedirectClose(reservation.code)">
            {{ $t('common.show_reservation') }}
          </GsrButton>
        </div>
      </template>
    </GsrDialog>

    <!-- Price per night detail dialog -->
    <GsrDialog style="z-index: 99999" :title="$t('common.base_price_analysis')"
               :container-style="{'max-width':'24rem'}"
               :opened="isPricePerNightDialogOpen"
               @close="isPricePerNightDialogOpen = false"
    >
      <div class="flex flex-col w-full">
        <div class="grid grid-cols-1 gap-3">
          <div class="flex flex-row w-full items-center justify-between"
               v-for="(item, index) in price.price_per_night_detail" :key="index">
            <span class="text-sm">{{ moment(item.date).format('DD/MM/YYYY') }}</span>
            <span class="text-sm">{{ item.price }}&euro;</span>
          </div>
        </div>
      </div>
      <template v-slot:footer>
        <div class="flex flex-row w-full items-center font-medium justify-between">
          <span class="text-base">{{ $t('common.base_price_total') }}</span>
          <span class="text-base">{{ price.accommodation_price }}&euro;</span>
        </div>
      </template>
    </GsrDialog>

    <!--    Images dialog-->
    <GsrDialog fullscreen no-footer no-header
               :opened="isImagesDialogOpen"
               @close="isImagesDialogOpen = false"
               :body-style="{'padding':'0'}"
    >
      <div class="relative w-full h-full flex flex-col">
        <div class="flex flex-row w-full items-center justify-between absolute top-0 bg-white z-10 p-4">
          <svg-icon name="arrow-left" class="h-4 w-4 cursor-pointer" @click="isImagesDialogOpen=false"/>
          <div class="flex justify-end items-center flex-row">
            <div
              :class="{'pointer-events-none opacity-50':isWishlistLoading}"
              @click="onWishlistButtonClick"
              class="flex flex-row items-center hover:bg-gray-50 rounded-lg py-2 px-2 cursor-pointer">
              <GsrHeartIcon class="h-4 w-4 md:mr-2" :selected="!!wishlist"/>
              <span class="underline font-medium text-sm">
                {{ wishlist ? $t('common.saved') : $t('common.save_to_favourites') }}
              </span>
            </div>
            <!--            <div class="ml-4 flex flex-row items-center hover:bg-gray-50 rounded-lg py-2 px-2 cursor-pointer">
                          <svg-icon class="h-4 w-4 mr-2" name="share-outline"/>
                          <span class="underline font-medium text-sm">{{ $t('common.share') }}</span>
                        </div>-->
          </div>
        </div>

        <!--        Rooms images list-->
        <GsrAccommodationRoomsImagesList v-model="slideshowIndex"
                                         v-if="accommodation && 'rooms' in accommodation && accommodation.rooms.length"
                                         :accommodation="accommodation"
        />

        <div v-else class="flex w-full pt-12 overflow-auto">
          <div class="m-auto max-w-screen-md h-screen">
            <div class="grid grid-cols-2 gap-3 pb-24 w-full">
              <div class="relative cursor-pointer w-full shadow"
                   :class="{'col-span-2':index%3===0}"
                   v-for="(media, index) in accommodation.media"
                   :key="index"
                   @click="slideshowIndex = index"
              >
                  <nuxt-img
                    class="h-full w-full object-cover bg-gray-300"
                    style="aspect-ratio:3/2"
                    :src="pathURL(media.fallback_url)"
                    :alt="media.alt"
                    :title="accommodation.title"
                    width="1920"
                    height="1080"
                    sizes="xs:100vw sm:100vw md:100vw"
                    loading="lazy"
                    provider="twicpics"
                    onerror="this.src='/img-loading-bg.jpg'"
                  />
                <div class="opacity-0 rounded-lg hover:opacity-20 duration-300 absolute inset-0 bg-gray-700"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <client-only>
        <GsrLightBox
          :items="slideshowImages"
          :index="slideshowIndex"
          loop
          @close="slideshowIndex = null"
        />
      </client-only>
    </GsrDialog>
  </div>
</template>

<script>
import {imageHelper} from "@/mixins/imageHelper";
import moment from "moment";
import metaService from '~/lib/services/metaService';
import ApiRoutes from '@/api_routes.json';
import {debounce, isEqual, identity, pickBy} from 'lodash'

export default {
  name: "Accommodation",
  mixins: [imageHelper],
  head() {
    return metaService.head(this.accommodation,this.$nuxtI18nHead({ addSeoAttributes: true }), this.$i18n.locale, [{
      rel: 'canonical',
      href: this.fullPath
    }]);

  },
  /**
   * @desc Async data
   * @param route
   * @param app
   * @param query
   * @param error
   * @returns {Promise<{accommodation}>}
   */
  async asyncData({route, app, query, error}) {
    // Get route data from path
    const routeData = app.$services.route.extractLocaleAndPermalinkFromRoute(route.path);

    let accommodation;
    try {
      accommodation = (await app.$services.accommodations.getAccommodation(routeData.permalink, routeData.locale)).data
    } catch (e) {
      const statusCode = e.response.status;
      error({statusCode, message: app.i18n.t(`common.errors.${statusCode}`)});
    }
    return {
      accommodation,
    };
  },
  mounted() {
    this._setDataFromQuery()
    this.fetchBlockedDays()
    //this.fetchPrices()
    this.fetchWishlist()
  },
  data() {
    return {
      form: {
        date: {
          start: null,
          end: null,
        },
        guests: {
          adults: 1,
          children: 0,
          newborns: 0,
          pets: 0,
        },
        payment_method: 'CREDIT_CARD',
        payment_solution: 'FULL',
        coupon: '',
        extraServices: {},
      },
      paymentMethods: [
        {key: 'CREDIT_CARD', value: this.$t('common.credit_card')},
        {key: 'BANK_TRANSFER', value: this.$t('common.bank_transfer')},
      ],
      paymentSolutions: [
        {key: 'FULL', value: this.$t('common.single_payment')},
        {key: 'DEPOSIT', value: this.$t('common.deposit')},
      ],
      blockedDays: [],
      prices: [],
      price: {
        night: 0,
        total: 0,
      },
      reservation: {
        code: ''
      },
      extraServices: [],
      accommodation: {},
      isFetchingBlockedDays: false,
      isFetchingPrices: false,
      isFetchingPrice: false,
      isLoading: false,
      isSuccessModalOpen: false,
      isImagesDialogOpen: false,
      isPricePerNightDialogOpen: false,
      isFullDescriptionVisible: false,
      isPriceBoxVisible: false,
      isWishlistLoading: false,
      areExtraServicesFetched: false,
      fetchedAccommodation: null,
      slideshowIndex: null,
      startingDateValue: null,
      wishlist: null,
      moment: moment
    }
  },
  created() {
    this.$nuxt.$on('_onAccommodationAddedToWishlist', (data) => {
      if (this.accommodation.id === data.accommodation_id) {
        this.fetchWishlist()
      }
    })
    this.$nuxt.$on('_onLoggedIn', () => {
      this.fetchWishlist()
    })
    this.$nuxt.$on('_onLogout', () => {
      this.wishlist = null
    })
  },
  beforeDestroy() {
    this.$nuxt.$off('_onAccommodationAddedToWishlist')
    this.$nuxt.$off('_onLoggedIn')
    this.$nuxt.$off('_onLogout')
  },
  watch: {
    'form.guests': {
      deep: true,
      handler(val, oldVal) {
        // Check if guests are changed and update price
        if (this.isDateSelected) {
          try {
            const diff = Object.keys(val).reduce((result, key) => {
              if (!oldVal.hasOwnProperty(key)) {
                result.push(key);
              } else if (isEqual(val[key], oldVal[key])) {
                const resultKeyIndex = result.indexOf(key);
                result.splice(resultKeyIndex, 1);
              }
              return result;
            }, Object.keys(oldVal));

            // Fetch new price if includes adults or children
            if (diff.includes('adults') || diff.includes('children')) {
              this.fetchPrice();
            }
          } catch (error) {
            console.error(error)
          }
        }
      }
    },
    'form.extraServices': {
      deep: true,
      handler(val, oldVal) {
        // Check if guests are changed and update price
        if (this.isDateSelected) {
          this.fetchPrice();
        }
      }
    },
  },
  computed: {
    computedCommissions() {
      if ('commissions' in this.price && 'commissions' in this.price.commissions) {
        return this.price.commissions.commissions
      } else {
        return []
      }
    },
    computedExtraServices() {
      if ('extra_services' in this.price && 'extra_services' in this.price.extra_services) {
        return this.price.extra_services.extra_services
      } else {
        return []
      }
    },
    computedDiscounts() {
      if ('discounts' in this.price && 'discounts' in this.price.discounts) {
        return this.price.discounts.discounts
      } else {
        return []
      }
    },
    fullPath() {
      return this.$config.appURL + this.$route.path;
    },
    /**
     * @desc Check if date is selected
     * @returns {boolean}
     */
    isDateSelected() {
      return !!(this.form.date && this.form.date.start && this.form.date.end)
    },
    /**
     * @desc Get logged user
     * @returns {*}
     */
    user() {
      return this.$store.state.auth.user ? this.$store.state.auth.user.data : this.$store.state.auth.user;
    },
    loggedIn() {
      return this.$store.state.auth.loggedIn;
    },
    /**
     * @desc Get slideshow images
     * @returns {*[]}
     */
    slideshowImages() {
      if (Object.prototype.hasOwnProperty.call(this.accommodation, 'media') && this.accommodation.media.length) {
        return this.accommodation.media.map(media => media.original_url);
      }
      return [];
    },
    /**
     * @desc Calculate and format for safety the checking date for set inside picker
     * @returns {string}
     */
    computedStartingDateValue() {
      if (this.form.date.start) {
        return moment(this.form.date.start).format('YYYY-MM-DD')
      } else if (this.$route && this.$route.query) {
        let query = this.$route.query
        if ('checkin' in query) {
          return moment(query.checkin).format('YYYY-MM-DD')
        }
      }
    },
    computedDescription() {
      if (this.accommodation && this.accommodation.description && typeof this.accommodation.description === 'string' && this.accommodation.description.length > 300 && !this.isFullDescriptionVisible) {
        //trim the string to the maximum length
        const trimmedString = this.accommodation.description.substr(0, 300);

        //re-trim if we are in the middle of a word
        return trimmedString.substr(0, Math.min(trimmedString.length, trimmedString.lastIndexOf(" "))) + '...'
      } else {
        return this.accommodation.description;
      }
    },
    /**
     * @desc Computed is payable
     * @returns {boolean|*}
     */
    computedIsPayable() {
      if (this.accommodation && this.accommodation.is_payable !== null) {
        return this.accommodation.is_payable
      } else {
        return true
      }
    },
    /**
     * @desc Computed is payable
     * @returns {boolean|*}
     */
    computedIsReservableOnlyRequest() {
      if (this.accommodation && this.accommodation.is_reservable_only_on_request !== null) {
        return this.accommodation.is_reservable_only_on_request
      } else {
        return false
      }
    },
    /**
     * @desc Calculate and format for safety the checkout date for set inside picker
     * @returns {string}
     */
    computedEndingDateValue() {
      if (this.form.date.end) {
        return moment(this.form.date.end).format('YYYY-MM-DD')
      } else if (this.$route && this.$route.query) {
        let query = this.$route.query
        if ('checkout' in query) {
          return moment(query.checkout).format('YYYY-MM-DD')
        }
      }
    },
    computedAddress() {
      if (this.accommodation && 'address' in this.accommodation) {
        return this.accommodation.address;
      }
      return null;
    }
  },
  methods: {
    /**
     * @desc Get permalink from name
     * @param type
     * @returns {string}
     */
    getPermalink(type) {
      const locale = this.$i18n.locale
      let elements = ApiRoutes.filter(function (entity) {
        return entity.type === type && entity.locale === locale;
      });

      if (elements.length) {
        return this.localePath(`/${elements[0].permalink}`)
      } else {

      }
    },
    /**
     * @desc Get extra service options
     * @param extraService
     * @param key
     * @returns {*[]}
     */
    getExtraServiceOptions(extraService, key = 'adults') {
      let options = []
      if ('children' in extraService && extraService.children.length) {
        extraService.children.forEach(item => {
          options.push({
            key: item.id,
            value: item.title
          })
        })
        return options
      }
      if (extraService.type === 'QUANTITY' || extraService.type === 'QUANTITY_DAY') {
        let limit = 1
        if (extraService.has_maximum_quantity === 'YES') {
          limit = extraService.maximum_quantity
        } else if(extraService.has_maximum_quantity === 'YES_PER_PERSON') {
          limit = key === 'children' ? extraService.maximum_quantity_children : extraService.maximum_quantity_adults
        }else{
          limit = 50
        }


        Array.from({length: limit}, (_, i) => i + 1).forEach(item => {
          options.push({
            key: item,
            value: item
          })
        });
        return options;

      }
      return options
    },

    /**
     * @desc On wishlist button click
     */
    onWishlistButtonClick() {
      if (this.wishlist) {
        this.detachFromWishlist()
      } else {
        this.$nuxt.$emit('_onOpenWishlistsModal', this.accommodation.id)
      }
    },

    /**
     * @desc on payment solution change recalculate price
     */
    onPaymentSolutionChange() {
      this.fetchPrice()
    },

    /**
     * @desc on date change event
     */
    onDateChange() {
      this.fetchPrice()
      if (!this.areExtraServicesFetched) {
        this.fetchExtraServices()
      }
    },
    /**
     * @desc On payment modal close callback
     */
    onSuccessModalClose() {
      this.isSuccessModalOpen = false
    },

    /**
     * @desc On success modal redirect close
     * @param reservationCode
     */
    async onSuccessModalRedirectClose(reservationCode) {
      this.isSuccessModalOpen = false
      await this.$router.push({path: this.localePath(`/reservations/${reservationCode}`)})
    },
    /**
     * @desc On button click callback
     */
    async onButtonClick() {

      // Check if date and payment method are selected
      if (this.isDateSelected && this.form.payment_method) {
        // If user is not logged in open login modal
        if (!this.$store.state.auth.loggedIn) {
          this.$nuxt.$emit('_onOpenLoginModal')
          return;
        }

        // Check availability
        let response = await this.checkAvailability()

        // If is available continue with booking
        if (response.available) {

          // Get route data from path
          if (!this.fetchedAccommodation) {
            let routeData = this.$services.route.extractLocaleAndPermalinkFromRoute(this.$route.path)
            this.fetchedAccommodation = (await this.$services.accommodations.getAccommodation(routeData.permalink, routeData.locale)).data
          }

          // If accommodation is not payable set payment method to BANK_TRANSFER for create a new reservation
          if (this.fetchedAccommodation.is_payable !== null && !this.fetchedAccommodation.is_payable) {
            this.form.payment_method = 'BANK_TRANSFER'
          }

          if (this.form.payment_method === 'CREDIT_CARD') {
            await this.onPay()
          } else if (this.form.payment_method === 'BANK_TRANSFER') {
            await this.storeReservation(true)
          }
        } else {
          this.$toast.error(this.$t('error.accommodation_not_available_these_dates'))
          this.form.date = {
            start: null,
            end: null,
          }
          await this.fetchBlockedDays()
          await this.fetchPrices()
        }
      }
      this.$refs.datepicker.open()
    },
    /**
     * @desc On pay event
     * @returns {Promise<void>}
     */
    async onPay() {
      let routeData = this.$services.route.extractLocaleAndPermalinkFromRoute(this.$route.path)
      this.isFetchingBlockedDays = true
      try {
        // Create reservation
        await this.storeReservation()

        // Get route data from path
        if (!this.fetchedAccommodation) {
          this.fetchedAccommodation = (await this.$services.accommodations.getAccommodation(routeData.permalink, routeData.locale)).data
        }

        let reservationPayload = {
          id: this.reservation.id,
          code: this.reservation.code,
          accommodation_id: this.reservation.accommodation_id,
          accommodation_title: this.fetchedAccommodation.title,
          start_date: this.reservation.start_date,
          end_date: this.reservation.end_date,
          adults: this.reservation.adults,
          children: this.reservation.children,
          newborns: this.reservation.newborns,
          pets: this.reservation.pets,
        }

        // Crypt reservation data
        const cryptedData = (await this.$services.reservations.crypt(reservationPayload, routeData.permalink)).data

        // Build payload for checkout
        let payload = {
          amount: this.price.total_raw,
          product_name: `${this.fetchedAccommodation.title} (cod. ${this.reservation.code})`,
          user_id: this.user.id,
          reservation_id: this.reservation.id,
          success_url: `${this.$config.appURL}/reservations/finalize?data=${cryptedData}`,
          cancel_url: `${this.$config.appURL}${this.$route.fullPath}`,
          quantity: 1,
          type: this.form.payment_solution
        }
        const result = (await this.$services.accommodations.getPaymentSession(payload, routeData.permalink)).data
        const stripe = await this.$stripe()
        stripe.redirectToCheckout({
          sessionId: result.id
        })
      } catch (e) {
        console.error(e)
        this.$toast.error(this.$t('error.generic'))
      } finally {
        this.isFetchingBlockedDays = false
      }
    },

    /**
     * @desc on coupon input wait for user end typing
     */
    onCouponInput: debounce(async function () {
      await this.fetchPrice()
    }, 500),

    /**
     * @desc Check accommodation availability
     * @returns {Promise<void>}
     */
    async checkAvailability() {
      let routeData = this.$services.route.extractLocaleAndPermalinkFromRoute(this.$route.path)
      this.isLoading = true
      try {
        return (await this.$services.accommodations.getAvailability(this.form.date.start, this.form.date.end, routeData.permalink, this.$i18n.locale)).data
      } catch (e) {
        this.$toast.error(this.$t('error.generic'))
      } finally {
        this.isLoading = false
      }
    },

    /**
     * @desc Detach accommodation from wishlist
     * @returns {Promise<void>}
     */
    async detachFromWishlist() {
      this.isWishlistLoading = true
      try {
        await this.$services.wishlists.detachAccommodation(this.wishlist.id, this.accommodation.id, this.$i18n.locale)
        this.wishlist = null
      } catch (err) {
        console.error(err)
      } finally {
        this.isWishlistLoading = false;
      }
    },

    /**
     * @desc Fetch blocked days
     * @returns {Promise<void>}
     */
    async fetchBlockedDays() {
      let routeData = this.$services.route.extractLocaleAndPermalinkFromRoute(this.$route.path)
      this.isFetchingBlockedDays = true
      try {
        this.blockedDays = (await this.$services.accommodations.getAccommodationBlockedDays(routeData.permalink, this.$i18n.locale)).data
      } catch (e) {
        this.$toast.error(this.$t('error.generic'))
      } finally {
        this.isFetchingBlockedDays = false
      }
    },

    /**
     * @desc Fetch blocked days
     * @returns {Promise<void>}
     */
    async fetchPrices() {
      let routeData = this.$services.route.extractLocaleAndPermalinkFromRoute(this.$route.path)
      this.isFetchingPrices = true
      try {
        this.prices = (await this.$services.accommodations.getAccommodationPrices(routeData.permalink, this.$i18n.locale)).data
      } catch (e) {
        this.$toast.error(this.$t('error.generic'))
      } finally {
        this.isFetchingPrices = false
      }
    },

    /**
     * @desc Fetch blocked days
     * @returns {Promise<void>}
     */
    async fetchPrice() {
      if (!this.form.date || !this.form.date.start || !this.form.date.end) {
        return;
      }
      this.isFetchingPrice = true
      let routeData = this.$services.route.extractLocaleAndPermalinkFromRoute(this.$route.path)
      try {

        // Build payload
        let payload = {
          start_date: this.form.date.start,
          end_date: this.form.date.end,
          deposit: this.form.payment_solution === 'DEPOSIT' ? 30 : null,
          coupon_id: this.form.coupon,
          adults: this.form.guests.adults,
          children: this.form.guests.children,
          extra_services: pickBy(this.form.extraServices, identity)
        }
        this.price = (await this.$services.accommodations.getAccommodationPrice(routeData.permalink, payload, this.$i18n.locale)).data
      } catch (e) {
        this.$toast.error(this.$t('error.generic'))
      } finally {
        this.isFetchingPrice = false
      }
    },

    /**
     * @desc Fetch wishlist
     * @returns {Promise<void>}
     */
    async fetchWishlist() {

      if (this.loggedIn) {
        this.isWishlistLoading = true
        try {
          this.wishlist = (await this.$services.wishlists.getWishlistByAccommodation(this.accommodation.id, this.$i18n.locale)).data
        } catch (e) {
          this.$toast.error(this.$t('error.generic'))
        } finally {
          this.isWishlistLoading = false
        }
      }
    },

    /**
     * @desc Fetch extra services
     * @returns {Promise<void>}
     */
    async fetchExtraServices() {
      this.isFetchingPrice = true
      try {
        this.extraServices = (await this.$services.accommodations.getExtraServices(this.accommodation.id, 'with=children', this.$i18n.locale)).data
        // Set values in form
        this.extraServices.forEach(extraService => {
          if ((extraService.type === 'QUANTITY' || extraService.type === 'QUANTITY_DAY') && extraService.has_maximum_quantity === 'YES_PER_PERSON') {
            // Set deep reactivity for this type of extra service
            this.$set(this.form.extraServices, extraService.id, {adults: "", children: ""})
          }
        })
        this.areExtraServicesFetched = true;
      } catch (e) {
        this.$toast.error(this.$t('error.generic'))
      } finally {
        this.isFetchingPrice = false
      }
    },

    /**
     * @desc Store reservations
     * @returns {Promise<{code: string}>}
     */
    async storeReservation(openSuccessModal = false) {
      try {

        let payload = await this._buildReservationPayload()
        this.isLoading = true
        this.reservation = (await this.$services.reservations.storeReservation(payload, this.$i18n.locale)).data
        this.isSuccessModalOpen = openSuccessModal
        // Reset form
        this.form = {
          date: {},
          guests: {
            adults: 1,
            children: 0,
            newborns: 0,
            pets: 0,
          },
          payment_method: 'CREDIT_CARD',
          payment_solution: 'FULL',
          coupon: '',
          extraServices: {}
        }
        this.$gtm.push(
          {
            event: 'reservationDone',
            event_category: 'reservation',
            event_label: this.fetchedAccommodation.title,
            accommodation_id: this.fetchedAccommodation.id,
            value: this.price.total_raw
          })
        this.extraServices = []
        await this.fetchExtraServices();
        await this.fetchBlockedDays()
      } catch (e) {
        this.$toast.error(this.$t('error.generic'))
      } finally {
        this.isLoading = false
      }
    },

    /**
     * @desc Build reservations payload
     *
     * @returns {Promise<{end_date, pets: number, accommodation_id, children: number, adults: number, newborns: number, payment_method: string, start_date}>}
     * @private
     */
    async _buildReservationPayload() {
      this.isLoading = true
      try {
        // Get route data from path
        const routeData = this.$services.route.extractLocaleAndPermalinkFromRoute(this.$route.path);
        if (!this.fetchedAccommodation) {
          this.fetchedAccommodation = (await this.$services.accommodations.getAccommodation(routeData.permalink, routeData.locale)).data
        }

        this.isLoading = false
        //Build payload
        return {
          accommodation_id: this.fetchedAccommodation.id,
          start_date: this.form.date.start,
          end_date: this.form.date.end,
          payment_method: this.form.payment_method,
          adults: this.form.guests.adults,
          children: this.form.guests.children,
          newborns: this.form.guests.newborns,
          pets: this.form.guests.pets,
          coupon_id: this.form.coupon,
          deposit: this.form.payment_solution === 'DEPOSIT' ? 30 : null,
          extra_services: pickBy(this.form.extraServices, identity)
        }

      } catch (e) {
        this.$toast.error(this.$t('error.generic'))
      } finally {
        this.isLoading = false
      }
    },

    /**
     * @desc Set data from query string
     */
    _setDataFromQuery() {
      if (this.$route && this.$route.query) {
        let query = this.$route.query
        // Set date
        'checkin' in query ? this.form.date.start = moment(query.checkin).format('YYYY-MM-DD') : null
        'checkout' in query ? this.form.date.end = moment(query.checkout).format('YYYY-MM-DD') : null
        if (this.form.date.start && this.form.date.end) {
          // Get difference in days for check if minimum stay is respected for this accommodation
          const startDate = moment(query.checkin)
          const endDate = moment(query.checkout)
          const diff = endDate.diff(startDate, 'days')
          if (diff < this.accommodation.minimum_stay) {
            const toAdd = this.accommodation.minimum_stay - diff
            this.form.date.end = endDate.add(toAdd, 'days').format('YYYY-MM-DD')
          }
          this.onDateChange()
        }

        // Set guests
        'adults' in query ? this.form.guests.adults = parseInt(query.adults) : null
        'children' in query ? this.form.guests.children = parseInt(query.children) : null
        'newborns' in query ? this.form.guests.newborns = parseInt(query.newborns) : null
        'pets' in query ? this.form.guests.pets = parseInt(query.pets) : null
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/css/_variables.scss';

img {
    will-change: opacity;
    transition: opacity 1s linear;
}

.gsr-dialog-container__body {
    img {
        min-width: 180px;
    }
}
.gsr-accommodation-page {
    @apply p-4 m-auto flex flex-col justify-center;

    .headline div:after {
        content: "\002E";
        line-height: 0;
        vertical-align: super;
        display: inline-block;
        height: 0;
        font-size: 30px;
        color: rgb(99, 99, 99);
        margin-left: 5px;
        margin-right: 9px;
    }


    .headline div:last-child:after {
        content: none;
    }

    @screen md {
        @apply p-8
    }
    @screen xl {
        @apply p-0;
    }
    .gsr-main-media {
        @apply relative mt-6 cursor-pointer rounded-lg shadow;
        aspect-ratio: 3/2;

        @screen lg {
            height: 70vh;
        }
        figure, img {
            @apply h-full w-full object-cover rounded-lg
        }
    }

    .gsr-map {
        height: 30rem;
        margin-bottom: 50px;
        z-index: 0;
    }

    .gsr-slideshow {
        @apply mt-4 h-auto w-auto;
        height: 10rem;
        min-height: 10rem;

        @screen sm {
            height: 70vh;
        }
    }

    .gsr-columns-wrapper {
        @apply flex flex-col mt-8;

        @screen lg {
            @apply mt-16;
            flex-direction: initial;
        }

        .gsr-left-column {
            @apply w-full bg-white;

            @screen lg {
                width: 65%;
                @apply pr-8;
            }

            .gsr-slideshow {
                @apply mt-4 h-auto w-auto;
                height: 70vw;
                min-height: 10rem;

                @screen sm {
                    height: 210px;
                }
            }
        }

        .gsr-right-column {
            @apply h-full w-full mt-8;
            top: $navbar-height;

            @screen lg {
                width: 35%;
                z-index: 1;
                @apply sticky mt-0;
            }

            .gsr-price-box {
                @apply fixed bottom-0 top-0 right-0 left-0 rounded-xl shadow-lg p-6 border border-gray-100 bg-white transition-transform duration-300 ease-in-out;
                z-index: 99999;
                transform: translateY(1000px);

                &.gsr-visible {
                    @apply overflow-auto;
                    transform: translateY(0);
                }

                @screen lg {
                    transform: translateY(0);
                    position: initial;
                }
            }

            .gsr-preview-price-box {
                @apply fixed flex flex-row right-0 left-0 px-4 py-2 bg-white border-t border-gray-100 z-50;
                bottom: 60px;

                @screen md {
                    @apply bottom-0;
                }

                @screen lg {
                    @apply hidden;
                }

                &__inner {
                    @apply w-full m-auto;

                    @screen md {
                        @apply max-w-full;
                    }
                }
            }
        }

        &.only-left {
            .gsr-left-column {
                @apply w-full pr-0;
            }

            .gsr-right-column {
                @apply hidden;
            }
        }
    }
}

</style>
