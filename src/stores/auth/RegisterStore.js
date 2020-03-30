import { flow, types } from 'mobx-state-tree';
import { Alert } from 'react-native';
import { apiRegister } from '../../utils/api';

const Register = types
  .model('RegisterStore', {
    name: types.optional(types.string, ''),
    phonenumber: types.optional(types.string, ''),
    email: types.optional(types.string, ''),
    password: types.optional(types.string, ''),
    confirmPassword: types.optional(types.string, ''),
    loading: types.optional(types.boolean, false),
  })
  .actions(self => {
    const clearStore = () => {
      self.name = '';
      self.phonenumber = '';
      self.email = '';
      self.password = '';
      self.confirmPassword = '';
      self.loading = false;
    };

    const validateField = () => {
      if (
        self.name &&
        self.phonenumber &&
        self.email &&
        self.password &&
        self.confirmPassword
      ) {
        const emailPattern = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(
          self.email,
        )
          ? undefined
          : 'Email format wrong';

        if (emailPattern) {
          Alert.alert('Error', emailPattern);
          return false;
        }

        const phonePattern = /^0\d{9}|d{11}$/.test(self.phonenumber)
          ? undefined
          : 'Nomor Telepon yang anda masukan salah, contoh: 081933123456';

        if (phonePattern) {
          Alert.alert('Error', phonePattern);
          return false;
        }

        if (self.password !== self.confirmPassword) {
          Alert.alert('Error', "Password doesn't match");
          return false;
        }

        return true;
      }

      return false;
    };

    const setName = value => {
      self.name = value;
    };

    const setPhonenumber = value => {
      self.phonenumber = value;
    };

    const setEmail = value => {
      self.email = value;
    };

    const setPassword = value => {
      self.password = value;
    };

    const setConfirmPassword = value => {
      self.confirmPassword = value;
    };

    const fetchRegister = flow(function*() {
      try {
        self.loading = true;
        const response = yield apiRegister(
          self.name,
          self.phonenumber,
          self.email,
          self.password,
        );

        if (response && response.data) {
          return response.data;
        }
      } catch (error) {
        const response = JSON.parse(JSON.stringify(error));
        if (response && response.response && response.response.data) {
          Alert.alert('Error', response.response.data.message);
        }
        return null;
      } finally {
        self.loading = false;
      }
    });

    return {
      clearStore,
      validateField,

      setName,
      setPhonenumber,
      setEmail,
      setPassword,
      setConfirmPassword,

      fetchRegister,
    };
  });

const RegisterStore = Register.create({
  name: '',
  phonenumber: '',
  email: '',
  password: '',
  confirmPassword: '',
});

export default RegisterStore;
