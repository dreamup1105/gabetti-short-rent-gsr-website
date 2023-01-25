<template>
  <div class="flex flex-col md:flex-row space-y-8 md:space-y-0 md:space-x-8 justify-center items-center">
    <div class="flex flex-col space-y-4 w-full">
      <validation-observer v-slot="{ invalid,errors,untouched,pristine,handleSubmit,failedRules }">
        <form class="grid grid-cols-1 gap-4" @submit.prevent="handleSubmit(onSubmit)">
          <!-- Name -->
          <ValidationProvider
            v-slot="{ errors }"
            data-vv-as="name"
            slim
            rules="required"
            :name="$t('auth.form.name')"
            persist="true"
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
            :data-vv-as="$t('auth.form.surname')"
            slim
            rules="required"
            :skip-if-empty="false"
            :name="$t('auth.form.surname')"
            persist="true"
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
            :data-vv-as="$t('common.phone')"
            slim
            rules="required"
            :skip-if-empty="false"
            :name="$t('common.phone')"
            persist="true"
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
            :data-vv-as="$t('auth.form.email')"
            slim
            rules="required|email"
            :skip-if-empty="false"
            :name="$t('auth.form.email')"
            persist="true"
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
          <!-- Villa nation -->
          <ValidationProvider
            v-slot="{ errors }"
            :data-vv-as="$t('common.accommodation_nation_location')"
            slim
            rules="required"
            :skip-if-empty="false"
            :name="$t('common.accommodation_nation_location')"
            persist="true"
            vid="accommodation_nation_location"
          >
            <GsrInput
              class="border-t-0"
              id="accommodation_nation_location"
              type="text"
              :disabled="isLoading"
              v-model="form.property_location_country"
              required
              :error="!!errors.length"
              :placeholder="$t('common.accommodation_nation_location')"
              :name="$t('common.accommodation_nation_location')"
              :label="$t('common.accommodation_nation_location')+'*'"
            />
            <span v-if="errors.length" class="text-sm text-red-500">{{ errors[0] }}</span>
          </ValidationProvider>
          <!-- Villa region -->
          <ValidationProvider
            v-slot="{ errors }"
            :data-vv-as="$t('common.accommodation_region_location')"
            slim
            rules="required"
            :skip-if-empty="false"
            :name="$t('common.accommodation_region_location')"
            persist="true"
            vid="accommodation_region_location"
          >
            <GsrInput
              class="border-t-0"
              id="accommodation_region_location"
              type="text"
              :disabled="isLoading"
              v-model="form.property_location_town"
              required
              :error="!!errors.length"
              :placeholder="$t('common.accommodation_region_location')"
              :name="$t('common.accommodation_region_location')"
              :label="$t('common.accommodation_region_location')+'*'"
            />
            <span v-if="errors.length" class="text-sm text-red-500">{{ errors[0] }}</span>
          </ValidationProvider>
          <!-- Villa link -->
          <ValidationProvider
            v-slot="{ errors }"
            :data-vv-as="$t('common.accommodation_link')"
            slim
            rules="required"
            :skip-if-empty="false"
            :name="$t('common.accommodation_link')"
            persist="true"
            vid="accommodation_link"
          >
            <GsrInput
              class="border-t-0"
              id="accommodation_link"
              type="text"
              :disabled="isLoading"
              v-model="form.property_photos_link"
              required
              :error="!!errors.length"
              :placeholder="$t('common.accommodation_link')"
              :name="$t('common.accommodation_link')"
              :label="$t('common.accommodation_link')+'*'"
            />
            <span v-if="errors.length" class="text-sm text-red-500">{{ errors[0] }}</span>
          </ValidationProvider>
          <!-- Privacy policy -->
          <ValidationProvider
            v-slot="{ errors }"
            :data-vv-as="$t('footer.legal.cookiePolicy')"
            slim
            :skip-if-empty="false"
            rules="required"
            name="privacy"
            persist="true"
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
        property_location_country: '',
        property_location_town: '',
        property_photos_link: '',
        is_privacy_accepted: false,
      },
    }
  },
  mounted() {
    if (this.loggedIn) {
      this.form.name = this.user.data.name
      this.form.surname = this.user.data.surname
      this.form.phone = this.user.data.phone
      this.form.email = this.user.data.email
    }
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
