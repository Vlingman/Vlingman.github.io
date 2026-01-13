import { useEffect, useState } from 'react';

const LoadingScreen = ({ onComplete }: { onComplete: () => void }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(onComplete, 300);
          return 100;
        }
        return prev + Math.random() * 15 + 5;
      });
    }, 100);

    return () => clearInterval(timer);
  }, [onComplete]);

  return (
    <div className={`fixed inset-0 z-50 flex flex-col items-center justify-center bg-background transition-opacity duration-500 ${progress >= 100 ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
      {/* Logo/Brand */}
      <div className="mb-8 animate-[pulseSubtle_2s_ease-in-out_infinite]">
        <h1 className="text-4xl md:text-5xl font-bold text-primary">
          VL<span className="text-foreground">COACHING</span>
        </h1>
      </div>

      {/* Loading bar */}
      <div className="w-64 h-1 bg-muted rounded-full overflow-hidden">
        <div 
          className="h-full bg-gradient-to-r from-primary to-primary/60 rounded-full transition-all duration-200 ease-out"
          style={{ width: `${Math.min(progress, 100)}%` }}
        />
      </div>

      {/* Loading text */}
      <p className="mt-4 text-sm text-muted-foreground animate-pulse">
        Loading...
      </p>

      {/* Decorative elements */}
      <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-primary/5 rounded-full blur-3xl animate-[float_6s_ease-in-out_infinite]" />
      <div className="absolute bottom-1/4 right-1/4 w-40 h-40 bg-primary/5 rounded-full blur-3xl animate-[float_8s_ease-in-out_infinite_reverse]" />
    </div>
  );
};

export default LoadingScreen;
