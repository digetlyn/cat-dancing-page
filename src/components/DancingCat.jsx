import { useEffect, useState } from 'react';
import catSvg from '../assets/images/cat.svg';
import '../styles/animations.css';

const NOTES = ['♪', '♫', '🎵', '🎶', '★', '✨'];

export default function DancingCat({ isPlaying, speed }) {
  const [particles, setParticles] = useState([]);

  useEffect(() => {
    if (!isPlaying) {
      setParticles([]);
      return;
    }

    const interval = setInterval(() => {
      const id = Date.now();
      const note = NOTES[Math.floor(Math.random() * NOTES.length)];
      const x = 30 + Math.random() * 140;
      setParticles(prev => [...prev.slice(-8), { id, note, x }]);
    }, 600 / speed);

    return () => clearInterval(interval);
  }, [isPlaying, speed]);

  useEffect(() => {
    if (particles.length === 0) return;
    const timer = setTimeout(() => {
      setParticles(prev => prev.slice(1));
    }, 1200);
    return () => clearTimeout(timer);
  }, [particles]);

  const duration = (0.8 / speed).toFixed(2);

  return (
    <div className="cat-stage">
      {/* Spotlight */}
      <div
        className="spotlight"
        style={{
          animation: isPlaying ? `spotlightPulse ${(1.5 / speed).toFixed(2)}s ease-in-out infinite` : 'none',
        }}
      />

      {/* Floating particles */}
      <div className="particles" aria-hidden="true">
        {particles.map(p => (
          <span
            key={p.id}
            className="particle"
            style={{
              left: `${p.x}px`,
              animation: `floatUp ${(1.2 / speed).toFixed(2)}s ease-out forwards`,
            }}
          >
            {p.note}
          </span>
        ))}
      </div>

      {/* Cat */}
      <div
        className={`cat-wrapper ${isPlaying ? 'dancing' : 'idle'}`}
        style={
          isPlaying
            ? { animation: `dance ${duration}s ease-in-out infinite` }
            : { animation: `idleBounce 2s ease-in-out infinite` }
        }
        onClick={() => {}}
        role="img"
        aria-label={isPlaying ? '춤추는 고양이' : '쉬고 있는 고양이'}
      >
        <img src={catSvg} alt="고양이" className="cat-image" />
      </div>

      {/* Shadow */}
      <div
        className="cat-shadow"
        style={{
          animation: isPlaying
            ? `dance ${duration}s ease-in-out infinite`
            : 'idleBounce 2s ease-in-out infinite',
          animationDelay: '0.05s',
        }}
      />
    </div>
  );
}
