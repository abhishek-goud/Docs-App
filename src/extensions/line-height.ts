import { Extension } from "@tiptap/react";
import "@tiptap/extension-paragraph";
import "@tiptap/extension-heading";

declare module "@tiptap/core" {
  interface Commands<ReturnType> {
    lineHeight: {
      setLineHeight: (lineHeight: string) => ReturnType;
      unsetLineHeight: () => ReturnType;
    };
  }
}

export const lineHeightExtension = Extension.create({
  name: "lineHeight",

  addOptions() {
    return {
      types: ["paragraph", "heading"], // Node types where lineHeight applies
      defaultLineHeight: "normal",
    };
  },

  addGlobalAttributes() {
    return [
      {
        types: this.options.types, // Apply to specified node types
        attributes: {
          lineHeight: {
            default: this.options.defaultLineHeight, // Corrected default key

            renderHTML: (attributes) => {
              if (!attributes.lineHeight) return {};
              return {
                style: `line-height: ${attributes.lineHeight}`,
              };
            },

            parseHTML: (element) => {
              return element.style.lineHeight || this.options.defaultLineHeight;
            },
          },
        },
      },
    ];
  },

  addCommands() {
    return {
      setLineHeight:
        (lineHeight: string) =>
        ({ tr, state, dispatch }) => {
          const { selection } = state;
          tr = tr.setSelection(selection);
          const { from, to } = selection;

          state.doc.nodesBetween(from, to, (node, pos) => {
            if (this.options.types.includes(node.type.name)) {
              tr.setNodeMarkup(pos, undefined, {
                ...node.attrs,
                lineHeight,
              });
            }
          });

          if (dispatch) dispatch(tr);
          return true;
        },

      unsetLineHeight:
        () =>
        ({ tr, state, dispatch }) => {
          const { selection } = state;
          tr = tr.setSelection(selection);
          const { from, to } = selection;

          state.doc.nodesBetween(from, to, (node, pos) => {
            if (this.options.types.includes(node.type.name)) {
              tr.setNodeMarkup(pos, undefined, {
                ...node.attrs,
                lineHeight: this.options.defaultLineHeight,
              });
            }
          });

          if (dispatch) dispatch(tr);
          return true;
        },
    };
  },
});
