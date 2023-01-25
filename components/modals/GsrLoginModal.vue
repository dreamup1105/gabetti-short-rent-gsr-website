<template>
  <GsrDialog
    :title="computedDialogTitle"
    :opened="opened"
    @close="onClose"
    no-footer
    no-header
    style="z-index: 999999"
  >
    <client-only>
      <div class="flex flex-col w-full pt-6">
        <span class="font-medium text-2xl pb-8" v-if="!checkEmailResult">{{ $t('auth.dialog.welcome') }}</span>
        <!--      Check email form-->
        <validation-observer v-slot="{ invalid }" v-if="!checkEmailResult">
          <form class="grid grid-cols-1 gap-4" @submit.prevent="onCheckEmail">
            <ValidationProvider
              v-slot="{ errors }"
              slim
              rules="required|email"
              :skip-if-empty="false"
              name="emailCheck"
              immediate
              persist="true"
              vid="emailCheck"
            >
              <GsrInput
                id="emailCheck"
                type="email"
                :disabled="isCheckingEmail"
                v-model="form.email"
                :placeholder="$t('auth.form.email')"
                name="emailCheck"
                :error="!!errors.length"
                :label="$t('auth.form.email')"
              />
            </ValidationProvider>
            <GsrButton type="submit" :disabled="invalid || !form.email" :loading="isCheckingEmail">
              <div class="flex justify-center py-2 w-full">
                <span class="m-auto">{{ $t('auth.form.continue') }}</span>
              </div>
            </GsrButton>
          </form>
        </validation-observer>
        <div class="mt-6" v-if="!checkEmailResult">
          <div class="relative">
            <div class="absolute inset-0 flex items-center">
              <div class="w-full border-t border-gray-300"></div>
            </div>
            <div class="relative flex justify-center text-sm">
              <span class="px-2 bg-white text-gray-500">{{$t('common.or_continue_with')}}</span>
            </div>
          </div>

          <div class="mt-6 grid grid-cols-1 gap-4">
            <div @click="onGoogleLogin"
                 class="w-full cursor-pointer flex flex-row justify-center space-x-2 rounded-lg border border-gray-900 items-center px-6 py-2">
              <svg-icon name="google" class="h-4 w-4"/>
              <span>{{$t('common.continue_with_google')}}</span>
            </div>
            <div @click="onLinkedinLogin"
                 class="w-full cursor-pointer flex flex-row justify-center space-x-2 rounded-lg border border-gray-900 items-center px-6 py-2">
              <svg-icon name="linkedin" class="h-4 w-4"/>
              <span>{{$t('common.continue_with_linkedin')}}</span>
            </div>
           <vue-apple-login v-if="loaded"
              mode="center-align"
              type="continue"
              color="white"
              :border="true"
              :radius="15"
              width="100%"
              height="100%"
              logoSize="small"
              :logoPosition="0"
              :labelPosition="0"
              className="vue-apple-login"
              :onSuccess="onAppleLoginSuccess"
              :onFailure="onAppleLoginError"
            />
          </div>
        </div>
        <!-- Login form -->
        <div v-if="checkEmailResult && checkEmailResult.exist">
          <div class="text-center mb-8">
            <div class="h-24 w-24 block relative m-auto">
              <figure class="rounded-full align-middle h-24 w-24 object-cover"
                :style="{backgroundImage: `url(${blurImageURL(checkEmailResult.user.picture.original_url)})`}"
              >
                <nuxt-img
                  class="rounded-full overflow-hidden align-middle h-24 w-24 object-cover"
                  :class="imageIsLoaded ? 'opacity-100' : 'opacity-0'"
                  :src="pathURL(checkEmailResult.user.picture.original_url)"
                  :alt="checkEmailResult.user.name"
                  :title="checkEmailResult.user.name"
                   provider="twicpics"
                   @load="onImageLoad"
                />
              </figure>
            </div>
          </div>
          <div class="text-center">
            <span class="text-xs font-light text-gray-500">{{ form.email }}</span>
          </div>
          <validation-observer ref="loginForm" v-slot="{ invalid }">
            <form class="grid grid-cols-1 gap-4 mt-6" @submit.prevent="onLogin">
              <ValidationProvider
                v-slot="{ errors }"
                data-vv-as="Password"
                slim
                rules="required|min:8"
                :skip-if-empty="false"
                name="passwordLogin"
                immediate
                persist="true"
                vid="passwordLogin"
              >
                <GsrInput
                  id="passwordLogin"
                  type="password"
                  v-model="form.password"
                  :disabled="isLoading"
                  :placeholder="$t('auth.form.password')"
                  name="passwordLogin"
                  :error="!!errors.length"
                  :label="$t('auth.form.password')"
                />
                <span v-if="errors.length" class="text-sm text-red-500">{{ errors[0] }}</span>
              </ValidationProvider>
              <div class="flex flex-col md:flex-row items-center justify-end">
                <span
                  class="text-gray-600 hover:text-gray-900 text-sm font-medium transition duration-200 ease-in-out cursor-pointer"
                  @click="onPasswordForgot">{{ $t('common.password_forgot') }}
                </span>
              </div>
              <GsrButton type="submit" :disabled="invalid || !form.password" :loading="isLoading">
                <div class="flex justify-center py-2 w-full">
                  <span class="m-auto">{{ $t('auth.form.continue') }}</span>
                </div>
              </GsrButton>
            </form>
          </validation-observer>
          <div class="text-center mt-4">
          <span class="text-xs font-light text-gray-500">
            Non sei tu?
            <strong @click="checkEmailResult=null"
                    class="underline cursor-pointer text-gray-800">Usa un'altro account</strong>
          </span>
          </div>
        </div>

        <!--      Register form-->
        <div v-if="checkEmailResult && !checkEmailResult.exist">
          <div class="flex flex-row cursor-pointer items-center mb-6" @click="checkEmailResult=null">
            <svg-icon name="arrow-left" class="h-4 w-4"/>
            <span class="text-base ml-2 font-medium">Back</span>
          </div>
          <validation-observer v-slot="{ invalid }">
            <form class="grid grid-cols-1 gap-4" @submit.prevent="onRegister">
              <div>
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
                <span class="text-xs text-gray-500 font-light">{{ $t('auth.form.name_surname_message') }}</span>
              </div>
              <!--              <div>
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
                                  rules="required"
                                  v-model="form.fiscal_code"
                                  :error="!!errors.length"
                                  :disabled="isLoading"
                                  placeholder="XXXXXX00X00X000X"
                                  :name="$t('common.fiscal_code')"
                                  :label="$t('common.fiscal_code')"
                                />
                              </ValidationProvider>
                              <span class="text-xs text-gray-500 font-light">{{ $t('auth.form.fiscal_code_message') }}</span>
                            </div>-->
              <!--              <div>
                              <ValidationProvider
                                v-slot="{ errors }"
                                :data-vv-as="$t('auth.form.birthdate')"
                                immediate
                                slim
                                rules="required|adult"
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
                                <span v-if="errors.length" class="text-sm text-red-500">{{ errors[0] }}</span>
                                <span v-else class="text-xs text-gray-500 font-light">{{ $t('auth.form.birthdate_message') }}</span>
                              </ValidationProvider>
                            </div>-->
              <div>
                <ValidationProvider
                  v-slot="{ errors }"
                  :data-vv-as="$t('common.phone')"
                  slim
                  rules="required"
                  :skip-if-empty="false"
                  name="phone"
                  persist="true"
                  vid="phone"
                >
                  <GsrInput
                    id="phone"
                    type="text"
                    rules="required"
                    v-model="form.phone"
                    :error="!!errors.length"
                    :disabled="isLoading"
                    placeholder="+39 1234567890"
                    :name="$t('common.phone')"
                    :label="$t('common.phone')"
                  />
                  <span v-if="errors.length" class="text-sm text-red-500">{{ errors[0] }}</span>
                </ValidationProvider>
              </div>
              <div>
                <ValidationProvider
                  v-slot="{ errors }"
                  :data-vv-as="$t('auth.form.email')"
                  slim
                  rules="required|email"
                  :skip-if-empty="false"
                  name="emailRegister"
                  persist="true"
                  vid="emailRegister"
                >
                  <GsrInput
                    id="emailRegister"
                    type="email"
                    rules="required|email"
                    v-model="form.email"
                    :error="!!errors.length"
                    :disabled="isLoading"
                    :placeholder="$t('auth.form.email')"
                    name="emailRegister"
                    :label="$t('auth.form.email')"
                  />
                </ValidationProvider>
                <span
                  class="text-xs text-gray-500 font-light">{{ $t('auth.form.email_message') }}</span>
              </div>
              <ValidationProvider
                v-slot="{ errors }"
                :data-vv-as="$t('auth.form.password')"
                slim
                rules="required|min:8"
                :skip-if-empty="false"
                name="passwordRegister"
                persist="true"
                vid="passwordRegister"
              >
                <GsrInput
                  id="passwordRegister"
                  type="password"
                  rules="required"
                  v-model="form.password"
                  :error="!!errors.length"
                  :disabled="isLoading"
                  :placeholder="$t('auth.form.password')"
                  name="passwordRegister"
                  :label="$t('auth.form.password')"
                />
                <span v-if="errors.length" class="text-sm text-red-500">{{ errors[0] }}</span>
              </ValidationProvider>
              <!--              <GsrDivider/>
                            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                              <span class="col-span-1 md:col-span-2">{{ $t('common.billing_address') }}</span>
                              <ValidationProvider
                                v-slot="{ errors }"
                                :data-vv-as="$t('common.country')"
                                slim
                                rules="required"
                                :skip-if-empty="false"
                                name="gender"
                                persist="true"
                                vid="gender"
                              >
                                <div class="border border-gray-200 rounded-lg p-1">
                                  <label class="text-xs font-light text-gray-500">{{ $t('common.country') }}</label>
                                  <GsrSelect :options="countries" optionKey="id" optionValue="name"
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
                            </div>-->
              <span class="text-xs text-gray-500 font-light">
                    {{ $t('auth.selecting') }}
                <strong>{{ $t('auth.form.accept_and_continue') }}</strong>
                {{ $t('auth.i_accept_the') }}
                          <nuxt-link :to="getPermalink('Terms')"
                                     target="_blank"
                                     class="underline"> {{ $t('footer.legal.salesTerms') }}
                          </nuxt-link>
                          <nuxt-link
                            :to="getPermalink('Cookie')"
                            class="underline"
                            target="_blank"
                          >
                            {{ $t('footer.legal.cookiePolicy') }}
                          </nuxt-link>
                            {{ $t('common.of') }} Gabetti Short Rent
                        </span>
              <GsrButton type="submit" :disabled="invalid || !form.password" :loading="isLoading">
                <div class="flex justify-center py-2 w-full">
                  <span class="m-auto">{{ $t('auth.form.accept_and_continue') }}</span>
                </div>
              </GsrButton>
            </form>
          </validation-observer>
        </div>
      </div>
    </client-only>
  </GsrDialog>
</template>

<script>
import {imageHelper} from "@/mixins/imageHelper";
import {
  ValidationProvider,
  ValidationObserver,
} from 'vee-validate';

import Countries from '@/api_countries.json'
import ApiRoutes from '@/api_routes.json';

export default {
  name: "GsrLoginModal",
  mixins: [imageHelper],
  components: {
    ValidationObserver,
    ValidationProvider,
  },
  props: {
    opened: {
      type: Boolean,
      default: false
    },
    loaded: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      form: {
        name: '',
        surname: '',
        email: '',
        birthdate: '1980-01-01',
        password: '',
        password_confirmation: '',
        promotions: false,
        phone: '',
        fiscal_code: '',
        country_id: null,
        address: '',
        city: '',
        region: '',
        postal_code: '',
      },
      countries: Countries,
      checkEmailResult: null,
      isRegisterFormVisible: false,
      isLoginFormVisible: false,
      isCheckingEmail: false,
      isLoading: false,
      hasPasswordError: false
    }
  },
  methods: {
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
    /**
     * @desc on close event
     */
    onClose() {
      this.$emit('close')
    },
    /**
     * @desc On apple login callback
     * @param data
     * @returns {Promise<void>}
     */
    async onAppleLoginSuccess(data){
      this.isLoading = true;
      try {
        const response = (await this.$services.auth.socialLogin({code:data.authorization.code}, 'apple', this.$i18n.locale)).data
        const oldRedirect = this.$auth.options.redirect;
        this.$auth.options.redirect = false;
        this.$auth.setToken('local', 'Bearer ' + response.access_token);
        this.$auth.setStrategy('local')
        this.$auth.fetchUser()
        this.$auth.options.rewriteRedirects = oldRedirect;
        this.$nuxt.$emit('_onLoggedIn')
        this.onClose()
        this._resetForm();
        this.$hotjar.identify(response.user.id, {
          first_name: response.user.name,
          last_name: response.user.surname
        });
        if (this.$route.query.after_login_redirect) {
          this.$router.push(this.localePath(this.$route.query.after_login_redirect))
        }
      } catch (err) {
        console.error('AppleLoginSuccess',err)
        this.$toast.error(this.$t('error.generic'))
      } finally {
        this.isLoading = false;
      }
    },
    onAppleLoginError(error){
      this.$toast.error(this.$t('error.generic'))
      console.error(error)
    },
    /**
     * @desc On check email call
     * @returns {Promise<void>}
     */
    async onCheckEmail() {
      this.isCheckingEmail = true;
      try {
        this.checkEmailResult = (await this.$services.auth.findUserByEmail(this.form.email, this.$i18n.locale)).data
      } finally {
        this.isCheckingEmail = false;
      }

    },
    /**
     * @desc on login
     * @returns {Promise<void>}
     */
    async onLogin() {
      try {
        this.isLoading = true;
        let dataObject = {
          'email': this.form.email,
          'password': this.form.password,
          'password_confirm': this.form.password,
        }
        let response = (await this.$auth.loginWith('local', {data: dataObject})).data;
        const oldRedirect = this.$auth.options.redirect;
        this.$auth.options.redirect = false;
        await this.$auth.setUserToken(response.data.access_token);
        this.$auth.options.rewriteRedirects = oldRedirect;
        this.checkEmailResult = null
        this.$nuxt.$emit('_onLoggedIn')
        this.onClose()
        this._resetForm();
        this.$hotjar.identify(response.data.user.id, {
          first_name: response.data.user.name,
          last_name: response.data.user.surname
        });
        if (this.$route.query.after_login_redirect) {
          this.$router.push(this.localePath(this.$route.query.after_login_redirect))
        }
      } catch (err) {
        this.$refs.loginForm.setErrors({
          passwordLogin: [this.$t('common.errors.invalid_credentials')]
        });
      } finally {
        this.isLoading = false;
      }
    },
    /**
     * @desc on google login
     * @returns {Promise<void>}
     */
    async onGoogleLogin() {
      try {
        this.isLoading = true;
        this.$store.commit('app/SET_REDIRECT_AFTER_SOCIAL_AUTH',this.$route.fullPath);
        this.$auth.loginWith('google', {
          params: {
            prompt: "select_account",
            'redirect_uri': process.env.appURL + '/social-login/google',
          },

        })

      } catch (err) {
        this.$refs.loginForm.setErrors({
          passwordLogin: [this.$t('common.errors.invalid_credentials')]
        });
      } finally {
        this.isLoading = false;
      }
    },
    /**
     * @desc on linkedin login
     * @returns {Promise<void>}
     */
    async onLinkedinLogin() {
      try {
        this.isLoading = true;

        this.$auth.loginWith('linkedin')

      } catch (err) {
        console.error(err)
        this.$refs.loginForm.setErrors({
          passwordLogin: [this.$t('common.errors.invalid_credentials')]
        });
      } finally {
        this.isLoading = false;
      }
    },
    /**
     * @desc On register user
     * @returns {Promise<void>}
     */
    async onRegister() {
      this.isLoading = true;
      try {
        this.form.password_confirmation = this.form.password
        await this.$services.auth.register(this.form, this.$i18n.locale)
        await this.onLogin();
        this.$gtm.push({event: 'register', event_category: 'register'})
        this.onClose()
        this._resetForm();
      } catch (err) {
        console.error('onRegister',err)
        this.$toast.error(this.$t('error.generic'))
      } finally {
        this.isLoading = false;
      }
    },

    async onPasswordForgot() {
      this.isLoading = true;
      try {
        await this.$services.auth.passwordForgot(this.form.email, this.$i18n.locale)
        this.checkEmailResult = null
        this.onClose()
        this._resetForm();
        this.$toast.success(this.$t('password.reset_link_sent'))
      } catch (err) {
        console.error('onPasswordForgot',err)
        this.$toast.error(this.$t('error.generic'))
      } finally {
        this.isLoading = false;
      }
    },
    /**
     * @desc Reset form
     * @private
     */
    _resetForm() {
      Object.keys(this.form).forEach(key => {
        this.form[key] = '';
      })
      this.hasPasswordError = false;
    }
  },
  computed: {
    computedDialogTitle() {
      if (this.checkEmailResult && this.checkEmailResult.exist) {
        return 'Ciao, ' + this.checkEmailResult.user.name;
      } else if (this.checkEmailResult && !this.checkEmailResult.exist) {
        return "Completa la registrazione";
      } else {
        return this.$t('auth.dialog.login_or_register')
      }
    }
  },

}
</script>

<style lang="scss" scoped>
  :deep(.vue-apple-login) {
    max-height: 40px !important;
    div{
      &:first-child{
        max-width: 100% !important;
        max-height: 40px !important;

      }
    }
    svg{
      max-height: 40px !important;
    }
  }
</style>
