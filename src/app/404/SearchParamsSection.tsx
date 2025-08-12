// app/404/SearchParamsSection.tsx
"use client";

import { useSearchParams } from "next/navigation";

export default function SearchParamsSection() {
    const searchParams = useSearchParams();
    const foo = searchParams.get("foo");

    return <p>Foo: {foo}</p>;
}
