import { Link } from "react-router";
import { paths } from "@/config/paths";

const NotFoundRoute = () => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-neutral-4">
      <div className="flex flex-col items-center gap-4">
        <h1 className="text-3xl font-bold text-primary-4">404 - Not Found</h1>
        <p className="text-lg text-neutral-1">
          Sorry, the page you are looking for does not exist.
        </p>
        <Link
          to={paths.home}
          replace
          className="mt-2 rounded-lg bg-primary-4 px-4 py-2 text-neutral-1 hover:bg-primary-3"
        >
          Go to Home
        </Link>
      </div>
    </div>
  );
};

export default NotFoundRoute;
