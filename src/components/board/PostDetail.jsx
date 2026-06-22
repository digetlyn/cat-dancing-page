import { useState } from 'react';
import Comment from './Comment';

function timeAgo(iso) {
  const diff = (Date.now() - new Date(iso)) / 1000;
  if (diff < 60) return '방금 전';
  if (diff < 3600) return `${Math.floor(diff / 60)}분 전`;
  if (diff < 86400) return `${Math.floor(diff / 3600)}시간 전`;
  return `${Math.floor(diff / 86400)}일 전`;
}

export default function PostDetail({ post, comments, user, onBack, onEdit, onDelete, onAddComment, onUpdateComment, onDeleteComment, onReact }) {
  const [commentText, setCommentText] = useState('');
  const isAuthor = user && user.id === post.author?.id;
  const postComments = comments.filter(c => c.postId === post.id && !c.parentId);

  const handleComment = () => {
    if (!commentText.trim()) return;
    onAddComment(post.id, null, commentText.trim());
    setCommentText('');
  };

  return (
    <div className="post-detail">
      <button className="btn-back" onClick={onBack}>← 목록으로</button>

      {post.deleted ? (
        <div className="post-deleted-banner">🗑️ 삭제된 게시물입니다.</div>
      ) : (
        <div className="post-card">
          <h1 className="post-title">{post.title}</h1>
          <div className="post-meta">
            <span>{post.author?.name || '익명'}</span>
            <span>{timeAgo(post.createdAt)}</span>
            {post.updatedAt && <span>(수정됨)</span>}
          </div>
          <div className="post-content">{post.content}</div>
          {isAuthor && (
            <div className="post-author-actions">
              <button className="btn-sm btn-edit" onClick={() => onEdit(post)}>수정</button>
              <button className="btn-sm btn-danger" onClick={() => { if (window.confirm('정말 삭제할까요?')) onDelete(post.id); }}>삭제</button>
            </div>
          )}
        </div>
      )}

      <div className="comments-section">
        <h3 className="comments-title">댓글 {comments.filter(c => c.postId === post.id).length}개</h3>

        {user ? (
          <div className="comment-write">
            <textarea className="comment-textarea" placeholder="댓글을 입력하세요" value={commentText} onChange={e => setCommentText(e.target.value)} rows={3} />
            <div style={{ textAlign: 'right', marginTop: 8 }}>
              <button className="btn-submit btn-sm" onClick={handleComment} disabled={!commentText.trim()}>댓글 등록</button>
            </div>
          </div>
        ) : (
          <p className="login-notice">💬 댓글을 작성하려면 로그인이 필요해요</p>
        )}

        <div className="comments-list">
          {postComments.length === 0
            ? <p className="no-comments">아직 댓글이 없어요. 첫 댓글을 남겨보세요!</p>
            : postComments.map(c => (
              <Comment key={c.id} comment={c} allComments={comments.filter(cc => cc.postId === post.id)}
                user={user} depth={0} onAdd={onAddComment} onUpdate={onUpdateComment} onDelete={onDeleteComment} onReact={onReact} />
            ))
          }
        </div>
      </div>
    </div>
  );
}
