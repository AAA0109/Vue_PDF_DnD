(function(){var e={4264:function(e,t,s){"use strict";var o=s(6369),n=function(){var e=this,t=e._self._c;return t("div",{attrs:{id:"app"}},[t("HelloWorld")],1)},r=[],i=function(){var e=this,t=e._self._c;return t("div",[t("h1",[e._v(e._s("Sign Drag and Drop Component"))]),t("AddDocumentSignees")],1)},a=[],l=function(){var e=this,t=e._self._c;return t("div",[[t("b-row",[t("b-col",{attrs:{sm:"12"}},[t("Esign",{attrs:{admin:!0,max_image_size:525,src:"https://jitsitestfordynamicbranding.s3.ap-south-1.amazonaws.com/sample.pdf",signeeType:"ME",login_user:e.loginUser,edit_tools:"[signature]",select_colors:"[ { color_name: light, value: #e6eff6 } ]",users_list:e.USER}})],1)],1)]],2)},d=[],c=function(){var e=this,t=e._self._c;return t("div",[e.render?t("div",{staticClass:"ac-esign"},[t("div",{staticClass:"d-flex align-items-center ac-esign-toolbar"},[t("span",{staticClass:"d-block d-lg-none ml-3",class:e.showtoolbar?"fe fe-menu text-dark":"fe fe-x text-dark",on:{click:function(t){return e.toolbarOpen()}}}),"ME"!==e.signeeType?t("b-dropdown",{staticClass:"w-100 p-1",attrs:{variant:"outline-secondary min-width-10 ml-2",size:"sm"},scopedSlots:e._u([{key:"button-content",fn:function(){return[t("div",{staticClass:"ac-esign-toolbar_user-select"},[t("div",{staticClass:"ac-esign-toolbar_user-color",style:`background-color:${e.selected_user.color}`}),e._v(" "+e._s(e.selected_user.name)+" ")])]},proxy:!0}],null,!1,3316178253)},e._l(e.toolbar_users_list,(function(s,o){return t("b-dropdown-item",{key:`option_${o}`,staticClass:"ac-esign-toolbar_user-select_item custom-select-sm",attrs:{disabled:"Viewer"==s.status,active:s===e.selected_user},on:{click:function(t){return e.select_user(s)}}},[t("div",{staticClass:"ac-esign-toolbar_user-color",style:`background-color:${s.color}`}),e._v(" "+e._s(s.text)+" "),"Viewer"==s.status?t("span",{staticClass:"fe fe-eye option-icons ml-auto mt-1"}):e._e()])})),1):e._e()],1)]):e._e(),t("div",{staticClass:"ac-esign_body"},[e.showtoolbar?t("div",{staticClass:"ac-esign_body-toolbar"},[t("AcEsignToolbar",{ref:"ac-esign-toolbar",staticClass:"ac-esign_toolbar",attrs:{tools:e.toolbar_tools,users_list:e.select_user_options,show_save_button:e.show_save_button,signeeType:"ME"},model:{value:e.selected_user,callback:function(t){e.selected_user=t},expression:"selected_user"}})],1):e._e(),t("div",{staticClass:"ac-esign_viewer_container d-flex justify-content-center"},[t("AcEsignViewer",{ref:"viewer",attrs:{pdfjs_document:e.pdfjs_document,scale:e.selected_pdf_scale,selected_user:e.selected_user},on:{active_page:function(t){e.active_page=t},pagesrendered:e.on_pages_rendered},scopedSlots:e._u([{key:"loader",fn:function(){return[e._t("viewer_loader",(function(){return[e._v("loading viewer...")]}))]},proxy:!0}],null,!0)})],1)])])},p=[],u=s(8003),_=function(){var e=this,t=e._self._c;return t("div",{staticClass:"ac-esign-viewer my-md-4"},[e.pages_rendered?e._e():e._t("loader"),t("div",{ref:"viewer_container",staticClass:"pdfViewer"},[t("div",{ref:"pages_container"})])],2)},g=[],f=(s(7658),s(7068)),h=function(){var e=this,t=e._self._c;return t("div",{staticClass:"ac-esign-toolbar"},[t("div",[t("b-list-group",{},e._l(e.simple_tools,(function(s){return t("b-list-group-item",{key:`simple_${s.id}`,ref:"tools",refInFor:!0,staticClass:"ac-esign-toolbar_item p-2",attrs:{"data-tool_id":s.id,draggable:"true"}},[t("div",{staticClass:"p-1"},[t("h3",{directives:[{name:"b-tooltip",rawName:"v-b-tooltip.hover",modifiers:{hover:!0}}],staticClass:"text-muted",class:[s.icon],attrs:{title:`${s.label}`}},[e._v("Sign")])])])})),1)],1)])},m=[],v={name:"AcEsignToolbar",props:{tools:{type:Object,default:()=>({})}},computed:{simple_tools(){return this.tools.add?this.tools.add:[]},resctriction_tools(){return this.tools.restrictions?this.tools.restrictions:[]}},mounted(){this.add_drag_event_listeners()},methods:{add_drag_event_listeners(){this.$refs.tools&&this.$refs.tools.forEach((e=>{e.addEventListener("dragstart",this.tool_drag_start)}))},remove_drag_event_listeners(){this.$refs.tools&&this.$refs.tools.forEach((e=>{e.removeEventListener("dragstart",this.tool_drag_start)}))},tool_drag_start(e){console.log(e);const t=[...this.simple_tools,...this.resctriction_tools],s=t.find((({id:t})=>t.toString()===e.target.dataset.tool_id));e.dataTransfer.setData("value",JSON.stringify({...s.item,id:s.id})),e.dataTransfer.setData(`json:${JSON.stringify(s.item)}`,!0)}}},y=v,b=s(1001),w=(0,b.Z)(y,h,m,!1,null,"0a16be65",null),x=w.exports,$=function(){var e=this,t=e._self._c;return t("ToolWrapper",{class:[e.class_name,"ac-esign-tool-signature"]},[e.is_filled?e._e():t("div",{staticClass:"ac-esign-tool_placeholder"},[t("b-button",{attrs:{variant:"primary",disabled:!e.is_editable},on:{click:e.show_signature}},[e._v("Signature")])],1),e.is_svg&&e.is_filled?t("div",{ref:"svg",staticClass:"w-100 h-100"}):e._e(),!e.is_svg&&e.is_filled?t("img",{ref:"img",style:e.signature_styles,attrs:{src:e.signature_src,alt:"Signature"}}):e._e()])},C=[],E={name:"AcEsignToolSignature",props:{value:{type:String},class_name:[String,Array,Object]}},T=E,A=(0,b.Z)(T,$,C,!1,null,null,null),P=A.exports;const S={signature:P};const L=(e,t=!0)=>{if((t?e.childNodes:e.children).length>0){const s=Array.from(t?e.childNodes:e.children).reduce(((e,s)=>(e.push(...L(s,t)),e)),[]);return s}return[e]},j=async({src:e,tools:t,as_b64:s=!1,pdf_name:o})=>{const n=await fetch(e).then((e=>e.arrayBuffer())),r=await(void 0).load(n,{ignoreEncryption:!0});r.setTitle(o);const i=r.getPages(),a=({tool:e,page:t,el:s})=>{const o=t=>Array.from(e.page_el.children).some((e=>e===t.offsetParent||e===t))?"date"==e.name?t.offsetLeft+10:"AcEsignToolDate"==e.component.inner_component_name?t.offsetLeft+13:t.offsetLeft+t.offsetParent.offsetLeft:o(t?.offsetParent),n=t=>Array.from(e.page_el.children).some((e=>e===t?.offsetParent||e===t))?"text"==e.name||"AcEsignToolText"==e.component.inner_component_name?t.offsetTop+t?.offsetParent.offsetTop-3:"date"==e.name?t.offsetTop-17:"AcEsignToolDate"==e.component.inner_component_name?t.offsetTop-21:t.offsetTop:n(t?.offsetParent),r=n(s),i=o(s),{offsetWidth:a}=s,{offsetHeight:l}=s,d=t.getWidth()/(parseInt(e.page_el.style.getPropertyValue("width"),10)/a),c=t.getHeight()/(parseInt(e.page_el.style.getPropertyValue("height"),10)/l),p=t.getHeight()-c-t.getHeight()/(parseInt(e.page_el.style.getPropertyValue("height"),10)/r),u=t.getWidth()/(parseInt(e.page_el.style.getPropertyValue("width"),10)/i);return{tool_width:d,tool_height:c,pdf_page_y:p,pdf_page_x:u}},l=[],d={};for(let u=0;u<t.length;u+=1){const e=new Promise((async e=>{const s=t[u],o=i[s.page],{pdf_page_x:n,pdf_page_y:l,tool_width:c,tool_height:p}=a({tool:s,page:o,el:s.component.$el}),_=await s.component.get_value()||{};if("html"===_.type)await Promise.all(L(_.value,!1).map((e=>{const t=async t=>{const n=a({tool:s,page:o,el:e}),i=getComputedStyle(e);let l=i.getPropertyValue("font-size");l=/(px)/.test(l)?.75*parseInt(l,10):parseInt(l,10);const d=i.getPropertyValue("font-family");d.split("-")[0];const c=await r.embedFont();o.drawText(e.textContent,{y:n.pdf_page_y,x:n.pdf_page_x,font:c,size:l}),t()};return new Promise(t)})));else if(!s||"text"!==s.output&&"svg"!==_.type){if(s&&"image"===s.output&&"string"===typeof _){let e=null;const t=e=>{o.drawImage(e,{y:l,x:n,width:c,height:p})};/^(data:image\/png;base64,)/.test(_)?(e=await r.embedPng(_),t(e)):/^(data:image\/jpeg;base64,)/.test(_)?(e=await r.embedJpg(_),t(e)):console.log("Unexpected image type. Available: png, jpeg")}}else{"svg"===_.type&&d[_.font_family];const e=getComputedStyle(s.component.$el);_.color&&_.color.replace(/[(rgb)]+/g,"").trim().split(",").map((e=>+(parseInt(e,10)/255).toFixed(3)));try{o.drawText("svg"===_.type?_.value:_,{y:l,x:n,size:parseInt(_.font_size,10)||.75*parseInt(e.getPropertyValue("font-size"),10)})}catch(g){console.log("error")}}e()}));l.push(e)}if(await Promise.all(l),s){const e=await r.saveAsBase64({dataUri:!0});return e}const c=await r.save(),p=new Blob([c],{type:"application/pdf"});return p},O=e=>{e.forEach((e=>{e.style.pointerEvents="unset"}))},k=e=>{e.forEach((e=>{e.style.pointerEvents="none"}))},q=[{id:1,label:"Signature",icon:"fe fe-feather",item:{name:"signature",output:"image",props:{width:200,height:200,max_size:2048,options:{penColor:"#000"}}}},{id:4,label:"Signature",icon:"fe fe-feather",item:{name:"restriction",output:"image",props:{width:200,height:200,inner_component:1}}}],D=q.filter((e=>e.item&&"restriction"===e.item.name)),z=q.filter((e=>e.item&&"restriction"!==e.item.name));u.GlobalWorkerOptions.workerSrc=`https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${u.version}/pdf.worker.js`;var I={name:"AcEsignViewer",props:{pdfjs_document:{type:Object,required:!0},selected_user:{type:Object}},data(){return{pages_elements:[],pdf_viewer:null,rendered_pages:0,current_dragging_tool:null}},computed:{pages_rendered(){return this.rendered_pages===this.pdfjs_document.numPages}},mounted(){this.init_pdf_viewer()},destroyed(){this.pages_elements.forEach((e=>{e.removeEventListener("drop",this.on_drop_tool),e.removeEventListener("dragover",this.on_drag_over),e.removeEventListener("dragenter",this.on_drag_enter(e)),e.removeEventListener("dragleave",this.on_drag_leave),e.removeEventListener("duplicate_tool",this.duplicate_tool)}))},watch:{pdfjs_document:{handler(e){this.set_document(e)}}},methods:{init_pdf_viewer(){try{const e=new f.EventBus;e.on("pagerendered",(()=>{this.pages_rendered||(this.rendered_pages+=1,this.pages_rendered&&(this.pages_elements=this.$refs.pages_container.querySelectorAll(".page"),this.$emit("pagesrendered"),this.set_page_event_listeners()))})),this.pdf_viewer=new f.PDFViewer({container:this.$refs.viewer_container,eventBus:e}),this.pdf_viewer.currentScale=this.scale}catch(e){console.error("init_pdf_viewer",e)}},set_document(e){this.pdf_viewer&&this.pdf_viewer.setDocument(e)},set_page_event_listeners(){const e=new IntersectionObserver((e=>{!0===e[0].isIntersecting&&this.$emit("active_page",+e[0].target.getAttribute("data-page-number"))}),{root:this.$parent.$el,threshold:.4});this.pages_elements.forEach((t=>{t.addEventListener("drop",this.on_drop_tool),t.addEventListener("dragover",this.on_drag_over),t.addEventListener("dragenter",this.on_drag_enter(t)),t.addEventListener("dragleave",this.on_drag_leave),t.addEventListener("duplicate_tool",this.duplicate_tool),e.observe(t)}))},on_drag_over(e){this.$parent.is_all_tools_loaded=!0,e.preventDefault()},on_drag_enter(e){this.$parent.is_all_tools_loaded&&k(Array.from(e.childNodes).filter((e=>!e.classList.contains("ac-esign-tool-restriction"))))},on_drag_leave(e){e.currentTarget&&e.currentTarget.classList.contains("page")&&O(e.currentTarget.childNodes)},on_drop_tool(e){console.log("drop",e),O(e.currentTarget.childNodes);const t=JSON.parse(e.dataTransfer.getData("value")),s=e.offsetX?e.offsetX:e.clientX-e.target.getBoundingClientRect().x,o=e.offsety?e.offsety:e.clientY-e.target.getBoundingClientRect().y,n=e.target.classList.contains("page")?s:s+(e.target.classList.contains("resizable-component")?e.target.parentNode.offsetLeft:e.target.offsetLeft),r=e.target.classList.contains("page")?o:o+(e.target.classList.contains("resizable-component")?e.target.parentNode.offsetTop:e.target.offsetTop);console.log(s,o,e.clientX,e.clientY);const i=parseInt(e.currentTarget.getAttribute("data-page-number"),10)-1;console.log(t),window.a=e,"move"===t.type?(e.currentTarget.appendChild(this.current_dragging_tool),this.current_dragging_tool.style.top=r-this.shift_cursor.shiftY+"px",this.current_dragging_tool.style.left=n-this.shift_cursor.shiftX+"px",this.$parent.tools.map((s=>(s.unique_id===t.unique_id&&(s.offsetX=n,s.offsetY=r,s.page=i,s.page_el=e.currentTarget),s)))):(console.log(n,r),this.add_tool(t,{offsetX:n,offsetY:r,page_index:i}))},add_tool(e,t,s,n){const{offsetX:r,offsetY:i}=t;let a={...e};if(a?.component){let e=q.find((e=>e.id==a.id)),t={...e.item.props,...a.props};a.props={...t},n||(a.unique_id=`tool_${this.$parent.toolsCount+1}`)}let{page_index:l}=t;void 0===l&&(l=t.page);const d=this.pages_elements[l],c=!a.user_id||a.user_id===this.selected_user.id,p=this.$parent.admin,u=a.id||(q.find((e=>e.name===a.name))||{}).id,_={...a.props,users_list:this.$parent.users_list,is_resizable:p,is_admin:this.$parent.admin,class_name:"ac-esign-viewer_tool",parent_ref:this.$parent};let g=this.$parent.select_user_options.find((e=>e.id==(a.user_id||this.selected_user.id)));console.log("itemm----",a);const f=o.ZP.extend(S[a.name]);console.log("tools",{propsData:{..._,editable:this.$parent.edit_tools.includes(a.name),selected_user_details:g}});const h=new f({propsData:{..._,editable:this.$parent.edit_tools.includes(a.name),selected_user_details:g}});h.$mount(),h.$on("hook:destroyed",(()=>{this.remove_tool(h)}));const m={component:h,name:a.name,output:a.output,page:l,page_el:this.pages_elements[l],user_id:a.user_id||this.selected_user.id,id:u,offsetX:r,offsetY:i,unique_id:a.unique_id?a.unique_id:`tool_${this.$parent.toolsCount+1}`,props:{editable:!a.props||!("editable"in a.props)||a.props.editable}};a.props&&"value"in a.props&&(m.props.value=a.props.value),a.props&&"width"in a.props&&(m.props.width=a.props.width),a.props&&"height"in a.props&&(m.props.height=a.props.height),h.unique_id=m.unique_id,s?this.$parent.tools=this.$parent.tools.map((e=>e.unique_id===m.unique_id?m:e)):(this.$parent.tools.push(m),this.$parent.toolsCount=this.$parent.toolsCount+1);const v=h.$el;v.style.top=n?a?.component?.$el?.style?.top:`${i}px`,v.style.left=n?a?.component?.$el?.style?.left:`${r}px`;let y=null;if(c){const{color:e}=this.selected_user;y=e}else{const e=this.$parent.select_user_options.find((e=>e.id===a.user_id));y=e?e.color:""}"restriction"!=a.name||a.props.value?"restriction"!==a.name&&"date"!==a.name&&!a.props.value&&(v.style.backgroundColor=y):v.style.border=`2px dashed ${y}`,p&&(v.setAttribute("draggable",!0),v.addEventListener("dragstart",(e=>{k(Array.from(d.childNodes).filter((e=>e!==v))),e.dataTransfer.setData("value",JSON.stringify({type:"move",unique_id:m.unique_id})),this.current_dragging_tool=v,this.shift_cursor={shiftX:e.clientX-v.getBoundingClientRect().left,shiftY:e.clientY-v.getBoundingClientRect().top},setTimeout((()=>{this.current_dragging_tool.style.display="none"}),0)})),v.addEventListener("dragend",(e=>{this.current_dragging_tool.focus();const t=(e?.path||e.composedPath&&e.composedPath()).find((e=>e.classList.contains("page")));O(t.childNodes),setTimeout((()=>{this.current_dragging_tool.style.display="unset"}),0)}))),d&&d.appendChild&&d.appendChild(v)}}},N=I,V=(0,b.Z)(N,_,g,!1,null,null,null),B=V.exports,X={name:"AcEsign",components:{AcEsignViewer:B,AcEsignToolbar:x},props:{show_tools:{type:Boolean,default:!0},signeeType:{type:String,required:!0},render:{type:Boolean,required:!1,default:!0},src:{type:String,required:!0},file_url:{type:String},admin:{type:Boolean,default:!1},value:{type:Array,required:!1,default:()=>[]},users_list:{type:Array,required:!1,default:()=>[]},edit_tools:{type:Array,default:()=>[],validator:e=>!e.some((e=>!["text","date","signature"].includes(e)))},select_colors:{type:Array,default:()=>[]}},data(){return{showtoolbar:!0,pdfjs_document:{},tools:[]}},computed:{toolbar_tools(){const e={add:[],restrictions:[]},t=z.find((e=>"signature"===e.item.name));return t.item.props.max_size=this.max_image_size,e.add=[...z],this.admin&&(e.restrictions=[...D]),e}},created(){this.tools=this.value.map((e=>(e.unique_id=`tool_${this.toolsCount+1}`,this.toolsCount=this.toolsCount+1,e))),this.select_user_options=this.users_list.map(((e,t)=>({...e,text:e.name,color:this.select_colors[t]?.value,color_name:this.select_colors[t]?.color_name})));let e=this.select_user_options;const[t]=e;this.selected_user=t},async mounted(){this.load_pdf()},methods:{toolbarOpen(){this.showtoolbar=!this.showtoolbar,this.load_pdf()},load_pdf(){(0,u.getDocument)(this.src).promise.then((e=>{this.pdfjs_document=e})).catch((e=>{console.log("err",e)}))},async preview_pdf(){this.converting=!0;const e=await j({src:this.src,tools:this.tools,pdf_name:this.s3_config&&this.s3_config.name?this.s3_config.name:"Preview"});this.converting=!1,this.screen_width<860?await this.upload_pdf():this.preview_pdf_src=URL.createObjectURL(e),this.show_tools?this.$refs.preview_modal.show():this.$emit("show_preview_PDF",this.preview_pdf_src)}}},Z=X,Y=(0,b.Z)(Z,c,p,!1,null,"797e91fc",null),R=Y.exports,U={name:"AddDocumentSignees",components:{Esign:R},props:{login_user:Array,signeeType:{type:String}},data(){return{tools:[],USER:[{id:"289711",name:"ABC",email:"example@gmail.com "}],loginUser:[{id:289711,name:"Example",email:"example@gmail.com"}]}}},W=U,H=(0,b.Z)(W,l,d,!1,null,null,null),F=H.exports,J={name:"HelloWorld",components:{AddDocumentSignees:F}},M=J,G=(0,b.Z)(M,i,a,!1,null,null,null),K=G.exports,Q={name:"App",components:{HelloWorld:K}},ee=Q,te=(0,b.Z)(ee,n,r,!1,null,null,null),se=te.exports;o.ZP.config.productionTip=!1,new o.ZP({render:e=>e(se)}).$mount("#app")},3414:function(){},172:function(){},2001:function(){},3779:function(){},6558:function(){},2258:function(){}},t={};function s(o){var n=t[o];if(void 0!==n)return n.exports;var r=t[o]={exports:{}};return e[o].call(r.exports,r,r.exports,s),r.exports}s.m=e,function(){var e=[];s.O=function(t,o,n,r){if(!o){var i=1/0;for(c=0;c<e.length;c++){o=e[c][0],n=e[c][1],r=e[c][2];for(var a=!0,l=0;l<o.length;l++)(!1&r||i>=r)&&Object.keys(s.O).every((function(e){return s.O[e](o[l])}))?o.splice(l--,1):(a=!1,r<i&&(i=r));if(a){e.splice(c--,1);var d=n();void 0!==d&&(t=d)}}return t}r=r||0;for(var c=e.length;c>0&&e[c-1][2]>r;c--)e[c]=e[c-1];e[c]=[o,n,r]}}(),function(){s.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return s.d(t,{a:t}),t}}(),function(){s.d=function(e,t){for(var o in t)s.o(t,o)&&!s.o(e,o)&&Object.defineProperty(e,o,{enumerable:!0,get:t[o]})}}(),function(){s.g=function(){if("object"===typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(e){if("object"===typeof window)return window}}()}(),function(){s.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)}}(),function(){var e={143:0};s.O.j=function(t){return 0===e[t]};var t=function(t,o){var n,r,i=o[0],a=o[1],l=o[2],d=0;if(i.some((function(t){return 0!==e[t]}))){for(n in a)s.o(a,n)&&(s.m[n]=a[n]);if(l)var c=l(s)}for(t&&t(o);d<i.length;d++)r=i[d],s.o(e,r)&&e[r]&&e[r][0](),e[r]=0;return s.O(c)},o=self["webpackChunksign1"]=self["webpackChunksign1"]||[];o.forEach(t.bind(null,0)),o.push=t.bind(null,o.push.bind(o))}();var o=s.O(void 0,[998],(function(){return s(4264)}));o=s.O(o)})();
//# sourceMappingURL=app.b4b14a02.js.map