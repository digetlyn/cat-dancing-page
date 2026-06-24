import { useState, useRef } from 'react';

export default function PostForm({ initial, onSubmit, onCancel }) {
  const [title, setTitle] = useState(initial?.title || '');
  const [content, setContent] = useState(initial?.content || '');
  const [imageData, setImageData] = useState(initial?.imageData || null);
  const [imageError, setImageError] = useState('');
  const fileRef = useRef();

  const handleImage = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    if (file.size > 2 * 1024 * 1024) {
      setImageError('이미지는 2MB 이하만 가능해요');
      return;
    }
    setImageError('');
    const reader = new FileReader();
    reader.onload = (ev) => setImageData(ev.target.result);
    reader.readAsDataURL(file);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) return;
    onSubmit(title.trim(), content.trim(), imageData);
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
          rows={8}
        />

        {/* Image upload */}
        <div className="image-upload-area">
          <button type="button" className="btn-image" onClick={() => fileRef.current.click()}>
            🖼️ 이미지 첨부 {imageData ? '(변경)' : ''}
          </button>
          <input ref={fileRef} type="file" accept="image/*" style={{ display: 'none' }} onChange={handleImage} />
          {imageError && <span className="image-error">{imageError}</span>}
          {imageData && (
            <div className="image-preview-wrap">
              <img src={imageData} alt="미리보기" className="image-preview" />
              <button type="button" className="btn-remove-image" onClick={() => setImageData(null)}>✕ 제거</button>
            </div>
          )}
        </div>

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
