import { redirect } from 'next/navigation';

// Root redirects to the home page render
export default function RootPage() {
  redirect('/home');
}
