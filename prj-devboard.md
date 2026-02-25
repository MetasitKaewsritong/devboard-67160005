# โครงงาน React: DevBoard — กระดานนักพัฒนา

## ภาพรวมโครงงาน

**DevBoard** คือ web application ที่นักศึกษาจะสร้างแบบต่อเนื่องตลอด 4 สัปดาห์ (สัปดาห์ที่ 11–14) โดยแต่ละสัปดาห์จะ**ต่อยอดจากสิ่งที่ทำไว้** ไม่ใช่เริ่มใหม่

App นี้เป็นกระดานโพสต์สำหรับนักพัฒนา ดึงข้อมูลจาก [JSONPlaceholder](https://jsonplaceholder.typicode.com) API ฟรี

---

## Tech Stack

| เครื่องมือ | รายละเอียด |
|------------|-----------|
| **Vite** | Build tool + dev server |
| **React 18** | UI Library |
| **react-router-dom v6** | Routing (ใช้ใน wk14) |
| **JSONPlaceholder** | API สำหรับข้อมูล posts/users/comments |
| **Vercel** | Deploy (ทำใน wk14) |

> ไม่ใช้ TypeScript, Redux, หรือ Zustand ในโครงงานนี้

---

## โครงสร้าง Project (เมื่อจบสัปดาห์ที่ 14)

```
devboard/
├── public/
├── src/
│   ├── components/
│   │   ├── Navbar.jsx          ← wk11 (อัปเดตทุกสัปดาห์)
│   │   ├── PostCard.jsx        ← wk11 (เพิ่ม favorites ใน wk12)
│   │   ├── PostList.jsx        ← wk11 (เพิ่ม search wk12, fetch wk13)
│   │   ├── UserCard.jsx        ← wk11
│   │   ├── UserList.jsx        ← wk13
│   │   ├── CommentList.jsx     ← wk13
│   │   ├── AddPostForm.jsx     ← wk12
│   │   └── LoadingSpinner.jsx  ← wk13
│   ├── context/
│   │   └── FavoritesContext.jsx ← wk14
│   ├── pages/
│   │   ├── HomePage.jsx        ← wk14
│   │   ├── PostDetailPage.jsx  ← wk14
│   │   ├── ProfilePage.jsx     ← wk14
│   │   └── FavoritesPage.jsx   ← wk14
│   ├── App.jsx                 ← เปลี่ยนทุกสัปดาห์
│   ├── main.jsx
│   └── index.css
├── index.html
└── package.json
```

---

## ความก้าวหน้าแต่ละสัปดาห์

| สัปดาห์ | ชื่อ | เนื้อหาหลัก | สิ่งที่ได้ |
|---------|------|-------------|-----------|
| **11** | โครงกระดูก | Components, JSX, Props, .map() | หน้า static มีโพสต์และสมาชิก |
| **12** | ให้ชีวิต | useState, Events, Forms | ค้นหา, ถูกใจ, เพิ่มโพสต์ |
| **13** | เชื่อมต่อ | useEffect, API, Loading/Error | ดึงข้อมูลจริงจาก API |
| **14** | หลายห้อง | React Router, useContext, Deploy | หลายหน้า + deploy บน Vercel |

---

## ความสัมพันธ์ระหว่างสัปดาห์

```
wk11: สร้าง components + ข้อมูล hardcode
  ↓
wk12: เพิ่ม state และ events ลงในของเดิม
  ↓
wk13: ลบ hardcode → fetch จาก API จริง
  ↓
wk14: แยกเป็นหลายหน้า + context + deploy
```

---

## เกณฑ์การส่งงาน

| สัปดาห์ | สิ่งที่ต้องส่ง | คะแนน |
|---------|--------------|--------|
| wk11 | GitHub repo URL + หน้า static ทำงานได้ (รัน `npm run dev` ได้) | 20 |
| wk12 | Commit ต่อเนื่องจาก wk11 + Search, Favorites, Form ทำงาน | 25 |
| wk13 | Commit ต่อเนื่อง + ดึงข้อมูลจาก API จริง + แสดง loading/error | 25 |
| wk14 | Commit ต่อเนื่อง + หลายหน้า + **Vercel URL** ที่เปิดได้ | 30 |
| **รวม** | | **100** |

> **หมายเหตุ:** ต้องส่ง GitHub repository เดียวกันทุกสัปดาห์ (ต่อเนื่อง ไม่ใช่ repo ใหม่)

---

## เกณฑ์การให้คะแนนรายสัปดาห์

### สัปดาห์ที่ 11 (20 คะแนน)
| เกณฑ์ | คะแนน |
|-------|--------|
| สร้าง Navbar, PostCard, PostList, UserCard ได้ครบ | 8 |
| ใช้ Props ส่งข้อมูลระหว่าง component ได้ถูกต้อง | 6 |
| ใช้ .map() render list ได้พร้อม key prop | 6 |

### สัปดาห์ที่ 12 (25 คะแนน)
| เกณฑ์ | คะแนน |
|-------|--------|
| Search กรองโพสต์ตาม title แบบ real-time | 8 |
| ปุ่มถูกใจ toggle ได้ + นับจำนวนใน Navbar | 10 |
| AddPostForm ทำงานได้ (controlled input) | 7 |

### สัปดาห์ที่ 13 (25 คะแนน)
| เกณฑ์ | คะแนน |
|-------|--------|
| ดึง posts และ users จาก API จริง | 8 |
| มี loading state ขณะรอข้อมูล | 7 |
| มี error state ถ้า fetch ล้มเหลว | 5 |
| ดึง comments แบบ on-demand | 5 |

### สัปดาห์ที่ 14 (30 คะแนน)
| เกณฑ์ | คะแนน |
|-------|--------|
| มี routing ครบ: Home, PostDetail, Profile, Favorites | 12 |
| ใช้ useContext สำหรับ favorites state | 8 |
| Deploy บน Vercel และส่ง URL | 10 |

---

## วิธีเริ่มต้น (Setup)

```bash
# สร้าง project ใหม่
npm create vite@latest devboard -- --template react
cd devboard
npm install

# รัน dev server
npm run dev
```

เปิด browser ที่ `http://localhost:5173`

---

## API ที่ใช้

| Endpoint | ข้อมูล |
|----------|--------|
| `GET /posts` | รายการโพสต์ทั้งหมด (100 รายการ) |
| `GET /posts/:id` | โพสต์ตาม ID |
| `GET /posts/:id/comments` | ความคิดเห็นของโพสต์ |
| `GET /users` | รายชื่อผู้ใช้ (10 คน) |

ตัวอย่าง: `https://jsonplaceholder.typicode.com/posts`

---

## ไฟล์ lab ประจำสัปดาห์

- [Task 1 — Components & Props](./prj-task1.md)
- [Task 2 — useState & Events](./prj-task2.md)
- [Task 3 — useEffect & API](./prj-task3.md)
- [Task 4 — Router & Deploy](./prj-task4.md)
