import {Link} from "react-router-dom";

export default function NotFoundPage() {
    return <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-4">
        <h1 className="text-8xl font-semibold tracking-tight">404</h1>

        <h2 className="mt-4 text-2xl font-medium">
            Page not found
        </h2>

        <p className="mt-2 text-gray-500 max-w-md">
            Sorry, we couldn't find the page you're looking for.
        </p>

        <div className="mt-8 flex gap-3">
            <Link to="/">
                Home
            </Link>

            <Link to="/new-in">
                Continue Shopping
            </Link>
        </div>
    </div>
}