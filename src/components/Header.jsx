import { Link } from 'react-router-dom';

function Header({ children }) {
  return (
    <header className="flex flex-wrap items-center justify-between gap-4 bg-gray-100 px-6 py-3">
      <Link to="/" className="flex items-center gap-2 whitespace-nowrap">
        <img
          src="/icons/logo-umpa-loompa.png"
          alt="Oompa Loompa's Crew"
          className="h-6 w-6"
        />
        <span className="font-semibold text-gray-900">
          Oompa Loompa&apos;s Crew
        </span>
      </Link>
      {children}
    </header>
  );
}

export default Header;
