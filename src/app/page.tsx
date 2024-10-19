'use client';

import { nanoid } from 'nanoid';
import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();
  const uniqueId = nanoid();

  const handleRedirect = () => {
    router.push(`/board/${uniqueId}`);
  };

  return (
    <div className="p-4">
      <h1 className="text-xl">Create New White Board</h1>
      <button
        onClick={handleRedirect}
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
      >
        Go to Board
      </button>
    </div>
  );
}
