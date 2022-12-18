import { getSiteSettings } from "../queries/common";

export default async function Head() {
  const { site } = await getSiteSettings();
  return (
    <>
      <title>{site.Title}</title>
    </>
  );
}
