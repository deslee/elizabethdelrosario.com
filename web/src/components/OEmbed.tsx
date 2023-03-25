import { useMemo } from "react";
import { z } from "zod";

type Props = {
  data: string;
};

const oembedSchema = z.discriminatedUnion("type", [
  z.object({
    type: z.literal("video"),
    provider_name: z.string(),
    title: z.string(),
    html: z.string(),
  }),
  z.object({
    type: z.literal("rich"),
    provider_name: z.string(),
    title: z.string(),
    html: z.string(),
  }),
]);

export default function OEmbed(props: Props) {
  const data = useMemo(() => {
    return oembedSchema.parse(JSON.parse(props.data));
  }, [props.data]);

  return (
    <div
      className="max-w-min mx-auto my-4"
      dangerouslySetInnerHTML={{ __html: data.html }}
    />
  );
}
