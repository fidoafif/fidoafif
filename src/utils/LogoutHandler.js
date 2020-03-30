import { Util } from "expo";

const logoutHandler = async () => {
  setTimeout(() => {
    Util.reload();
  }, 3000);
};

export { logoutHandler };
