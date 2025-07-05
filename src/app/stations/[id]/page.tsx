"use client";

import React, { use } from 'react';

interface PageProps {
    params: Promise<{ id: string }>;
}

const Page = ({ params }: PageProps) => {
    const { id } = use(params);
    return (
        <main>
            <h1>Router Page</h1>
            <p>Current ID: {id}</p>
        </main>
    );
};

export default Page;