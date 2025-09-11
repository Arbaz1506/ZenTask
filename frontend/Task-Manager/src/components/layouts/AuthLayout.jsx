import React from "react";

const AuthLayout = ({ children }) => {
  const phrasesTop = ["ZenTask — Organize your day", "Stay focused. Stay Zen."];
  const phrasesMiddle = [
    "Plan. Focus. Achieve.",
    "Tasks done, peace of mind gained.",
    "Conquer your day effortlessly.",
  ];
  const phrasesBottom = ["Small steps. Big progress.", "Your productivity, elevated."];

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white overflow-hidden relative">

      {/* Left side: Auth content */}
      <div className="flex flex-col justify-center items-center w-full md:w-1/2 px-8 z-10">
        {children}
      </div>

      {/* Right side: Visual side (hidden on small screens) */}
      <div className="hidden md:flex relative w-1/2 flex-col justify-between items-center overflow-hidden select-none py-16">

        {/* Top phrases */}
        <div className="text-center space-y-3 max-w-xs mx-auto px-4">
          {phrasesTop.map((text, i) => (
            <p
              key={i}
              className="font-bold text-lg md:text-xl tracking-wide"
              style={{
                animation: `fadeInUp 0.8s ease forwards`,
                animationDelay: `${i * 0.3}s`,
                opacity: 0,
                transform: "translateY(20px)",
                background: "linear-gradient(120deg, #A78BFA 0%, #F472B6 50%, #22D3EE 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                filter: "drop-shadow(0 2px 4px rgba(167, 139, 250, 0.3))",
              }}
            >
              {text}
            </p>
          ))}
        </div>

        {/* Middle phrases */}
        <div className="text-center space-y-4 max-w-sm mx-auto px-2">
          {phrasesMiddle.map((text, i) => (
            <p
              key={i}
              className="font-semibold text-xl md:text-2xl leading-relaxed"
              style={{
                animation: `fadeInUp 0.8s ease forwards`,
                animationDelay: `${i * 0.3 + 0.4}s`,
                opacity: 0,
                transform: "translateY(20px)",
                background: "linear-gradient(120deg, #A78BFA 0%, #F472B6 50%, #22D3EE 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                filter: "drop-shadow(0 2px 6px rgba(244, 114, 182, 0.4))",
              }}
            >
              {text}
            </p>
          ))}
        </div>

        {/* Bottom phrases */}
        <div className="text-center space-y-3 max-w-xs mx-auto px-2">
          {phrasesBottom.map((text, i) => (
            <p
              key={i}
              className="font-medium text-base md:text-lg"
              style={{
                animation: `fadeInUp 0.8s ease forwards`,
                animationDelay: `${i * 0.3 + 0.8}s`,
                opacity: 0,
                transform: "translateY(20px)",
                background: "linear-gradient(120deg, #22D3EE 0%, #A78BFA 50%, #F472B6 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                filter: "drop-shadow(0 2px 4px rgba(34, 211, 238, 0.3))",
              }}
            >
              {text}
            </p>
          ))}
        </div>

        {/* Zen stones - replacing ticks */}
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="absolute"
            style={{
              width: `${8 + (i % 3) * 4}px`,
              height: `${6 + (i % 3) * 3}px`,
              top: `${25 + (i * 8) % 50}%`,
              right: `${20 + (i * 9) % 40}%`,
              background: `linear-gradient(135deg, 
                rgba(167, 139, 250, 0.4), 
                rgba(244, 114, 182, 0.3), 
                rgba(34, 211, 238, 0.2)
              )`,
              borderRadius: "50% 40% 50% 40%",
              opacity: 0.6 + (i % 2) * 0.2,
              filter: "blur(1px)",
              animation: `zenFloat ${6 + (i % 3)}s ease-in-out infinite`,
              animationDelay: `${i * 0.5}s`,
              boxShadow: "0 2px 8px rgba(167, 139, 250, 0.2)",
            }}
          />
        ))}

        {/* Floating circles - enhanced */}
        {[...Array(12)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full"
            style={{
              width: `${15 + i * 6}px`,
              height: `${15 + i * 6}px`,
              top: `${15 + (i * 7) % 70}%`,
              right: `${15 + (i * 11) % 50}%`,
              background: `radial-gradient(circle, 
                rgba(167, 139, 250, 0.15) 0%, 
                rgba(244, 114, 182, 0.1) 50%, 
                rgba(34, 211, 238, 0.05) 100%
              )`,
              border: "1px solid rgba(255,255,255,0.1)",
              filter: "blur(2px)",
              opacity: 0.3 + (i % 3) * 0.2,
              animation: `floatUpDown ${5 + (i % 4)}s ease-in-out infinite`,
              animationDelay: `${i * 0.3}s`,
            }}
          />
        ))}

        {/* Subtle light rays */}
        {[...Array(6)].map((_, i) => (
          <div
            key={`ray-${i}`}
            className="absolute"
            style={{
              width: "2px",
              height: `${60 + i * 20}px`,
              top: `${10 + i * 15}%`,
              right: `${25 + i * 12}%`,
              background: `linear-gradient(to bottom, 
                transparent 0%, 
                rgba(167, 139, 250, 0.3) 50%, 
                transparent 100%
              )`,
              transform: `rotate(${15 + i * 25}deg)`,
              opacity: 0.4,
              filter: "blur(1px)",
              animation: `rayPulse ${4 + i}s ease-in-out infinite`,
              animationDelay: `${i * 0.7}s`,
            }}
          />
        ))}

        {/* Ambient particles */}
        {[...Array(15)].map((_, i) => (
          <div
            key={`particle-${i}`}
            className="absolute w-1 h-1 rounded-full"
            style={{
              top: `${15 + (i * 5.5) % 70}%`,
              right: `${10 + (i * 7) % 60}%`,
              background: `hsl(${250 + (i * 20) % 60}, 70%, 80%)`,
              opacity: 0.5 + (i % 2) * 0.3,
              animation: `sparkle ${3 + (i % 3)}s ease-in-out infinite`,
              animationDelay: `${i * 0.4}s`,
              boxShadow: "0 0 4px currentColor",
            }}
          />
        ))}
      </div>

      <style>{`
        @keyframes fadeInUp {
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes textShimmer {
          0%, 100% { 
            background-position: 0% 50%; 
          }
          50% { 
            background-position: 100% 50%; 
          }
        }

        @keyframes zenFloat {
          0%, 100% { 
            transform: translateY(0) rotate(0deg) scale(1); 
            opacity: 0.7; 
          }
          33% { 
            transform: translateY(-8px) rotate(120deg) scale(1.1); 
            opacity: 0.9; 
          }
          66% { 
            transform: translateY(-4px) rotate(240deg) scale(1.05); 
            opacity: 0.8; 
          }
        }

        @keyframes stoneGlow {
          0%, 100% { 
            box-shadow: 0 0 8px rgba(167, 139, 250, 0.3);
            filter: blur(0.5px) drop-shadow(0 0 8px rgba(167, 139, 250, 0.4));
          }
          50% { 
            box-shadow: 0 0 20px rgba(244, 114, 182, 0.6);
            filter: blur(0.5px) drop-shadow(0 0 15px rgba(244, 114, 182, 0.6));
          }
        }

        @keyframes orbFloat {
          0%, 100% { 
            transform: translateY(0) translateX(0) scale(1); 
          }
          25% { 
            transform: translateY(-15px) translateX(5px) scale(1.1); 
          }
          50% { 
            transform: translateY(-8px) translateX(-3px) scale(1.05); 
          }
          75% { 
            transform: translateY(-12px) translateX(8px) scale(1.08); 
          }
        }

        @keyframes orbPulse {
          0%, 100% { 
            opacity: 0.6; 
            transform: scale(1);
          }
          50% { 
            opacity: 1; 
            transform: scale(1.2);
          }
        }

        @keyframes floatUpDown {
          0%, 100% { 
            transform: translateY(0) scale(1); 
            opacity: 0.3;
          }
          50% { 
            transform: translateY(-20px) scale(1.1); 
            opacity: 0.6;
          }
        }

        @keyframes rayPulse {
          0%, 100% { 
            opacity: 0.3; 
            transform: rotate(var(--rotation, 0deg)) scale(1);
          }
          50% { 
            opacity: 0.8; 
            transform: rotate(var(--rotation, 0deg)) scale(1.2);
          }
        }

        @keyframes sparkle {
          0%, 100% { 
            opacity: 0.4; 
            transform: scale(1) rotate(0deg); 
          }
          25% { 
            opacity: 0.8; 
            transform: scale(1.5) rotate(90deg); 
          }
          50% { 
            opacity: 1; 
            transform: scale(2) rotate(180deg); 
          }
          75% { 
            opacity: 0.8; 
            transform: scale(1.5) rotate(270deg); 
          }
        }
      `}</style>
    </div>
  );
};

export default AuthLayout;