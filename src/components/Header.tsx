import { motion } from 'framer-motion';
import Logo from './Logo';
import { ThemeToggle } from './ThemeToggle';

export default function Header() {
  return (
    <header className="flex h-20 items-center bg-violet-500">
      <div className="container flex justify-between">
        <motion.div
          initial={{ x: -500, opacity: 0, scale: 0.5 }}
          animate={{ x: 0, opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <a
            href="/"
            className="flex items-center gap-2 text-2xl font-extrabold tracking-tight text-gray-700"
          >
            <Logo /> Photo Gallery
          </a>
        </motion.div>
        <ThemeToggle />
      </div>
    </header>
  );
}
