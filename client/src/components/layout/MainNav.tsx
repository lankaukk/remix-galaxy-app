import { Link, useLocation } from "wouter";
import { cn } from "@/lib/utils";

const navigation = [
  { name: "Home", href: "/" },
  { name: "Work", href: "/work" },
  { name: "Gallery", href: "/gallery" },
  { name: "Contact", href: "/contact" },
];

export default function MainNav() {
  const [location] = useLocation();

  return (
    <nav className="fixed top-0 z-50 w-full border-b border-border bg-white/80 backdrop-blur-sm">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <Link href="/">
            <a className="text-xl font-bold text-[#2D2D2D]">
              UX Portfolio
            </a>
          </Link>
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              {navigation.map((item) => (
                <Link key={item.name} href={item.href}>
                  <a
                    className={cn(
                      "rounded-md px-3 py-2 text-sm font-medium transition-colors",
                      location === item.href
                        ? "text-[#FF5757]"
                        : "text-[#333333] hover:text-[#00C2FF]"
                    )}
                  >
                    {item.name}
                  </a>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
