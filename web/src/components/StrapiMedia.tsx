"use client";
import 'photoswipe/dist/photoswipe.css'

import clsx from "clsx";
import Image from "next/image";
import { Fragment, useMemo, useState } from "react";
import { Gallery, Item } from "react-photoswipe-gallery";
import { z } from "zod";

type Props = {
  type: "image";
  data: string;
};

const strapiMediaSchema = z.object({
  id: z.number(),
  width: z.number(),
  height: z.number(),
  name: z.string(),
  alternativeText: z.string().nullish(),
  mime: z.string(),
  url: z.string(),
  placeholder: z.string().nullish(),
});

export default function StrapiMedia(props: Props) {
  const files = useMemo(() => {
    return z.array(strapiMediaSchema).parse(JSON.parse(props.data));
  }, [props.data]);
  if (props.type === "image") {
    return (
      <Gallery>
        <div
          className={clsx(
            "mt-8 grid grid-flow-row gap-4 max-w-fit mx-auto relative not-prose",
            files.length <= 1
              ? "grid-cols-1"
              : files.length === 2 || files.length === 4
              ? "grid-cols-2"
              : "grid-cols-3"
          )}
        >
          {files.map((file) => (
            <Item
              key={file.id}
              original={file.url}
              thumbnail={file.url}
              width={file.width}
              height={file.height}
              alt={file.alternativeText ?? ""}
            >
              {({ ref, open }) => (
                <Image
                  ref={ref as React.MutableRefObject<HTMLImageElement>}
                  onClick={open}
                  className="active:scale-95 transition-transform"
                  placeholder={file.placeholder ? "blur" : "empty"}
                  blurDataURL={file.placeholder ?? undefined}
                  src={file.url}
                  width={file.width}
                  height={file.height}
                  alt={file.alternativeText ?? ""}
                />
              )}
            </Item>
          ))}
        </div>
      </Gallery>
    );
  }
  return <Fragment />;
}
