import { Loader2 } from "lucide-react";

const PageLoading = () => {
  return (
    <div className="h-screen bg-white flex items-center justify-center">
      <Loader2 className="h-10 w-10 text-primary animate-spin" />
    </div>
  );
};

export default PageLoading;
