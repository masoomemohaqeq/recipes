import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import "./assets/css/global.css";
import "./assets/fontawesome/css/all.min.css";
/* import the fontawesome core */
import { library } from "@fortawesome/fontawesome-svg-core";

/* import font awesome icon component */
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

/* import specific icons */
import {
  faClock,
  faFaceSadCry,
  faFileCirclePlus,
  faHome,
  faRightFromBracket,
  faStar,
  faUpload,
  faUserSecret,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";

/* add icons to the library */
library.add(
  faUserSecret,
  faFaceSadCry,
  faStar,
  faClock,
  faXmark,
  faUpload,
  faRightFromBracket,
  faHome,
  faFileCirclePlus
);

createApp(App)
  .component("font-awesome-icon", FontAwesomeIcon)
  .use(router)
  .mount("#app");
