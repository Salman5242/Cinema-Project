import Link from 'next/link';

export default function Layout({ children }) {
  return (
    <>
      <nav className="navbar">
        <div className="container navbar-content">
          <Link href="/" className="logo">
            Movie House
          </Link>
          <div className="nav-links">
            <Link href="/movies">Movies</Link>
            <Link href="/genres">Genres</Link>
            <Link href="/directors">Directors</Link>
            <Link href="/help">Help</Link>
          </div>
        </div>
      </nav>
      <main className="container">
        {children}
      </main>
    </>
  );
} 