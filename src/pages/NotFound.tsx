import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Crosshair } from "lucide-react";
import ErrorTemplate from "@/components/ErrorTemplate";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <ErrorTemplate
      code="404"
      badge="Match Not Found"
      Icon={Crosshair}
      title="You've been eliminated from this page"
      description="Looks like this lobby doesn't exist or the match already ended. Let's get you back into the game."
      errorTag={`ERROR_CODE: ROUTE_NOT_FOUND · ${location.pathname}`}
    />
  );
};

export default NotFound;
