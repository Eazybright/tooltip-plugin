<script setup lang="ts">

import tippy from "tippy.js";
import "tippy.js/dist/tippy.css";
import { onMounted, ref, onUpdated, onUnmounted, inject } from "vue";
import { tooltipOptionsInject } from "./";

// accept the text prop so message can be customized
const props = defineProps({
  text: { 
    type: String, 
    required: true 
  },
  options: {
    type: Object,
    default(){
      return {};
    }
  }
});

// a template ref to get the span DOM element in the template
const tooltip = ref(null);

// tippyInstance used for destroying if it already exists before create a new one
let tippyInstance = null;

// initialize tippy on the proper element with the proper content
function initTippy() {
  // if tippy tooltip already exists destroy it before creating another
  if (tippyInstance) tippyInstance.destroy();

  // the tippy function takes the element to hover over and some options
  // remember we want the element the tooltip is nested under 
  // we can access that on the template ref's parentNode
  tippyInstance = tippy(tooltip.value.parentNode, {
    ...inject(tooltipOptionsInject),
    content: props.text,
    ...props.options,
  });
}

// we should initialize tippy on mounted so that it works on app load
onMounted(initTippy);

// but we should also initialize it again on update
// so that the tooltip text is reactive
onUpdated(initTippy);

// Finally we should clean up things and prevent memory leaks by destorying
// tippy whenever the component is unmounted
onUnmounted(() => tippyInstance.destroy());
</script>

<template>
   <span ref="tooltip"></span>
  <!-- <div>My tooltip plugin</div> -->
</template>