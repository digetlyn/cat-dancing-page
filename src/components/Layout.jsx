export default function Layout({ children }) {
  return (
    <main className="layout">
      <h1 className="title">🐱 고양이 댄스 파티</h1>
      <p className="subtitle">버튼을 눌러 고양이를 춤추게 해보세요!</p>
      {children}
    </main>
  );
}
