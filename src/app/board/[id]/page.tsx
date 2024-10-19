'use client';

import React, { useState, useEffect } from 'react';
import { Tldraw, TLUserPreferences, useTldrawUser } from 'tldraw';
import 'tldraw/tldraw.css';
import { useSyncDemo } from '@tldraw/sync';

interface WhiteBoardProps {
  params: {
    id: string;
  };
}

const WhiteBoard: React.FC<WhiteBoardProps> = ({ params }) => {
  const { id } = params;
  const [username, setUsername] = useState('');
  const [userPreferences, setUserPreferences] = useState<TLUserPreferences>({
    id: 'user-' + Math.random(),
    name: '',
    color: 'blue',
    colorScheme: 'light',
  });

  useEffect(() => {
    if (!username) {
      const enteredUsername = prompt('Please enter your username:');
      if (enteredUsername) {
        setUsername(enteredUsername.trim());
      }
    }
  }, [username]);

  useEffect(() => {
    if (username) {
      setUserPreferences((prev) => ({ ...prev, name: username }));
    }
  }, [username]);

  const store = useSyncDemo({ roomId: id, userInfo: userPreferences });
  const user = useTldrawUser({ userPreferences, setUserPreferences });

  const handleCopyUrl = () => {
    const url = window.location.href;
    navigator.clipboard.writeText(url).then(() => {
      alert('URL copied to clipboard');
    });
  };

  if (!username) {
    return <div className="flex items-center justify-center h-screen">Loading...</div>;
  }

  return (
    <div className="flex flex-col h-screen w-screen overflow-hidden">
      <header className="p-4 border-b border-gray-300">
        <h1 className="text-2xl font-bold mb-2">WhiteBoard</h1>
        <p className="text-gray-600">ID: {id}</p>
        <p className="text-gray-600">User: {username}</p>
        <button
          onClick={handleCopyUrl}
          className="mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Copy URL
        </button>
      </header>
      <div className="flex-grow relative">
        <Tldraw store={store} user={user} />
      </div>
    </div>
  );
};

export default WhiteBoard;
