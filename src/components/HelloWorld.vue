<template>
  <div >
    <h1>{{ "Sign Drag and Drop Component" }}</h1>
    <AddDocumentSignees />
  </div>
</template>
<script>
// TODO: CHANGE 'AddDocumentSignees' FILE PATH TO YOUR LOCAL PATH.
import AddDocumentSignees from "/src/views/sign/signees/AddDocumentSignees.vue"
export default {
  name: 'HelloWorld',
  components:{AddDocumentSignees}
}
</script>
