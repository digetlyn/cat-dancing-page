import { useState } from 'react';

const POSTS_KEY = 'cc_posts';
const COMMENTS_KEY = 'cc_comments';

const load = (key) => { try { return JSON.parse(localStorage.getItem(key)) || []; } catch { return []; } };
const save = (key, data) => localStorage.setItem(key, JSON.stringify(data));
const genId = () => Date.now().toString(36) + Math.random().toString(36).substr(2, 5);

export function usePosts() {
  const [posts, setPosts] = useState(() => load(POSTS_KEY));
  const [comments, setComments] = useState(() => load(COMMENTS_KEY));

  const addPost = (title, content, author) => {
    const post = { id: genId(), title, content, author, createdAt: new Date().toISOString(), deleted: false };
    const next = [post, ...posts];
    setPosts(next); save(POSTS_KEY, next);
    return post.id;
  };

  const updatePost = (id, title, content) => {
    const next = posts.map(p => p.id === id ? { ...p, title, content, updatedAt: new Date().toISOString() } : p);
    setPosts(next); save(POSTS_KEY, next);
  };

  const deletePost = (id) => {
    const next = posts.map(p => p.id === id ? { ...p, deleted: true, deletedAt: new Date().toISOString() } : p);
    setPosts(next); save(POSTS_KEY, next);
  };

  const addComment = (postId, parentId, content, author) => {
    const c = { id: genId(), postId, parentId: parentId || null, content, author, createdAt: new Date().toISOString(), deleted: false, reactions: { like: [], dislike: [], sad: [] } };
    const next = [...comments, c];
    setComments(next); save(COMMENTS_KEY, next);
  };

  const updateComment = (id, content) => {
    const next = comments.map(c => c.id === id ? { ...c, content, updatedAt: new Date().toISOString() } : c);
    setComments(next); save(COMMENTS_KEY, next);
  };

  const deleteComment = (id) => {
    const next = comments.map(c => c.id === id ? { ...c, deleted: true } : c);
    setComments(next); save(COMMENTS_KEY, next);
  };

  const toggleReaction = (commentId, type, userId) => {
    const next = comments.map(c => {
      if (c.id !== commentId) return c;
      const r = { like: [...c.reactions.like], dislike: [...c.reactions.dislike], sad: [...c.reactions.sad] };
      const wasIn = r[type].includes(userId);
      Object.keys(r).forEach(k => { r[k] = r[k].filter(id => id !== userId); });
      if (!wasIn) r[type] = [...r[type], userId];
      return { ...c, reactions: r };
    });
    setComments(next); save(COMMENTS_KEY, next);
  };

  return { posts, addPost, updatePost, deletePost, comments, addComment, updateComment, deleteComment, toggleReaction };
}
