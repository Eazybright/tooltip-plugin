import { createApp } from "vue";
import App from "./App.vue";
import { createToolTipPlugin } from "./ToolTipPlugin";
import "./assets/main.css";

createApp(App)
.use(createToolTipPlugin({
    arrow: true,
    placement: 'bottom'
  })
)
.mount("#app");
