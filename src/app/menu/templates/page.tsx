import Templates from "@/components/shared/templates";
import { Suspense } from "react";

const TemplatesPage = async () => {
  return (
    <Suspense>
      <Templates />
    </Suspense>
  );
};

export default TemplatesPage;
