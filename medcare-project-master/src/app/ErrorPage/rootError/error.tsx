"use client";

import ErrorPage from "@/app/ErrorPage/error"; // Import from the errors directory

export default function Error({ error, reset }: { error: Error; reset: () => void }) {
    return <ErrorPage error={error} reset={reset} />;
}
