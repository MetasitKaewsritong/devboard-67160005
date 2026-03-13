# Task #3: useEffect & API

## เป้าหมาย

ต่อยอดจาก task2 โดยเปลี่ยนจากข้อมูล hardcode ไปใช้ **ข้อมูลจริงจาก API** และจัดการสถานะ loading/error อย่างถูกต้อง

เมื่อจบ task นี้จะได้:

- ดึงโพสต์และสมาชิกจาก JSONPlaceholder API
- แสดง loading spinner ขณะรอข้อมูล
- แสดง error message ถ้าเกิดข้อผิดพลาด
- ดึง comments เมื่อกดปุ่ม (on-demand)

> **ต้องทำ task2 ให้สมบูรณ์ก่อน** — task นี้ต่อจากของเดิม

---

## API ที่จะใช้

ฐาน URL: `https://jsonplaceholder.typicode.com`

| Endpoint                  | ข้อมูล                    |
| ------------------------- | ------------------------- |
| `GET /posts`              | โพสต์ทั้งหมด (100 รายการ) |
| `GET /posts/:id/comments` | ความคิดเห็นของโพสต์       |
| `GET /users`              | รายชื่อผู้ใช้ (10 คน)     |

---

## โครงสร้างไฟล์ที่จะเปลี่ยนแปลง

```
src/
├── components/
│   ├── PostList.jsx       ← เพิ่ม fetch posts + loading/error
│   ├── UserList.jsx       ← ไฟล์ใหม่ (แยกออกจาก App)
│   ├── CommentList.jsx    ← ไฟล์ใหม่ (fetch on-demand)
│   ├── LoadingSpinner.jsx ← ไฟล์ใหม่
│   └── PostCard.jsx       ← เพิ่มปุ่ม "ดูความคิดเห็น"
└── App.jsx                ← ลบ hardcode data ออก
```

---

## แนวคิดสำคัญ: useEffect + async/await

**อย่าเขียน** async บน useEffect callback โดยตรง:

```jsx
// ❌ ผิด — useEffect callback ต้องไม่เป็น async
useEffect(async () => {
  const data = await fetch(...)
}, [])
```

**ให้เขียน** function async ข้างใน แล้วเรียกใช้:

```jsx
// ✅ ถูก
useEffect(() => {
  async function fetchData() {
    const res = await fetch(...)
    const data = await res.json()
  }
  fetchData()
}, [])
```

---

## Activity 1 — LoadingSpinner Component

สร้างไฟล์ใหม่ `src/components/LoadingSpinner.jsx`:

```jsx
function LoadingSpinner() {
  return (
    <div style={{ textAlign: "center", padding: "3rem", color: "#718096" }}>
      <div
        style={{
          display: "inline-block",
          width: "40px",
          height: "40px",
          border: "4px solid #e2e8f0",
          borderTopColor: "#1e40af",
          borderRadius: "50%",
          animation: "spin 0.8s linear infinite",
        }}
      />
      <p style={{ marginTop: "1rem" }}>กำลังโหลด...</p>
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}

export default LoadingSpinner;
```

---

## Activity 2 — ดึง Posts จาก API ใน PostList

แก้ไข `src/components/PostList.jsx` — เปลี่ยนจากรับ `posts` props มาเป็น fetch เอง:

```jsx
import { useState, useEffect } from "react";
import PostCard from "./PostCard";
import LoadingSpinner from "./LoadingSpinner";

function PostList({ favorites, onToggleFavorite }) {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState("");

  useEffect(() => {
    async function fetchPosts() {
      try {
        setLoading(true);
        setError(null);
        const res = await fetch("https://jsonplaceholder.typicode.com/posts");
        if (!res.ok) throw new Error("ดึงข้อมูลไม่สำเร็จ");
        const data = await res.json();
        setPosts(data.slice(0, 20)); // เอาแค่ 20 รายการแรก
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    fetchPosts();
  }, []); // [] = ทำครั้งเดียวตอน component mount

  const filtered = posts.filter((post) =>
    post.title.toLowerCase().includes(search.toLowerCase()),
  );

  if (loading) return <LoadingSpinner />;

  if (error)
    return (
      <div
        style={{
          padding: "1.5rem",
          background: "#fff5f5",
          border: "1px solid #fc8181",
          borderRadius: "8px",
          color: "#c53030",
        }}
      >
        เกิดข้อผิดพลาด: {error}
      </div>
    );

  return (
    <div>
      <h2
        style={{
          color: "#2d3748",
          borderBottom: "2px solid #1e40af",
          paddingBottom: "0.5rem",
        }}
      >
        โพสต์ล่าสุด
      </h2>

      <input
        type="text"
        placeholder="ค้นหาโพสต์..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{
          width: "100%",
          padding: "0.5rem 0.75rem",
          border: "1px solid #cbd5e0",
          borderRadius: "6px",
          fontSize: "1rem",
          marginBottom: "1rem",
          boxSizing: "border-box",
        }}
      />

      {filtered.length === 0 && (
        <p style={{ color: "#718096", textAlign: "center", padding: "2rem" }}>
          ไม่พบโพสต์ที่ค้นหา
        </p>
      )}

      {filtered.map((post) => (
        <PostCard
          key={post.id}
          post={post}
          isFavorite={favorites.includes(post.id)}
          onToggleFavorite={() => onToggleFavorite(post.id)}
        />
      ))}
    </div>
  );
}

export default PostList;
```

**ทดสอบ error handling:** เปลี่ยน URL เป็น `/postss` (พิมพ์ผิด) แล้วดูว่าเห็น error message

---

## Activity 3 — CommentList Component (Fetch On-Demand)

สร้างไฟล์ใหม่ `src/components/CommentList.jsx`:

```jsx
import { useState, useEffect } from "react";
import LoadingSpinner from "./LoadingSpinner";

function CommentList({ postId }) {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchComments() {
      try {
        setLoading(true);
        const res = await fetch(
          `https://jsonplaceholder.typicode.com/posts/${postId}/comments`,
        );
        if (!res.ok) throw new Error("ดึงความคิดเห็นไม่สำเร็จ");
        const data = await res.json();
        setComments(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    fetchComments();
  }, [postId]); // fetch ใหม่ทุกครั้งที่ postId เปลี่ยน

  if (loading)
    return <p style={{ color: "#718096" }}>กำลังโหลดความคิดเห็น...</p>;
  if (error) return <p style={{ color: "#c53030" }}>{error}</p>;

  return (
    <div style={{ marginTop: "0.75rem" }}>
      <strong style={{ color: "#4a5568" }}>
        ความคิดเห็น ({comments.length})
      </strong>
      {comments.map((comment) => (
        <div
          key={comment.id}
          style={{
            background: "#f7fafc",
            borderRadius: "6px",
            padding: "0.5rem 0.75rem",
            marginTop: "0.5rem",
            fontSize: "0.85rem",
          }}
        >
          <div style={{ fontWeight: "bold", color: "#2d3748" }}>
            {comment.name}
          </div>
          <div style={{ color: "#718096" }}>{comment.body}</div>
        </div>
      ))}
    </div>
  );
}

export default CommentList;
```

---

## Activity 4 — เพิ่มปุ่ม "ดูความคิดเห็น" ใน PostCard

แก้ไข `src/components/PostCard.jsx`:

```jsx
import { useState } from "react";
import CommentList from "./CommentList";

function PostCard({ post, isFavorite, onToggleFavorite }) {
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
      <h3 style={{ margin: "0 0 0.5rem", color: "#1e40af" }}>{post.title}</h3>
      <p style={{ margin: "0 0 0.75rem", color: "#4a5568", lineHeight: 1.6 }}>
        {post.body}
      </p>

      <div style={{ display: "flex", gap: "0.5rem" }}>
        {/* ปุ่มถูกใจ */}
        <button
          onClick={onToggleFavorite}
          style={{
            background: "none",
            border: "none",
            cursor: "pointer",
            fontSize: "1rem",
            padding: "0.25rem 0.5rem",
            borderRadius: "4px",
            color: isFavorite ? "#e53e3e" : "#a0aec0",
          }}
        >
          {isFavorite ? "❤️ ถูกใจแล้ว" : "🤍 ถูกใจ"}
        </button>

        {/* ปุ่มดูความคิดเห็น */}
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
          {showComments ? "▲ ซ่อน" : "▼ ดูความคิดเห็น"}
        </button>
      </div>

      {/* แสดง comments เมื่อกด — fetch เกิดขึ้นตอนนี้ */}
      {showComments && <CommentList postId={post.id} />}
    </div>
  );
}

export default PostCard;
```

---

## Activity 5 — UserList Component (แยกจาก App)

สร้างไฟล์ใหม่ `src/components/UserList.jsx`:

```jsx
import { useState, useEffect } from "react";
import UserCard from "./UserCard";
import LoadingSpinner from "./LoadingSpinner";

function UserList() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchUsers() {
      try {
        const res = await fetch("https://jsonplaceholder.typicode.com/users");
        const data = await res.json();
        setUsers(data);
      } catch {
        // ไม่แสดง error ในตัวอย่างนี้ (นักศึกษาลองเพิ่มเองได้)
      } finally {
        setLoading(false);
      }
    }
    fetchUsers();
  }, []);

  if (loading) return <LoadingSpinner />;

  return (
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
      {users.map((user) => (
        <UserCard key={user.id} name={user.name} email={user.email} />
      ))}
    </div>
  );
}

export default UserList;
```

---

## Activity 6 — อัปเดต App.jsx

แก้ไข `src/App.jsx` — ลบ hardcode data และใช้ component ใหม่:

```jsx
import { useState } from "react";
import Navbar from "./components/Navbar";
import PostList from "./components/PostList";
import UserList from "./components/UserList";
import AddPostForm from "./components/AddPostForm";

function App() {
  const [favorites, setFavorites] = useState([]);

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
          <AddPostForm onAddPost={() => {}} /> {/* จะเชื่อมใน wk14 */}
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
```

> **หมายเหตุ:** `AddPostForm` ยังอยู่แต่ `onAddPost` เป็น empty function ชั่วคราว เพราะ posts ตอนนี้อยู่ใน `PostList` แล้ว — จะปรับปรุงใน wk14

---

## Checkpoint สุดท้าย

- เมื่อเปิด app ครั้งแรก → เห็น loading spinner ก่อน แล้วจึงมีข้อมูล
- โพสต์แสดงจาก API จริง (ชื่อเป็นภาษาอังกฤษ)
- กดปุ่ม "ดูความคิดเห็น" → เห็น spinner เล็ก ๆ แล้วมีความคิดเห็น
- เปลี่ยน URL เป็นผิด → เห็น error message

**ทดสอบ Loading:** เปิด Chrome DevTools → Network → เปลี่ยน throttle เป็น "Slow 3G" แล้ว refresh เพื่อดู loading state ชัดขึ้น

---

## สรุปสิ่งที่ได้เรียนรู้

| แนวคิด                   | ตัวอย่างในงาน                               |
| ------------------------ | ------------------------------------------- |
| `useEffect` + empty deps | fetch ครั้งเดียวตอน mount                   |
| `useEffect` + deps       | `[postId]` → fetch ใหม่เมื่อ postId เปลี่ยน |
| Async ใน useEffect       | define function ข้างใน แล้วเรียกใช้         |
| Three-state pattern      | `loading`, `error`, `data`                  |
| Fetch on-demand          | fetch เกิดตอนกด ไม่ใช่ตอน mount             |
| `try/catch/finally`      | จัดการ error + ปิด loading เสมอ             |

---

## Deploy อัปเดต

เชื่อม Vercel ไว้แล้วตั้งแต่ task1 — แค่ push ก็ deploy อัตโนมัติ

```bash
git add .
git commit -m "feat: task3 - fetch API, loading and error states"
git push
```

Vercel จะ build และ deploy ให้ภายใน ~1 นาที
เปิด Vercel URL แล้วทดสอบดูว่า loading spinner และข้อมูลจาก API แสดงผลบน production ได้ถูกต้อง

> 💡 ลองเปิดหน้าเว็บบนมือถือผ่าน Vercel URL เพื่อดูว่า loading state ทำงานได้ดีแค่ไหนบน network จริง

---

## วิธีส่งงาน

1. Commit ทุก activity และ push ขึ้น GitHub (repository เดิม)
2. ตรวจสอบว่า loading/error states ทำงานได้
3. ส่ง **GitHub URL** และ **Vercel URL** ให้อาจารย์

---

## 🚀 Challenge

ทำเสร็จแล้ว ลองท้าทายตัวเองด้วยโจทย์เพิ่มเติมด้านล่างนี้
ไม่มีเฉลย - **ในวันนำเสนอโครงงาน ถ้ามีทำเพิ่ม และสามารถอธิบายในสิ่งที่ทำได้ จะมีคะแนนเพิ่ม 2.5 คะแนน(ดิบ ๆ ไม่หาร)**

---

### ⭐ ระดับ 1 — ปุ่มโหลดใหม่

เพิ่มปุ่ม "🔄 โหลดใหม่" ใน `PostList` ที่เมื่อกดแล้ว fetch ข้อมูลโพสต์ใหม่อีกครั้ง (พร้อม loading state)

ตัวอย่างที่ควรเห็น:

```
โพสต์ล่าสุด          [🔄 โหลดใหม่]
```

> 💡 Hint: แทนที่จะ fetch ใน `useEffect` อย่างเดียว ให้แยก fetch logic ออกเป็น function ที่เรียกได้ทั้งจาก `useEffect` และจากการกดปุ่ม

---

### ⭐⭐ ระดับ 2 — Pagination

ตอนนี้แสดงโพสต์ 20 รายการ — ให้เพิ่ม pagination แสดงทีละ 10 รายการ

ตัวอย่างที่ควรเห็น:

```
[← ก่อนหน้า]  หน้า 1 / 2  [ถัดไป →]
```

เงื่อนไข:

- หน้าแรก: ปุ่ม "ก่อนหน้า" ถูก disable
- หน้าสุดท้าย: ปุ่ม "ถัดไป" ถูก disable

> 💡 Hint: ใช้ `useState` เก็บ `currentPage` (เริ่มที่ 1) แล้วใช้ `.slice()` ตัด array
> `posts.slice((currentPage - 1) * 10, currentPage * 10)`

---

### ⭐⭐⭐ ระดับ 3 — Custom Hook: useFetch

ตอนนี้ `PostList` และ `UserList` ต่างก็มี code fetch ที่คล้ายกันมาก — ให้ refactor โดยสร้าง custom hook ชื่อ `useFetch`

สิ่งที่ hook ควรทำ:

```js
const { data, loading, error } = useFetch(
  "https://jsonplaceholder.typicode.com/posts",
);
```

- รับ `url` เป็น parameter
- return `{ data, loading, error }`
- จัดการ fetch, loading state, และ error state ข้างใน

นำไปใช้แทน fetch logic ใน `PostList` และ `UserList` ให้ code สั้นลง

> 💡 Hint: สร้างไฟล์ `src/hooks/useFetch.js` แล้ว export function ที่ใช้ `useState` + `useEffect` ข้างใน
