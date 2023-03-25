"use client";

import clsx from "clsx";
import Image from "next/image";
import { Fragment, useMemo, useState } from "react";
import { Flipped, Flipper } from "react-flip-toolkit";
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
  const [selectedMediaId, setSelectedMediaId] = useState<number | undefined>(
    undefined
  );
  const selectedMedia = useMemo(
    () => files.find((f) => f.id === selectedMediaId),
    [selectedMediaId, files]
  );
  if (props.type === "image") {
    return (
      <Flipper
        flipKey={selectedMediaId}
        className={clsx(
          "mt-8 grid grid-flow-row gap-4 max-w-fit mx-auto relative",
          files.length <= 1
            ? "grid-cols-1"
            : files.length === 2 || files.length === 4
            ? "grid-cols-2"
            : "grid-cols-3"
        )}
      >
        {files.map((file) => (
          <a
            key={file.id}
            href={file.url}
            onClick={(e) => {
              e.preventDefault();
              setSelectedMediaId(file.id);
            }}
            className={clsx(
              "block",
              files.length <= 1
                ? "max-w-4xl"
                : files.length === 2 || files.length === 4
                ? "max-w-lg"
                : "max-w-md"
            )}
          >
            <Flipped flipId={file.id}>
              <div>
                <Image
                  placeholder={file.placeholder ? "blur" : "empty"}
                  blurDataURL={file.placeholder ?? undefined}
                  src={file.url}
                  width={file.width}
                  height={file.height}
                  alt={file.alternativeText ?? ""}
                />
              </div>
            </Flipped>
          </a>
        ))}

        {selectedMedia && (
          <div
            className="fixed inset-0 bg-black/40 cursor-pointer"
            onClick={() => {
              setSelectedMediaId(undefined);
            }}
          >
            <Flipped flipId={selectedMedia.id}>
              <div>
                <Image
                  placeholder={selectedMedia.placeholder ? "blur" : "empty"}
                  blurDataURL={selectedMedia.placeholder ?? undefined}
                  src={selectedMedia.url}
                  width={selectedMedia.width}
                  height={selectedMedia.height}
                  alt={selectedMedia.alternativeText ?? ""}
                />
              </div>
            </Flipped>
          </div>
        )}
      </Flipper>
    );
  }
  return <Fragment />;
}
