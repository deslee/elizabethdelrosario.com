import Image from "next/image";
import Link from "next/link";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";
import { FragmentType, graphql, useFragment } from "../gql";

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
  media: FragmentType<typeof MediaFragment>;
};

export default function Media(props: Props) {
  const media = useFragment(MediaFragment, props.media);
  if (media.mime.startsWith("image/")) {
    return (
      <a href={media.url} onClick={e => {
        e.preventDefault()
      }} className="block active:scale-95 transition-transform">
        <Image
          src={media.url}
          width={media.width ?? 0}
          height={media.height ?? 0}
          alt={media.alternativeText ?? ""}
          placeholder={media.placeholder ? "blur" : "empty"}
          blurDataURL={media.placeholder}
        />
      </a>
    );
  } else if (media.mime.startsWith("video/")) {
    return <video controls src={media.url} />;
  }
  return <div>{media.url}</div>;
}
