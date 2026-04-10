import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Lock, Eye, EyeOff, ArrowLeft } from "lucide-react";
import { Link } from "wouter";

interface PasswordGateProps {
  children: React.ReactNode;
}

export default function PasswordGate({ children }: PasswordGateProps) {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await fetch('/api/auth/shopify-sidekick/status');
        if (!response.ok) {
          setIsAuthenticated(false);
          return;
        }
        const data = await response.json();
        setIsAuthenticated(data.authenticated);
      } catch (error) {
        console.error('Error checking auth status:', error);
        setIsAuthenticated(false);
      }
    };
    checkAuth();
  }, []);

  useEffect(() => {
    if (isAuthenticated === false) {
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = '';
      };
    }
  }, [isAuthenticated]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");

    try {
      const response = await fetch('/api/auth/shopify-sidekick', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ password }),
      });

      const data = await response.json();

      if (data.authenticated) {
        setIsAuthenticated(true);
      } else {
        setError("Incorrect password");
        setPassword("");
      }
    } catch (error) {
      setError("An error occurred. Please try again.");
      console.error('Authentication error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isAuthenticated === null) {
    return null;
  }

  if (isAuthenticated) {
    return <>{children}</>;
  }

  return (
    <div 
      className="fixed inset-0 overflow-hidden flex flex-col bg-background"
      style={{ touchAction: 'none', overscrollBehavior: 'none' }}
      onTouchMove={(e) => e.preventDefault()}
    >
      <div className="mx-auto max-w-7xl w-full px-4 py-12 sm:px-6 lg:px-8">
        <div className="mb-8">
          <Link href="/work" className="inline-flex items-center hover:text-primary transition-colors">
            <ArrowLeft className="mr-2 h-5 w-5" />
            All Work
          </Link>
        </div>
      </div>
      <div className="flex-1 flex items-center justify-center p-4 -mt-20">
        <div className="w-full max-w-md space-y-6">
          <div className="flex items-center justify-center gap-2">
            <Lock className="w-5 h-5 text-foreground shrink-0" />
            <h2 className="text-xl font-semibold">Protected Content</h2>
          </div>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <div className="relative">
                <Input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className={error ? "border-red-500 pr-10" : "pr-10"}
                  autoFocus
                  disabled={isSubmitting}
                  autoComplete="off"
                  data-testid="input-password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  disabled={isSubmitting}
                  data-testid="button-toggle-password"
                >
                  {showPassword ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </button>
              </div>
              {error && (
                <p className="text-sm text-red-500" data-testid="text-error">
                  {error}
                </p>
              )}
            </div>
            <Button type="submit" className="w-full" disabled={isSubmitting} data-testid="button-submit">
              {isSubmitting ? "Verifying..." : "Access Content"}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
