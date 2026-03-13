import { useState } from "react";
import Navbar from "./components/Navbar";
import PostList from "./components/PostList";
import UserList from "./components/UserList";
import AddPostForm from "./components/AddPostForm";

// App — component หลักที่รวมทุก component เข้าด้วยกัน
function App() {
  // เก็บ id ของโพสต์ที่ถูกใจ
  const [favorites, setFavorites] = useState([]);

  // สลับสถานะถูกใจ — ถ้ามีอยู่แล้วก็ลบออก ถ้ายังไม่มีก็เพิ่มเข้าไป
  function handleToggleFavorite(postId) {
    setFavorites((prev) =>
      prev.includes(postId)
        ? prev.filter((id) => id !== postId)
        : [...prev, postId],
    );
  }

  return (
    <div>
      <Navbar favoriteCount={favorites.length} />

      <div
        style={{
          maxWidth: "900px",
          margin: "2rem auto",
          padding: "0 1rem",
          display: "grid",
          gridTemplateColumns: "2fr 1fr",
          gap: "2rem",
        }}
      >
        <div>
          <AddPostForm onAddPost={() => { }} /> {/* จะเชื่อมใน wk14 */}
          <PostList
            favorites={favorites}
            onToggleFavorite={handleToggleFavorite}
          />
        </div>

        <div>
          <UserList />
        </div>
      </div>
    </div>
  );
}

export default App;
