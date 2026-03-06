import { useState } from "react";
import "./App.css";
import Navbar from "./components/Navbar";
import PostList from "./components/PostList";
import UserCard from "./components/UserCard";
import AddPostForm from "./components/AddPostForm";

// ข้อมูลโพสต์เริ่มต้น
const INITIAL_POSTS = [
  {
    id: 1,
    title: "React คืออะไร?",
    body: "React เป็น library สำหรับสร้าง UI ที่ทำให้ code อ่านง่ายและดูแลรักษาได้",
  },
  {
    id: 2,
    title: "ทำไมต้องใช้ Components?",
    body: "Components ช่วยให้เราแบ่ง UI ออกเป็นชิ้นเล็ก ๆ ที่ reuse ได้",
  },
  {
    id: 3,
    title: "JSX คืออะไร?",
    body: "JSX คือ syntax ที่ช่วยให้เราเขียน HTML ใน JavaScript ได้อย่างสะดวก",
  },
  {
    id: 4,
    title: "Props ทำงานอย่างไร?",
    body: "Props คือ argument ที่ส่งให้ component เหมือนกับการส่งพารามิเตอร์ให้ฟังก์ชัน",
  },
];

// ข้อมูลสมาชิก
const USERS = [
  { id: 1, name: "John Pork", email: "somchai@dev.com" },
  { id: 2, name: "Tim Cheese", email: "somying@dev.com" },
  { id: 3, name: "Brr Brr Patapim", email: "wichan@dev.com" },
];

function App() {
  // state: รายการโพสต์ทั้งหมด
  const [posts, setPosts] = useState(INITIAL_POSTS);

  // state: รายการโพสต์ที่ถูกใจ (อ่านค่าเริ่มต้นจาก localStorage)
  const [favorites, setFavorites] = useState(
    () => JSON.parse(localStorage.getItem("favorites") || "[]")
  );

  // สลับสถานะถูกใจ และบันทึกลง localStorage
  function handleToggleFavorite(postId) {
    setFavorites((prev) => {
      const next = prev.includes(postId)
        ? prev.filter((id) => id !== postId)
        : [...prev, postId];
      localStorage.setItem("favorites", JSON.stringify(next));
      return next;
    });
  }

  // เพิ่มโพสต์ใหม่ (ใช้ timestamp เป็น id ชั่วคราว)
  function handleAddPost({ title, body }) {
    const newPost = {
      id: Date.now(),
      title,
      body,
    };
    setPosts((prev) => [newPost, ...prev]);
  }

  // ลบโพสต์ตาม id และเอาออกจาก favorites ด้วย
  function handleDeletePost(postId) {
    setPosts((prev) => prev.filter((post) => post.id !== postId));
    setFavorites((prev) => {
      const next = prev.filter((id) => id !== postId);
      localStorage.setItem("favorites", JSON.stringify(next));
      return next;
    });
  }

  return (
    <div>
      {/* แถบนำทางด้านบน */}
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
        {/* คอลัมน์ซ้าย: ฟอร์มเพิ่มโพสต์ + รายการโพสต์ */}
        <div>
          <AddPostForm onAddPost={handleAddPost} />
          <PostList
            posts={posts}
            favorites={favorites}
            onToggleFavorite={handleToggleFavorite}
            onDeletePost={handleDeletePost}
          />
        </div>

        {/* คอลัมน์ขวา: รายชื่อสมาชิก */}
        <div>
          <h2
            style={{
              color: "#2d3748",
              borderBottom: "2px solid #1e40af",
              paddingBottom: "0.5rem",
            }}
          >
            สมาชิก
          </h2>
          {USERS.map((user) => (
            <UserCard key={user.id} name={user.name} email={user.email} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
