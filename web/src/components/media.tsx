import { Suspense, useState, Fragment, useEffect, createElement } from "react";
import { unified } from "unified";
import rehypeParse from "rehype-parse";
import rehypeReact from "rehype-react";

function useProcessor(text: string) {
  const [Content, setContent] = useState<any>(Fragment);

  useEffect(() => {
    unified()
      .use(rehypeParse, { fragment: true })
      .use(rehypeReact, { createElement, Fragment })
      .process(text)
      .then((file) => {
        console.log(file)
        setContent(file.result);
      });
  }, [text]);

  return Content;
}

export default function Media() {
  return useProcessor('<div>hihi</div>');
}
