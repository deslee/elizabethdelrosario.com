import OEmbed from "@/components/OEmbed";
import StrapiMedia from "@/components/StrapiMedia";
import { createElement, Fragment, } from "react";
import rehypeParse from "rehype-parse";
import rehypeReact from "rehype-react";
import { unified } from "unified";
import { visit } from "unist-util-visit";

export const processor = unified()
  .use(rehypeParse, { fragment: true })
  .use([
    function transformDataDivs() {
      return (tree) => {
        visit(tree, "element", (node) => {
          if (typeof node.properties?.dataOembed === "string") {
            node.tagName = "OEmbed";
            node.properties = {
              data: node.properties.dataOembed
            }
          }
          if (
            typeof node.properties?.dataStrapiMedia === "string" &&
            typeof node.properties.dataFiles === "string" &&
            typeof node.properties.dataType === "string"
          ) {
            const type = node.properties.dataType;
            node.properties = {
              type,
              data: node.properties.dataFiles,
            };
            node.tagName = "StrapiMedia";
          }
        });
      };
    },
  ])
  .use(rehypeReact, {
    createElement,
    Fragment,
    components: {
      StrapiMedia,
      OEmbed,
    } as any,
  });
