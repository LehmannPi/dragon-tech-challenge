'use client';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function Home() {
  const router = useRouter();
  const isAuthenticated = false;

  useEffect(() => {
    // Logica de autenticação usando localStorage

    if (!isAuthenticated) {
      router.push('/login');
    }
  }, []);

  if (!isAuthenticated) return <div>Carregando...</div>;

  return <div>Main page</div>;
}
