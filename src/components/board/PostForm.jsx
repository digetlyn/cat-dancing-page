import { useState } from 'react';

export default function PostForm({ initial, onSubmit, onCancel }) {
  const [title, setTitle] = useState(initial?.title || '');
  const [content, setContent] = useState(initial?.content || '');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) return;
    onSubmit(title.trim(), content.trim());
  };

  return (
    <div className="post-form">
      <h2 className="form-title">{initial ? '글 수정' : '글 쓰기'}</h2>
      <form onSubmit={handleSubmit}>
        <input
          className="form-input"
          placeholder="제목을 입력하세요"
          value={title}
          onChange={e => setTitle(e.target.value)}
          maxLength={100}
        />
        <textarea
          className="form-textarea"
          placeholder="내용을 입력하세요"
          value={content}
          onChange={e => setContent(e.target.value)}
          rows={10}
        />
        <div className="form-actions">
          <button type="button" className="btn-cancel" onClick={onCancel}>취소</button>
          <button type="submit" className="btn-submit" disabled={!title.trim() || !content.trim()}>
            {initial ? '수정 완료' : '등록하기'}
          </button>
        </div>
      </form>
    </div>
  );
}
