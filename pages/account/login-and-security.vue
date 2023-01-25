<template>
  <GsrBoxedLayout class="pt-12">
    <div class="flex flex-col space-y-2">
      <GsrBreadcrumb :items="breadcrumbItems"/>
      <span class="text-3xl font-semibold">{{ $t('common.login_and_security') }}</span>
    </div>
    <GsrAccountItemLayout class="mt-12">
      <template v-slot:left>
        <div class="grid grid-cols-1 gap-6">
          <!--            Password form-->
          <GsrAccountElementEdit :title="$t('common.password')" :label="$t('common.update_password')">
            <div class="flex flex-col w-full">
              <validation-observer v-slot="{ invalid }">
                <form class="flex flex-col" @submit.prevent="onFormSubmit('password')">
                  <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <ValidationProvider
                      v-slot="{ errors }"
                      :data-vv-as="$t('common.current_password')"
                      slim
                      rules="required"
                      :skip-if-empty="false"
                      name="currentPassword"
                      persist="true"
                      vid="currentPassword"
                    >
                      <GsrInput
                        id="currentPassword"
                        type="password"
                        class="col-span-1 md:col-span-2"
                        v-model="form.old_password"
                        :disabled="isLoading"
                        :error="!!errors.length"
                        :placeholder="$t('common.current_password')"
                        :name="$t('common.current_password')"
                        :label="$t('common.current_password')"
                      />
                    </ValidationProvider>
                    <ValidationProvider
                      v-slot="{ errors }"
                      :data-vv-as="$t('common.new_password')"
                      slim
                      rules="required"
                      :skip-if-empty="false"
                      name="newPassword"
                      persist="true"
                      vid="newPassword"
                    >
                      <GsrInput
                        id="newPassword"
                        type="password"
                        class="col-span-1 md:col-span-2"
                        :disabled="isLoading"
                        v-model="form.password"
                        :error="!!errors.length"
                        :placeholder="$t('common.new_password')"
                        :name="$t('common.new_password')"
                        :label="$t('common.new_password')"
                      />
                    </ValidationProvider>
                    <ValidationProvider
                      v-slot="{ errors }"
                      :data-vv-as="$t('common.confirm_password')"
                      slim
                      rules="required"
                      :skip-if-empty="false"
                      name="confirmPassword"
                      persist="true"
                      vid="confirmPassword"
                    >
                      <GsrInput
                        id="confirmPassword"
                        type="password"
                        class="col-span-1 md:col-span-2"
                        :disabled="isLoading"
                        v-model="form.password_confirmation"
                        :error="!!errors.length"
                        :placeholder="$t('common.confirm_password')"
                        :name="$t('common.confirm_password')"
                        :label="$t('common.confirm_password')"
                      />
                    </ValidationProvider>
                  </div>
                  <div>
                    <GsrButton class="mt-6 text-center" :disabled="invalid" type="submit" :loading="isLoading">
                      <span class="px-2 py-1">{{ $t('common.update_password') }}</span>
                    </GsrButton>
                  </div>
                </form>
              </validation-observer>
            </div>
          </GsrAccountElementEdit>
          <!--            Deactivate account-->
          <GsrAccountElementEdit :title="$t('common.account')" :edit-text="$t('common.deactivate')" :label="$t('common.deactivate_account')">
            <div class="flex flex-col w-full">
              <validation-observer v-slot="{ invalid }">
                <form class="flex flex-col pt-2" @submit.prevent="onFormSubmit('deactivate-account')">
                  <span>{{$t('common.deactivate_account_message')}}</span>

                  <ul class="w-full leading-snug capitalize">
                    <li class="flex flex-col mt-2 text-gray-700">
                      <span>{{ $t('auth.form.email') }}:</span>
                      <a class="lowercase hover:text-gray-900" :href="`mailto:${footerData.email}`">{{footerData.email}}</a>
                    </li>

                    <li class="flex flex-col mt-4 text-gray-700">
                      <span>{{ $t('footer.contactsList.telephone') }}:</span>
                      <a class="lowercase hover:text-gray-900" :href="`tel:${footerData.phone}`">{{footerData.phone}}</a>
                      <a v-if="footerData.secondaryPhone" class="lowercase hover:text-gray-900" :href="`tel:${footerData.secondaryPhone}`">{{footerData.secondaryPhone}}</a>
                    </li>
                  </ul>
                  <div>
                    <GsrButton class="mt-6 text-center" type="submit" :loading="isLoading">
                      <span class="px-2 py-1">{{ $t('common.deactivate_account') }}</span>
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
            <span class="text-lg font-medium">Keeping your account secure</span>
            <span class="text-base font-normal">We regularly review accounts to make sure they’re secure as possible. We’ll also let you know if there’s more we can do to increase the security of your account.</span>
          </div>
        </div>
      </template>
    </GsrAccountItemLayout>
  </GsrBoxedLayout>
</template>

<script>

import moment from "moment";
import FooterData from '@/api_footer_data.json';
import {
  ValidationProvider,
  ValidationObserver
} from 'vee-validate';


export default {
  name: "personal-information",
  middleware: "logged",
  components: {
    GsrBreadcrumb:() => import('@/components/common/GsrBreadcrumb'),
    GsrAccountItemLayout:() => import('@/components/account/GsrAccountItemLayout'),
    GsrAccountElementEdit:() => import('@/components/account/GsrAccountElementEdit'),
    GsrButton:() => import('@/components/common/GsrButton'),
    GsrInput:() => import('@/components/input/GsrInput'),
    GsrSelect:() => import('@/components/input/GsrSelect'),
    GsrDivider:() => import('~/components/common/GsrDivider.vue'),
    ValidationObserver,
    ValidationProvider,
    GsrBoxedLayout: () => import('@/components/layout/GsrBoxedLayout'),
  },
  data() {
    return {
      moment,
      footerData:FooterData,
      form: {
        old_password: '',
        password: '',
        password_confirmation: '',
      },
      isLoading: false,
      breadcrumbItems: [
        {
          label: this.$t('common.account'),
          link: 'account'
        },
        {
          label: this.$t('common.login_and_security'),
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
  methods: {
    /**
     * @desc On form submit
     * @param dataType
     * @returns {Promise<void>}
     */
    async onFormSubmit(dataType) {

      switch (dataType){
        case'password':
          this.isLoading = true;
          try {
            await this.$services.users.changePassword(this.form, this.$i18n.locale)
            this.$toast.success(this.$t('success.password_changed'));
          } catch (err) {
            if(err.response.data.errors){
              this.$toast.error(err.response.data.errors[Object.keys(err.response.data.errors)[0]][0]);
            }else{
              this.$toast.error(err.response.data.message);
            }
          } finally {
            this.isLoading = false;
          }
          break
        case'deactivate-account':
          this.isLoading = true;
          try {
            await this.$services.users.destroyUser(this.$i18n.locale)
            this.$auth.strategies.local.options.endpoints.user.headers.Authorization = null;
            this.$auth.setToken('local', false);
            this.$auth.setRefreshToken('local', false);
            this.$auth.setUser(null);
            this.$auth.reset();
            this.$axios.setHeader('Authorization', false);
            await this.$auth.logout('local');
            this.$nuxt.$emit('_onLogout')
            this.$router.push({path: this.localePath(`/`)})
          } catch (err) {
            if(err.response.data.errors){
              this.$toast.error(err.response.data.errors[Object.keys(err.response.data.errors)[0]][0]);
            }else{
              this.$toast.error(err.response.data.message);
            }
          } finally {
            this.isLoading = false;
          }
          break
      }

    }
  }
}
</script>

<style scoped>

</style>
