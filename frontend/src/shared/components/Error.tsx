import {
    isRouteErrorResponse,
    useRouteError,
    Link,
} from "react-router-dom";

export default function ErrorPage() {
    const error = useRouteError();
    const title = isRouteErrorResponse(error)
        ? `${error.status}`
        : "Error";

    const message = isRouteErrorResponse(error)
        ? error.statusText
        : error instanceof Error
            ? error.message
            : "Something went wrong.";
    return  (
        <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4">
            <div className="w-full max-w-md rounded-xl border border-gray-200 bg-white p-8 text-center shadow-sm">
                <h1 className="text-5xl font-bold text-gray-900">
                    {title}
                </h1>

                <p className="mt-3 text-gray-600">
                    {message}
                </p>

                {isRouteErrorResponse(error) && error.data?.message && (
                    <p className="mt-2 text-sm text-gray-500">
                        {error.data.message}
                    </p>
                )}

                <Link
                    to="/frontend/public"
                    className="mt-8 inline-block rounded-md bg-gray-900 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-gray-800"
                >
                    Go Home
                </Link>
            </div>
        </div>
    )
}
