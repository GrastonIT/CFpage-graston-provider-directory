import { FaSpinner } from "react-icons/fa";

interface LoadingSpinnerProps {
    message?: string;
    size?: "sm" | "md" | "lg";
}

export function LoadingSpinner({ message = "Loading...", size = "md" }: LoadingSpinnerProps) {
    const sizeClasses = {
        sm: "w-4 h-4",
        md: "w-8 h-8",
        lg: "w-12 h-12"
    };

    return (
        <div className="flex flex-col items-center justify-center p-8">
            <FaSpinner className={`${sizeClasses[size]} animate-spin text-blue-500 mb-3`} />
            <p className="text-gray-600 text-center">{message}</p>
        </div>
    );
}

interface ErrorBoundaryProps {
    error: Error;
    message?: string;
}

export function ErrorBoundary({ error, message = "Something went wrong" }: ErrorBoundaryProps) {
    return (
        <div className="flex flex-col items-center justify-center p-8 bg-red-50 border border-red-200 rounded-lg">
            <div className="text-red-500 text-6xl mb-4">⚠️</div>
            <h2 className="text-xl font-bold text-red-800 mb-2">{message}</h2>
            <p className="text-red-600 text-center mb-4">
                We encountered an error while loading this page. Please try refreshing or contact support if the problem persists.
            </p>
            <details className="text-sm text-gray-600 max-w-md">
                <summary className="cursor-pointer font-medium">Technical Details</summary>
                <pre className="mt-2 p-2 bg-gray-100 rounded text-xs overflow-auto">
                    {error.message}
                </pre>
            </details>
            <button
                onClick={() => window.location.reload()}
                className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
            >
                Refresh Page
            </button>
        </div>
    );
}
