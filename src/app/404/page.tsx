// app/404/page.tsx
import { Suspense } from "react";
import SearchParamsSection from "./SearchParamsSection";


export default function NotFoundPage() {
    return (
        <div>
            <h1>404 - Page Not Found</h1>
            <Suspense fallback={<p>Loading...</p>}>
                <SearchParamsSection />
            </Suspense>
        </div>
    );
}
