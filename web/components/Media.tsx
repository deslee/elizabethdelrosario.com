import clsx from "clsx";
import Image from "next/image";
import { Flipped } from "react-flip-toolkit";
import { FragmentType, graphql, useFragment } from "../gql";
import { useSelectedMedia } from "./Section";

const MediaFragment = graphql(`
  fragment MediaFragment on UploadFile {
    url
    previewUrl
    width
    height
    mime
    placeholder
    alternativeText
  }
`);

type Props = {
  id: string;
  media: FragmentType<typeof MediaFragment>;
};

export function ImageModal({ media: mediaProp }: Props) {
  const media = useFragment(MediaFragment, mediaProp);
  return (
    <div>
      <Image
        src={media.url}
        width={media.width ?? 0}
        height={media.height ?? 0}
        alt={media.alternativeText ?? ""}
        placeholder={media.placeholder ? "blur" : "empty"}
        blurDataURL={media.placeholder}
        className={clsx("h-full w-full")}
      />
    </div>
  );
}

export default function Media({ id, media: mediaProp }: Props) {
  const media = useFragment(MediaFragment, mediaProp);
  const { setMedia, selectedMedia } = useSelectedMedia();
  if (media.mime.startsWith("image/")) {
    return (
      <a
        href={media.url}
        onClick={(e) => {
          e.preventDefault();
          setMedia(selectedMedia === id ? "" : id);
        }}
        className="block active:scale-95 transition-transform h-full"
      >
        {
          <Flipped flipId={id}>
            <div className="h-full">
              <Image
                src={media.url}
                width={media.width ?? 0}
                height={media.height ?? 0}
                alt={media.alternativeText ?? ""}
                placeholder={media.placeholder ? "blur" : "empty"}
                blurDataURL={media.placeholder}
                className={clsx("h-full w-full")}
              />
            </div>
          </Flipped>
        }
      </a>
    );
  } else if (media.mime.startsWith("video/")) {
    return <video controls src={media.url} />;
  }
  return <div>{media.url}</div>;
}
