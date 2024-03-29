<template>
  <client-only>
    <HotelDatePicker
      class="gsr-hoteldatepicker"
      @periodSelected="onInput"
      @clear-selection="onClear"
      @checkInChanged="onClear"
      :min-nights="minNights"
      :max-nights="maxNights"
      :disabled-dates="disabledDates"
      :i18n="translations"
      :position-right="positionRight"
      :closeDatepickerOnClickOutside="false"
      :startingDateValue="computedStartingDateValue"
      :endingDateValue="computedEndingDateValue"
      :lastDateAvailable="lastDateAvailable"
      :periodDates="periodDates"
      :disable-checkout-on-checkin="disableCheckoutOnCheckin"
      :half-day="halfDay"
      ref="hoteldatepicker"
      format="DD/MM/YYYY"
    />
  </client-only>
</template>

<script>
import moment from 'moment';
import HotelDatePicker from 'vue-hotel-datepicker2';
import "vue-hotel-datepicker2/dist/vueHotelDatepicker2.css";

export default {
  name: "GsrDatepicker",
  components: {
    HotelDatePicker
  },
  props: {
    value: {
      type: Object,
      default: () => {
      },
    },
    disabledDates: {
      type: Array,
      default: () => [],
    },
    minNights: {
      type: Number,
      required: false,
      default: 1
    },
    maxNights: {
      type: Number,
      required: false,
      default: 0
    },
    positionRight: {
      type: Boolean,
      default: false
    },
    startingDateValue: {
      type: String,
      default: ''
    },
    endingDateValue: {
      type: String,
      default: ''
    },
    lastDateAvailable: {
      type: Number,
      default: new Date().setFullYear(new Date().getFullYear() + 2) //moment().add(24, 'months').format('YYYY-MM-DD')
    },
    periodDates: {
      type: Array,
      default: () => []
    },
    disableCheckoutOnCheckin: {
      type: Boolean,
      default: false,
    },
    checkInLabel: {
      type: String,
      default: function () {
        return this.$t('common.select_dates')
      }
    },
    checkOutLabel: {
      type: String,
      default: function () {
        return this.$t('common.add_date')
      }
    },
    halfDay: {
      type: Boolean,
      defaults: true
    }
  },

  data() {
    return {
      moment
    }
  },
  methods: {
    /**
     * @desc On input callback
     * @param event
     * @param startDate
     * @param endDate
     */
    onInput(event, startDate, endDate) {
      this.$emit('input',
        {
          start: moment(startDate).format('YYYY-MM-DD'),
          end: moment(endDate).format('YYYY-MM-DD')
        }
      );
    },
    /**
     * @desc on clear event
     */
    onClear() {
      this.$emit('input',
        {
          start: null,
          end: null,
        }
      );
    },
    /**
     * @desc Open picker programmatically
     */
    open() {
      this.$refs.hoteldatepicker.showDatepicker()
    }
  },
  computed: {
    /**
     * @desc Set translations
     * @returns {{"check-in": VueI18n.TranslateResult, "day-names": (string|VueI18n.LocaleMessages)[], week: VueI18n.TranslateResult, weeks: VueI18n.TranslateResult, nights: VueI18n.TranslateResult, night: VueI18n.TranslateResult, tooltip: {halfDayCheckIn: VueI18n.TranslateResult, halfDayCheckOut: VueI18n.TranslateResult, minimumRequiredPeriod: string, saturdayToSaturday: VueI18n.TranslateResult, sundayToSunday: VueI18n.TranslateResult}, "check-out": VueI18n.TranslateResult, "month-names": (string|VueI18n.LocaleMessages)[]}}
     */
    translations() {
      return {
        "night": this.$t('common.night'),
        "nights": this.$t('common.nights'),
        "week": this.$t('common.week'),
        "weeks": this.$t('common.weeks'),
        "day-names": [
          this.$t('common.sunday_short'),
          this.$t('common.monday_short'),
          this.$t('common.tuesday_short'),
          this.$t('common.wednesday_short'),
          this.$t('common.thursday_short'),
          this.$t('common.friday_short'),
          this.$t('common.saturday_short'),
        ],
        "check-in": this.checkInLabel,
        "check-out": '', //this.checkOutLabel,
        "month-names": [
          this.$t('common.january'),
          this.$t('common.february'),
          this.$t('common.march'),
          this.$t('common.april'),
          this.$t('common.may'),
          this.$t('common.june'),
          this.$t('common.july'),
          this.$t('common.august'),
          this.$t('common.september'),
          this.$t('common.october'),
          this.$t('common.november'),
          this.$t('common.december'),
        ],
        "tooltip": {
          "halfDayCheckIn": this.$t('common.available_checkin'),
          "halfDayCheckOut": this.$t('common.available_checkout'),
          "saturdayToSaturday": this.$t('common.saturday_to_saturday'),
          "sundayToSunday": this.$t('common.sunday_to_sunday'),
          "minimumRequiredPeriod": `${this.minNights} %{night} ${this.$t('common.minimum')}.`,
        },
      }
    },
    /**
     * @desc Set starting date for picker
     * @returns {Date}
     */
    computedStartingDateValue() {
      if (this.startingDateValue) {
        return new Date(Date.parse(this.startingDateValue))
      }
    },
    /**
     * @desc Set ending date for picker
     * @returns {Date}
     */
    computedEndingDateValue() {
      if (this.endingDateValue) {
        return new Date(Date.parse(this.endingDateValue))
      }
    }
  },

}
</script>

<style lang="scss" scoped>

.gsr-hoteldatepicker :deep() {
  background: none;
  height: initial;

  .datepicker__header {
    position: absolute;
    top: 0;
    right: 0;
    left: 0;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 1.5rem 2.5rem
  }

  @media screen and (max-width: 767px) {
    .datepicker__header {
      padding: 1rem
    }
  }

  .container-square {
    display: grid;
    grid-template-columns:repeat(7, 1fr)
  }

  .square {
    position: relative;
    font-family: 'Roboto', sans-serif;
  }

  .datepicker__button-paginate--mobile {
    width: 100%;
    border: 0;
    height: 50px;
    line-height: 50px;
    border-top: 1px solid #f5f7f8;
    background: #fff;
    margin-top: 2rem;
    position: relative
  }

  .datepicker__button-paginate--mobile[disabled=disabled] {
    opacity: .5
  }

  .datepicker__button-paginate--mobile--top {
    margin: 0;
    transform: rotate(180deg)
  }

  .datepicker__button-paginate--mobile .arrow {
    width: 4vmin;
    height: 4vmin;
    box-sizing: border-box;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: rotate(135deg) translateY(100%)
  }

  .datepicker__button-paginate--mobile .arrow:before {
    content: "";
    width: 100%;
    height: 100%;
    border-width: .8vmin .8vmin 0 0;
    border-style: solid;
    border-color: #111827;
    transition: .2s ease;
    display: block;
    transform-origin: 100% 0
  }

  .datepicker__button-paginate--mobile .arrow:after {
    content: "";
    float: left;
    position: relative;
    top: -100%;
    width: 100%;
    height: 100%;
    border-width: 0 .8vmin 0 0;
    border-style: solid;
    border-color: #111827;
    transform-origin: 100% 0;
    transition: .2s ease
  }

  .datepicker__wrapper *, .datepicker__wrapper :after, .datepicker__wrapper :before {
    box-sizing: border-box
  }

  .datepicker {
    transition: all .2s ease-in-out;
    background-color: #fff;
    font-size: 16px;
    line-height: 14px;
    overflow: hidden;
    top: 50px;
    position: absolute;
    z-index: 999
  }

  .datepicker ::-moz-selection {
    background: transparent
  }

  .datepicker ::selection {
    background: transparent
  }

  .datepicker--right {
    right: 0
  }

  .datepicker button.next--mobile {
    background: none;
    border: 1px solid #eaeaea;
    float: none;
    height: 50px;
    width: 100%;
    position: relative;
    background-position: 50%;
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    overflow: hidden;
    position: fixed;
    bottom: 0;
    left: 0;
    outline: none;
    box-shadow: 0 5px 30px 10px rgba(0, 0, 0, .08);
    background: #fff
  }

  .datepicker button.next--mobile:after {
    background: transparent url(assets/sprite/svg/arrow-right.svg) no-repeat 70%;
    transform: rotate(90deg);
    content: "";
    position: absolute;
    width: 200%;
    height: 200%;
    top: -50%;
    left: -50%
  }

  .datepicker--closed {
    box-shadow: 0 15px 30px 10px transparent;
    max-height: 0
  }

  .datepicker--open {
    box-shadow: 0 15px 30px 10px rgba(0, 0, 0, .08);
    max-height: 900px;
    @apply rounded-lg;
  }

  @media screen and (max-width: 767px) {
    .datepicker--open {
      box-shadow: none;
      height: 100%;
      left: 0;
      right: 0;
      bottom: 0;
      -webkit-overflow-scrolling: touch !important;
      position: fixed;
      top: 0;
      width: 100%
    }
  }

  .datepicker__dummy-wrapper {
    background: transparent;
  }

  .datepicker__wrapper {
    position: relative
  }

  .datepicker__wrapper .square .datepicker__month-day {
    border: none !important;
    margin: -1px 0 0 -1px
  }

  .datepicker__month-day {
    border: none !important;
  }

  .datepicker__wrapper--booking .datepicker__month-day-wrapper span {
    text-align: right;
    padding-top: 10px;
    padding-right: 10px;
    right: 0;
    top: 0;
    transform: none
  }

  .datepicker__wrapper--booking .datepicker__month-day:before {
    display: none
  }

  .datepicker__fullview {
    background: none;
    height: auto
  }

  .datepicker__fullview .datepicker {
    position: relative;
    top: 0
  }

  .datepicker__fullview .square.not-in-the-month {
    height: 0;
    padding-bottom: 100%
  }

  .datepicker__fullview .datepicker__month-button {
    display: inline-block
  }

  .datepicker__fullview .datepicker__months {
    position: static;
    margin: 0
  }

  .datepicker__fullview .datepicker__months:before {
    display: none
  }

  .datepicker__input {
    background: transparent;
    height: 24px;
    display: flex;
    align-items: center;
    font-size: 12px;
    outline: none;
    word-spacing: 5px;
    border: 0
  }

  .datepicker__input--first {
    padding-left: 0;
  }

  .datepicker__input--first:after {
    position: relative;
    content: "";
    @apply text-gray-100;
    font-size: 1.2rem;
    //padding: 0 .75rem
  }

  .datepicker__input:focus {
    outline: none
  }

  .datepicker__input:-moz-placeholder, .datepicker__input:-ms-input-placeholder, .datepicker__input::-moz-placeholder, .datepicker__input::-webkit-input-placeholder {
    color: #35343d
  }

  .datepicker__dummy-wrapper {
    border: none;
    cursor: pointer;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    width: 100%;
    height: 100%
  }

  @media screen and (max-width: 767px) {
    .datepicker__dummy-wrapper {
      height: 50px
    }
  }

  .datepicker__dummy-wrapper--no-border.datepicker__dummy-wrapper {
    border: 0;
    border-bottom: 1px solid #f5f7f8
  }

  .datepicker__dummy-wrapper--is-active {
    border: none;
  }

  .datepicker__input {
    color: #35343d;
    font-size: 0.95rem;
    //font-size: 14px
  }

  @media screen and (max-width: 479px) {
    .datepicker__input {
      text-align: center
    }
  }

  .datepicker__input--is-active {
    color: #111827
  }

  .datepicker__input--is-active::placeholder {
    color: #111827
  }

  .datepicker__input--is-active::-moz-placeholder {
    color: #111827
  }

  .datepicker__input--is-active:-ms-input-placeholder {
    color: #111827
  }

  .datepicker__input--is-active:-moz-placeholder {
    color: #111827
  }

  .datepicker__input--single-date:first-child {
    width: 100%;
    background: none;
    text-align: left
  }

  .datepicker__month-day-wrapper {
    height: 0;
    padding-top: calc(100% - 1px)
  }

  .datepicker__month-day-wrapper span {
    z-index: 1;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%)
  }

  .datepicker__month-day {
    visibility: visible;
    text-align: center;
    color: #111827;
    cursor: pointer;
    border: none
  }

  .datepicker__month-day:focus {
    outline: none
  }

  .datepicker__month-day--today {
    border: 0
  }

  .datepicker__month-day--today .datepicker__month-day-wrapper {
    border: none;
    padding-top: calc(100% - 5px)
  }

  .datepicker__month-day--invalid-range {
    background-color: rgba(17, 24, 39, .1);
    color: #f3f5f8;
    cursor: not-allowed;
    position: relative
  }

  .datepicker__month-day--invalid {
    cursor: not-allowed;
    pointer-events: none
  }

  @media screen and (min-width: 768px) {
    .datepicker__month-day--allowed-checkout:hover, .datepicker__month-day--valid:hover {
      background-color: #111827;
      color: #fff
    }
  }

  .datepicker__month-day--disabled {
    opacity: 1;
    background: #fff;
    color: #d8d8d8;
    cursor: not-allowed;
    pointer-events: none;
    font-weight: 400;
    position: relative
  }

  .datepicker__month-day--disabled span {
    text-decoration: line-through
  }

  .datepicker__month-day--not-allowed.currentDay, .datepicker__month-day--valid.datepicker__month-day--not-allowed, .datepicker__month-day--valid.datepicker__month-day--not-allowed:hover {
    color: #111827;
    font-weight: 400;
    cursor: default;
    background: transparent
  }

  .datepicker__month-day--not-allowed.currentDay span, .datepicker__month-day--valid.datepicker__month-day--not-allowed:hover span, .datepicker__month-day--valid.datepicker__month-day--not-allowed span {
    text-decoration: none
  }

  .datepicker__month-day--hovering.datepicker__month-day--not-allowed:hover {
    cursor: pointer
  }

  .datepicker__month-day--halfCheckIn, .datepicker__month-day--halfCheckOut {
    position: relative;
    overflow: hidden
  }

  .datepicker__month-day--halfCheckIn:before, .datepicker__month-day--halfCheckOut:before {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    content: "";
    z-index: -1;
    height: 0;
    width: 0;
    border-bottom: 120px solid transparent;
    border-left: 120px solid transparent
  }

  .datepicker__month-day--halfCheckOut:before {
    border-top: 120px solid transparent;
    border-bottom: 0;
    border-left: 0;
    border-right: 120px solid transparent
  }

  .datepicker__month-day--selected {
    @apply bg-gray-100;
    color: #111827
  }

  .datepicker__month-day--selected span {
    text-decoration: none
  }

  .datepicker__month-day--selected:hover {
    font-weight: 700;
    background-color: #111827;
    color: #fff;
    z-index: 1
  }

  .datepicker__month-day--hovering {
    @apply bg-gray-100;
    //background-color: rgba(17, 24, 39, .1);
    color: #111827;
  }


  .datepicker__month-day--first-day-selected, .datepicker__month-day--last-day-selected {
    background: #111827;
    color: #fff;
  }

  .datepicker__month-day--first-day-selected {
    border-top-left-radius: 50%;
    border-bottom-left-radius: 50%;
  }

  .datepicker__month-day--last-day-selected {
    border-top-right-radius: 50%;
    border-bottom-right-radius: 50%;
  }

  .datepicker__month-day--first-day-selected span, .datepicker__month-day--last-day-selected span {
    text-decoration: none
  }

  .datepicker__month-day--allowed-checkout {
    color: #424b53
  }

  .datepicker__month-day--out-of-range {
    color: #f3f5f8;
    cursor: not-allowed;
    font-weight: 400;
    position: relative;
    pointer-events: none
  }

  .datepicker__month-day--out-of-range span {
    text-decoration: none
  }

  .datepicker__month-day--valid {
    cursor: pointer;
    font-weight: 700
  }

  .datepicker__month-day--valid.datepicker__month-day--halfCheckIn.datepicker__month-day--last-day-selected {
    color: #fff
  }

  .datepicker__month-day--hidden {
    opacity: 0;
    pointer-events: none
  }

  .datepicker__month-button {
    background: transparent url(assets/sprite/svg/arrow-right.svg) no-repeat 50%;
    border: none;
    width: 20px;
    height: 20px;
    outline: none;
    text-align: center;
    cursor: pointer;
    opacity: 1;
    transition: opacity .5s ease
  }

  .datepicker__month-button:hover {
    opacity: .65
  }

  .datepicker__month-button:focus {
    outline: none
  }

  .datepicker__month-button--prev {
    transform: rotateY(180deg)
  }

  .datepicker__month-button[disabled] {
    opacity: .2;
    cursor: not-allowed;
    pointer-events: none
  }

  .datepicker__inner {
    padding: 1.5rem 2.5rem
  }

  @media screen and (max-width: 767px) {
    .datepicker__inner {
      padding: 0;
      height: 100%
    }
  }

  .datepicker.show-tooltip .datepicker__months {
    height: calc(100% - 140px)
  }

  .datepicker.show-tooltip .datepicker__tooltip--mobile {
    height: auto;
    opacity: 1;
    padding: 15px;
    visibility: visible
  }

  @media screen and (min-width: 768px) {
    .datepicker__months {
      display: flex;
      flex-wrap: wrap;
      width: 650px;
      justify-content: space-between
    }
  }

  @media screen and (max-width: 767px) {
    .datepicker__months {
      height: calc(100% - 90px);
      overflow-y: scroll;
      overflow-x: hidden;
      transition: all .2s ease
    }
  }

  .datepicker__months:before {
    content: "";
    background: #eaeaea;
    bottom: 0;
    display: block;
    left: 50%;
    position: absolute;
    top: 0;
    width: 1px
  }

  @media screen and (max-width: 767px) {
    .datepicker__months:before {
      display: none
    }
  }

  .datepicker__months--full, .datepicker__months--full .datepicker__months {
    width: 100%
  }

  @media screen and (max-width: 767px) {
    .datepicker__months--full .datepicker__month {
      width: 100%
    }
  }

  .datepicker__months--full:before {
    display: none
  }

  .datepicker__month {
    font-size: 12px;
    width: 50%;
    padding-right: 1rem
  }

  @media screen and (max-width: 767px) {
    .datepicker__month {
      width: 100%;
      padding: 0 1rem
    }
  }

  @media screen and (min-width: 768px) {
    .datepicker__month:last-of-type {
      padding-right: 0;
      padding-left: 1rem
    }
  }

  .datepicker__month-caption {
    height: 2.5em;
    vertical-align: middle
  }

  .datepicker__month-name {
    font-size: 16px;
    font-weight: 700;
    pointer-events: none;
    text-align: center
  }

  @media screen and (max-width: 767px) {
    .datepicker__month-name {
      padding: 0 0 3rem;
      margin: 0 auto;
      width: 100%
    }

    .datepicker__month-name:last-of-type {
      padding: 2rem 0 2.5rem
    }
  }

  .datepicker__week-days {
    height: 2em;
    vertical-align: middle
  }

  .datepicker__week-row {
    display: grid;
    grid-template-columns:repeat(7, 1fr);
    align-items: center;
    margin: 2rem auto 1.5rem
  }

  @media screen and (max-width: 767px) {
    .datepicker__week-row {
      height: 40px;
      align-items: center;
      margin: 0;
      border-bottom: 1px solid #f5f7f8
    }
  }

  @media screen and (max-width: 767px) {
    .datepicker__week-row--always-visible {
      border: 0
    }
  }

  .datepicker__week-name {
    font-size: 12px;
    font-weight: 400;
    color: #424b53;
    text-align: center
  }

  .datepicker__close-button {
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    background: transparent;
    border: 0;
    color: #111827;
    cursor: pointer;
    font-size: 21px;
    font-weight: 700;
    margin-top: 0;
    outline: 0;
    z-index: 10000;
    position: fixed;
    right: 15px;
    top: 0;
    height: 48px;
    line-height: 48px
  }

  .datepicker__close-button i {
    display: block;
    font-style: inherit;
    transform: rotate(45deg)
  }

  .datepicker__clear-button {
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    background: transparent;
    border: 0;
    cursor: pointer;
    font-size: 25px;
    font-weight: 700;
    height: 100%;
    margin: 0;
    padding: 0;
    position: absolute;
    right: 0;
    top: 0;
    width: 40px
  }

  .datepicker__clear-button svg {
    fill: none;
    stroke-linecap: round;
    stroke-width: 8px;
    stroke: #424b53;
    width: 14px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%)
  }

  .datepicker__clear-button:focus {
    outline: none
  }

  .datepicker__tooltip {
    background-color: #2d3047;
    border-radius: 2px;
    color: #fff;
    font-size: 11px;
    padding: 5px 10px;
    position: absolute;
    z-index: 50;
    left: 50%;
    bottom: 100%;
    white-space: nowrap;
    transform: translateX(-50%);
    text-align: center
  }

  .datepicker__tooltip--mobile {
    height: 0;
    opacity: 0;
    visibility: hidden;
    padding: 0 1rem;
    border-bottom: 1px solid #d7d9e2;
    border-top: 1px solid #d7d9e2;
    font-size: 14px;
    line-height: 1.4;
    transition: all .2s ease
  }

  .datepicker__tooltip:after {
    border-left: 4px solid transparent;
    border-right: 4px solid transparent;
    border-top: 4px solid #2d3047;
    bottom: -4px;
    content: "";
    left: 50%;
    margin-left: -4px;
    position: absolute
  }

  .-is-hidden {
    display: none
  }

  .parent-bullet {
    top: 50%;
    height: 100%;
    display: block;
    z-index: -1
  }

  .parent-bullet, .parent-bullet .bullet {
    position: absolute;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 100%
  }

  .parent-bullet .bullet {
    top: 60%;
    height: 4px;
    transition: opacity .3s ease
  }

  @media screen and (min-width: 768px) {
    .parent-bullet .bullet {
      top: 50%
    }
  }

  .parent-bullet .bullet.checkIn, .parent-bullet .bullet.checkInCheckOut, .parent-bullet .bullet.checkOut {
    width: 8px;
    height: 18px;
    border-radius: 10px
  }

  .parent-bullet .bullet.checkIn.bullet--small, .parent-bullet .bullet.checkInCheckOut.bullet--small, .parent-bullet .bullet.checkOut.bullet--small {
    height: 6px;
    width: 14px
  }

  .parent-bullet .bullet.checkInCheckOut {
    left: calc(50% - 15px)
  }

  .parent-bullet .pipe {
    display: block;
    width: 100%;
    height: 4px;
    position: absolute;
    top: 60%;
    transform: translateY(-50%);
    transition: opacity .3s ease
  }

  @media screen and (min-width: 768px) {
    .parent-bullet .pipe {
      top: 50%
    }
  }

  .parent-bullet .pipe.pipe--small {
    height: 3px
  }

  .parent-bullet .pipe.checkIn {
    left: calc(50% + 4px);
    width: calc(50% - 4px)
  }

  .parent-bullet .pipe.checkOut {
    left: 0;
    width: calc(50% - 4px)
  }

  .parent-bullet .pipe.checkInCheckOut {
    width: calc(50% - 19px)
  }
}
</style>
