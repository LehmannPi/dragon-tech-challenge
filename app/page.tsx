'use client';
import { isAuthenticated } from '@/api/auth/login';
import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();

  // Logica de autenticação usando localStorage
  if (isAuthenticated()) {
    return <div>Main page</div>;
  }

  router.push('/login');
}
