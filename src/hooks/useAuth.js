import { useState } from 'react';

export const PROVIDERS = {
  kakao:  { label: '카카오로 시작하기', emoji: '💛', bg: '#FEE500', color: '#000' },
  naver:  { label: '네이버로 시작하기', emoji: '💚', bg: '#03C75A', color: '#fff' },
  google: { label: '구글로 시작하기',   emoji: '💙', bg: '#fff',    color: '#333', border: '1px solid #ddd' },
};

const NAMES = { kakao: '카카오', naver: '네이버', google: '구글' };

export function useAuth() {
  const [user, setUser] = useState(() => {
    try { return JSON.parse(localStorage.getItem('cc_user')); } catch { return null; }
  });

  const login = (type) => {
    const idKey = `cc_uid_${type}`;
    const joinKey = `cc_joined_${type}`;
    let id = localStorage.getItem(idKey);
    let joinedAt = localStorage.getItem(joinKey);
    if (!id) {
      id = `${type}_${Math.random().toString(36).substr(2, 8)}`;
      joinedAt = new Date().toISOString();
      localStorage.setItem(idKey, id);
      localStorage.setItem(joinKey, joinedAt);
    }
    if (!joinedAt) {
      joinedAt = new Date().toISOString();
      localStorage.setItem(joinKey, joinedAt);
    }
    const u = { id, name: `${NAMES[type]} 사용자`, loginType: type, joinedAt };
    localStorage.setItem('cc_user', JSON.stringify(u));
    setUser(u);
  };

  const logout = () => { localStorage.removeItem('cc_user'); setUser(null); };

  return { user, login, logout };
}
