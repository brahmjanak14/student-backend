import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import logoPath from "@/assets/images/pratham-international.png";
console.log("---------------",logoPath);
export default function AdminLogin() {
  const [, setLocation] = useLocation();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const isAuthenticated = 
      sessionStorage.getItem("isAdminAuthenticated") === "true" || 
      localStorage.getItem("isAdminAuthenticated") === "true";
    
    if (isAuthenticated) {
      setLocation("/admin");
    }
  }, [setLocation]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      const response = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || 'Login failed');
      }

      const data = await response.json();
      
      // Store JWT token
      sessionStorage.setItem("adminToken", data.token);
      if (rememberMe) {
        localStorage.setItem("adminToken", data.token);
      }
      
      sessionStorage.setItem("isAdminAuthenticated", "true");
      if (rememberMe) {
        localStorage.setItem("isAdminAuthenticated", "true");
      }
      
      setLocation("/admin");
    } catch (error) {
      setError(error instanceof Error ? error.message : "Invalid username or password");
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <div className="flex-1 flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <img 
              src={logoPath} 
              alt="Prathm International" 
              className="h-12 mx-auto"
              data-testid="img-login-logo"
            />
          </div>

          <div className="bg-white border border-gray-200 rounded-lg p-8 shadow-sm">
            <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <p className="text-sm font-semibold text-blue-900 mb-2">Demo Credentials:</p>
              <p className="text-sm text-blue-800">Username: <span className="font-mono font-bold">admin</span></p>
              <p className="text-sm text-blue-800">Password: <span className="font-mono font-bold">admin123</span></p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="username" className="text-gray-700 font-normal">
                  Username
                </Label>
                <Input
                  id="username"
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full"
                  data-testid="input-username"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="text-gray-700 font-normal">
                  Password
                </Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full"
                  data-testid="input-password"
                  required
                />
              </div>

              {error && (
                <div className="text-red-600 text-sm" data-testid="text-error">
                  {error}
                </div>
              )}

              <Button
                type="submit"
                className="w-full bg-cyan-600 hover:bg-cyan-700 text-white"
                data-testid="button-login"
              >
                Log In
              </Button>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="remember"
                    checked={rememberMe}
                    onCheckedChange={(checked) => setRememberMe(checked as boolean)}
                    data-testid="checkbox-remember"
                  />
                  <Label
                    htmlFor="remember"
                    className="text-sm text-gray-700 font-normal cursor-pointer"
                  >
                    Remember me
                  </Label>
                </div>

                <a
                  href="#"
                  className="text-sm text-cyan-600 hover:text-cyan-700"
                  data-testid="link-forgot-password"
                >
                  Forgot Your Password?
                </a>
              </div>
            </form>
          </div>
        </div>
      </div>

      <footer className="py-6 text-center text-sm text-gray-600 border-t">
        <p data-testid="text-login-footer">
          © {new Date().getFullYear()} Prathm International. All rights reserved.
        </p>
      </footer>
    </div>
  );
}
