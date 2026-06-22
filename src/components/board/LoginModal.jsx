import { PROVIDERS } from '../../hooks/useAuth';

export default function LoginModal({ onLogin, onClose }) {
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-box" onClick={e => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>✕</button>
        <h2 className="modal-title">로그인</h2>
        <p className="modal-sub">소셜 계정으로 간편하게 시작하세요</p>
        <div className="social-btns">
          {Object.entries(PROVIDERS).map(([type, info]) => (
            <button
              key={type}
              className="social-btn"
              style={{ background: info.bg, color: info.color, border: info.border || 'none' }}
              onClick={() => { onLogin(type); onClose(); }}
            >
              {info.emoji} {info.label}
            </button>
          ))}
        </div>
        <p className="modal-notice">* 테스트용 계정으로 연결됩니다</p>
      </div>
    </div>
  );
}
