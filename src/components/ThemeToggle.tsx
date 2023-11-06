import { motion } from 'framer-motion';
import { Moon, Sun } from 'lucide-react';
import { spring } from '@/lib/motion';
import { useTheme } from '@/contexts/theme-provider';

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  return (
    <div
      className={`flex h-[26] w-[50px] cursor-pointer rounded-full bg-slate-300 p-1 ${
        theme === 'light' ? 'justify-start' : 'justify-end'
      }`}
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
    >
      <motion.div className="rounded-full" layout transition={spring}>
        {theme === 'light' ? (
          <Sun className="fill fill-orange-500 stroke-yellow-500" />
        ) : (
          <Moon className="fill-slate-700 stroke-slate-700" />
        )}
      </motion.div>
    </div>
  );
}
