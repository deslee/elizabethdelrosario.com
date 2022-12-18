import { getFrontPage } from "../queries/common";

export default async function Page() {
  const frontPage = await getFrontPage();
  return <div>{frontPage.Title}</div>;
}
