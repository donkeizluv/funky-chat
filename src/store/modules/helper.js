import uuidv1 from "uuid/v1";
import { GEN_GUID, GEN_RANDOM_STRING } from "../actions/action-types";

const actions = {
  [GEN_GUID]: () => {
    return uuidv1();
  },
  [GEN_RANDOM_STRING]() {
    return uuidv1();
  }
};

export default {
  actions
};
