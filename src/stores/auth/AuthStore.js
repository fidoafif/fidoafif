import { flow, types } from 'mobx-state-tree';
import { Alert } from 'react-native';
import { apiGetProfile, apiLogin } from '../../utils/api';

const UserAuth = types
  .model('UserAuth', {
    phone: types.optional(types.string, ''),
    password: types.optional(types.string, ''),
    loading: types.optional(types.boolean, false),
  })
  .actions(self => {
    const clearStore = () => {
      self.phone = '';
      self.password = '';
      self.loading = false;
    };

    const setPhonenumber = value => {
      self.phone = value;
    };

    const setPassword = value => {
      self.password = value;
    };

    const validate = () => {
      if (self.phone !== '' && self.password !== '') {
        const phonePattern = /^0\d{9}|d{11}$/.test(self.phone)
          ? undefined
          : 'Nomor Telepon yang anda masukan salah, contoh: 0819331234';

        if (phonePattern) {
          Alert.alert('Error', phonePattern);
          return false;
        }

        return true;
      }
    };

    const fetchLogin = flow(function*() {
      try {
        self.loading = true;
        const response = yield apiLogin(self.phone, self.password);

        if (Number(response.status) === 200) {
          return response.data;
        }
      } catch (error) {
        const response = JSON.parse(JSON.stringify(error));
        if (response && response.response && response.response.data) {
          Alert.alert('Login Failed', response.response.data.invalid);
          console.log(response.response.data.invalid);
        }
        return null;
      } finally {
        self.loading = false;
      }
    });
    const fetchGetProfile = flow(function*() {
      try {
        self.loading = true;
        const response = yield apiGetProfile();

        return response;
      } catch (error) {
        return null;
      } finally {
        self.loading = false;
      }
    });

    // const addUserAuth = (userAuth) => {
    //   self.email = userAuth.email;
    //   self.password = userAuth.password;
    //   const token = login();
    //   console.log('TOKEN :', token);
    //   return token;
    // };

    return {
      clearStore,
      setPhonenumber,
      setPassword,
      validate,

      fetchLogin,
      fetchGetProfile,
    };
  });

const AuthStore = UserAuth.create({
  phone: '',
  password: '',
});

export default AuthStore;
