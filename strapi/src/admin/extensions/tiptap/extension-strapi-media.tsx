import React from "react";
import { useLibrary } from "@strapi/helper-plugin";
import "./extension-strapi-media.css";
import { Node, NodeViewProps } from "@tiptap/core";
import {
  NodeViewWrapper,
  ReactNodeViewRenderer,
} from "@tiptap/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";

declare module "@tiptap/core" {
  interface Commands<ReturnType> {
    strapiMedia: {
      insertStrapiMedia: (options: InsertStrapiMediaOptions) => ReturnType;
    };
  }
}

const MediaImagePreview = (props: NodeViewProps) => {
  const { editor, node, deleteNode, updateAttributes } = props;
  const { components } = useLibrary();
  const [libOpen, setLibOpen] = React.useState(false);
  const MediaLibDialog = components["media-library"];
  const handleSelectAssets = (files) => {
    updateAttributes({
      files: files,
    });
    setLibOpen(false);
  };

  const attributes = node.attrs;
  return (
    <NodeViewWrapper>
      <div className="MediaImagePreview">
        <div className="preview">
          <div>
            {attributes.type} preview of {attributes.files?.length ?? 0} files{" "}
          </div>
          <div className="thumbs">
            {attributes.type === 'image' && attributes.files?.map((file) => {
              return (
                <div key={file.id}>
                  <img src={file.formats?.thumbnail.url ?? file.url} />
                </div>
              );
            })}
          </div>
        </div>
        <div className="toolbar">
          <button
            onClick={(e) => {
              e.preventDefault();
              setLibOpen(true);
            }}
          >
            <FontAwesomeIcon icon={faEdit} />
          </button>
          <button
            onClick={(e) => {
              e.preventDefault();
              deleteNode();
            }}
          >
            <FontAwesomeIcon icon={faTrash} />
          </button>
        </div>
        {libOpen && (
          <MediaLibDialog
            onClose={() => setLibOpen(false)}
            onSelectAssets={handleSelectAssets}
          />
        )}
      </div>
    </NodeViewWrapper>
  );
};

type StrapiMediaOptions = {};
type InsertStrapiMediaOptions = {
  type: "image" | "video";
};

export const StrapiMedia = Node.create<StrapiMediaOptions>({
  name: "strapiMedia",
  addNodeView() {
    return ReactNodeViewRenderer(MediaImagePreview);
  },
  group() {
    return "block";
  },
  addAttributes() {
    return {
      type: {
        default: 'image',
        renderHTML(attributes) {
          return {
            'data-type': attributes.type
          }
        },
        parseHTML(element) {
          return element.getAttribute("data-type");

        },
      },
      files: {
        default: null,
        renderHTML(attributes) {
          return {
            "data-files": JSON.stringify(attributes.files),
          };
        },
        parseHTML(element) {
          try {
            const filesStr = element.getAttribute("data-files");
            const files = JSON.parse(filesStr);
            return files;
          } catch (e) {
            console.error(e);
          }
        },
      },
    };
  },
  addCommands() {
    return {
      insertStrapiMedia: (options: InsertStrapiMediaOptions) => (editor) => {
        const commands = editor.commands;
        return commands.insertContent({
          type: this.name,
          attrs: {
            type: options.type
          }
        });
      },
    };
  },
  parseHTML() {
    return [
      {
        tag: "div[data-strapi-media]",
      },
    ];
  },
  renderHTML(args) {
    return ["div", { "data-strapi-media": "", ...args.HTMLAttributes }];
  },
});
