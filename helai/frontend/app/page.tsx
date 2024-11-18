// app/page.tsx
import Link from 'next/link';

const HomePage = () => {
  return (
    <div>
      <h1>Welcome to the Home Page</h1>
      <p>Click below to register:</p>
      <Link href="/register">Go to Registration Page</Link>
    </div>
  );
};

export default HomePage;
