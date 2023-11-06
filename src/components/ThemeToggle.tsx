import { motion } from 'framer-motion';
import { Moon, Sun } from 'lucide-react';
import { spring } from '@/lib/motion';
import { useTheme } from '@/contexts/theme-provider';

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  return (
    <motion.div
      className={`flex h-[26] w-[50px] cursor-pointer rounded-full bg-slate-300 p-1 ${
        theme === 'light' ? 'justify-start' : 'justify-end'
      }`}
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
      initial={{ x: 500, opacity: 0, scale: 0.5 }}
      animate={{ x: 0, opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div className="rounded-full" layout transition={spring}>
        {theme === 'light' ? (
          <Sun className="fill fill-orange-500 stroke-yellow-500" />
        ) : (
          <Moon className="fill-slate-700 stroke-slate-700" />
        )}
      </motion.div>
    </motion.div>
  );
}
