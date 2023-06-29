import { AbstractControl, ValidatorFn, ValidationErrors } from '@angular/forms';

export class FormValidator {
  static onlyLetters(control: AbstractControl): ValidationErrors | null {
    const valor = control.value;
    const regex =
      /^([^\u0000-\u0040\u005B-\u0060\u007B-\u00BF\u02B0-\u036F\u00D7\u00F7\u2000-\u2BFF])+$/;

    if (regex.test(valor) || !valor) {
      return null;
    } else {
      return { onlyLetters: true };
    }
  }
  static lettersAndNumbers(control: AbstractControl): ValidationErrors | null {
    const valor = control.value;
    const regex = /^[A-z0-9Á-ü]+$/;
    if (regex.test(valor) || !valor) {
      return null;
    } else {
      return { lettersAndNumbers: true };
    }
  }

  static onlyNumbers(control: AbstractControl): ValidationErrors | null {
    const valor = control.value;
    const regex = /^[0-9]+$/;

    if (regex.test(valor) || !valor) {
      return null;
    } else {
      return { onlyNumbers: true };
    }
  }

  static email(control: AbstractControl): ValidationErrors | null {
    const valor = control.value;
    const regex = /^[aA0-zZ9]+@[aA-zZ]+.[aA-zZ]{2,3}(.[aA-zZ]{2,3})?$/;

    if (regex.test(valor) || !valor) {
      return null;
    } else {
      return { email: true };
    }
  }

  static password(control: AbstractControl): ValidationErrors | null {
    const valor = control.value;
    const regex = /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;
    const confirm = control.parent?.get('confirmPassword');

    if (confirm?.value === valor) {
      confirm?.setErrors(null);
    } else {
      confirm?.setErrors({ confirmPassword: true });
    }
    if (regex.test(valor) || !valor) {
      return null;
    } else {
      return { password: true };
    }
  }

  static confirmPassword(control: AbstractControl): ValidationErrors | null {
    const valor = control.value;
    const password = control.parent?.value.password;

    if (valor === password) {
      return null;
    } else {
      return { confirmPassword: true };
    }
  }

  static obraSocial(control: AbstractControl): ValidationErrors | null {
    const valor = control.value;
    const regex = /^(1-[0-9]{4}-[0-9])$/;

    if (regex.test(valor) || !valor) {
      return null;
    } else {
      return { obraSocial: true };
    }
  }

  static validDate(control: AbstractControl): ValidationErrors | null {
    const valor = control.value;
    const regex = /^([0-9]{4})[-/](0[1-9]|1[012])[-/]([123]0|[012][1-9]|31)$/;

    if (regex.test(valor) || !valor) {
      return null;
    } else {
      return { validDate: true };
    }
  }
  static dateFrom(control: AbstractControl): ValidationErrors | null {
    const valor = control.value;
    const regex = /^([0-9]{4})[-/](0[1-9]|1[012])[-/]([123]0|[012][1-9]|31)$/;
    const hasta = control.parent?.get('hasta');

    if (regex.test(valor)) {
      if (!hasta?.value || hasta?.hasError('validDate')) return null;
      else {
        console.log(valor, hasta?.value);
        const d1 = new Date(valor).getTime();
        const d2 = new Date(hasta.value).getTime();

        return d1 < d2 ? null : { dateFrom: true };
      }
    } else {
      return { dateFrom: true };
    }
  }
  static dateTo(control: AbstractControl): ValidationErrors | null {
    const valor = control.value;
    const regex = /^([0-9]{4})[-/](0[1-9]|1[012])[-/]([123]0|[012][1-9]|31)$/;
    const desde = control.parent?.get('desde');

    if (regex.test(valor)) {
      if (!desde?.value || desde?.hasError('validDate')) return null;
      else {
        console.log(valor, desde?.value);
        const d1 = new Date(valor).getTime();
        const d2 = new Date(desde.value).getTime();

        return d1 > d2 ? null : { dateFrom: true };
      }
    } else {
      return { validDate: true };
    }
  }

}
