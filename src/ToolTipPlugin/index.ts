import type { App } from "vue"
import { defu } from 'defu'
import { hideAll } from "tippy.js";
import ToolTip from "./ToolTip.vue"
import type { Props } from "tippy.js";
import { defineAsyncComponent } from "vue";

// ⬇️ options can be manually typed 
// or in this case just reused from tippy
type PluginOptions = Partial<Props>;

export const tooltipOptionsInject = Symbol();

// ⬇️ export the create function instead of the install function
export function createToolTipPlugin(options: PluginOptions) {
  return (app) => {
    // console.log("installing tooltip plugin")
    options = defu(options, {
      placement: "left",
    });
    app.config.globalProperties.$hideAllTooltips = hideAll;
    app.provide(tooltipOptionsInject, options);
     app.component(
      "ToolTip",
      defineAsyncComponent(() => import("./ToolTip.vue"))
    );
  };
}