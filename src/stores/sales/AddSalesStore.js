import { flow, types } from 'mobx-state-tree';
import { Alert } from 'react-native';
import { apiRegister, apiAddSales } from '../../utils/api';
const AddSales = types
  .model('RegisterStore', {
    name: types.optional(types.string, ''),
    phonenumber: types.optional(types.string, ''),
    email: types.optional(types.string, ''),
    password: types.optional(types.string, ''),
    confirmPassword: types.optional(types.string, ''),

    address: types.optional(types.string, ''),
    city: types.optional(types.string, ''),
    cityId: types.optional(types.string, ''),
    dob: types.optional(types.string, ''),
    telp: types.optional(types.string, ''),
    nik: types.optional(types.string, ''),
    area: types.optional(types.string, ''),
    note: types.optional(types.string, ''),

    loading: types.optional(types.boolean, false),
  })
  .actions(self => {
    const clearStore = () => {
      self.name = '';
      self.phonenumber = '';
      self.email = '';
      self.password = '';
      self.confirmPassword = '';

      self.address = '';
      self.city = '';
      self.cityId = '';
      self.dob = '';
      self.telp = '';
      self.nik = '';
      self.area = '';
      self.note = '';

      self.loading = false;
    };

    const validateField = () => {
      if (
        self.name &&
        self.phonenumber &&
        self.email &&
        self.password &&
        self.confirmPassword &&
        self.address &&
        self.city &&
        // self.dob &&
        self.telp &&
        self.nik &&
        self.area
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

        const phonePattern = /^0\d{10}|d{11}$/.test(self.phonenumber)
          ? undefined
          : 'Phonenumber yang anda masukan salah, contoh: 081933123456';

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

    const setAddress = value => {
      self.address = value;
    };

    const setCity = data => {
      if (data) {
        self.cityId = data.city_id;
        self.city = data.city_name;
      }
    };

    const setDob = value => {
      self.dob = value;
    };

    const setTelp = value => {
      self.telp = value;
    };

    const setNik = value => {
      self.nik = value;
    };

    const setArea = value => {
      self.area = value;
    };

    const setNote = value => {
      self.note = value;
    };

    const fetchRegister = flow(function*() {
      try {
        self.loading = true;
        const response = yield apiAddSales(
          self.name,
          self.email,
          self.password,
          self.phonenumber,
          self.address,
          self.city,
          self.dob,
          self.telp,
          self.nik,
          self.area,
          self.note,
        );

        return response;
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
      clearStore,
      validateField,

      setName,
      setPhonenumber,
      setEmail,
      setPassword,
      setConfirmPassword,

      setAddress,
      setCity,
      setDob,
      setTelp,
      setNik,
      setArea,
      setNote,

      fetchRegister,
    };
  });

const AddSalesStore = AddSales.create({
  loading: false,
});

export default AddSalesStore;
