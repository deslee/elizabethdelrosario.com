import "./extension-oembed.css";
import { Node } from "@tiptap/core";
import {
  NodeViewProps,
  NodeViewWrapper,
  ReactNodeViewRenderer,
} from "@tiptap/react";
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

type InsertOembedOptions = {
  oembedData: any;
};

type OembedOptions = {};
declare module "@tiptap/core" {
  interface Commands<ReturnType> {
    oembed: {
      insertOembed: (options: InsertOembedOptions) => ReturnType;
    };
  }
}

const OEmbedMediaPreview = (props: NodeViewProps) => {
  const { editor, node, deleteNode, updateAttributes } = props;

  const oembedData = node.attrs.oembedData

  return (
    <NodeViewWrapper>
      <div className="OembedPreview">
        Embedded content{" "}
        {oembedData ? (
          <>
            from {oembedData.provider_name}: {oembedData.title}
          </>
        ) : undefined}
        <div className="toolbar">
          <button
            onClick={(e) => {
              e.preventDefault();
              deleteNode();
            }}
          >
            <FontAwesomeIcon icon={faTrash} />
          </button>
        </div>
      </div>
    </NodeViewWrapper>
  );
};

export const OEmbed = Node.create<OembedOptions>({
  name: "oEmbed",
  addNodeView() {
    return ReactNodeViewRenderer(OEmbedMediaPreview);
  },
  group() {
    return "block";
  },
  draggable: true,
  addAttributes() {
    return {
      oembedData: {
        default: null,
        renderHTML(attributes) {
          return {
            "data-oembed": JSON.stringify(attributes.oembedData),
          };
        },
        parseHTML(element) {
          try {
            const oembedStr = element.getAttribute("data-oembed");
            const oembedData = JSON.parse(oembedStr);
            return oembedData;
          } catch (e) {
            console.error(e);
          }
        },
      },
    };
  },
  addCommands() {
    return {
      insertOembed: (options) => (editor) => {
        const commands = editor.commands;
        return commands.insertContent({
          type: this.name,
          attrs: {
            oembedData: options.oembedData,
          },
        });
      },
    };
  },
  parseHTML() {
    return [
      {
        tag: "div[data-oembed]",
      },
    ];
  },
  renderHTML(args) {
    return ["div", { "data-oembed": "", ...args.HTMLAttributes }];
  },
});
