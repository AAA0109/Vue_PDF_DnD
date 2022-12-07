

const spread_child_nodes = (el, has_text = true) => {
  if ((has_text ? el.childNodes : el.children).length > 0) {
    const arr = Array.from(has_text ? el.childNodes : el.children).reduce((acc, child) => {
      acc.push(...spread_child_nodes(child, has_text));
      return acc;
    }, []);

    return arr;
  }

  return [el];
};
const edit_pdf = async ({ src, tools, as_b64 = false, pdf_name }) => {
  const existingPdfBytes = await fetch(src).then((res) => res.arrayBuffer());
  const pdf_doc = await this.load(existingPdfBytes, {
    ignoreEncryption: true,
  });
  pdf_doc.setTitle(pdf_name);
  const pages = pdf_doc.getPages();
  const get_tool_parameters = ({ tool, page, el }) => {
    const get_offset_left = (_el) => {
      if (Array.from(tool.page_el.children).some((child) => child === _el.offsetParent || child === _el)) {
        if (tool.name == "date") return _el.offsetLeft + 10;
        else if (tool.component.inner_component_name == "AcEsignToolDate") return _el.offsetLeft + 13;
        return _el.offsetLeft + _el.offsetParent.offsetLeft;
      }

      return get_offset_left(_el?.offsetParent);
    };

    const get_offset_top = (_el) => {
      if (Array.from(tool.page_el.children).some((child) => child === _el?.offsetParent || child === _el)) {
        if (tool.name == "text" || tool.component.inner_component_name == "AcEsignToolText") return _el.offsetTop + _el?.offsetParent.offsetTop - 3;
        else if (tool.name == "date") return _el.offsetTop - 17;
        else if (tool.component.inner_component_name == "AcEsignToolDate") return _el.offsetTop - 21;

        return _el.offsetTop;
      }

      return get_offset_top(_el?.offsetParent);
    };

    const offsetTop = get_offset_top(el);
    const offsetLeft = get_offset_left(el);
    const { offsetWidth } = el;
    const { offsetHeight } = el;

    const tool_width = page.getWidth() / (parseInt(tool.page_el.style.getPropertyValue("width"), 10) / offsetWidth);
    const tool_height = page.getHeight() / (parseInt(tool.page_el.style.getPropertyValue("height"), 10) / offsetHeight);
    const pdf_page_y = page.getHeight() - tool_height - page.getHeight() / (parseInt(tool.page_el.style.getPropertyValue("height"), 10) / offsetTop);
    const pdf_page_x = page.getWidth() / (parseInt(tool.page_el.style.getPropertyValue("width"), 10) / offsetLeft);

    return {
      tool_width,
      tool_height,
      pdf_page_y,
      pdf_page_x,
    };
  };

  const promises = [];
  const local_fonts_cache = {};

  for (let i = 0; i < tools.length; i += 1) {
    // eslint-disable-next-line
    const execute = new Promise(async (resolve) => {
      const tool = tools[i];
      const page = pages[tool.page];
      const { pdf_page_x, pdf_page_y, tool_width, tool_height } = get_tool_parameters({
        tool,
        page,
        el: tool.component.$el,
      });
      const value = (await tool.component.get_value()) || {};
      if (value.type === "html") {
        await Promise.all(
          spread_child_nodes(value.value, false).map((node) => {
            const execute = async (res) => {
              const node_parameters = get_tool_parameters({
                tool,
                page,
                el: node,
              });
              const styles = getComputedStyle(node);
              let font_size = styles.getPropertyValue("font-size");
              font_size = /(px)/.test(font_size) ? parseInt(font_size, 10) * 0.75 : parseInt(font_size, 10);
              const font_name = styles.getPropertyValue("font-family");

              font_name.split("-")[0];
              const pdf_font = await pdf_doc.embedFont();

              page.drawText(node.textContent, {
                y: node_parameters.pdf_page_y,
                x: node_parameters.pdf_page_x,
                font: pdf_font,
                size: font_size,
              });

              res();
            };

            return new Promise(execute);
          }),
        );
      } else if (tool && (tool.output === "text" || value.type === "svg")) {

        if (value.type === "svg") {
          if (local_fonts_cache[value.font_family]) {
            ''
          } 
        }

        const styles = getComputedStyle(tool.component.$el);
     
          value.color &&
          value.color
            .replace(/[(rgb)]+/g, "")
            .trim()
            .split(",")
            .map((v) => +(parseInt(v, 10) / 255).toFixed(3));
        try {
          page.drawText(value.type === "svg" ? value.value : value, {
            y: pdf_page_y,
            x: pdf_page_x,
            size: parseInt(value.font_size, 10) || parseInt(styles.getPropertyValue("font-size"), 10) * 0.75,
          });
        } catch (error) {
          console.log("error");
        }
      } else if (tool && tool.output === "image" && typeof value === "string") {
        let image = null;
        const draw_image = (img) => {
          page.drawImage(img, {
            y: pdf_page_y,
            x: pdf_page_x,
            width: tool_width,
            height: tool_height,
          });
        };
        if (/^(data:image\/png;base64,)/.test(value)) {
          image = await pdf_doc.embedPng(value);
          draw_image(image);
        } else if (/^(data:image\/jpeg;base64,)/.test(value)) {
          image = await pdf_doc.embedJpg(value);
          draw_image(image);
        } else {
          console.log("Unexpected image type. Available: png, jpeg");
        }
      }

      resolve();
    });
    promises.push(execute);
  }

  await Promise.all(promises);

  if (as_b64) {
    const pdf_data_uri = await pdf_doc.saveAsBase64({
      dataUri: true,
    });
    return pdf_data_uri;
  }
  const pdf_bytes = await pdf_doc.save();
  const blob = new Blob([pdf_bytes], {
    type: "application/pdf",
  });
  return blob;
};

const remove_element = (el) => {
  if (el && el.parentNode) {
    el.parentNode.removeChild(el);
  }
};

const set_focus_to = (el) => {
  setTimeout(() => {
    if (el && el.focus) {
      el.focus();
    }
  }, 0);
};
const allow_events = (elements) => {
  elements.forEach((el) => {
    el.style.pointerEvents = "unset";
  });
};

const disable_events = (elements) => {
  elements.forEach((el) => {
    el.style.pointerEvents = "none";
  });
};

export { edit_pdf, remove_element, set_focus_to, allow_events, disable_events, spread_child_nodes };
