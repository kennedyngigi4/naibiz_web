import { Suspense } from 'react';
import ListLayoutTwo from './pageClient';

export default function ListingsPage() {
    return (
        <Suspense fallback={<div>Loading listings...</div>}>
            <ListLayoutTwo />
        </Suspense>
    );
}