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
          <!-- Adults -->
          <ValidationProvider
            v-slot="{ errors }"
            :data-vv-as="$t('common.age')"
            slim
            rules="required"
            :skip-if-empty="false"
            name="age"
            persist="true"
            vid="age"
          >
            <GsrInput
              class="border-t-0"
              id="age"
              type="number"
              required
              :disabled="isLoading"
              v-model="form.age"
              :error="!!errors.length"
              :placeholder="$t('common.age')"
              name="age"
              :label="$t('common.age')+'*'"
            />
            <span v-if="errors.length" class="text-sm text-red-500">{{ errors[0] }}</span>
          </ValidationProvider>
          <!-- Email -->
          <ValidationProvider
            v-slot="{ errors }"
            :data-vv-as="$t('auth.form.email')"
            slim
            rules="email"
            :skip-if-empty="false"
            :name="$t('auth.form.email')"
            persist="true"
            vid="email"
          >
            <GsrInput
              id="email"
              type="email"
              rules="email"
              v-model="form.email"
              :error="!!errors.length"
              :disabled="isLoading"
              :placeholder="$t('auth.form.email')"
              name="email"
              :label="$t('auth.form.email')"
            />
            <span v-if="errors.length" class="text-sm text-red-500">{{ errors[0] }}</span>
          </ValidationProvider>
          <!-- Address -->
          <ValidationProvider
            v-slot="{ errors }"
            :data-vv-as="$t('common.address')"
            slim
            :skip-if-empty="false"
            :name="$t('common.address')"
            persist="true"
            vid="address"
          >
            <GsrInput
              class="border-t-0"
              id="address"
              type="text"
              :disabled="isLoading"
              v-model="form.address"
              :error="!!errors.length"
              :placeholder="$t('common.address')"
              :name="$t('common.address')"
              :label="$t('common.address')"
            />
            <span v-if="errors.length" class="text-sm text-red-500">{{ errors[0] }}</span>
          </ValidationProvider>
          <!-- Document -->
          <ValidationProvider
            v-if="!form.id"
            v-slot="{ errors }"
            :data-vv-as="$t('common.generic_documents')"
            slim
            :skip-if-empty="false"
            :name="$t('common.generic_documents')"
            persist="true"
            ref="documentProvider"
            vid="document"
          >
            <div class="border border-gray-200 rounded-lg p-2">
              <label class="block text-gray-500 font-light text-xs" for="file_input">{{$t('common.generic_documents')}}</label>
              <input
                @change="onFileInput($event)"
                required
                accept="image/*,application/pdf"
                class="block pt-1 w-full text-sm text-gray-900 cursor-pointer dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                aria-describedby="file_input_help" id="file_input" type="file">
            </div>
            <span v-if="errors.length" class="text-sm text-red-500">{{ errors[0] }}</span>
            <span id="file_input_help" class="mt-2 text-xs text-gray-600">{{$t('common.generic_documents_only_one_message')}}</span>
          </ValidationProvider>

          <!-- Submit -->
          <div class="w-full flex flex-row items-center justify-end mt-4 pt-4">
            <GsrButton
              :disabled="isLoading || pristine"
              type="submit"
            >
              {{ $t('common.save') }}
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
  name: "GsrReservationGuestForm",
  components: {
    GsrInput: () => import('@/components/input/GsrInput'),
    GsrInputNumber: () => import('@/components/input/GsrInputNumber'),
    GsrButton: () => import('@/components/common/GsrButton'),
    ValidationProvider,
    ValidationObserver
  },
  model: {
    prop: 'value',
  },
  props: {
    isLoading: {
      type: Boolean,
      default: false
    },
    value: {
      type: Object,
    },
  },
  mounted() {
    if (this.value) {
      this.form = this.value;
      if(this.form.id && this.form.document){
        this.isFileInputVisible = false
      }
    }
  },
  data() {
    return {
      isFileInputVisible:true,
      form: {
        name: null,
        surname: '',
        email: '',
        age: null,
        address: '',
        document:null
      },
    }
  },
  watch: {
    form: {
      deep: true,
      handler(value) {
        this.$emit('input', this.form)
      }
    },
    value: {
      deep: true,
      handler(value) {
        this.form = value
      }
    }
  },
  methods: {
    /**
     * @desc On file input
     * @param event
     */
    async onFileInput(event){
      this.form.document = event.target.files[0]
      this.$emit('input', this.form)
    },
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
