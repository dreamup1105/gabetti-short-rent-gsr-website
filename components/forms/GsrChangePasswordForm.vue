<template>
  <div class="flex flex-col md:flex-row space-y-8 md:space-y-0 md:space-x-8 justify-center items-center">
    <div class="flex flex-col space-y-4 w-full">
      <div class="flex items-center">
        <div
          @mouseenter="inputType = 'text'"
          @mouseleave="inputType = 'password'"
          class="ml-auto text-gray-600 cursor-pointer hover:text-gray-700"
        >
          {{ $t('common.show_password') }}
        </div>
      </div>
      <form>
        <div class="mb-5">
          <GsrInput
            id="password"
            :type="inputType"
            v-model="form.password"
            :placeholder="$t('auth.form.password')"
            name="password"
            :label="$t('auth.form.password')"
          />
        </div>
        <div class="mb-5">
          <GsrInput
            id="password_confirmation"
            :type="inputType"
            v-model="form.password_confirmation"
            :placeholder="$t('auth.form.password_confirmation')"
            name="password_confirmation"
            :label="$t('auth.form.password_confirmation')"
          />
        </div>
      </form>
    </div>
    <!-- Errors list -->
    <ul class="w-full">
      <li
        v-for="rule in rules"
        :key="rule.code"
        class="flex flex-row items-center mb-1 space-x-2"
      >
        <div v-if="!errors[rule.code]" class="w-2 h-2 rounded-full bg-green-700 flex-shrink-0"></div>
        <div v-else class="w-2 h-2 rounded-full bg-red-700 flex-shrink-0"></div>
        <span class="text-sm font-regular flex-grow-0">{{ rule.label }}</span>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "ChangePasswordForm",
  components: {
    GsrInput: () => import('@/components/input/GsrInput'),
  },
  props: {
    showOldPassword: {
      type: Boolean,
      default: false
    }
  },
  mounted() {
    if (this.showOldPassword) {
      this.rules.push({
        code: "oldPasswordDifferentFromNew",
        label: "La nuova password deve essere diversa dalla vecchia"
      },)
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
  data() {
    return {
      form: {
        old_password: '',
        password: '',
        password_confirmation: ''
      },
      inputType: "password",
      errors: {},
      rules: [
        {
          code: "equal",
          label: this.$t('password.equal')
        },
        {
          code: "length",
          label: this.$t('password.length')
        },
        {
          code: "number",
          label: this.$t('password.number')
        },
        {
          code: "uppercase",
          label: this.$t('password.uppercase')
        },
        /*{
          code: "special",
          label: this.$t('password.special')
        }*/
      ]
    }
  },
  computed: {
    /**
     * @desc Check if passwords are equal
     * @returns {boolean}
     */
    passwordsAreEqual() {
      if (!this.form.password && !this.form.password_confirmation) {
        return false;
      }

      return this.form.password === this.form.password_confirmation;
    },
    /**
     * @desc Check if password is pristine
     * @returns {boolean}
     */
    passwordIsPristine() {
      return !this.form.password && !this.form.password_confirmation;
    },
    /**
     * @desc Check password error
     * @returns {null|boolean}
     */
    passwordError() {
      if (this.passwordIsPristine) {
        return null;
      }

      let errors = {};

      if (!this.passwordsAreEqual) {
        errors.equal = true;
      }

      // Old password errors
      if (this.showOldPassword && !this.form.old_password || this.form.old_password === this.form.password) {
        errors.oldPasswordDifferentFromNew = true;
      }

      if (this.form.password === this.form.password.toLowerCase()) {
        errors.uppercase = true;
      }

      if (this.form.password.length < 8) {
        errors.length = true;
      }

      if (!/\d/.test(this.form.password)) {
        errors.number = true;
      }

      this.errors = errors;

      return Object.keys(errors).length > 0;
    },
  }
}
</script>

<style scoped>

</style>
