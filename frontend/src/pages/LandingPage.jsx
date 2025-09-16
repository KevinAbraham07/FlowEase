import React, { useEffect, useRef } from "react";
import { FcGoogle } from "react-icons/fc";

const LandingPage = () => {
  const handleGoogleSignIn = () => {
    window.location.href = "http://localhost:5000/api/auth/login";
  };

  const cardRef = useRef(null);
  const rafRef = useRef(null);

  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;

    const handleMove = (e) => {
      const rect = card.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const px = (e.clientX - cx) / (rect.width / 2);
      const py = (e.clientY - cy) / (rect.height / 2);

      const maxRotate = 12; // degrees
      const rotateY = px * maxRotate;
      const rotateX = -py * maxRotate;

      cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(() => {
        card.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;

        const layers = card.querySelectorAll('[data-depth]');
        layers.forEach((el) => {
          const depth = parseFloat(el.getAttribute('data-depth') || '0');
          const moveX = -px * depth * 15; // px
          const moveY = -py * depth * 15; // px
          const z = el.getAttribute('data-z') || '0px';
          const scale = el.getAttribute('data-scale') || '1';
          el.style.transform = `translate3d(${moveX}px, ${moveY}px, ${z}) scale(${scale})`;
        });
      });
    };

    const reset = () => {
      cancelAnimationFrame(rafRef.current);
      card.style.transform = `rotateX(0deg) rotateY(0deg)`;
      const layers = card.querySelectorAll('[data-depth]');
      layers.forEach((el) => {
        const z = el.getAttribute('data-z') || '0px';
        const scale = el.getAttribute('data-scale') || '1';
        el.style.transform = `translate3d(0px, 0px, ${z}) scale(${scale})`;
      });
    };

    const wrapper = card.parentElement; // perspective container
    wrapper.addEventListener('mousemove', handleMove);
    wrapper.addEventListener('mouseleave', reset);

    return () => {
      wrapper.removeEventListener('mousemove', handleMove);
      wrapper.removeEventListener('mouseleave', reset);
      cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <div className="relative flex items-center justify-center h-screen overflow-hidden bg-gradient-to-br from-blue-500 via-indigo-500 to-purple-600">
      {/* Floating shapes */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-10 -left-10 h-40 w-40 rounded-full bg-white/10 blur-2xl float-slow transform-gpu" />
        <div className="absolute top-20 right-10 h-24 w-24 rounded-lg rotate-12 bg-white/10 blur-xl float-medium transform-gpu" />
        <div className="absolute bottom-20 left-28 h-32 w-32 rounded-full bg-white/10 blur-xl float-fast transform-gpu" />
        <div className="absolute -bottom-12 right-1/4 h-48 w-48 rounded-[2rem] bg-white/5 blur-3xl float-slow transform-gpu" />
      </div>

      {/* Perspective wrapper */}
      <div className="perspective-1000">
        {/* 3D tilt card */}
        <div
          ref={cardRef}
          className="relative preserve-3d gpu text-center select-none"
          style={{
            transition: "transform 200ms ease",
          }}
        >
          {/* Card base */}
          <div className="relative backface-hidden rounded-3xl shadow-2xl bg-white/10 backdrop-blur-md border border-white/20 p-10 sm:p-12 md:p-14">
            {/* Parallax accent layers */}
            <div
              className="pointer-events-none absolute -top-10 -left-10 h-40 w-40 rounded-full bg-gradient-to-br from-white/40 to-white/0 opacity-70"
              data-depth="0.6"
              data-z="40px"
              data-scale="1.1"
            />
            <div
              className="pointer-events-none absolute -bottom-14 -right-10 h-56 w-56 rounded-full bg-gradient-to-tr from-white/40 to-white/0 opacity-60"
              data-depth="0.4"
              data-z="30px"
              data-scale="1.05"
            />
            <div
              className="pointer-events-none absolute top-1/2 -translate-y-1/2 -left-6 h-24 w-24 rounded-xl bg-white/10"
              data-depth="0.8"
              data-z="60px"
              data-scale="1.15"
            />

            <h1 className="text-5xl md:text-6xl font-extrabold text-white drop-shadow-sm" data-depth="0.2" data-z="20px" data-scale="1">
              FlowEase
            </h1>
            <p className="mt-4 text-white/90 text-lg max-w-md mx-auto" data-depth="0.3" data-z="26px" data-scale="1">
              Orchestrate tasks, calendars, and insights in one beautiful flow.
            </p>

            <div className="mt-8" data-depth="0.5" data-z="36px" data-scale="1">
              <button
                onClick={handleGoogleSignIn}
                className="flex items-center gap-3 bg-white text-gray-800 px-6 py-3 rounded-full shadow-md hover:shadow-lg transition mx-auto"
              >
                <FcGoogle className="text-2xl" />
                <span className="font-medium">Sign in with Google</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
