# Task #2: useState, Events, Forms

## เป้าหมาย

ต่อยอดจาก task1 โดยเพิ่ม **interactivity** ให้กับ DevBoard ด้วย `useState` และ event handlers

เมื่อจบ task นี้จะได้:

- Search input กรองโพสต์แบบ real-time
- ปุ่มถูกใจ ❤️ ที่ toggle ได้ พร้อมนับจำนวนใน Navbar
- Form เพิ่มโพสต์ใหม่ชั่วคราว

> **ต้องทำ task1 ให้สมบูรณ์ก่อน** — task นี้ต่อจากของเดิม อย่าสร้าง project ใหม่

---

## โครงสร้างไฟล์ที่จะเปลี่ยนแปลง

```
src/
├── components/
│   ├── Navbar.jsx       ← เพิ่ม favoriteCount props
│   ├── PostCard.jsx     ← เพิ่มปุ่มถูกใจ + isFavorite props
│   ├── PostList.jsx     ← เพิ่ม search input
│   └── AddPostForm.jsx  ← ไฟล์ใหม่
└── App.jsx              ← เพิ่ม state + logic ทั้งหมด
```

---

## แนวคิดสำคัญก่อนเริ่ม: Lifting State Up

ปุ่มถูกใจอยู่ใน `PostCard` แต่จำนวน favorites ต้องแสดงใน `Navbar`
ดังนั้น **state ต้องอยู่ที่ `App`** (parent ร่วมของทั้งคู่) แล้วส่งลงไปเป็น props

```
App (เก็บ favorites state)
├── Navbar     ← รับ favoriteCount
└── PostList
    └── PostCard  ← รับ isFavorite + onToggle
```

---

## Activity 1 — Search Input ใน PostList

แก้ไข `src/components/PostList.jsx`:

```jsx
import { useState } from "react";
import PostCard from "./PostCard";

function PostList({ posts, favorites, onToggleFavorite }) {
  const [search, setSearch] = useState("");

  // กรองโพสต์ตาม search
  const filtered = posts.filter((post) =>
    post.title.toLowerCase().includes(search.toLowerCase()),
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

      {/* Search Input */}
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

      {/* ถ้าไม่พบโพสต์ */}
      {filtered.length === 0 && (
        <p style={{ color: "#718096", textAlign: "center", padding: "2rem" }}>
          ไม่พบโพสต์ที่ค้นหา
        </p>
      )}

      {/* แสดงรายการโพสต์ */}
      {filtered.map((post) => (
        <PostCard
          key={post.id}
          title={post.title}
          body={post.body}
          isFavorite={favorites.includes(post.id)}
          onToggleFavorite={() => onToggleFavorite(post.id)}
        />
      ))}
    </div>
  );
}

export default PostList;
```

**Checkpoint:** พิมพ์ในช่อง search แล้วโพสต์ควรกรองทันที

---

## Activity 2 — ปุ่มถูกใจใน PostCard

แก้ไข `src/components/PostCard.jsx` — เพิ่ม props `isFavorite` และ `onToggleFavorite`:

```jsx
function PostCard({ title, body, isFavorite, onToggleFavorite }) {
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
      <h3 style={{ margin: "0 0 0.5rem", color: "#1e40af" }}>{title}</h3>
      <p style={{ margin: "0 0 0.75rem", color: "#4a5568", lineHeight: 1.6 }}>
        {body}
      </p>

      {/* ปุ่มถูกใจ */}
      <button
        onClick={onToggleFavorite}
        style={{
          background: "none",
          border: "none",
          cursor: "pointer",
          fontSize: "1.2rem",
          padding: "0.25rem 0.5rem",
          borderRadius: "4px",
          color: isFavorite ? "#e53e3e" : "#a0aec0",
        }}
      >
        {isFavorite ? "❤️ ถูกใจแล้ว" : "🤍 ถูกใจ"}
      </button>
    </div>
  );
}

export default PostCard;
```

---

## Activity 3 — แสดงจำนวน Favorites ใน Navbar

แก้ไข `src/components/Navbar.jsx`:

```jsx
function Navbar({ favoriteCount }) {
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
      <div>
        <h1 style={{ margin: 0, fontSize: "1.5rem" }}>DevBoard</h1>
        <p style={{ margin: 0, fontSize: "0.9rem", opacity: 0.8 }}>
          กระดานนักพัฒนา
        </p>
      </div>

      {favoriteCount > 0 && (
        <div
          style={{
            background: "#e53e3e",
            borderRadius: "20px",
            padding: "0.25rem 0.75rem",
            fontSize: "0.9rem",
            fontWeight: "bold",
          }}
        >
          ❤️ {favoriteCount} ถูกใจ
        </div>
      )}
    </nav>
  );
}

export default Navbar;
```

---

## Activity 4 — AddPostForm Component

สร้างไฟล์ใหม่ `src/components/AddPostForm.jsx`:

```jsx
import { useState } from "react";

function AddPostForm({ onAddPost }) {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    if (!title.trim() || !body.trim()) return; // ป้องกันส่งว่าง

    onAddPost({ title, body });
    setTitle(""); // เคลียร์ form
    setBody("");
  }

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        border: "1px solid #e2e8f0",
        borderRadius: "8px",
        padding: "1rem",
        marginBottom: "1.5rem",
        background: "#f7fafc",
      }}
    >
      <h3 style={{ margin: "0 0 0.75rem", color: "#2d3748" }}>
        เพิ่มโพสต์ใหม่
      </h3>

      <input
        type="text"
        placeholder="หัวข้อโพสต์"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        style={{
          width: "100%",
          padding: "0.5rem",
          marginBottom: "0.5rem",
          border: "1px solid #cbd5e0",
          borderRadius: "4px",
          fontSize: "1rem",
          boxSizing: "border-box",
        }}
      />

      <textarea
        placeholder="เนื้อหาโพสต์"
        value={body}
        onChange={(e) => setBody(e.target.value)}
        rows={3}
        style={{
          width: "100%",
          padding: "0.5rem",
          marginBottom: "0.75rem",
          border: "1px solid #cbd5e0",
          borderRadius: "4px",
          fontSize: "1rem",
          resize: "vertical",
          boxSizing: "border-box",
        }}
      />

      <button
        type="submit"
        style={{
          background: "#1e40af",
          color: "white",
          border: "none",
          padding: "0.5rem 1.5rem",
          borderRadius: "6px",
          cursor: "pointer",
          fontSize: "1rem",
        }}
      >
        โพสต์
      </button>
    </form>
  );
}

export default AddPostForm;
```

---

## Activity 5 — เชื่อมทุกอย่างใน App.jsx

แก้ไข `src/App.jsx`:

```jsx
import { useState } from "react";
import Navbar from "./components/Navbar";
import PostList from "./components/PostList";
import UserCard from "./components/UserCard";
import AddPostForm from "./components/AddPostForm";

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

const USERS = [
  { id: 1, name: "สมชาย ใจดี", email: "somchai@dev.com" },
  { id: 2, name: "สมหญิง รักเรียน", email: "somying@dev.com" },
  { id: 3, name: "วิชาญ โค้ดเก่ง", email: "wichan@dev.com" },
];

function App() {
  const [posts, setPosts] = useState(INITIAL_POSTS);
  const [favorites, setFavorites] = useState([]); // เก็บ id ที่ถูกใจ

  // Toggle ถูกใจ/ยกเลิก
  function handleToggleFavorite(postId) {
    setFavorites(
      (prev) =>
        prev.includes(postId)
          ? prev.filter((id) => id !== postId) // ลบออก
          : [...prev, postId], // เพิ่มเข้า
    );
  }

  // เพิ่มโพสต์ใหม่
  function handleAddPost({ title, body }) {
    const newPost = {
      id: Date.now(), // ใช้ timestamp เป็น id ชั่วคราว
      title,
      body,
    };
    setPosts((prev) => [newPost, ...prev]); // เพิ่มไว้ด้านบน
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
        {/* คอลัมน์ซ้าย */}
        <div>
          <AddPostForm onAddPost={handleAddPost} />
          <PostList
            posts={posts}
            favorites={favorites}
            onToggleFavorite={handleToggleFavorite}
          />
        </div>

        {/* คอลัมน์ขวา */}
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
```

---

## Checkpoint สุดท้าย

- พิมพ์ในช่อง search → โพสต์กรองทันที
- พิมพ์คำที่ไม่มี → เห็นข้อความ "ไม่พบโพสต์ที่ค้นหา"
- กดปุ่ม 🤍 → เปลี่ยนเป็น ❤️ และตัวเลขใน Navbar เพิ่มขึ้น
- กรอก form แล้วกด "โพสต์" → โพสต์ใหม่ปรากฏด้านบนรายการ

---

## สรุปสิ่งที่ได้เรียนรู้

| แนวคิด                | ตัวอย่างในงาน                                              |
| --------------------- | ---------------------------------------------------------- |
| `useState`            | `const [search, setSearch] = useState('')`                 |
| Controlled Input      | `value={search} onChange={e => setSearch(e.target.value)}` |
| Event Handler         | `onClick={onToggleFavorite}`                               |
| Lifting State Up      | favorites state อยู่ใน App แต่ใช้ใน Navbar และ PostCard    |
| Conditional Rendering | `{favoriteCount > 0 && <div>...</div>}`                    |
| Form Submission       | `onSubmit={handleSubmit}` + `e.preventDefault()`           |

---

## Deploy อัปเดต

เนื่องจากเชื่อม Vercel ไว้แล้วตั้งแต่ task1 — แค่ push ก็ deploy อัตโนมัติ

```bash
git add .
git commit -m "feat: task2 - search, favorites, add post form"
git push
```

Vercel จะ build และ deploy ให้ภายใน ~1 นาที
เปิด Vercel URL เดิมแล้วจะเห็น app เวอร์ชันใหม่พร้อม Search + Favorites + Form

---

## วิธีส่งงาน

1. Commit ทุก activity และ push ขึ้น GitHub (repository เดิมจาก task1)
2. ตรวจสอบว่าทุกฟีเจอร์ทำงานได้ก่อน commit
3. ส่ง **GitHub URL** และ **Vercel URL** ให้อาจารย์

---

## 🚀 Challenge

ทำเสร็จแล้ว ลองท้าทายตัวเองด้วยโจทย์เพิ่มเติมด้านล่างนี้
ไม่มีเฉลย - **ในวันนำเสนอโครงงาน ถ้ามีทำเพิ่ม และสามารถอธิบายในสิ่งที่ทำได้ จะมีคะแนนเพิ่ม 2.5 คะแนน(ดิบ ๆ ไม่หาร)**

---

### ⭐ ระดับ 1 — Character Counter

เพิ่มตัวนับตัวอักษรใน `AddPostForm` ที่แสดงแบบ real-time ขณะพิมพ์

ตัวอย่างที่ควรเห็น (ขณะพิมพ์หัวข้อ):

```
หัวข้อโพสต์
                              15/100
```

เงื่อนไข:

- title จำกัดไม่เกิน 100 ตัวอักษร
- ตัวนับเปลี่ยนสีเป็นแดงเมื่อเหลือน้อยกว่า 10 ตัว

> 💡 Hint: `title.length` คือจำนวนตัวอักษรปัจจุบัน, `maxLength` attribute บน `<input>` ช่วยจำกัดได้

---

### ⭐⭐ ระดับ 2 — Sort โพสต์

เพิ่มปุ่ม sort ใน `PostList` ที่สลับระหว่าง "ใหม่สุดก่อน" และ "เก่าสุดก่อน"

ตัวอย่างที่ควรเห็น:

```
[🔽 ใหม่สุดก่อน]   ← กดแล้วสลับเป็น [🔼 เก่าสุดก่อน]
```

> 💡 Hint: ใช้ `useState` เก็บ `sortOrder` ('asc' หรือ 'desc') แล้ว sort array ก่อน `.map()`
> ระวัง: `array.sort()` แก้ array ตัวเดิม ให้ใช้ `[...posts].sort(...)` แทน

---

### ⭐⭐⭐ ระดับ 3 — Favorites คงอยู่หลัง Refresh

ตอนนี้ถ้า refresh หน้าเว็บ favorites จะหายไป — ให้แก้โดยบันทึกลง `localStorage`

พฤติกรรมที่ต้องการ:

- กดถูกใจโพสต์ → บันทึกลง localStorage ทันที
- refresh หน้า → favorites ยังอยู่ครบ

> 💡 Hint:
>
> - `localStorage.setItem('favorites', JSON.stringify(favorites))` บันทึก
> - `JSON.parse(localStorage.getItem('favorites') || '[]')` อ่านกลับมา
> - ใช้เป็น initial value ของ `useState`
