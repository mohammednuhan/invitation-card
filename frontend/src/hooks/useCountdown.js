import { useState, useEffect } from "react";

const ZERO = { days: 0, hours: 0, minutes: 0, seconds: 0, passed: false };

export function useCountdown(dateStr) {
  const calculate = () => {
    if (!dateStr) return ZERO;
    const target = new Date(dateStr).getTime();
    if (Number.isNaN(target)) return ZERO;
    const now = Date.now();
    const diff = Math.max(0, target - now);
    return {
      days: Math.floor(diff / (1000 * 60 * 60 * 24)),
      hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((diff / (1000 * 60)) % 60),
      seconds: Math.floor((diff / 1000) % 60),
      passed: diff <= 0
    };
  };

  const [time, setTime] = useState(calculate);

  useEffect(() => {
    setTime(calculate());
    const id = setInterval(() => setTime(calculate()), 1000);
    return () => clearInterval(id);
  }, [dateStr]);

  return time;
}
