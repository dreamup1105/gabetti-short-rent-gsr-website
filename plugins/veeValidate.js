import moment from 'moment';
import {extend, configure, localize} from 'vee-validate';
import PhoneNumber from 'awesome-phonenumber';
import {required, email, min} from 'vee-validate/dist/rules';

export default function (ctx) {
  extend('password', {
    params: ['target'],
    validate(value, {target}) {
      return value === target;
    },
    //message: ctx.app.i18n.t('common.passwords_dont_match'),
  });

  extend('phone', {
    message() {
      return `${ctx.app.i18n.t('common.errors.phone')}`;
    },
    validate(value) {
      return new Promise((resolve) => {
        const phone = new PhoneNumber(value);
        resolve({valid: phone.isValid()});
      });
    },
  });

  extend('adult', {
    message() {
      return `${ctx.app.i18n.t('auth.form.birthdate_message')}`;
    },
    validate(value) {
      return new Promise((resolve) => {
        const dateSet = moment(value, "YYYY-MM-DD");
        const now = moment();
        const diff = now.diff(dateSet, 'years')
        const isValid = diff >= 18 && diff <= 120 // between 18 and 120 years old
        resolve({valid: isValid});
      });
    }
  })

  extend('future', {
    message() {
      return `${ctx.app.i18n.t('common.errors.future_date')}`;
    },
    validate(value) {
      return new Promise((resolve) => {
        const dateSet = moment(value, "YYYY-MM-DD");
        const now = moment();
        const diff = now.diff(dateSet, 'days')
        const isValid = diff <= 0
        resolve({valid: isValid});
      });
    }
  })

  extend("required", {
    ...required,
  });

  extend("email", {
    ...email,
  });

  extend("min", {
    ...min,
  });

  localize({
    en: {
      names: {
        passwordLogin: 'Password',
      }
    },
    it: {
      names: {
        passwordLogin: 'Password',
      }
    }
  });
}
