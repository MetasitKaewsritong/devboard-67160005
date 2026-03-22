# Task #4: React Router, useContext & Deploy

## เป้าหมาย

ต่อยอดจาก task3 โดยเพิ่ม **routing** ให้มีหลายหน้า, ใช้ **useContext** แชร์ state ข้ามหน้า และ **deploy** ขึ้น Vercel

เมื่อจบ task นี้จะได้:

- App มีหลายหน้า navigateได้โดยไม่ reload
- Favorites state เข้าถึงได้จากทุกหน้าด้วย useContext
- URL บน Vercel ที่แชร์ให้คนอื่นดูได้

> **ต้องทำ task3 ให้สมบูรณ์ก่อน** — task นี้ต่อจากของเดิม

---

## ติดตั้ง React Router

```bash
npm install react-router-dom
```

ตรวจสอบ `package.json` ว่ามี `"react-router-dom": "^6.x.x"` (version 6 เท่านั้น)

---

## หน้าที่จะสร้าง

| หน้า           | URL          | เนื้อหา                       |
| -------------- | ------------ | ----------------------------- |
| HomePage       | `/`          | PostList + AddPostForm        |
| PostDetailPage | `/posts/:id` | รายละเอียดโพสต์ + ความคิดเห็น |
| ProfilePage    | `/profile`   | UserList                      |
| FavoritesPage  | `/favorites` | โพสต์ที่ถูกใจ                 |

---

## โครงสร้างไฟล์ที่จะเปลี่ยนแปลง

```
src/
├── components/
│   └── Navbar.jsx          ← เพิ่ม Link navigation
├── context/
│   └── FavoritesContext.jsx ← ไฟล์ใหม่
├── pages/
│   ├── HomePage.jsx         ← ไฟล์ใหม่
│   ├── PostDetailPage.jsx   ← ไฟล์ใหม่
│   ├── ProfilePage.jsx      ← ไฟล์ใหม่
│   └── FavoritesPage.jsx    ← ไฟล์ใหม่
└── App.jsx                  ← เพิ่ม Router + Routes
```

---

## Activity 1 — FavoritesContext

สร้างไฟล์ใหม่ `src/context/FavoritesContext.jsx`:

```jsx
import { createContext, useContext, useState } from "react";

// 1. สร้าง context object
const FavoritesContext = createContext();

// 2. Provider component — ครอบ App ทั้งหมด
export function FavoritesProvider({ children }) {
  const [favorites, setFavorites] = useState([]);

  function toggleFavorite(postId) {
    setFavorites((prev) =>
      prev.includes(postId)
        ? prev.filter((id) => id !== postId)
        : [...prev, postId],
    );
  }

  return (
    <FavoritesContext.Provider value={{ favorites, toggleFavorite }}>
      {children}
    </FavoritesContext.Provider>
  );
}

// 3. Custom hook สำหรับใช้งาน context ง่าย ๆ
export function useFavorites() {
  return useContext(FavoritesContext);
}
```

> **ทำไมต้องมี Context?** Navbar (แสดงจำนวน) และ FavoritesPage (แสดงรายการ) ต้องการข้อมูล favorites เหมือนกัน แต่อยู่คนละหน้า — Context แก้ปัญหา prop drilling นี้

---

## Activity 2 — Navbar ใหม่ (พร้อม Link)

แก้ไข `src/components/Navbar.jsx`:

```jsx
import { Link } from "react-router-dom";
import { useFavorites } from "../context/FavoritesContext";

function Navbar() {
  const { favorites } = useFavorites();

  return (
    <nav
      style={{
        background: "#1e40af",
        color: "white",
        padding: "1rem 2rem",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <Link to="/" style={{ color: "white", textDecoration: "none" }}>
        <h1 style={{ margin: 0, fontSize: "1.5rem" }}>DevBoard</h1>
      </Link>

      <div style={{ display: "flex", gap: "1.5rem", alignItems: "center" }}>
        <Link to="/" style={{ color: "white", textDecoration: "none" }}>
          หน้าหลัก
        </Link>
        <Link to="/profile" style={{ color: "white", textDecoration: "none" }}>
          สมาชิก
        </Link>
        <Link
          to="/favorites"
          style={{
            color: "white",
            textDecoration: "none",
            background: favorites.length > 0 ? "#e53e3e" : "transparent",
            padding: "0.25rem 0.75rem",
            borderRadius: "20px",
            fontSize: "0.9rem",
          }}
        >
          ❤️ ถูกใจ {favorites.length > 0 && `(${favorites.length})`}
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;
```

---

## Activity 3 — สร้าง Pages

### `src/pages/HomePage.jsx`

```jsx
import PostList from "../components/PostList";
import AddPostForm from "../components/AddPostForm";

function HomePage() {
  return (
    <div style={{ maxWidth: "700px", margin: "2rem auto", padding: "0 1rem" }}>
      <AddPostForm onAddPost={() => {}} />
      <PostList />
    </div>
  );
}

export default HomePage;
```

---

### `src/pages/ProfilePage.jsx`

```jsx
import UserList from "../components/UserList";

function ProfilePage() {
  return (
    <div style={{ maxWidth: "500px", margin: "2rem auto", padding: "0 1rem" }}>
      <UserList />
    </div>
  );
}

export default ProfilePage;
```

---

### `src/pages/FavoritesPage.jsx`

```jsx
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useFavorites } from "../context/FavoritesContext";

function FavoritesPage() {
  const { favorites, toggleFavorite } = useFavorites();
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    if (favorites.length === 0) return;

    // ดึงเฉพาะโพสต์ที่ถูกใจ
    async function fetchFavoritePosts() {
      const results = await Promise.all(
        favorites.map((id) =>
          fetch(`https://jsonplaceholder.typicode.com/posts/${id}`).then((r) =>
            r.json(),
          ),
        ),
      );
      setPosts(results);
    }
    fetchFavoritePosts();
  }, [favorites]);

  if (favorites.length === 0) {
    return (
      <div
        style={{
          maxWidth: "700px",
          margin: "2rem auto",
          padding: "0 1rem",
          textAlign: "center",
        }}
      >
        <p style={{ color: "#718096", fontSize: "1.1rem" }}>
          ยังไม่มีโพสต์ที่ถูกใจ
        </p>
        <Link to="/" style={{ color: "#1e40af" }}>
          ← กลับหน้าหลัก
        </Link>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: "700px", margin: "2rem auto", padding: "0 1rem" }}>
      <h2
        style={{
          color: "#2d3748",
          borderBottom: "2px solid #e53e3e",
          paddingBottom: "0.5rem",
        }}
      >
        ❤️ โพสต์ที่ถูกใจ ({favorites.length})
      </h2>
      {posts.map((post) => (
        <div
          key={post.id}
          style={{
            border: "1px solid #e2e8f0",
            borderRadius: "8px",
            padding: "1rem",
            marginBottom: "1rem",
            background: "white",
          }}
        >
          <h3 style={{ margin: "0 0 0.5rem", color: "#1e40af" }}>
            <Link
              to={`/posts/${post.id}`}
              style={{ color: "inherit", textDecoration: "none" }}
            >
              {post.title}
            </Link>
          </h3>
          <p style={{ margin: "0 0 0.75rem", color: "#4a5568" }}>{post.body}</p>
          <button
            onClick={() => toggleFavorite(post.id)}
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              color: "#e53e3e",
              fontSize: "0.9rem",
            }}
          >
            ❤️ ยกเลิกถูกใจ
          </button>
        </div>
      ))}
    </div>
  );
}

export default FavoritesPage;
```

---

### `src/pages/PostDetailPage.jsx`

```jsx
import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { useFavorites } from "../context/FavoritesContext";
import CommentList from "../components/CommentList";
import LoadingSpinner from "../components/LoadingSpinner";

function PostDetailPage() {
  const { id } = useParams(); // ดึง id จาก URL เช่น /posts/3 → id = "3"
  const { favorites, toggleFavorite } = useFavorites();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchPost() {
      const res = await fetch(
        `https://jsonplaceholder.typicode.com/posts/${id}`,
      );
      const data = await res.json();
      setPost(data);
      setLoading(false);
    }
    fetchPost();
  }, [id]);

  if (loading) return <LoadingSpinner />;

  const isFavorite = favorites.includes(post.id);

  return (
    <div style={{ maxWidth: "700px", margin: "2rem auto", padding: "0 1rem" }}>
      <Link to="/" style={{ color: "#1e40af", textDecoration: "none" }}>
        ← กลับหน้าหลัก
      </Link>

      <div
        style={{
          border: "1px solid #e2e8f0",
          borderRadius: "8px",
          padding: "1.5rem",
          margin: "1rem 0",
          background: "white",
        }}
      >
        <h2 style={{ margin: "0 0 1rem", color: "#1e40af" }}>{post.title}</h2>
        <p style={{ color: "#4a5568", lineHeight: 1.8 }}>{post.body}</p>

        <button
          onClick={() => toggleFavorite(post.id)}
          style={{
            background: "none",
            border: "none",
            cursor: "pointer",
            fontSize: "1rem",
            color: isFavorite ? "#e53e3e" : "#a0aec0",
          }}
        >
          {isFavorite ? "❤️ ถูกใจแล้ว" : "🤍 ถูกใจ"}
        </button>
      </div>

      <CommentList postId={post.id} />
    </div>
  );
}

export default PostDetailPage;
```

---

## Activity 4 — อัปเดต PostList ให้มี Link ไปหน้า Detail

แก้ไข `src/components/PostCard.jsx` — เพิ่ม Link บน title:

```jsx
import { useState } from "react";
import { Link } from "react-router-dom";
import { useFavorites } from "../context/FavoritesContext";
import CommentList from "./CommentList";

function PostCard({ post }) {
  const { favorites, toggleFavorite } = useFavorites();
  const isFavorite = favorites.includes(post.id);
  const [showComments, setShowComments] = useState(false);

  return (
    <div
      style={{
        border: "1px solid #e2e8f0",
        borderRadius: "8px",
        padding: "1rem",
        marginBottom: "1rem",
        background: "white",
      }}
    >
      <h3 style={{ margin: "0 0 0.5rem" }}>
        <Link
          to={`/posts/${post.id}`}
          style={{ color: "#1e40af", textDecoration: "none" }}
        >
          {post.title}
        </Link>
      </h3>
      <p style={{ margin: "0 0 0.75rem", color: "#4a5568", lineHeight: 1.6 }}>
        {post.body}
      </p>

      <div style={{ display: "flex", gap: "0.5rem" }}>
        <button
          onClick={() => toggleFavorite(post.id)}
          style={{
            background: "none",
            border: "none",
            cursor: "pointer",
            fontSize: "1rem",
            color: isFavorite ? "#e53e3e" : "#a0aec0",
          }}
        >
          {isFavorite ? "❤️" : "🤍"}
        </button>

        <button
          onClick={() => setShowComments((prev) => !prev)}
          style={{
            background: "none",
            border: "1px solid #e2e8f0",
            cursor: "pointer",
            fontSize: "0.9rem",
            padding: "0.25rem 0.75rem",
            borderRadius: "4px",
            color: "#4a5568",
          }}
        >
          {showComments ? "▲ ซ่อน" : "▼ ความคิดเห็น"}
        </button>
      </div>

      {showComments && <CommentList postId={post.id} />}
    </div>
  );
}

export default PostCard;
```

---

## Activity 5 — เชื่อมทุกอย่างใน App.jsx

แก้ไข `src/App.jsx`:

```jsx
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { FavoritesProvider } from "./context/FavoritesContext";
import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import PostDetailPage from "./pages/PostDetailPage";
import ProfilePage from "./pages/ProfilePage";
import FavoritesPage from "./pages/FavoritesPage";

function App() {
  return (
    <FavoritesProvider>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/posts/:id" element={<PostDetailPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/favorites" element={<FavoritesPage />} />
        </Routes>
      </BrowserRouter>
    </FavoritesProvider>
  );
}

export default App;
```

**Checkpoint ก่อน Deploy:**

- คลิก Link ใน Navbar → URL เปลี่ยน ไม่ reload หน้า
- คลิก title โพสต์ → ไปหน้า detail
- กดถูกใจในหน้า detail → จำนวนใน Navbar เพิ่ม
- ไปหน้า Favorites → เห็นโพสต์ที่ถูกใจ

---

## Activity 6 — แก้ไข Vercel สำหรับ SPA Routing

> Vercel เชื่อมกับ GitHub ไว้แล้วตั้งแต่ task1 — ไม่ต้องสมัครใหม่

ตอนนี้ app มี routing หลายหน้า ถ้า user เปิด URL ตรง เช่น `https://devboard-xxx.vercel.app/profile` โดยไม่ผ่านหน้าแรก Vercel จะไม่รู้จักหน้านั้นและแสดง 404

**แก้ไขโดยเพิ่มไฟล์** `public/vercel.json`:

```json
{
  "rewrites": [{ "source": "/(.*)", "destination": "/index.html" }]
}
```

> ไฟล์นี้บอก Vercel ให้ส่งทุก URL ไปที่ `index.html` แล้วให้ React Router จัดการ routing เอง

### Push เพื่อ Deploy

```bash
git add .
git commit -m "feat: task4 - router, context, vercel spa routing"
git push
```

Vercel จะ deploy อัตโนมัติภายใน ~1 นาที

---

## Checkpoint สุดท้าย

- เปิด URL บน Vercel → app ทำงานได้
- เปิดลิงก์ด้วยมือถือ → app ยังทำงานได้
- กด refresh ขณะอยู่หน้า `/profile` → ไม่เจอหน้า 404
- แชร์ URL ให้เพื่อนเปิด → เห็นเหมือนกัน

---

## สรุปสิ่งที่ได้เรียนรู้

| แนวคิด                       | ตัวอย่างในงาน                                         |
| ---------------------------- | ----------------------------------------------------- |
| `BrowserRouter` + `Routes`   | ครอบ App ใน main.jsx                                  |
| `Route` + `element`          | `<Route path="/profile" element={<ProfilePage />} />` |
| `Link`                       | นำทางโดยไม่ reload หน้า                               |
| `useParams`                  | `const { id } = useParams()` ใน PostDetailPage        |
| `createContext` + `Provider` | FavoritesContext ครอบทุกหน้า                          |
| `useContext`                 | `const { favorites } = useFavorites()`                |
| Deploy                       | push GitHub → connect Vercel → ได้ URL                |

---

## วิธีส่งงาน

1. Commit ทุก activity และ push ขึ้น GitHub
2. ตรวจสอบว่า Vercel URL ทำงานได้
3. ส่ง **GitHub URL** และ **Vercel URL** ให้อาจารย์

---

## 🚀 Challenge

ทำเสร็จแล้ว ลองท้าทายตัวเองด้วยโจทย์เพิ่มเติมด้านล่างนี้
ไม่มีเฉลย - **ในวันนำเสนอโครงงาน ถ้ามีทำเพิ่ม และสามารถอธิบายในสิ่งที่ทำได้ จะมีคะแนนเพิ่ม 2.5 คะแนน(ดิบ ๆ ไม่หาร)**

---

### ⭐ ระดับ 1 — หน้า 404

เพิ่มหน้า `NotFoundPage` สำหรับ URL ที่ไม่มีอยู่ใน app

ตัวอย่างที่ควรเห็น (เมื่อเปิด `/xyz`):

```
404
ไม่พบหน้าที่คุณต้องการ

[← กลับหน้าหลัก]
```

> 💡 Hint: ใน React Router v6 ใช้ `<Route path="*" element={<NotFoundPage />} />` เป็น route สุดท้ายใน `<Routes>`

---

### ⭐⭐ ระดับ 2 — ค้นหาผ่าน URL

เพิ่มหน้า `/search` ที่รับ query parameter จาก URL เช่น `/search?q=react` แล้วแสดงผลการค้นหา

พฤติกรรมที่ต้องการ:

- พิมพ์ URL `/search?q=react` แล้ว enter → หน้าแสดงโพสต์ที่มีคำว่า "react"
- แชร์ URL ให้คนอื่น → เขาเห็นผลการค้นหาเดียวกัน

> 💡 Hint: ใช้ `useSearchParams` จาก react-router-dom
>
> ```js
> const [searchParams] = useSearchParams();
> const q = searchParams.get("q"); // ได้ "react"
> ```

---

### ⭐⭐⭐ ระดับ 3 — Favorites คงอยู่ใน Context + localStorage

ตอนนี้ถ้า refresh หน้าเว็บ favorites ใน Context จะหายไป — ให้แก้ `FavoritesContext.jsx` ให้ sync กับ `localStorage` อัตโนมัติ

พฤติกรรมที่ต้องการ:

- กดถูกใจ → บันทึกลง localStorage
- refresh หน้า → context โหลด favorites จาก localStorage มาทันที
- ทุกหน้าที่ใช้ `useFavorites()` เห็น favorites ครบเหมือนเดิม

> 💡 Hint: แก้ใน `FavoritesContext.jsx`
>
> - `useState(() => JSON.parse(localStorage.getItem('favorites') || '[]'))` อ่านค่าเริ่มต้น
> - `useEffect(() => { localStorage.setItem(...) }, [favorites])` sync ทุกครั้งที่เปลี่ยน

---

## สิ่งที่ได้จากโครงงาน DevBoard ทั้ง 4 สัปดาห์

```
wk11 → สร้าง UI ด้วย Components + Props
wk12 → เพิ่ม Interactivity ด้วย State + Events
wk13 → เชื่อมต่อ Internet ด้วย useEffect + API
wk14 → สร้าง SPA จริง ด้วย Router + Context + Deploy
```

DevBoard เป็น project ที่เราสามารถนำไปต่อยอดได้ เช่น

- เปลี่ยน API เป็นของจริง (Firebase, Supabase)
- เพิ่ม authentication
- เพิ่ม styling ด้วย Tailwind CSS
- เพิ่ม TypeScript
