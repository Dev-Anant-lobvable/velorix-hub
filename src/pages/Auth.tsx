import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { AnimatedButton } from "@/components/ui/animated-button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/hooks/use-toast";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, Lock, User, ArrowLeft, Eye, EyeOff, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import velorixLogo from "@/assets/velorix-logo.png";
import { useAuth } from "@/contexts/AuthContext";

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const { user } = useAuth();

  useEffect(() => {
    if (user) navigate("/", { replace: true });
  }, [user, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (isLogin) {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
        toast({ title: "Welcome back!", description: "You've been signed in successfully." });
        navigate("/");
      } else {
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: { display_name: displayName },
            emailRedirectTo: window.location.origin,
          },
        });
        if (error) throw error;
        setIsLogin(true);
        setEmail("");
        setPassword("");
        setDisplayName("");
        toast({
          title: "Account created! 🎉",
          description: "Please check your email to verify your account, then sign in.",
        });
      }
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center relative overflow-hidden px-4">
      {/* Animated background orbs */}
      <div className="absolute inset-0 bg-mesh-gradient" />
      <motion.div
        className="absolute top-[10%] left-[15%] w-[500px] h-[500px] bg-primary/20 rounded-full blur-[150px]"
        animate={{ 
          x: [0, 50, -30, 0], 
          y: [0, -40, 20, 0],
          scale: [1, 1.1, 0.95, 1],
        }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-[15%] right-[10%] w-[400px] h-[400px] bg-primary/15 rounded-full blur-[120px]"
        animate={{ 
          x: [0, -40, 30, 0], 
          y: [0, 30, -50, 0],
          scale: [1, 0.9, 1.1, 1],
        }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute top-[50%] left-[50%] w-[300px] h-[300px] bg-primary/10 rounded-full blur-[100px]"
        animate={{ 
          x: [0, 60, -40, 0], 
          y: [0, -60, 40, 0],
        }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
      />

      <motion.div
        className="relative z-10 w-full max-w-md"
        initial={{ opacity: 0, y: 30, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        {/* Back to home */}
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors mb-6 group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          Back to Home
        </Link>

        {/* Liquid Glass Card */}
        <div className="liquid-glass rounded-2xl p-8 relative overflow-hidden">
          {/* Inner glass reflections */}
          <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-primary-foreground/20 to-transparent" />
          <div className="absolute top-0 left-0 bottom-0 w-[1px] bg-gradient-to-b from-primary-foreground/15 via-transparent to-transparent" />
          
          {/* Shimmer highlight */}
          <motion.div
            className="absolute -top-[100px] -left-[100px] w-[200px] h-[400px] bg-primary-foreground/5 rotate-45 blur-xl pointer-events-none"
            animate={{ x: [0, 600], y: [0, 300] }}
            transition={{ duration: 5, repeat: Infinity, repeatDelay: 8, ease: "easeInOut" }}
          />

          {/* Logo */}
          <motion.div 
            className="flex justify-center mb-6"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <img src={velorixLogo} alt="VeloRix" className="h-16 w-auto drop-shadow-lg" />
          </motion.div>

          <AnimatePresence mode="wait">
            <motion.div
              key={isLogin ? "login" : "signup"}
              initial={{ opacity: 0, x: isLogin ? -20 : 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: isLogin ? 20 : -20 }}
              transition={{ duration: 0.3 }}
            >
              <h1 className="text-2xl font-bold text-center mb-2 text-foreground">
                {isLogin ? "Welcome Back" : "Create Account"}
              </h1>
              <p className="text-muted-foreground text-center text-sm mb-8">
                {isLogin
                  ? "Sign in to download the app"
                  : "Sign up to get access to VeloRix"}
              </p>
            </motion.div>
          </AnimatePresence>

          <form onSubmit={handleSubmit} className="space-y-5">
            <AnimatePresence>
              {!isLogin && (
                <motion.div
                  className="space-y-2"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <Label htmlFor="displayName" className="text-foreground">Display Name</Label>
                  <div className="relative group">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
                    <Input
                      id="displayName"
                      type="text"
                      placeholder="Your name"
                      value={displayName}
                      onChange={(e) => setDisplayName(e.target.value)}
                      className="pl-10 bg-background/40 border-border/50 backdrop-blur-sm focus:border-primary/50 focus:bg-background/60 transition-all"
                      required={!isLogin}
                    />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <div className="space-y-2">
              <Label htmlFor="email" className="text-foreground">Email</Label>
              <div className="relative group">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
                <Input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-10 bg-background/40 border-border/50 backdrop-blur-sm focus:border-primary/50 focus:bg-background/60 transition-all"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-foreground">Password</Label>
              <div className="relative group">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-10 pr-10 bg-background/40 border-border/50 backdrop-blur-sm focus:border-primary/50 focus:bg-background/60 transition-all"
                  required
                  minLength={6}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <AnimatedButton
              type="submit"
              variant="hero"
              size="xl"
              className="w-full pulse-glow"
              disabled={loading}
            >
              {loading ? (
                <motion.div
                  className="flex items-center gap-2"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  <Sparkles className="w-4 h-4 animate-spin" />
                  Please wait...
                </motion.div>
              ) : isLogin ? (
                "Sign In"
              ) : (
                "Create Account"
              )}
            </AnimatedButton>
          </form>

          <div className="mt-6 text-center">
            <button
              onClick={() => {
                setIsLogin(!isLogin);
                setEmail("");
                setPassword("");
                setDisplayName("");
              }}
              className="text-sm text-muted-foreground hover:text-primary transition-colors"
            >
              {isLogin
                ? "Don't have an account? Sign up"
                : "Already have an account? Sign in"}
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Auth;
