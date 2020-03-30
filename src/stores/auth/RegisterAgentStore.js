import { flow, types } from 'mobx-state-tree';
import { Alert } from 'react-native';
import { apiPostBecomeAgent } from '../../utils/api';

const AgentRegister = types
  .model('AgentRegisterStore', {
    name: types.optional(types.string, ''),
    address: types.optional(types.string, ''),
    city: types.optional(types.string, ''),
    cityId: types.optional(types.string, ''),
    siup: types.optional(types.string, ''),
    nikSiup: types.optional(types.string, ''),
    contact: types.optional(types.string, ''),
    phonenumber: types.optional(types.string, ''),
    telp: types.optional(types.string, ''),
    email: types.optional(types.string, ''),
    pkp: types.optional(types.string, ''),
    pkpId: types.optional(types.string, ''),
    npwp: types.optional(types.string, ''),
    // codeArea: types.optional(types.string, ''),

    loading: types.optional(types.boolean, false),
  })
  .actions(self => {
    const clearStore = () => {
      self.name = '';
      self.address = '';
      self.city = '';
      self.cityId = '';
      self.siup = '';
      self.nikSiup = '';
      self.contact = '';
      self.phonenumber = '';
      self.telp = '';
      self.email = '';
      self.pkp = '';
      self.pkpId = '';
      self.npwp = '';
      // self.codeArea = '';
      self.loading = false;
    };

    const validateField = () => {
      if (
        self.name &&
        self.address &&
        self.city &&
        self.cityId &&
        self.siup &&
        self.contact &&
        self.phonenumber
        // self.codeArea
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
          : 'Phonenumber yang anda masukan salah, contoh: 081933123456';

        if (phonePattern) {
          Alert.alert('Error', phonePattern);
          return false;
        }

        return true;
      }

      if (self.name === '') {
        Alert.alert('Error', 'Nama diperlukan');
      } else if (self.address === '') {
        Alert.alert('Error', 'Alamat diperlukan');
      } else if (self.city === '') {
        Alert.alert('Error', 'Kota diperlukan');
      } else if (self.contact === '') {
        Alert.alert('Error', 'Contact Name diperlukan');
      } else if (self.siup === '') {
        Alert.alert('Error', 'Owner SIUP diperlukan');
      } else if (self.phonenumber === '') {
        Alert.alert('Error', 'Phonenumber diperlukan');
      }
      // else if (self.codeArea === '') {
      //   Alert.alert('Error', 'Kode Area diperlukan');
      // }

      return false;
    };

    const setName = value => {
      self.name = value;
    };

    // const setCodeArea = value => {
    //   self.codeArea = value;
    // };

    const setAddress = value => {
      self.address = value;
    };

    const setPhonenumber = value => {
      self.phonenumber = value;
    };

    const setEmail = value => {
      self.email = value;
    };

    const setCity = data => {
      if (data) {
        self.cityId = data.city_id;
        self.city = data.city_name;
      }
    };

    const setSiup = value => {
      self.siup = value;
    };

    const setNikSiup = value => {
      self.nikSiup = value;
    };

    const setContact = value => {
      self.contact = value;
    };

    const setTelp = value => {
      self.telp = value;
    };

    const setPkp = data => {
      self.pkp = data.name;
      self.pkpId = data.value;
    };

    const setNpwp = value => {
      self.npwp = value;
    };

    const fetchAgentRegister = flow(function*() {
      try {
        self.loading = true;
        const response = yield apiPostBecomeAgent(
          self.name,
          self.address,
          self.cityId,
          self.siup,
          self.nikSiup,
          self.contact,
          self.phonenumber,
          self.telp,
          self.email,
          self.pkpId,
          self.npwp,
          // self.codeArea,
        );

        if (response) {
          return response;
        }
      } catch (error) {
        return null;
      } finally {
        self.loading = false;
      }
    });

    return {
      clearStore,
      validateField,

      setName,
      setAddress,
      setPhonenumber,
      setEmail,
      setCity,
      setSiup,
      setNikSiup,
      setContact,
      setTelp,
      setPkp,
      setNpwp,
      // setCodeArea,

      fetchAgentRegister,
    };
  });

const RegisterAgentStore = AgentRegister.create({
  name: '',
  address: '',
  city: '',
  cityId: '',
  siup: '',
  nikSiup: '',
  contact: '',
  phonenumber: '',
  telp: '',
  email: '',
  pkp: '',
  npwp: '',
  // codeArea: '',
});

export default RegisterAgentStore;
