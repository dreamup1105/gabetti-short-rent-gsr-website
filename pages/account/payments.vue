<template>
  <div class="w-full justify-center">
    <div class="flex flex-col w-full m-auto px-6 xl:px-0 pt-12 max-w-screen-xl">
      <div class="flex flex-col space-y-2">
        <GsrBreadcrumb :items="breadcrumbItems"/>
        <span class="text-3xl font-semibold">{{$t('common.personal_informations')}}</span>
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
                    <GsrButton class="mt-6 text-center" type="submit" :loading="isLoading">
                      <span class="py-2">{{ $t('common.save') }}</span>
                    </GsrButton>
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
                        :data-vv-as="$t('auth.form.name')"
                        slim
                        rules="required"
                        :skip-if-empty="false"
                        name="gender"
                        persist="true"
                        vid="gender"
                      >
                        <GsrSelect class="border border-gray-200 rounded-xl p-2" :options="genderItems" v-model="form.gender"/>
                      </ValidationProvider>
                    </div>
                    <GsrButton class="mt-6 text-center" type="submit" :loading="isLoading">
                      <span class="py-2">{{ $t('common.save') }}</span>
                    </GsrButton>
                  </form>
                </validation-observer>
              </div>
            </GsrAccountElementEdit>
            <!--            Birthdate-->
            <GsrAccountElementEdit :title="$t('common.birthdate')" :label="`${user.data.birthdate ? moment(user.data.birthdate).format('D MMM YYYY'):null}`">
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
                    <GsrButton class="mt-6 text-center" type="submit" :loading="isLoading">
                      <span class="py-2">{{ $t('common.save') }}</span>
                    </GsrButton>
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
                    <GsrButton class="mt-6 text-center" type="submit" :loading="isLoading">
                      <span class="py-2">{{ $t('common.save') }}</span>
                    </GsrButton>
                  </form>
                </validation-observer>
              </div>
            </GsrAccountElementEdit>
            <!--            Address-->
            <GsrAccountElementEdit :title="$t('common.address')" :label="`${user.data.phone}`">
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
                        <GsrSelect :options="genderItems" v-model="form.phone"/>
                      </ValidationProvider>
                    </div>
                    <GsrButton class="mt-6 text-center" type="submit" :loading="isLoading">
                      <span class="py-2">{{ $t('common.save') }}</span>
                    </GsrButton>
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
    </div>
  </div>
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
} from 'vee-validate/dist/vee-validate.full';

export default {
  name: "personal-information",
  middleware:"logged",
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
      },
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
  },
  mounted() {
    this.setData()
  },
  methods: {
    /**
     * @desc Set data of user
     */
    setData() {
      this.form.name = this.user.data.name
      this.form.surname = this.user.data.surname
      this.form.gender = this.user.data.gender
      this.form.birthdate = this.user.data.birthdate
      this.form.phone = this.user.data.phone
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
