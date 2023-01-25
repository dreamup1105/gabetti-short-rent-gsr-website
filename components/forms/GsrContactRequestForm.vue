<template>
  <div class="flex flex-col md:flex-row space-y-8 md:space-y-0 md:space-x-8 justify-center items-center">
    <div class="flex flex-col space-y-4 w-full">
      <validation-observer v-slot="{ invalid,errors,untouched,pristine,handleSubmit,failedRules }">
        <form class="grid grid-cols-1 gap-4" @submit.prevent="handleSubmit(onSubmit)">
          <!-- Name -->
          <ValidationProvider
            v-slot="{ errors }"
            slim
            rules="required"
            :name="$t('auth.form.name')"
            vid="name"
          >
            <GsrInput
              id="name"
              type="text"
              required
              v-model="form.name"
              :disabled="isLoading"
              :error="!!errors.length"
              :placeholder="$t('auth.form.name')"
              name="name"
              :label="$t('auth.form.name')+'*'"
            />
            <span v-if="errors.length" class="text-sm text-red-500">{{ errors[0] }}</span>
          </ValidationProvider>
          <!-- Surname -->
          <ValidationProvider
            v-slot="{ errors }"
            slim
            rules="required"
            :skip-if-empty="false"
            :name="$t('auth.form.surname')"
            vid="surname"
          >
            <GsrInput
              class="border-t-0"
              id="surname"
              type="text"
              required
              :disabled="isLoading"
              v-model="form.surname"
              :error="!!errors.length"
              :placeholder="$t('auth.form.surname')"
              name="surname"
              :label="$t('auth.form.surname')+'*'"
            />
            <span v-if="errors.length" class="text-sm text-red-500">{{ errors[0] }}</span>
          </ValidationProvider>
          <!-- Phone -->
          <ValidationProvider
            v-slot="{ errors }"
            slim
            rules="required"
            :skip-if-empty="false"
            :name="$t('common.phone')"
            vid="phone"
          >
            <GsrInput
              id="phone"
              type="text"
              rules="required"
              required
              v-model="form.phone"
              :error="!!errors.length"
              :disabled="isLoading"
              placeholder="+39 1234567890"
              :name="$t('common.phone')"
              :label="$t('common.phone')+'*'"
            />
            <span v-if="errors.length" class="text-sm text-red-500">{{ errors[0] }}</span>
          </ValidationProvider>
          <!-- Email -->
          <ValidationProvider
            v-slot="{ errors }"
            slim
            rules="required|email"
            :skip-if-empty="false"
            :name="$t('auth.form.email')"
            vid="email"
          >
            <GsrInput
              id="email"
              type="email"
              rules="required|email"
              required
              v-model="form.email"
              :error="!!errors.length"
              :disabled="isLoading"
              :placeholder="$t('auth.form.email')"
              name="email"
              :label="$t('auth.form.email')+'*'"
            />
            <span v-if="errors.length" class="text-sm text-red-500">{{ errors[0] }}</span>
          </ValidationProvider>
          <!-- Destination -->
          <ValidationProvider
            v-slot="{ errors }"
            slim
            rules="required"
            :skip-if-empty="false"
            :name="$t('common.destination')"
            vid="destination"
          >
            <GsrInput
              class="border-t-0"
              id="destination"
              type="text"
              :disabled="isLoading"
              v-model="form.destination"
              required
              :error="!!errors.length"
              :placeholder="$t('common.destination')"
              :name="$t('common.destination')"
              :label="$t('common.destination')+'*'"
            />
            <span v-if="errors.length" class="text-sm text-red-500">{{ errors[0] }}</span>
          </ValidationProvider>
          <!-- Arrival Date -->
            <ValidationProvider
              v-slot="{ errors }"
              slim
              rules="required|future"
              :skip-if-empty="false"
              :name="$t('common.arrival_date')"
              vid="arrival"
            >
              <GsrInput
                id="arrival"
                type="date"
                v-model="form.arrival_date"
                :error="!!errors.length"
                :disabled="isLoading"
                required
                placeholder="dd/mm/yyyy"
                :name="$t('common.arrival_date')"
                :label="$t('common.arrival_date')+'*'"
              />
              <span v-if="errors.length" class="text-sm text-red-500">{{ errors[0] }}</span>
            </ValidationProvider>
          <!-- Departure date -->
            <ValidationProvider
              v-slot="{ errors }"
              slim
              rules="required|future"
              :skip-if-empty="false"
              :name="$t('common.departure_date')"
              vid="departure"
            >
              <GsrInput
                id="departure"
                type="date"
                v-model="form.departure_date"
                :error="!!errors.length"
                :disabled="isLoading"
                required
                placeholder="dd/mm/yyyy"
                :name="$t('common.departure_date')"
                :label="$t('common.departure_date')+'*'"
              />
              <span v-if="errors.length" class="text-sm text-red-500">{{ errors[0] }}</span>
            </ValidationProvider>
          <!-- Adults -->
          <ValidationProvider
            v-slot="{ errors }"
            slim
            rules="required"
            :skip-if-empty="false"
            :name="$t('common.adults')"
            vid="adults"
          >
            <div class="flex flex-col justify-start items-center space-y-2 border border-gray-200 rounded-lg p-2">
              <span class="text-gray-500 font-light text-xs w-full">{{ $t('common.adults') }}</span>
              <div class="w-full items-center justify-center flex">
                <select class="m-auto w-full outline-none text-base font-normal bg-transparent" v-model="form.adults">
                  <option v-for="index in 20" :value="index" :key="index">
                    {{ index }}
                  </option>
                </select>
              </div>
            </div>
            <span v-if="errors.length" class="text-sm text-red-500">{{ errors[0] }}</span>
          </ValidationProvider>
          <!-- Children -->
          <ValidationProvider
            v-slot="{ errors }"
            slim
            rules="required"
            :skip-if-empty="false"
            :name="$t('common.children')"
            vid="children"
          >
            <div class="flex flex-col justify-start items-center space-y-2 border border-gray-200 rounded-lg p-2">
              <span class="text-gray-500 font-light text-xs w-full">{{ $t('common.children') }}</span>
              <div class="w-full items-center justify-center flex">
                <select class="m-auto w-full outline-none text-base font-normal bg-transparent" v-model="form.children">
                  <option v-for="index in 21" :value="index - 1" :key="index - 1">
                    {{ index - 1 }}
                  </option>
                </select>
              </div>
            </div>
            <span v-if="errors.length" class="text-sm text-red-500">{{ errors[0] }}</span>
          </ValidationProvider>
          <!-- Weekly budget -->
          <ValidationProvider
            v-slot="{ errors }"
            slim
            rules="required"
            :skip-if-empty="false"
            :name="$t('common.weekly_budget')"
            persist="true"
            vid="weekly-budget"
          >
            <div class="flex flex-col justify-start items-center space-y-2 border border-gray-200 rounded-lg p-2">
              <span class="text-gray-500 font-light text-xs w-full">{{ $t('common.weekly_budget') }}</span>
              <div class="w-full items-center justify-center flex">
                <select class="m-auto w-full outline-none text-base font-normal bg-transparent"
                        v-model="form.weekly_budget">
                  <option v-for="(weeklyBudget, index ) in weeklyBudgets" :value="weeklyBudget.key"
                          :key="weeklyBudget.key">
                    {{ weeklyBudget.value }}
                  </option>
                </select>
              </div>
            </div>
            <span v-if="errors.length" class="text-sm text-red-500">{{ errors[0] }}</span>
          </ValidationProvider>
          <!-- Notes -->
          <ValidationProvider
            v-slot="{ errors }"
            slim
            :skip-if-empty="false"
            :name="$t('common.notes')"
            vid="notes"
          >
            <GsrInput
              id="notes"
              type="textarea"
              v-model="form.notes"
              :error="!!errors.length"
              :disabled="isLoading"
              placeholder=""
              :name="$t('common.notes')"
              :label="$t('common.notes')"
            />
            <span v-if="errors.length" class="text-sm text-red-500">{{ errors[0] }}</span>
          </ValidationProvider>
          <!-- Privacy policy -->
          <ValidationProvider
            v-slot="{ errors }"
            slim
            :skip-if-empty="false"
            rules="required"
            :name="$t('footer.legal.cookiePolicy')"
            vid="privacy"
          >
            <div class="flex flex-row items-center space-x-2">
              <input id="privacy" required name="privacy" type="checkbox" v-model="form.is_privacy_accepted">
              <label for="privacy">
              <span class="text-xs text-gray-500 font-light">
                    {{ $t('auth.selecting') }} {{ $t('auth.i_accept_the') }}
                          <nuxt-link :to="getPermalink('Terms')"
                                     target="_blank"
                                     class="underline"> {{ $t('footer.legal.salesTerms') }}
                          </nuxt-link>
                          ,
                          <nuxt-link
                            :to="getPermalink('Cookie')"
                            class="underline"
                            target="_blank"
                          >
                            {{ $t('footer.legal.cookiePolicy') }}
                          </nuxt-link>
                            {{ $t('common.of') }} Gabetti Short Rent
                        </span>
              </label>
            </div>
            <span v-if="errors.length" class="text-sm text-red-500">{{ errors[0] }}</span>
          </ValidationProvider>
          <!-- Submit -->
          <div class="mt-4">
            <GsrButton
              :disabled="invalid || isLoading || pristine"
              type="submit"
            >
              {{ $t('common.send_request') }}
            </GsrButton>
          </div>
        </form>
      </validation-observer>
    </div>
  </div>
</template>
<script>
import ApiRoutes from '@/api_routes.json';
import {
  ValidationProvider,
  ValidationObserver,
} from 'vee-validate';

export default {
  name: "GsrContactRequestForm",
  components: {
    GsrInput: () => import('@/components/input/GsrInput'),
    GsrInputNumber: () => import('@/components/input/GsrInputNumber'),
    GsrButton: () => import('@/components/common/GsrButton'),
    ValidationProvider,
    ValidationObserver
  },
  props: {
    isLoading: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      form: {
        name: null,
        surname: '',
        email: '',
        phone: '',
        destination: '',
        arrival_date: '',
        departure_date: '',
        adults: 1,
        children: 0,
        weekly_budget: '5000-10000',
        notes: '',
        is_privacy_accepted: false,
      },
      weeklyBudgets: [
        {key: '5000-10000', value: '5.000€ - 10.000€'},
        {key: '10000-20000', value: '10.000€ - 20.000€'},
        {key: '20000-50000', value: '20.000€ - 50.000€'},
        {key: '50000-75000', value: '50.000€ - 75.000€'},
        {key: '75000-100000', value: '75.000€ - 100.000€'},
        {key: '>100000', value: '> 100.000€'},
      ]
    }
  },
  mounted() {
    if (this.loggedIn) {
      this.form.name = this.user.data.name
      this.form.surname = this.user.data.surname
      this.form.phone = this.user.data.phone
      this.form.email = this.user.data.email
    }
    this.form.destination = this.$route.query.destination
  },
  watch: {
    form: {
      deep: true,
      handler() {
        this.$emit('input', this.form)
        this.$emit('validate', !this.passwordError)
      }
    }
  },
  methods: {
    /**
     * @desc On submit
     */
    onSubmit() {
      this.$emit('submit', this.form)
    },
    /**
     * @desc Get permalink based on routes
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
        return this.localePath('/')
      }
    },
  },
  computed: {
    loggedIn() {
      return this.$store.state.auth.loggedIn;
    },
    user() {
      return this.$store.state.auth.user;
    },
  },
}
</script>

<style scoped>

</style>
