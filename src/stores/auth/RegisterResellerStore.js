import { flow, types } from "mobx-state-tree";
import { Alert } from "react-native";
import { apiPostBecomeReseller } from "../../utils/api/apiReseller";

const ResellerRegister = types
  .model("ResellerRegisterStore", {
    name: types.optional(types.string, ""),
    address: types.optional(types.string, ""),
    city: types.optional(types.string, ""),
    cityId: types.optional(types.string, ""),
    phonenumber: types.optional(types.string, ""),
    email: types.optional(types.string, ""),

    loading: types.optional(types.boolean, false)
  })
  .actions(self => {
    const clearStore = () => {
      self.name = "";
      self.address = "";
      self.city = "";
      self.cityId = "";
      self.phonenumber = "";
      self.email = "";
      self.loading = false;
    };

    const validateField = () => {
      if (
        self.name &&
        self.address &&
        self.city &&
        self.cityId &&
        self.phonenumber &&
        self.email
      ) {
        const emailPattern = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(
          self.email
        )
          ? undefined
          : "Email format wrong";

        if (emailPattern) {
          Alert.alert("Error", emailPattern);
          return false;
        }

        const phonePattern = /^0\d{9}|d{11}$/.test(self.phonenumber)
          ? undefined
          : "Phonenumber yang anda masukan salah, contoh: 081933123456";

        if (phonePattern) {
          Alert.alert("Error", phonePattern);
          return false;
        }

        return true;
      }

      if (self.name === "") {
        Alert.alert("Error", "Nama diperlukan");
      } else if (self.address === "") {
        Alert.alert("Error", "Alamat diperlukan");
      } else if (self.city === "") {
        Alert.alert("Error", "Kota diperlukan");
      } else if (self.phonenumber === "") {
        Alert.alert("Error", "Phonenumber diperlukan");
      } else if (self.email === "") {
        Alert.alert("Error", "Email diperlukan");
      }

      return false;
    };

    const setName = value => {
      self.name = value;
    };

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

    const fetchResellerRegister = flow(function*() {
      try {
        self.loading = true;
        const response = yield apiPostBecomeReseller(
          self.name,
          self.address,
          self.cityId,
          self.phonenumber,
          self.email
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

      fetchResellerRegister
    };
  });

const RegisterAgentStore = ResellerRegister.create({});

export default RegisterAgentStore;
