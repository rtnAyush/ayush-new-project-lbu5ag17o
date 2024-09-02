// utils/fetchWithAuthWithAuth.js

import { cookies } from 'next/headers';

export async function fetchWithAuth(url: string, options: any) {
  let token: string | undefined;

  try {
    // Check if we're on the server side
    if (typeof window === 'undefined') {
      // Server-side: get token from cookies
      const cookieStore = cookies();
      token = cookieStore.get('token')?.value;
    } else {
      // Client-side: get token from localStorage
      token = localStorage.getItem('token') || undefined;
    }
  } catch (error) {
    console.error('Error accessing token:', error);
  }

  if (!token) {
    throw new Error('No authentication token found');
  }

  const updatedOptions: RequestInit = {
    ...options,
    headers: {
      ...options.headers,
      Authorization: `Bearer ${token}`,
    },
  };

  // Use the native fetch function to avoid potential recursion
  const response = await globalThis.fetch(url, updatedOptions);

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  return response;
}
