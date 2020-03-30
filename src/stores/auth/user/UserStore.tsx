import { flow, types } from 'mobx-state-tree';
import { Alert } from 'react-native';
import { apiEditUser } from '../../../utils/api';

const User = types
  .model('UserStore', {
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

    const initStore = (data) => {
      self.name = data.name;
      self.phonenumber = data.phone;
      self.email = data.email;
    };

    const validateField = () => {
      if (self.name && self.phonenumber && self.email) {
        const emailPattern = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(
          self.email,
        )
          ? undefined
          : 'Email format wrong';

        if (emailPattern) {
          Alert.alert('Error', emailPattern);
          return false;
        }

        if (self.password || self.confirmPassword) {
          if (self.password !== self.confirmPassword) {
            Alert.alert('Error', `Password doesn't match`);
            return false;
          }
        }

        return true;
      }

      return false;
    };

    const setName = (value) => {
      self.name = value;
    };

    const setPhonenumber = (value) => {
      self.phonenumber = value;
    };

    const setEmail = (value) => {
      self.email = value;
    };

    const setPassword = (value) => {
      self.password = value;
    };

    const setConfirmPassword = (value) => {
      self.confirmPassword = value;
    };

    const fetchEditUser = flow(function*() {
      try {
        self.loading = true;
        const response = yield apiEditUser(
          self.name,
          self.phonenumber,
          self.email,
          self.password,
        );

        if (response && Number(response.status) === 201) return response;
      } catch (error) {
        const response = JSON.parse(JSON.stringify(error));

        if (response && response.response && response.response.data) {
          Alert.alert('Error', response.response.data.invalid);
        }
        return null;
      } finally {
        self.loading = false;
      }
    });
    return {
      initStore,
      clearStore,
      validateField,

      setName,
      setPhonenumber,
      setEmail,
      setPassword,
      setConfirmPassword,

      fetchEditUser,
    };
  });

const UserStore = User.create({
  name: '',
  phonenumber: '',
  email: '',
  password: '',
  confirmPassword: '',
});

export default UserStore;
