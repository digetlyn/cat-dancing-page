import './styles/global.css';
import './styles/components.css';
import Layout from './components/Layout';
import DancingCat from './components/DancingCat';
import AnimationControls from './components/AnimationControls';
import { useAnimation } from './hooks/useAnimation';

const BG = {
  0.5: 'linear-gradient(135deg, #74b9ff 0%, #0984e3 100%)',
  1:   'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
  2:   'linear-gradient(135deg, #ff416c 0%, #ff4b2b 100%)',
};

export default function App() {
  const { isPlaying, speed, toggle, changeSpeed } = useAnimation();

  return (
    <div className="app-bg" style={{ background: BG[speed] }}>
      <Layout>
        <DancingCat isPlaying={isPlaying} speed={speed} />
        <AnimationControls
          isPlaying={isPlaying}
          speed={speed}
          onToggle={toggle}
          onSpeedChange={changeSpeed}
        />
      </Layout>
    </div>
  );
}
