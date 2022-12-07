import AcEsignToolbar from "./AcEsignToolbar.vue";
import AcEsignToolSignature from "./AcEsignToolSignature.vue";

const TOOLS = {
  signature: AcEsignToolSignature,
};

const tool_mixin = {
  props: {
    class_name: [String, Array, Object],
  },
};

export { TOOLS, tool_mixin };

export default AcEsignToolbar;
