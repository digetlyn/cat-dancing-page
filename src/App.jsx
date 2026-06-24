import { useState } from 'react';
import './styles/global.css';
import './styles/components.css';
import './styles/board.css';
import Layout from './components/Layout';
import DancingCat from './components/DancingCat';
import AnimationControls from './components/AnimationControls';
import Board from './components/board/Board';
import { useAnimation } from './hooks/useAnimation';
import { useAuth } from './hooks/useAuth';
import { usePosts } from './hooks/usePosts';

export default function App() {
  const [activePage, setActivePage] = useState('cat');
  const { isPlaying, speed, toggle, changeSpeed } = useAnimation();
  const auth = useAuth();
  const board = usePosts();

  return (
    <div>
      {/* Tab navigation */}
      <nav className="app-nav" style={{ background: activePage === 'cat' ? 'rgba(255,255,255,0.12)' : 'rgba(118,75,162,0.9)' }}>
        <button className={`nav-tab ${activePage === 'cat' ? 'active' : ''}`} onClick={() => setActivePage('cat')}>
          🐱 댄스
        </button>
        <button className={`nav-tab ${activePage === 'board' ? 'active' : ''}`} onClick={() => setActivePage('board')}>
          📋 게시판
        </button>
      </nav>

      <div className="page-content">
        {/* Cat page */}
        {activePage === 'cat' && (
          <div className="app-bg">
            <Layout>
              <DancingCat isPlaying={isPlaying} speed={speed} />
              <AnimationControls isPlaying={isPlaying} speed={speed} onToggle={toggle} onSpeedChange={changeSpeed} />
            </Layout>
          </div>
        )}

        {/* Board page */}
        {activePage === 'board' && (
          <div className="board-page-bg">
            <Board
              user={auth.user}
              login={auth.login}
              logout={auth.logout}
              posts={board.posts}
              comments={board.comments}
              addPost={board.addPost}
              updatePost={board.updatePost}
              deletePost={board.deletePost}
              addComment={board.addComment}
              updateComment={board.updateComment}
              deleteComment={board.deleteComment}
              toggleReaction={board.toggleReaction}
            />
          </div>
        )}
      </div>
    </div>
  );
}
