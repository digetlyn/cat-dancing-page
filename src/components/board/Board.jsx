import { useState } from 'react';
import PostDetail from './PostDetail';
import PostForm from './PostForm';
import LoginModal from './LoginModal';

const PER_PAGE = 5;
const MAX_PAGES = 5;

function timeAgo(iso) {
  const diff = (Date.now() - new Date(iso)) / 1000;
  if (diff < 60) return '방금 전';
  if (diff < 3600) return `${Math.floor(diff / 60)}분 전`;
  if (diff < 86400) return `${Math.floor(diff / 3600)}시간 전`;
  return `${Math.floor(diff / 86400)}일 전`;
}

function formatDate(iso) {
  const d = new Date(iso);
  return `${d.getFullYear()}년 ${d.getMonth() + 1}월 ${d.getDate()}일`;
}

function getDayCount(joinedAt) {
  return Math.floor((Date.now() - new Date(joinedAt)) / 86400000) + 1;
}

function getDayMessage(days) {
  if (days === 1)   return '오늘 처음 함께하셨네요! 반가워요 👋';
  if (days === 100) return '🎉 함께한 지 100일째! 정말 오래 함께해주셨네요!';
  if (days === 365) return '🏆 함께한 지 1년! 정말 감사해요!';
  if (days % 100 === 0) return `🎊 함께한 지 ${days}일째! 축하해요!`;
  return `함께한 지 ${days}일째`;
}

export default function Board({ user, login, logout, posts, comments, addPost, updatePost, deletePost, addComment, updateComment, deleteComment, toggleReaction }) {
  const [view, setView] = useState('list');   // 'list' | 'detail' | 'write' | 'edit'
  const [selectedPost, setSelectedPost] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [showLogin, setShowLogin] = useState(false);

  const totalPages = Math.max(1, Math.ceil(posts.length / PER_PAGE));
  const startPage = Math.max(1, Math.min(currentPage - Math.floor(MAX_PAGES / 2), totalPages - MAX_PAGES + 1));
  const endPage = Math.min(totalPages, startPage + MAX_PAGES - 1);
  const pagePosts = posts.slice((currentPage - 1) * PER_PAGE, currentPage * PER_PAGE);

  const handleWrite = () => {
    if (!user) { setShowLogin(true); return; }
    setView('write');
  };

  const handleSubmitPost = (title, content, imageData) => {
    if (view === 'write') {
      const id = addPost(title, content, user, imageData);
      const newPost = { id, title, content, imageData, author: user, createdAt: new Date().toISOString(), deleted: false };
      setSelectedPost(newPost);
      setView('detail');
    } else if (view === 'edit') {
      updatePost(selectedPost.id, title, content);
      setSelectedPost(prev => ({ ...prev, title, content, imageData, updatedAt: new Date().toISOString() }));
      setView('detail');
    }
  };

  const handleSelectPost = (post) => { setSelectedPost(post); setView('detail'); };
  const handleBack = () => { setView('list'); setSelectedPost(null); };
  const handleEdit = (post) => { setSelectedPost(post); setView('edit'); };
  const handleDelete = (id) => { deletePost(id); setSelectedPost(prev => ({ ...prev, deleted: true })); };

  const livePost = view === 'detail' && selectedPost
    ? posts.find(p => p.id === selectedPost.id) || selectedPost
    : null;

  return (
    <div className="board-wrap">
      {/* Header */}
      <div className="board-header">
        <h1 className="board-title">📋 게시판</h1>
        <div className="board-header-right">
          {user ? (
            <div className="user-info">
              <div className="user-detail">
                <span className="user-name">{user.name}</span>
                {user.joinedAt && (
                  <span className="user-joined">가입: {formatDate(user.joinedAt)}</span>
                )}
                {user.joinedAt && (
                  <span className={`day-count ${getDayCount(user.joinedAt) === 100 ? 'milestone' : ''}`}>
                    {getDayMessage(getDayCount(user.joinedAt))}
                  </span>
                )}
              </div>
              <button className="btn-logout" onClick={logout}>로그아웃</button>
            </div>
          ) : (
            <button className="btn-login" onClick={() => setShowLogin(true)}>로그인</button>
          )}
        </div>
      </div>

      {/* List view */}
      {view === 'list' && (
        <>
          <div className="board-toolbar">
            <span className="post-count">전체 {posts.length}개</span>
            <button className="btn-write" onClick={handleWrite}>✏️ 글쓰기</button>
          </div>
          <div className="post-list">
            {posts.length === 0 ? (
              <div className="empty-board">아직 게시물이 없어요. 첫 글을 작성해보세요!</div>
            ) : (
              pagePosts.map((post, i) => (
                <div key={post.id} className="post-item" onClick={() => handleSelectPost(post)}>
                  <div className="post-item-num">{posts.length - ((currentPage - 1) * PER_PAGE) - i}</div>
                  <div className="post-item-body">
                    {post.deleted
                      ? <span className="post-item-deleted">삭제된 게시물입니다.</span>
                      : <span className="post-item-title">{post.title}</span>
                    }
                    <div className="post-item-meta">
                      <span>{post.author?.name || '익명'}</span>
                      <span>{timeAgo(post.createdAt)}</span>
                      <span>댓글 {comments.filter(c => c.postId === post.id).length}</span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="pagination">
              {currentPage > MAX_PAGES && (
                <button className="page-btn" onClick={() => setCurrentPage(startPage - 1)}>«</button>
              )}
              {Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i).map(p => (
                <button key={p} className={`page-btn ${p === currentPage ? 'active' : ''}`} onClick={() => setCurrentPage(p)}>{p}</button>
              ))}
              {endPage < totalPages && (
                <button className="page-btn" onClick={() => setCurrentPage(endPage + 1)}>»</button>
              )}
            </div>
          )}
        </>
      )}

      {/* Detail view */}
      {view === 'detail' && livePost && (
        <PostDetail post={livePost} comments={comments} user={user}
          onBack={handleBack} onEdit={handleEdit} onDelete={handleDelete}
          onAddComment={(postId, parentId, content) => {
            if (!user) { setShowLogin(true); return; }
            addComment(postId, parentId, content, user);
          }}
          onUpdateComment={updateComment}
          onDeleteComment={deleteComment}
          onReact={toggleReaction}
        />
      )}

      {/* Write / Edit form */}
      {(view === 'write' || view === 'edit') && (
        <PostForm
          initial={view === 'edit' ? selectedPost : null}
          onSubmit={handleSubmitPost}
          onCancel={() => setView(view === 'edit' ? 'detail' : 'list')}
        />
      )}

      {showLogin && <LoginModal onLogin={login} onClose={() => setShowLogin(false)} />}
    </div>
  );
}
