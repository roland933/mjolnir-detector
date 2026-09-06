import { Activity, Radio } from "lucide-react";
import Link from "next/link";
export function DashboardHeader() {
  return (
    <header className="mb-6 flex items-center justify-between border-b border-slate-800 pb-5">
      <div>
        <h1 className="text-xl font-bold tracking-wide">
          ⚡ MJÖLNIR DETECTOR
        </h1>

        <p className="mt-1 text-sm text-slate-500">
          Asgardian Detection System
        </p>
      </div>

      <div className="flex items-center gap-6">
        <nav className="hidden items-center gap-5 text-sm text-slate-400 md:flex">
          <Link
            href="/dashboard"
            className="text-white"
          >
            Dashboard
          </Link>

        <Link href="/history">
            History
          </Link>

          <a
            href="/worthiness"
            className="transition-colors hover:text-white"
          >
            Worthiness
          </a>
        </nav>

        <div className="flex items-center gap-2 text-sm">
          <Radio className="h-4 w-4 text-emerald-400" />

          <span className="text-slate-400">
            ASGARD CONNECTION
          </span>

          <span className="font-medium text-emerald-400">
            ONLINE
          </span>
        </div>
      </div>
    </header>
  );
}