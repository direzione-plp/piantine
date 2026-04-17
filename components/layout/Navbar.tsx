'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Leaf, ScanLine, History, BookOpen, Menu, X } from 'lucide-react';
import { useState } from 'react';
import { cn } from '@/lib/utils';

const links = [
  { href: '/scan', label: 'Scansiona', icon: ScanLine },
  { href: '/history', label: 'Storico', icon: History },
  { href: '/guide', label: 'Guida alla Cura', icon: BookOpen },
];

export default function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-stone-100">
      <nav className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 font-bold text-xl text-green-900">
          <span className="w-8 h-8 bg-green-800 rounded-xl flex items-center justify-center">
            <Leaf className="w-4 h-4 text-white" />
          </span>
          Plant Doctor
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-1">
          {links.map(({ href, label, icon: Icon }) => (
            <Link
              key={href}
              href={href}
              className={cn(
                'flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-medium transition-colors',
                pathname === href
                  ? 'bg-green-50 text-green-800'
                  : 'text-stone-600 hover:text-green-800 hover:bg-stone-50'
              )}
            >
              <Icon className="w-4 h-4" />
              {label}
            </Link>
          ))}
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden p-2 rounded-xl text-stone-600 hover:bg-stone-100"
          onClick={() => setOpen(!open)}
          aria-label="Apri menu"
        >
          {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </nav>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden border-t border-stone-100 bg-white px-4 py-3 flex flex-col gap-1">
          {links.map(({ href, label, icon: Icon }) => (
            <Link
              key={href}
              href={href}
              onClick={() => setOpen(false)}
              className={cn(
                'flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium',
                pathname === href
                  ? 'bg-green-50 text-green-800'
                  : 'text-stone-700 hover:bg-stone-50'
              )}
            >
              <Icon className="w-4 h-4" />
              {label}
            </Link>
          ))}
        </div>
      )}
    </header>
  );
}
