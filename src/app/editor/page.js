// FILE: src/app/editor/page.js

import { Suspense } from 'react';
import EditorClient from './EditorClient';

// This is a Server Component. It has NO "use client" directive.
export default function EditorPage() {
  return (
    // This Suspense boundary is what the error message is asking for.
    // It provides a fallback UI to show while the client component loads.
    <Suspense fallback={
        <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            height: '100vh',
            fontFamily: 'sans-serif',
            fontSize: '1.2rem'
        }}>
            Loading Resume Editor...
        </div>
    }>
      <EditorClient />
    </Suspense>
  );
}