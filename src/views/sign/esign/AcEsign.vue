<template>
  <div>
    <div class="ac-esign" v-if="render">
   
        <div class="d-flex align-items-center ac-esign-toolbar">
         
          <span class="d-block d-lg-none ml-3" @click="toolbarOpen()" :class="showtoolbar ? 'fe fe-menu text-dark' : 'fe fe-x text-dark'"></span>
          <b-dropdown class="w-100 p-1" variant="outline-secondary min-width-10 ml-2" v-if="signeeType !== 'ME'" size="sm">
            <template v-slot:button-content>
              <div class="ac-esign-toolbar_user-select ">
                <div class="ac-esign-toolbar_user-color" :style="`background-color:${selected_user.color}`"></div>
                {{ selected_user.name }}
              </div>
            </template>
            <b-dropdown-item
              v-for="(option, index) in toolbar_users_list"
              :disabled="option.status == 'Viewer'"
              :key="`option_${index}`"
              :active="option === selected_user"
              class="ac-esign-toolbar_user-select_item custom-select-sm"
              @click="select_user(option)"
            >
              <div class="ac-esign-toolbar_user-color" :style="`background-color:${option.color}`"></div>
              {{ option.text }}
              <span class="fe fe-eye option-icons ml-auto mt-1" v-if="option.status == 'Viewer'"></span>
            </b-dropdown-item>
          </b-dropdown>
        </div>
       
      </div>

      <div class="ac-esign_body">
        <div class="ac-esign_body-toolbar" v-if="showtoolbar">
          <AcEsignToolbar
            ref="ac-esign-toolbar"
            class="ac-esign_toolbar"
            :tools="toolbar_tools"
            :users_list="select_user_options"
            :show_save_button="show_save_button"
            signeeType="ME"
            v-model="selected_user"
          />
        </div>

        <!-- Ac Esign Viewer  -->
        <div class="ac-esign_viewer_container d-flex justify-content-center">
          <AcEsignViewer
            :pdfjs_document="pdfjs_document"
            :scale="selected_pdf_scale"
            :selected_user="selected_user"
            @active_page="active_page = $event"
            @pagesrendered="on_pages_rendered"
            ref="viewer"
          >
            <template #loader>
              <slot name="viewer_loader">loading viewer...</slot>
            </template>
          </AcEsignViewer>

         
        </div>
      </div>
    
    </div>
</template>

<script>
  import { getDocument } from "pdfjs-dist";
  import AcEsignViewer from "./AcEsignViewer.vue";
  import AcEsignToolbar from "./AcEsignToolbar/AcEsignToolbar";
  import { edit_pdf } from "./utils";
  import { SIMPLE_TOOLS, RESTRICTION_TOOLS,  } from "./constants";
  export default {
    name: "AcEsign",

    components: {
      AcEsignViewer,
      AcEsignToolbar,
    },

    props: {
     
      show_tools: {
        type: Boolean,
        default: true,
      },
     
      signeeType: {
        type: String,
        required: true,
      },
     
      render: {
        type: Boolean,
        required: false,
        default: true,
      },
      
      src: {
        type: String,
        required: true,
      },

      file_url: {
        type: String,
      },
      
      admin: {
        type: Boolean,
        default: false,
      },

      value: {
        type: Array,
        required: false,
        default: () => [],
      },

      
      users_list: {
        type: Array,
        required: false,
        default: () => [],
      },

      edit_tools: {
        type: Array,
        default: () => [],
        validator: (tools) => !tools.some((tool) => !["text", "date", "signature"].includes(tool)),
      },

      select_colors: {
        type: Array,
        default: () => [],
      },

    
    },

    data() {
      return {
        showtoolbar: true,
        pdfjs_document: {},
        tools: [],
      };
    },

    computed: {
      toolbar_tools() {
        const toolbar_tools = { add: [], restrictions: [] };
        const signature_tool = SIMPLE_TOOLS.find((t) => t.item.name === "signature");
        signature_tool.item.props.max_size = this.max_image_size;

        toolbar_tools.add = [...SIMPLE_TOOLS];

        if (this.admin) {
          toolbar_tools.restrictions = [...RESTRICTION_TOOLS];
        }

        return toolbar_tools;
      },
    },

    created() {
      this.tools = this.value.map((t) => {
        t.unique_id = `tool_${this.toolsCount + 1}`;
        this.toolsCount = this.toolsCount + 1;
        return t;
      });
      this.select_user_options = this.users_list.map((user, index) => ({
        ...user,
        text: user.name,
        color: this.select_colors[index]?.value,
        color_name: this.select_colors[index]?.color_name,
      }));

      let list = this.select_user_options;
      const [first_option] = list;
      this.selected_user = first_option;
    },

    async mounted() {
      this.load_pdf();
    },

    methods: {
      toolbarOpen() {
        this.showtoolbar = !this.showtoolbar;
        this.load_pdf();
      },
      load_pdf() {
        getDocument(this.src)
          .promise.then((pdf) => {
            this.pdfjs_document = pdf;
          })
          .catch((err) => {
            console.log("err", err);
          });
      },
      async preview_pdf() {
        this.converting = true;
        const preview_pdf = await edit_pdf({
          src: this.src,
          tools: this.tools,
          pdf_name: this.s3_config && this.s3_config.name ? this.s3_config.name : "Preview",
        });
        this.converting = false;
        this.screen_width < 860 ? await this.upload_pdf() : (this.preview_pdf_src = URL.createObjectURL(preview_pdf)); if (!this.show_tools) this.$emit("show_preview_PDF", this.preview_pdf_src);
        else this.$refs.preview_modal.show();
      },

    },
  };
</script>
<style scoped>
  .ac-esign {
    background: white;
    max-height: 100vh;
    width: 100%;
  }
  .ac-esign_nav {
    position: relative;
    height: 3rem;
    width: 100%;
    z-index: 1;
    background: #fff;
    color: white;
    margin-bottom: 1px;
    border: 1px solid #edf2f9;
  }
  .ac-esign_nav-zoom select {
    background: #6c757d;
    color: white;
    border: none;
  }
  .ac-esign_body {
    display: flex;
    justify-content: space-between;
    max-height: calc(100vh - 150px);
    margin-left: 270px;
  }
  .ac-esign_toolbar {
    color: white;
  }
  .ac-esign-thumbnails,
  .ac-esign_toolbar {
    color: #12263f;
  }
  .ac-esign_viewer_container {
    position: relative;
    width: 100%;
    overflow: auto;
  }
  .ac-esign_process_loader {
    position: absolute;
    top: 0;
    left: 0;
    background: black;
    opacity: 0.5;
    color: white;
    width: 100%;
    height: 100%;
    z-index: 2;
  }
  .ac-esign_process_loader > div {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
  .fade-enter-active,
  .fade-leave-active {
    transition: opacity 0.5s;
  }
  .fade-enter,
  .fade-leave-to {
    opacity: 0;
  }
  .ac-esign-toolbar_item {
    cursor: copy;
    color: #12263f;
    position: relative;
    z-index: 1;
  }
  .ac-esign-toolbar_item > div:first-child {
    display: inline-block;
    text-align: center;
    border-radius: 8px;
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
  .ac-esign-toolbar_user-select_item {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    padding-right: 1.3rem;
  }
  .ac-esign-toolbar_user-color {
    display: inline-block;
    width: 10px;
    height: 10px;
    border-radius: 50%;
    margin-right: 10px;
  }
  .ac-esign-toolbar_user-select_item >>> .dropdown-item {
    display: flex;
    align-items: center;
  }
  .ac-esign-toolbar_user-select_item {
    margin-bottom: 4px;
    padding-right: 0.7rem;
  }
  .ac-esign_toolbar .list-group {
    flex-direction: row;
  }
  .ac-esign-toolbar_item {
    display: inline-block;
    /* border: 1px solid #eff2f4; */
    /* border-radius: 0 !important;
    background: #fff; */
    /* border-radius: 2; */
    margin: -6px 14px !important;
  }
  .dropdown >>> .btn-outline-secondary:hover,
  .show >>> .btn-outline-secondary.dropdown-toggle {
    color: #6e84a3;
    border: 1px solid #d2ddec;
    background: #fff !important;
  }
  .ac-esign-toolbar_item:hover {
    background: #79707012;
  }
  .ac-esign-toolbar_user-select_item >>> .dropdown-item {
    border-top: 1px solid #e3ebf6;
    padding: 0.375rem 0.5rem;
  }
  .ac-esign-toolbar_user-select_item:first-child >>> .dropdown-item {
    border-top: none;
  }
  .ac-esign-toolbar_user-select_item {
    height: calc(1.9em + 0.25rem + 2px) !important;
  }
  .ac-esign_body-toolbar{
    background-color: blanchedalmond;
  }
</style>
