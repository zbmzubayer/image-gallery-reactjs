import Logo from './Logo';
import { ThemeToggle } from './ThemeToggle';

export default function Header() {
  return (
    <header className="flex h-20 items-center bg-violet-500">
      <div className="container flex justify-between">
        <div>
          <a
            href="/"
            className="flex items-center gap-2 text-2xl font-extrabold tracking-tight text-gray-700"
          >
            <Logo /> Photo Gallery
          </a>
        </div>
        <ThemeToggle />
      </div>
    </header>
  );
}
