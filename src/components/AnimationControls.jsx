import '../styles/animations.css';

const SPEEDS = [
  { label: '느리게', value: 0.5 },
  { label: '보통', value: 1 },
  { label: '빠르게', value: 2 },
];

export default function AnimationControls({ isPlaying, speed, onToggle, onSpeedChange }) {
  return (
    <div className="controls">
      <button
        className={`play-btn ${isPlaying ? 'playing' : ''}`}
        onClick={onToggle}
        aria-pressed={isPlaying}
        style={isPlaying ? { animation: 'buttonGlow 1.5s ease-in-out infinite' } : {}}
      >
        {isPlaying ? '⏸ 멈추기' : '▶ 춤추기'}
      </button>

      <div className="speed-controls" role="group" aria-label="재생 속도">
        {SPEEDS.map(s => (
          <button
            key={s.value}
            className={`speed-btn ${speed === s.value ? 'active' : ''}`}
            onClick={() => onSpeedChange(s.value)}
            aria-pressed={speed === s.value}
          >
            {s.label}
          </button>
        ))}
      </div>
    </div>
  );
}
