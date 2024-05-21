import { useRouter } from 'next/router';
import { useEffect } from 'react';

export default function Custom404() {
  const router = useRouter();

  useEffect(() => {
    router.push('/');
  }, [router]);

  return null; // This can be replaced with a loading spinner or similar if desired
}
