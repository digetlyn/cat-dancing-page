import { useState } from 'react';

const REACTIONS = [
  { type: 'like',    emoji: '👍', label: '좋아요' },
  { type: 'dislike', emoji: '👎', label: '싫어요' },
  { type: 'sad',     emoji: '😢', label: '슬퍼요' },
];

function timeAgo(iso) {
  const diff = (Date.now() - new Date(iso)) / 1000;
  if (diff < 60) return '방금 전';
  if (diff < 3600) return `${Math.floor(diff / 60)}분 전`;
  if (diff < 86400) return `${Math.floor(diff / 3600)}시간 전`;
  return `${Math.floor(diff / 86400)}일 전`;
}

export default function Comment({ comment, allComments, user, depth = 0, onAdd, onUpdate, onDelete, onReact }) {
  const [replying, setReplying] = useState(false);
  const [editing, setEditing] = useState(false);
  const [text, setText] = useState('');
  const [editText, setEditText] = useState(comment.content);

  const replies = allComments.filter(c => c.parentId === comment.id);
  const isAuthor = user && user.id === comment.author?.id;
  const maxIndent = depth >= 4;

  const handleReply = () => {
    if (!text.trim()) return;
    onAdd(comment.postId, comment.id, text.trim());
    setText(''); setReplying(false);
  };

  const handleEdit = () => {
    if (!editText.trim()) return;
    onUpdate(comment.id, editText.trim());
    setEditing(false);
  };

  return (
    <div className={`comment ${depth > 0 ? 'comment-reply' : ''}`} style={{ marginLeft: depth > 0 ? Math.min(depth, 4) * 20 + 'px' : 0 }}>
      {comment.deleted ? (
        <p className="comment-deleted">삭제된 댓글입니다.</p>
      ) : (
        <>
          <div className="comment-header">
            <span className="comment-author">{comment.author?.name || '익명'}</span>
            <span className="comment-time">{timeAgo(comment.createdAt)}</span>
            {comment.updatedAt && <span className="comment-edited">(수정됨)</span>}
          </div>

          {editing ? (
            <div className="comment-edit">
              <textarea className="comment-textarea" value={editText} onChange={e => setEditText(e.target.value)} rows={3} />
              <div className="comment-edit-actions">
                <button className="btn-xs btn-cancel" onClick={() => setEditing(false)}>취소</button>
                <button className="btn-xs btn-submit" onClick={handleEdit}>저장</button>
              </div>
            </div>
          ) : (
            <p className="comment-content">{comment.content}</p>
          )}

          <div className="comment-footer">
            <div className="reactions">
              {REACTIONS.map(r => {
                const count = comment.reactions?.[r.type]?.length || 0;
                const active = user && comment.reactions?.[r.type]?.includes(user.id);
                return (
                  <button key={r.type} className={`reaction-btn ${active ? 'active' : ''}`} onClick={() => user && onReact(comment.id, r.type, user.id)} title={r.label}>
                    {r.emoji} {count > 0 && <span>{count}</span>}
                  </button>
                );
              })}
            </div>
            <div className="comment-actions">
              {user && !maxIndent && (
                <button className="btn-text" onClick={() => setReplying(!replying)}>답글</button>
              )}
              {isAuthor && !editing && (
                <>
                  <button className="btn-text" onClick={() => { setEditing(true); setEditText(comment.content); }}>수정</button>
                  <button className="btn-text btn-danger" onClick={() => onDelete(comment.id)}>삭제</button>
                </>
              )}
            </div>
          </div>

          {replying && (
            <div className="reply-input">
              <textarea className="comment-textarea" placeholder="답글을 입력하세요" value={text} onChange={e => setText(e.target.value)} rows={2} />
              <div className="comment-edit-actions">
                <button className="btn-xs btn-cancel" onClick={() => setReplying(false)}>취소</button>
                <button className="btn-xs btn-submit" onClick={handleReply}>등록</button>
              </div>
            </div>
          )}
        </>
      )}

      {replies.map(r => (
        <Comment key={r.id} comment={r} allComments={allComments} user={user} depth={depth + 1}
          onAdd={onAdd} onUpdate={onUpdate} onDelete={onDelete} onReact={onReact} />
      ))}
    </div>
  );
}
