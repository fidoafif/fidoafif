// import config from './configureStore';
import configStore from "./configureStore";
import setup from "./setup";

export default function() {
  const stores = configStore();
  return setup(stores);
}
