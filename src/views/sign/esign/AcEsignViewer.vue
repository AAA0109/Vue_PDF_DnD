<template>
  <div class="ac-esign-viewer my-md-4">
    <slot v-if="!pages_rendered" name="loader" />
    <div ref="viewer_container" class="pdfViewer ">
      <div ref="pages_container"></div>
    </div>
  </div>
</template>

<script>
  import { EventBus, PDFViewer } from "pdfjs-dist/web/pdf_viewer";
  import * as pdfjs from "pdfjs-dist";
  import "pdfjs-dist/web/pdf_viewer.css";
  import Vue from "vue";
  import { TOOLS } from "./AcEsignToolbar";
  import { disable_events, allow_events } from "./utils";
  import { DEFAULT_TOOLS } from "./constants";

  pdfjs.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;
  export default {
    name: "AcEsignViewer",

    props: {
      pdfjs_document: {
        type: Object,
        required: true,
      },
      selected_user: {
        type: Object,
      },
    },
    data() {
      return {
        pages_elements: [],
        pdf_viewer: null,
        rendered_pages: 0,
        current_dragging_tool: null,
      };
    },

    computed: {
      pages_rendered() {
        return this.rendered_pages === this.pdfjs_document.numPages;
      },
    },
    mounted() {
      this.init_pdf_viewer();
    },
    destroyed() {
      this.pages_elements.forEach((page_el) => {
        page_el.removeEventListener("drop", this.on_drop_tool);

        page_el.removeEventListener("dragover", this.on_drag_over);

        page_el.removeEventListener("dragenter", this.on_drag_enter(page_el));

        page_el.removeEventListener("dragleave", this.on_drag_leave);

        page_el.removeEventListener("duplicate_tool", this.duplicate_tool);
      });
    },

    watch: {
      pdfjs_document: {
        handler(doc) {
          this.set_document(doc);
        },
      },
    },

    methods: {
      init_pdf_viewer() {
        try {
          const event_bus = new EventBus();

          event_bus.on("pagerendered", () => {
            if (this.pages_rendered) return;
            this.rendered_pages += 1;

            if (this.pages_rendered) {
              this.pages_elements = this.$refs.pages_container.querySelectorAll(".page");
              this.$emit("pagesrendered");
              this.set_page_event_listeners();
            }
          });

          this.pdf_viewer = new PDFViewer({
            container: this.$refs.viewer_container,
            eventBus: event_bus,
          });

          this.pdf_viewer.currentScale = this.scale;
        } catch (err) {
          console.error("init_pdf_viewer", err);
        }
      },
      set_document(document) {
        if (!this.pdf_viewer) return;
        this.pdf_viewer.setDocument(document);
      },
      set_page_event_listeners() {
        const observer = new IntersectionObserver(
          (entries) => {
            if (entries[0].isIntersecting === true) {
              this.$emit("active_page", +entries[0].target.getAttribute("data-page-number"));
            }
          },
          { root: this.$parent.$el, threshold: 0.4 },
        );

        this.pages_elements.forEach((page_el) => {
          page_el.addEventListener("drop", this.on_drop_tool);

          page_el.addEventListener("dragover", this.on_drag_over);

          page_el.addEventListener("dragenter", this.on_drag_enter(page_el));

          page_el.addEventListener("dragleave", this.on_drag_leave);
          page_el.addEventListener("duplicate_tool", this.duplicate_tool);

          observer.observe(page_el);
        });
      },
      on_drag_over(e) {
        this.$parent.is_all_tools_loaded = true;
        e.preventDefault();
      },
      on_drag_enter(page_el) {
        if (this.$parent.is_all_tools_loaded) disable_events(Array.from(page_el.childNodes).filter((item) => !item.classList.contains("ac-esign-tool-restriction")));
      },
      on_drag_leave(e) {
        if (e.currentTarget && e.currentTarget.classList.contains("page")) allow_events(e.currentTarget.childNodes);
      },
      on_drop_tool(e) {
        console.log('drop', e)
        allow_events(e.currentTarget.childNodes);
        const item = JSON.parse(e.dataTransfer.getData("value"));
        // const { offsetX, offsetY } = e;
        const eoffsetX = e.offsetX ? e.offsetX : e.clientX - e.target.getBoundingClientRect().x;
        const eoffsetY = e.offsety ? e.offsety : e.clientY - e.target.getBoundingClientRect().y;
        const offset_x = e.target.classList.contains("page") ? eoffsetX : eoffsetX + (e.target.classList.contains("resizable-component") ? e.target.parentNode.offsetLeft : e.target.offsetLeft);
        const offset_y = e.target.classList.contains("page") ? eoffsetY : eoffsetY + (e.target.classList.contains("resizable-component") ? e.target.parentNode.offsetTop : e.target.offsetTop);
          
        console.log(eoffsetX, eoffsetY, e.clientX, e.clientY)
          
        const page_index = parseInt(e.currentTarget.getAttribute("data-page-number"), 10) - 1;

        console.log(item);
        window.a = e;

        if (item.type === "move") {
          e.currentTarget.appendChild(this.current_dragging_tool);
          this.current_dragging_tool.style.top = `${offset_y - this.shift_cursor.shiftY}px`;
          this.current_dragging_tool.style.left = `${offset_x - this.shift_cursor.shiftX}px`;
          this.$parent.tools.map((tool) => {
            if (tool.unique_id === item.unique_id) {
              tool.offsetX = offset_x;
              tool.offsetY = offset_y;
              tool.page = page_index;
              tool.page_el = e.currentTarget;
            }
            return tool;
          });
        } else {
          // const offset_x = e.target.classList.contains("page") ? e.offsetX : e.offsetX + (e.target.classList.contains("resizable-component") ? e.target.parentNode.offsetLeft : e.target.offsetLeft);
          // const offset_y = e.target.classList.contains("page") ? e.offsetY : e.offsetY + (e.target.classList.contains("resizable-component") ? e.target.parentNode.offsetTop : e.target.offsetTop);
          console.log(offset_x, offset_y)
          this.add_tool(item, {
            offsetX: offset_x,
            offsetY: offset_y,
            page_index,
          });
        }
      },
      add_tool(add_tool, options, originalTool, copy) {
        const { offsetX, offsetY } = options;
        let item = { ...add_tool };
        if (item?.component) {
          let tool = DEFAULT_TOOLS.find((tool) => tool.id == item.id);
          let props = { ...tool.item.props, ...item.props };
          item.props = { ...props };
          if (!copy) item.unique_id = `tool_${this.$parent.toolsCount + 1}`;
        }
        let { page_index } = options;
        if (page_index === undefined) {
          page_index = options.page;
        }
        const parent = this.pages_elements[page_index];
        const is_current_user = !item.user_id || item.user_id === this.selected_user.id;
        const is_draggable = this.$parent.admin;
        const item_id = item.id || (DEFAULT_TOOLS.find((t) => t.name === item.name) || {}).id;
        const item_props = {
          ...item.props,
          users_list: this.$parent.users_list,
          is_resizable: is_draggable,
          is_admin: this.$parent.admin,
          class_name: "ac-esign-viewer_tool",
          parent_ref: this.$parent,
        };
        let selected_user_details = this.$parent.select_user_options.find((user) => user.id == (item.user_id || this.selected_user.id));
        console.log("itemm----", item);
        const ToolComponentClass = Vue.extend(TOOLS[item.name]);
        console.log("tools", {
          propsData: {
            ...item_props,
            editable: this.$parent.edit_tools.includes(item.name),
            selected_user_details,
          },
        });

        const ToolComponentInstance = new ToolComponentClass({
          propsData: {
            ...item_props,
            editable: this.$parent.edit_tools.includes(item.name),
            selected_user_details,
          },
        });
        ToolComponentInstance.$mount();
        ToolComponentInstance.$on("hook:destroyed", () => {
          this.remove_tool(ToolComponentInstance);
        });
        const toolItem = {
          component: ToolComponentInstance,
          name: item.name,
          output: item.output,
          page: page_index,
          page_el: this.pages_elements[page_index],
          user_id: item.user_id || this.selected_user.id,
          id: item_id,
          offsetX,
          offsetY,
          unique_id: item.unique_id ? item.unique_id : `tool_${this.$parent.toolsCount + 1}`,
          props: {
            editable: item.props && "editable" in item.props ? item.props.editable : true,
          },
        };
        if (item.props && "value" in item.props) {
          toolItem.props.value = item.props.value;
        }
        if (item.props && "width" in item.props) {
          toolItem.props.width = item.props.width;
        }
        if (item.props && "height" in item.props) {
          toolItem.props.height = item.props.height;
        }
        ToolComponentInstance.unique_id = toolItem.unique_id;
        if (!originalTool) {
          this.$parent.tools.push(toolItem);
          this.$parent.toolsCount = this.$parent.toolsCount + 1;
        } else {
          this.$parent.tools = this.$parent.tools.map((t) => {
            if (t.unique_id === toolItem.unique_id) {
              return toolItem;
            }
            return t;
          });
        }
        const tool_element = ToolComponentInstance.$el;
        tool_element.style.top = copy ? item?.component?.$el?.style?.top : `${offsetY}px`;
        tool_element.style.left = copy ? item?.component?.$el?.style?.left : `${offsetX}px`;
        let bgColor = null;

        if (is_current_user) {
          const { color } = this.selected_user;
          bgColor = color;
        } else {
          const user_option = this.$parent.select_user_options.find((u) => u.id === item.user_id);
          bgColor = user_option ? user_option.color : "";
        }
        item.name == "restriction" && !item.props.value
          ? (tool_element.style.border = `2px dashed ${bgColor}`)
          : item.name !== "restriction" && item.name !== "date" && !item.props.value
          ? (tool_element.style.backgroundColor = bgColor)
          : "";

        if (is_draggable) {
          tool_element.setAttribute("draggable", true);
          tool_element.addEventListener("dragstart", (ev) => {
            disable_events(Array.from(parent.childNodes).filter((child) => child !== tool_element));
            ev.dataTransfer.setData("value", JSON.stringify({ type: "move", unique_id: toolItem.unique_id }));
            this.current_dragging_tool = tool_element;

            this.shift_cursor = {
              shiftX: ev.clientX - tool_element.getBoundingClientRect().left,
              shiftY: ev.clientY - tool_element.getBoundingClientRect().top,
            };

            setTimeout(() => {
              this.current_dragging_tool.style.display = "none";
            }, 0);
          });

          tool_element.addEventListener("dragend", (ev) => {
            this.current_dragging_tool.focus();
            const page_el = (ev?.path || (ev.composedPath && ev.composedPath())).find((el) => el.classList.contains("page"));
            allow_events(page_el.childNodes);
            setTimeout(() => {
              this.current_dragging_tool.style.display = "unset";
            }, 0);
          });
        }

        if (parent && parent.appendChild) {
          parent.appendChild(tool_element);
        }
      },
    },
  };
</script>

<style>
  .ac-esign-viewer {
    position: relative;
    z-index: 100;
  }

  .ac-esign-viewer div[data-page-number] {
    position: relative !important;
    box-sizing: unset;
  }

  .ac-esign-viewer .ac-esign-viewer_tool {
    position: absolute !important;
  }
  .pdfViewer .page {
    border: 1px solid #edf2f9;
    margin: 0px !important;
    padding: 0px !important;
    z-index: unset !important;
  }
</style>
