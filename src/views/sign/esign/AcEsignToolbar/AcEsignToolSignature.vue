<template>
  <ToolWrapper
    :class="[class_name, 'ac-esign-tool-signature']"  
  >
    <div v-if="!is_filled" class="ac-esign-tool_placeholder">
      <b-button variant="primary" @click="show_signature" :disabled="!is_editable">Signature</b-button>
    </div>
    <div v-if="is_svg && is_filled" ref="svg" class="w-100 h-100"></div>
    <img v-if="!is_svg && is_filled" :src="signature_src" ref="img" alt="Signature" :style="signature_styles" />
  </ToolWrapper>
</template>
<script>
  export default {
    name: "AcEsignToolSignature",
    props: {
      value: {
        type: String,
      },
      class_name: [String, Array, Object],  
    },
  };
</script>

