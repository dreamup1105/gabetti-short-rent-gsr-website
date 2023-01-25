<template>
  <GsrBoxedLayout class="pt-12">
    <div class="flex flex-col space-y-2">
      <GsrBreadcrumb :items="breadcrumbItems"/>
      <span class="text-3xl font-semibold">{{ $t('common.personal_informations') }}</span>
    </div>
    <GsrAccountItemLayout class="mt-12">
      <template v-slot:left>
        <div class="grid grid-cols-1 gap-6">
          <!--            name form-->
          <GsrAccountElementEdit :title="$t('common.legal_name')" :label="`${user.data.name} ${user.data.surname}`">
            <div class="flex flex-col w-full">
              <span class="text-base font-normal mb-6">This is the name on your travel document, which could be a license or a passport.</span>
              <validation-observer v-slot="{ invalid }">
                <form class="flex flex-col" @submit.prevent="onFormSubmit('name')">
                  <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <ValidationProvider
                      v-slot="{ errors }"
                      :data-vv-as="$t('auth.form.name')"
                      slim
                      rules="required"
                      :skip-if-empty="false"
                      name="name"
                      persist="true"
                      vid="name"
                    >
                      <GsrInput
                        id="name"
                        type="text"
                        v-model="form.name"
                        :disabled="isLoading"
                        :error="!!errors.length"
                        :placeholder="$t('auth.form.name')"
                        :name="$t('auth.form.name')"
                        :label="$t('auth.form.name')"
                      />
                    </ValidationProvider>
                    <ValidationProvider
                      v-slot="{ errors }"
                      :data-vv-as="$t('auth.form.surname')"
                      slim
                      rules="required"
                      :skip-if-empty="false"
                      name="surname"
                      persist="true"
                      vid="name"
                    >
                      <GsrInput
                        class="border-t-0"
                        id="surname"
                        type="text"
                        :disabled="isLoading"
                        v-model="form.surname"
                        :error="!!errors.length"
                        :placeholder="$t('auth.form.surname')"
                        :name="$t('auth.form.surname')"
                        :label="$t('auth.form.surname')"
                      />
                    </ValidationProvider>
                  </div>
                  <div>
                    <GsrButton class="mt-6 text-center" :disabled="invalid" type="submit" :loading="isLoading">
                      <span class="px-2 py-1">{{ $t('common.save') }}</span>
                    </GsrButton>
                  </div>
                </form>
              </validation-observer>
            </div>
          </GsrAccountElementEdit>
          <!--            Fiscal code form-->
          <GsrAccountElementEdit :title="$t('common.fiscal_code')" :label="`${user.data.fiscal_code}`">
            <div class="flex flex-col w-full">
              <validation-observer v-slot="{ invalid }">
                <form class="flex flex-col" @submit.prevent="onFormSubmit('fiscalCode')">
                  <div class="grid grid-cols-1 gap-4">
                    <ValidationProvider
                      v-slot="{ errors }"
                      :data-vv-as="$t('common.fiscal_code')"
                      slim
                      rules="required"
                      :skip-if-empty="false"
                      name="fiscalCode"
                      persist="true"
                      vid="fiscalCode"
                    >
                      <GsrInput
                        id="fiscalCode"
                        type="text"
                        v-model="form.fiscal_code"
                        :disabled="isLoading"
                        :error="!!errors.length"
                        :placeholder="$t('common.fiscal_code')"
                        :name="$t('common.fiscal_code')"
                        :label="$t('common.fiscal_code')"
                      />
                    </ValidationProvider>
                  </div>
                  <div>
                    <GsrButton class="mt-6 text-center" :disabled="invalid" type="submit" :loading="isLoading">
                      <span class="px-2 py-1">{{ $t('common.save') }}</span>
                    </GsrButton>
                  </div>
                </form>
              </validation-observer>
            </div>
          </GsrAccountElementEdit>
          <!--            Gender-->
          <GsrAccountElementEdit :title="$t('common.gender')" :label="$t(`common.${user.data.gender.toLowerCase()}`)">
            <div class="flex flex-col w-full">
              <validation-observer v-slot="{ invalid }">
                <form class="flex flex-col" @submit.prevent="onFormSubmit('gender')">
                  <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <ValidationProvider
                      v-slot="{ errors }"
                      :data-vv-as="$t('common.gender')"
                      slim
                      rules="required"
                      :skip-if-empty="false"
                      name="gender"
                      persist="true"
                      vid="gender"
                    >
                      <div class="border border-gray-200 rounded-lg p-1">
                        <label class="text-xs font-light text-gray-500">{{$t('common.gender')}}</label>
                        <GsrSelect :options="genderItems" v-model="form.gender"/>
                      </div>
                    </ValidationProvider>
                  </div>
                  <div>
                    <GsrButton class="mt-6 text-center" :disabled="invalid" type="submit" :loading="isLoading">
                      <span class="px-2 py-1">{{ $t('common.save') }}</span>
                    </GsrButton>
                  </div>
                </form>
              </validation-observer>
            </div>
          </GsrAccountElementEdit>
          <!--            Birthdate-->
          <GsrAccountElementEdit :title="$t('common.birthdate')"
                                 :label="`${user.data.birthdate ? moment(user.data.birthdate).format('D MMM YYYY'):null}`">
            <div class="flex flex-col w-full">
              <validation-observer v-slot="{ invalid }">
                <form class="flex flex-col" @submit.prevent="onFormSubmit('birthdate')">
                  <ValidationProvider
                    v-slot="{ errors }"
                    :data-vv-as="$t('auth.form.birthdate')"
                    slim
                    rules="required"
                    :skip-if-empty="false"
                    name="birthdate"
                    persist="true"
                    vid="birthdate"
                  >
                    <GsrInput
                      id="birthdate"
                      type="date"
                      rules="required"
                      v-model="form.birthdate"
                      :error="!!errors.length"
                      :disabled="isLoading"
                      placeholder="dd/mm/yyyy"
                      :name="$t('auth.form.birthdate')"
                      :label="$t('auth.form.birthdate')"
                    />
                  </ValidationProvider>
                  <div>
                    <GsrButton class="mt-6 text-center" :disabled="invalid" type="submit" :loading="isLoading">
                      <span class="px-2 py-1">{{ $t('common.save') }}</span>
                    </GsrButton>
                  </div>
                </form>
              </validation-observer>
            </div>
          </GsrAccountElementEdit>
          <!--            Phone-->
          <GsrAccountElementEdit :title="$t('common.phone')" :label="`${user.data.phone}`">
            <div class="flex flex-col w-full">
              <validation-observer v-slot="{ invalid }">
                <form class="flex flex-col" @submit.prevent="onFormSubmit('phone')">
                  <ValidationProvider
                    v-slot="{ errors }"
                    :data-vv-as="$t('common.phone')"
                    slim
                    immediate
                    rules="phone"
                    :skip-if-empty="false"
                    name="phone"
                    persist="true"
                    vid="phone"
                  >
                    <GsrInput
                      id="phone"
                      type="text"
                      rules="phone"
                      v-model="form.phone"
                      :error="!!errors.length"
                      :disabled="isLoading"
                      placeholder="+39 123456"
                      :name="$t('common.phone')"
                      :label="$t('common.phone')"
                    />
                  </ValidationProvider>
                  <div>
                    <GsrButton class="mt-6 text-center" :disabled="invalid" type="submit" :loading="isLoading">
                      <span class="px-2 py-1">{{ $t('common.save') }}</span>
                    </GsrButton>
                  </div>
                </form>
              </validation-observer>
            </div>
          </GsrAccountElementEdit>
          <!--            Address-->
          <GsrAccountElementEdit :title="$t('common.address')" :label="`${computedAddress}`">
            <div class="flex flex-col w-full">
              <validation-observer v-slot="{ invalid }">
                <form class="flex flex-col" @submit.prevent="onFormSubmit('address')">
                  <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <ValidationProvider
                      v-slot="{ errors }"
                      :data-vv-as="$t('auth.form.name')"
                      slim
                      rules="required"
                      :skip-if-empty="false"
                      name="gender"
                      persist="true"
                      vid="gender"
                    >
                      <div class="border border-gray-200 rounded-lg p-1">
                        <label class="text-xs font-light text-gray-500">Country</label>
                        <GsrSelect :options="countries.data" optionKey="id" optionValue="name"
                                   v-model="form.country_id"/>
                      </div>
                    </ValidationProvider>
                    <ValidationProvider
                      v-slot="{ errors }"
                      :data-vv-as="$t('common.address')"
                      slim
                      rules="required"
                      :skip-if-empty="false"
                      name="address"
                      persist="true"
                      vid="address"
                    >
                      <GsrInput
                        id="address"
                        type="text"
                        class="col-span-1 md:col-span-2"
                        v-model="form.address"
                        :disabled="isLoading"
                        :error="!!errors.length"
                        :placeholder="$t('common.address')"
                        :name="$t('common.address')"
                        :label="$t('common.address')"
                      />
                    </ValidationProvider>
                    <ValidationProvider
                      v-slot="{ errors }"
                      :data-vv-as="$t('common.city')"
                      slim
                      rules="required"
                      :skip-if-empty="false"
                      name="city"
                      persist="true"
                      vid="city"
                    >
                      <GsrInput
                        id="city"
                        type="text"
                        v-model="form.city"
                        :disabled="isLoading"
                        :error="!!errors.length"
                        :placeholder="$t('common.city')"
                        :name="$t('common.city')"
                        :label="$t('common.city')"
                      />
                    </ValidationProvider>
                    <ValidationProvider
                      v-slot="{ errors }"
                      :data-vv-as="$t('common.region')"
                      slim
                      rules="required"
                      :skip-if-empty="false"
                      name="region"
                      persist="true"
                      vid="region"
                    >
                      <GsrInput
                        id="state"
                        type="text"
                        v-model="form.region"
                        :disabled="isLoading"
                        :error="!!errors.length"
                        :placeholder="$t('common.region')"
                        :name="$t('common.region')"
                        :label="$t('common.region')"
                      />
                    </ValidationProvider>
                    <ValidationProvider
                      v-slot="{ errors }"
                      :data-vv-as="$t('common.postal_code')"
                      slim
                      rules="required"
                      :skip-if-empty="false"
                      name="postalCode"
                      persist="true"
                      vid="postalCode"
                    >
                      <GsrInput
                        id="postalCode"
                        type="text"
                        v-model="form.postal_code"
                        :disabled="isLoading"
                        :error="!!errors.length"
                        :placeholder="$t('common.postal_code')"
                        :name="$t('common.postal_code')"
                        :label="$t('common.postal_code')"
                      />
                    </ValidationProvider>
                  </div>
                  <div>
                    <GsrButton class="mt-6 text-center" :disabled="invalid" type="submit" :loading="isLoading">
                      <span class="px-2 py-1">{{ $t('common.save') }}</span>
                    </GsrButton>
                  </div>
                </form>
              </validation-observer>
            </div>
          </GsrAccountElementEdit>
        </div>
      </template>
      <template v-slot:right>
        <div class="border border-gray-200 w-full">
          <div class="p-6 flex flex-col space-y-2">
            <span class="text-lg font-medium">Which details can be edited?</span>
            <span class="text-base font-normal">Details Gabetti Short Rent uses to verify your identity can’t be changed. Contact info and some personal details can be edited, but we may ask you verify your identity the next time you book or create a listing.</span>
            <GsrDivider class="my-6"/>
            <span class="text-lg font-medium">What info is shared with others?</span>
            <span class="text-base font-normal">Gabetti Short Rent only releases contact information for Hosts and guests after a reservation is confirmed.</span>
          </div>
        </div>
      </template>
    </GsrAccountItemLayout>
  </GsrBoxedLayout>
</template>

<script>

const GsrBreadcrumb = () => import('@/components/common/GsrBreadcrumb');
const GsrAccountItemLayout = () => import('@/components/account/GsrAccountItemLayout');
const GsrAccountElementEdit = () => import('@/components/account/GsrAccountElementEdit');
const GsrButton = () => import('@/components/common/GsrButton');
const GsrInput = () => import('@/components/input/GsrInput');
const GsrSelect = () => import('@/components/input/GsrSelect');
const GsrDivider = () => import('~/components/common/GsrDivider.vue');
import moment from "moment";
import {
  ValidationProvider,
  ValidationObserver
} from 'vee-validate';
import {compact,cloneDeep} from "lodash";


export default {
  name: "personal-information",
  middleware: "logged",
  components: {
    GsrBreadcrumb,
    GsrAccountItemLayout,
    GsrAccountElementEdit,
    GsrButton,
    GsrInput,
    GsrSelect,
    GsrDivider,
    ValidationObserver,
    ValidationProvider,
    GsrBoxedLayout: () => import('@/components/layout/GsrBoxedLayout'),
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

    let countries;

    try {
      countries = await app.$services.countries.getCountries(routeData.locale)
    } catch (e) {
      console.error(e)
    }

    return {
      countries,
      routeData,
    };
  },
  data() {
    return {
      moment,
      form: {
        name: '',
        surname: '',
        gender: '',
        birthdate: '',
        phone: '',
        fiscal_code: '',
        country_id:null,
        address:'',
        city:'',
        region:'',
        postal_code:'',
      },
      countries:[],
      isLoading: false,
      genderItems: [
        {key: 'MALE', value: this.$t('common.male')},
        {key: 'FEMALE', value: this.$t('common.female')},
        {key: 'NOT_SPECIFIED', value: this.$t('common.not_specified')},
      ],
      breadcrumbItems: [
        {
          label: this.$t('common.account'),
          link: 'account'
        },
        {
          label: this.$t('common.personal_informations'),
          link: ''
        }
      ]
    }
  },
  computed: {
    /**
     * @desc Return logged user data
     * @returns {*}
     */
    user() {
      return this.$store.state.auth.user;
    },
    computedAddress(){
      // Check if has country_id
      let country = null
      if(this.user.data.country_id && this.countries && this.countries.data){
        const countryId =this.user.data.country_id
        let results = this.countries.data.filter(function (val){
          return val.id === countryId
        })
        if(results.length){
          country = results[0].name
        }
      }
      return compact([this.user.data.address,this.user.data.city,this.user.data.region,this.user.data.postal_code,country]).join(', ')
    }
  },
  mounted() {
    this.setData()
  },
  methods: {
    /**
     * @desc Set data of user
     */
    setData() {
      this.form = cloneDeep(this.user.data);
    },
    /**
     * @desc On form submit
     * @param dataType
     * @returns {Promise<void>}
     */
    async onFormSubmit(dataType) {
      let payload = {}
      switch (dataType) {
        case 'name':
          payload = {
            name: this.form.name,
            surname: this.form.surname
          }
          break;
        case 'fiscalCode':
          payload = {
            fiscal_code: this.form.fiscal_code,
          }
          break;
        case 'gender':
          payload = {
            gender: this.form.gender,
          }
          break;
        case 'birthdate':
          payload = {
            birthdate: this.form.birthdate,
          }
          break;
        case 'phone':
          payload = {
            phone: this.form.phone,
          }
          break;
        case 'address':
          payload = {
            country_id:this.form.country_id,
            address:this.form.address,
            city:this.form.city,
            region:this.form.region,
            postal_code:this.form.postal_code
          }
          break;

        default:
          return;
      }

      this.isLoading = true;
      try {
        await this.$services.users.updateUser(payload, this.$i18n.locale)
        await this.$auth.fetchUser()
      } catch (err) {
        console.error(err)
      } finally {
        this.isLoading = false;
      }
    }
  }
}
</script>

<style scoped>

</style>
