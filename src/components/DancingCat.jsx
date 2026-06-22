import { useEffect, useState } from 'react';
import CatSVG from './CatSVG';
import '../styles/animations.css';

const NOTES = ['♪', '♫', '🎵', '🎶', '★', '✨'];

const SPEED_TO_EXPR = { 0.5: 'slow', 1: 'normal', 2: 'fast' };

const SPEED_FILTER = {
  slow:   'hue-rotate(160deg) saturate(0.8)',
  normal: 'none',
  fast:   'hue-rotate(330deg) saturate(2) brightness(1.15)',
};

const SPEECH = {
  slow:   '느리게....지금 페이스 좋아요.',
  normal: '아주 이지해요~!!!',
  fast:   '존나 빨라요!!!',
};

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
  const expr = SPEED_TO_EXPR[speed] ?? 'normal';

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

      {/* Speech bubble */}
      {isPlaying && (
        <div key={expr} className="speech-bubble">
          {SPEECH[expr]}
        </div>
      )}

      {/* Cat */}
      <div
        className={`cat-wrapper ${isPlaying ? 'dancing' : 'idle'}`}
        style={
          isPlaying
            ? { animation: `dance ${duration}s ease-in-out infinite` }
            : { animation: `idleBounce 2s ease-in-out infinite` }
        }
        role="img"
        aria-label={isPlaying ? '춤추는 고양이' : '쉬고 있는 고양이'}
      >
        <CatSVG
          expression={expr}
          style={{
            filter: SPEED_FILTER[expr],
            transition: 'filter 0.6s ease',
          }}
        />
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
