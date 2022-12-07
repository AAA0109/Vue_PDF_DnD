<template>
  <div class="ac-esign-toolbar">
   <div >
      <b-list-group class="">
        <b-list-group-item v-for="tool in simple_tools" :key="`simple_${tool.id}`" :data-tool_id="tool.id" class="ac-esign-toolbar_item p-2" ref="tools" draggable="true">
          <div class="p-1">
            <h3 :class="[tool.icon]" class="text-muted" v-b-tooltip.hover :title="`${tool.label}`">Sign</h3>
          </div>
        </b-list-group-item>
      </b-list-group>
    </div>
    
  </div>
</template>

<script>
  
  export default {
    name: "AcEsignToolbar",

    props: {
      tools: {
        type: Object,
        default: () => ({}),
      },
    },

    computed: {
      simple_tools() {
        return this.tools.add ? this.tools.add : [];
      },
      resctriction_tools() {
        return this.tools.restrictions ? this.tools.restrictions : [];
      },      
    },
    mounted() {
      this.add_drag_event_listeners();
    },
    methods: {
     
      add_drag_event_listeners() {
        if (!this.$refs.tools) return;
        this.$refs.tools.forEach((tool) => {
          tool.addEventListener("dragstart", this.tool_drag_start);
        });
      },

      remove_drag_event_listeners() {
        if (!this.$refs.tools) return;
        this.$refs.tools.forEach((tool) => {
          tool.removeEventListener("dragstart", this.tool_drag_start);
        });
      },

     
      tool_drag_start(event) {
        console.log(event)
        const all_tools = [...this.simple_tools, ...this.resctriction_tools];
        const tool = all_tools.find(({ id }) => id.toString() === event.target.dataset.tool_id);
        event.dataTransfer.setData("value", JSON.stringify({ ...tool.item, id: tool.id }));
        event.dataTransfer.setData(`json:${JSON.stringify(tool.item)}`, true);
      },
    },
  };
</script>
<style scoped>
  .ac-esign-toolbar_item {
    cursor: copy;
    color: #12263f;
    position: relative;
    z-index: 1;
  }
  .ac-esign-toolbar_item > div:first-child {
    display: inline-block;
    width: 30px;
    height: 30px;
    text-align: center;
    border-radius: 4px;
  }
  .ac-esign-toolbar_item i {
    filter: invert(1) grayscale(1) contrast(5);
    color: transparent;
    background: inherit;
    background-clip: text;
    -webkit-background-clip: text;
    background-clip: text;
  }
  .ac-esign-toolbar_help {
    color: #95aac9;
    font-size: 0.8rem;
  }
  .ac-esign-toolbar_help ul {
    list-style-type: disc;
  }
  .ac-esign-toolbar_user-select,
  .ac-esign-toolbar_user-select_item {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    padding-right: 1.5rem;
  }
  .ac-esign-toolbar >>> .dropdown-toggle::after {
    position: absolute;
    right: 0;
    margin-right: 1rem;
    transform: translateY(-50%);
    top: 50%;
  }
  .ac-esign-toolbar_user-color {
    display: inline-block;
    width: 15px;
    height: 15px;
    border-radius: 50%;
    margin-right: 10px;
  }
  .ac-esign-toolbar_user-select_item >>> .dropdown-item {
    display: flex;
    align-items: center;
  }
  .ac-esign-toolbar_user-select_item {
    margin-bottom: 4px;
  }
  .ac-esign_toolbar .list-group {
    flex-direction: row;
  }
  .ac-esign-toolbar_item {
    display: inline-block;
    border: 1px solid #eff2f4;
    border-radius: 0 !important;
    margin: 0px 4px;
    background: #fff;
  }
  .dropdown >>> .btn-outline-secondary:hover,
  .show >>> .btn-outline-secondary.dropdown-toggle {
    color: #6e84a3;
    border: 1px solid #d2ddec;
    background: #fff !important;
  }
  .dropdown >>> .btn-outline-secondary:focus {
    box-shadow: none;
  }
  .dropdown >>> .dropdown-menu {
    outline: none;
  }
  .ac-esign-toolbar_user-select_item:first-child {
    border-top: none;
    padding-top: 0.65rem;
  }
  .ac-esign-toolbar_user-select_item:last-child {
    padding-bottom: 0.65rem;
  }
  .ac-esign-toolbar_user-select_item {
    border-top: 1px solid #e3ebf6;
    padding-top: 1rem;
    padding-bottom: 1rem;
  }
  .ac-esign-toolbar_item:hover {
    background: #d5e5fa;
  }
  .ac-esign-toolbar_help >>> ul {
    list-style: none;
  }
</style>
