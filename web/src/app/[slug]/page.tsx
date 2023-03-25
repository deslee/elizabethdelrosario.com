import Media from "@/components/media";
import { Suspense, useState, Fragment, useEffect, createElement } from "react";

export default async function Post() {
  return (
    <div>
      <Suspense fallback={<div>loading</div>}>
        <Media />
      </Suspense>
    </div>
  );
}
