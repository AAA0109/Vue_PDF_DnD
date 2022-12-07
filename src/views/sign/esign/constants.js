const DEFAULT_TOOLS = [
  {
    id: 1,
    label: "Signature",
    icon: "fe fe-feather",
    item: {
      name: "signature",
      output: "image",
      props: {
        width: 200,
        height: 200,
        max_size: 2048,
        options: {
          penColor: "#000",
        },
      },
    },
  },
  
  {
    id: 4,
    label: "Signature",
    icon: "fe fe-feather",
    item: {
      name: "restriction",
      output: "image",
      props: {
        width: 200,
        height: 200,
        inner_component: 1, // Singature
      },
    },
  },
  
  
];

const RESTRICTION_TOOLS = DEFAULT_TOOLS.filter((t) => t.item && t.item.name === "restriction");
const SIMPLE_TOOLS = DEFAULT_TOOLS.filter((t) => t.item && t.item.name !== "restriction");

export { DEFAULT_TOOLS, RESTRICTION_TOOLS, SIMPLE_TOOLS };

export default {
  DEFAULT_TOOLS,
};
