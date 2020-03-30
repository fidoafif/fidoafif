import { flow, types } from 'mobx-state-tree';
import { Alert } from 'react-native';
import { apiSalesGetAgentProfile } from '../../utils/api';
const SalesAgent = types
  .model('SalesAgentStore', {
    token: types.optional(types.string, ''),
    name: types.optional(types.string, ''),

    loading: types.optional(types.boolean, false),
  })
  .actions(self => {
    const clearStore = () => {
      self.token = '';
      self.name = '';

      self.loading = false;
    };

    const validate = () => {
      if (self.token) {
        return true;
      }

      return false;
    };

    const setToken = value => {
      self.token = value;
    };
    const setName = value => {
      self.name = value;
    };

    const getAgentData = flow(function*() {
      try {
        self.loading = true;
        const response = yield apiSalesGetAgentProfile(self.token);
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
      validate,

      setToken,
      setName,

      getAgentData,
    };
  });

const SalesAgentStore = SalesAgent.create({
  token: '',
});

export default SalesAgentStore;
