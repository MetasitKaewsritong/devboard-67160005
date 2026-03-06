# Lab 12: React #2 - useState & Events

## 🎯 วัตถุประสงค์

หลังจากทำ Lab นี้ เมื่อจบแล้ว นิสิตสามารถ:

- ใช้ useState Hook เพื่อจัดการ State
- ตอบสนองต่อ Events (onClick, onChange, onSubmit)
- สร้าง Controlled Components (ฟอร์มติดต่อ)
- แสดงผลตามเงื่อนไข (Conditional Rendering)
- สร้างแอปพลิเคชันที่มีปฏิสัมพันธ์กับผู้ใช้

---

## 📋 ส่วนที่ 1: useState Hook

### ขั้นตอน 1.1: สร้างโปรเจก React ใหม่

```bash
# สร้างโฟลเดอร์ lab12
mkdir lab12
cd lab12

# สร้างโครงการ React พร้อม Vite
npm create vite@latest my-react-app -- --template react

# เข้าโฟลเดอร์
cd my-react-app

# ติดตั้ง dependencies
npm install

# เริ่มต้นเซิร์ฟเวอร์
npm run dev
```

### ขั้นตอน 1.2: Counter App - ตัวแรก

สร้าง `src/App.jsx`:

```javascript
import { useState } from "react";

export default function Counter() {
  const [count, setCount] = useState(0);

  function increment() {
    setCount(count + 1);
  }

  function decrement() {
    setCount(count - 1);
  }

  function reset() {
    setCount(0);
  }

  return (
    <div
      style={{
        textAlign: "center",
        padding: "40px",
        maxWidth: "500px",
        margin: "0 auto",
      }}
    >
      <h1>⏱️ ตัวนับ</h1>
      <p
        style={{
          fontSize: "48px",
          color: "#007bff",
          fontWeight: "bold",
          margin: "20px 0",
        }}
      >
        {count}
      </p>

      <div style={{ display: "flex", gap: "10px", justifyContent: "center" }}>
        <button
          onClick={decrement}
          style={{
            padding: "12px 24px",
            fontSize: "16px",
            backgroundColor: "#dc3545",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          ➖ ลด
        </button>

        <button
          onClick={reset}
          style={{
            padding: "12px 24px",
            fontSize: "16px",
            backgroundColor: "#6c757d",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          🔄 รีเซ็ต
        </button>

        <button
          onClick={increment}
          style={{
            padding: "12px 24px",
            fontSize: "16px",
            backgroundColor: "#28a745",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          ➕ เพิ่ม
        </button>
      </div>
    </div>
  );
}
```

**ตรวจสอบ:** ปุ่มสามารถเพิ่ม/ลด/รีเซ็ตค่า count ได้

### ขั้นตอน 1.3: Toggle Menu

เพิ่มลงใน App.jsx:

```javascript
function ToggleMenu() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div style={{ padding: "20px", marginTop: "40px" }}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        style={{
          padding: "10px 20px",
          fontSize: "16px",
          backgroundColor: "#0066cc",
          color: "white",
          border: "none",
          borderRadius: "4px",
          cursor: "pointer",
        }}
      >
        {isOpen ? "ปิดเมนู ▼" : "เปิดเมนู ▶"}
      </button>

      {isOpen && (
        <div
          style={{
            backgroundColor: "#f0f0f0",
            padding: "20px",
            marginTop: "10px",
            borderRadius: "4px",
            border: "1px solid #ddd",
          }}
        >
          <p style={{ margin: "8px 0" }}>
            🔗 <a href="#home">หน้าแรก</a>
          </p>
          <p style={{ margin: "8px 0" }}>
            🔗 <a href="#about">เกี่ยวกับ</a>
          </p>
          <p style={{ margin: "8px 0" }}>
            🔗 <a href="#contact">ติดต่อ</a>
          </p>
        </div>
      )}
    </div>
  );
}
```

แล้วแก้ไข Counter export:

```javascript
export default function App() {
  return (
    <div>
      <Counter />
      <ToggleMenu />
    </div>
  );
}
```

**ตรวจสอบ:** ปุ่มสามารถเปิด/ปิดเมนูได้

### ขั้นตอน 1.4: State เป็น Object

```javascript
function UserInfo() {
  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    age: "",
  });

  function updateFirstName(value) {
    setUser({ ...user, firstName: value });
  }

  function updateLastName(value) {
    setUser({ ...user, lastName: value });
  }

  function updateAge(value) {
    setUser({ ...user, age: value });
  }

  return (
    <div style={{ padding: "20px", marginTop: "40px", maxWidth: "400px" }}>
      <h2>👤 ข้อมูลส่วนตัว</h2>

      <div style={{ marginBottom: "15px" }}>
        <label>ชื่อ:</label>
        <input
          type="text"
          value={user.firstName}
          onChange={(e) => updateFirstName(e.target.value)}
          placeholder="กรอกชื่อ"
          style={{
            display: "block",
            padding: "8px",
            marginTop: "5px",
            width: "100%",
            fontSize: "14px",
          }}
        />
      </div>

      <div style={{ marginBottom: "15px" }}>
        <label>นามสกุล:</label>
        <input
          type="text"
          value={user.lastName}
          onChange={(e) => updateLastName(e.target.value)}
          placeholder="กรอกนามสกุล"
          style={{
            display: "block",
            padding: "8px",
            marginTop: "5px",
            width: "100%",
            fontSize: "14px",
          }}
        />
      </div>

      <div style={{ marginBottom: "15px" }}>
        <label>อายุ:</label>
        <input
          type="number"
          value={user.age}
          onChange={(e) => updateAge(e.target.value)}
          placeholder="กรอกอายุ"
          style={{
            display: "block",
            padding: "8px",
            marginTop: "5px",
            width: "100%",
            fontSize: "14px",
          }}
        />
      </div>

      <div
        style={{
          backgroundColor: "#f9f9f9",
          padding: "15px",
          borderRadius: "4px",
          border: "1px solid #ddd",
        }}
      >
        <h3>ข้อมูลที่บันทึก:</h3>
        <p>
          <strong>ชื่อ:</strong> {user.firstName || "ยังไม่กรอก"}
        </p>
        <p>
          <strong>นามสกุล:</strong> {user.lastName || "ยังไม่กรอก"}
        </p>
        <p>
          <strong>อายุ:</strong> {user.age || "ยังไม่กรอก"}
        </p>
      </div>
    </div>
  );
}
```

เพิ่มใน App:

```javascript
export default function App() {
  return (
    <div>
      <Counter />
      <ToggleMenu />
      <UserInfo />
    </div>
  );
}
```

---

## 📋 ส่วนที่ 2: Event Handling & Forms

### ขั้นตอน 2.1: Simple Input

```javascript
function InputExample() {
  const [text, setText] = useState("");

  return (
    <div style={{ padding: "20px", marginTop: "40px", maxWidth: "400px" }}>
      <h2>📝 กรอกข้อความ</h2>

      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="พิมพ์อะไรสักอย่าง..."
        style={{
          display: "block",
          padding: "10px",
          fontSize: "16px",
          width: "100%",
          borderRadius: "4px",
          border: "1px solid #ddd",
        }}
      />

      <p style={{ marginTop: "10px" }}>
        คุณพิมพ์: <strong>{text}</strong>
      </p>

      <p style={{ marginTop: "20px", color: "#666" }}>
        จำนวนตัวอักษร: {text.length}
      </p>
    </div>
  );
}
```

### ขั้นตอน 2.2: Form Submit

```javascript
function LoginForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(event) {
    event.preventDefault();

    if (username.trim() && password.trim()) {
      setSubmitted(true);
      console.log("ข้อมูลที่ส่ง:", { username, password });

      // รีเซ็ตหลังจาก 2 วินาที
      setTimeout(() => {
        setUsername("");
        setPassword("");
        setSubmitted(false);
      }, 2000);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        maxWidth: "400px",
        margin: "20px auto",
        padding: "30px",
        border: "1px solid #ddd",
        borderRadius: "8px",
        backgroundColor: "#f9f9f9",
      }}
    >
      <h2 style={{ textAlign: "center" }}>🔐 เข้าสู่ระบบ</h2>

      <div style={{ marginBottom: "20px" }}>
        <label style={{ display: "block", marginBottom: "5px" }}>
          ชื่อผู้ใช้:
        </label>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="สมชาย"
          style={{
            width: "100%",
            padding: "10px",
            fontSize: "14px",
            borderRadius: "4px",
            border: "1px solid #ddd",
          }}
        />
      </div>

      <div style={{ marginBottom: "20px" }}>
        <label style={{ display: "block", marginBottom: "5px" }}>
          รหัสผ่าน:
        </label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="••••••"
          style={{
            width: "100%",
            padding: "10px",
            fontSize: "14px",
            borderRadius: "4px",
            border: "1px solid #ddd",
          }}
        />
      </div>

      <button
        type="submit"
        style={{
          width: "100%",
          padding: "12px",
          backgroundColor: "#28a745",
          color: "white",
          border: "none",
          borderRadius: "4px",
          fontSize: "16px",
          cursor: "pointer",
          fontWeight: "bold",
        }}
      >
        เข้าสู่ระบบ
      </button>

      {submitted && (
        <p style={{ marginTop: "20px", color: "#28a745", textAlign: "center" }}>
          เข้าสู่ระบบสำเร็จเป็น {username}!
        </p>
      )}
    </form>
  );
}
```

เพิ่มใน App:

```javascript
export default function App() {
  return (
    <div>
      <Counter />
      <ToggleMenu />
      <UserInfo />
      <InputExample />
      <LoginForm />
    </div>
  );
}
```

---

## 📋 ส่วนที่ 3: Conditional Rendering

### ขั้นตอน 3.1: Ternary Operator

```javascript
function LoginStatus() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <div style={{ padding: "20px", marginTop: "40px", textAlign: "center" }}>
      {isLoggedIn ? (
        <div
          style={{
            backgroundColor: "#d4edda",
            padding: "20px",
            borderRadius: "4px",
            border: "1px solid #c3e6cb",
          }}
        >
          <h2>🎉 ยินดีต้อนรับ!</h2>
          <p>คุณได้เข้าสู่ระบบแล้ว</p>
          <button
            onClick={() => setIsLoggedIn(false)}
            style={{
              padding: "10px 20px",
              backgroundColor: "#dc3545",
              color: "white",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
            }}
          >
            ออกจากระบบ
          </button>
        </div>
      ) : (
        <div
          style={{
            backgroundColor: "#f8d7da",
            padding: "20px",
            borderRadius: "4px",
            border: "1px solid #f5c6cb",
          }}
        >
          <h2>🔒 กรุณาเข้าสู่ระบบ</h2>
          <button
            onClick={() => setIsLoggedIn(true)}
            style={{
              padding: "10px 20px",
              backgroundColor: "#007bff",
              color: "white",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
            }}
          >
            เข้าสู่ระบบ
          </button>
        </div>
      )}
    </div>
  );
}
```

### ขั้นตอน 3.2: Logical AND (&&)

```javascript
function Notification() {
  const [hasMessage, setHasMessage] = useState(false);

  return (
    <div style={{ padding: "20px", marginTop: "40px", maxWidth: "400px" }}>
      {hasMessage && (
        <div
          style={{
            backgroundColor: "#d4edda",
            border: "1px solid #c3e6cb",
            padding: "15px",
            borderRadius: "4px",
            marginBottom: "15px",
            color: "#155724",
          }}
        >
          📩 คุณมีข้อความใหม่!
        </div>
      )}

      <button
        onClick={() => setHasMessage(!hasMessage)}
        style={{
          padding: "10px 20px",
          backgroundColor: hasMessage ? "#dc3545" : "#28a745",
          color: "white",
          border: "none",
          borderRadius: "4px",
          cursor: "pointer",
        }}
      >
        {hasMessage ? "ลบการแจ้งเตือน" : "เพิ่มการแจ้งเตือน"}
      </button>
    </div>
  );
}
```

เพิ่มใน App:

```javascript
export default function App() {
  return (
    <div>
      <Counter />
      <ToggleMenu />
      <UserInfo />
      <InputExample />
      <LoginForm />
      <LoginStatus />
      <Notification />
    </div>
  );
}
```

---

## 📋 ส่วนที่ 4: Todo App - Challenge

### ขั้นตอน 4.1: สร้าง Todo App

```javascript
function TodoApp() {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState("");

  function addTodo() {
    if (input.trim()) {
      const newTodo = {
        id: Date.now(),
        text: input,
        completed: false,
      };
      setTodos([...todos, newTodo]);
      setInput("");
    }
  }

  function deleteTodo(id) {
    setTodos(todos.filter((todo) => todo.id !== id));
  }

  function toggleTodo(id) {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo,
      ),
    );
  }

  function handleKeyPress(e) {
    if (e.key === "Enter") {
      addTodo();
    }
  }

  return (
    <div
      style={{
        maxWidth: "600px",
        margin: "40px auto",
        padding: "30px",
        border: "1px solid #ddd",
        borderRadius: "8px",
        backgroundColor: "#f9f9f9",
      }}
    >
      <h1 style={{ textAlign: "center" }}>📝 รายการที่ต้องทำ</h1>

      {/* Input Section */}
      <div style={{ display: "flex", gap: "10px", marginBottom: "20px" }}>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="เพิ่มสิ่งที่ต้องทำ..."
          style={{
            flex: 1,
            padding: "12px",
            fontSize: "16px",
            borderRadius: "4px",
            border: "1px solid #ddd",
          }}
        />
        <button
          onClick={addTodo}
          style={{
            padding: "12px 24px",
            backgroundColor: "#28a745",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
            fontSize: "16px",
            fontWeight: "bold",
          }}
        >
          เพิ่ม
        </button>
      </div>

      {/* Todo List */}
      <ul style={{ listStyle: "none", padding: 0 }}>
        {todos.map((todo) => (
          <li
            key={todo.id}
            style={{
              backgroundColor: "#fff",
              padding: "15px",
              marginBottom: "10px",
              borderRadius: "4px",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              border: "1px solid #ddd",
              textDecoration: todo.completed ? "line-through" : "none",
              opacity: todo.completed ? 0.6 : 1,
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <input
                type="checkbox"
                checked={todo.completed}
                onChange={() => toggleTodo(todo.id)}
                style={{ cursor: "pointer", width: "18px", height: "18px" }}
              />
              <span>{todo.text}</span>
            </div>
            <button
              onClick={() => deleteTodo(todo.id)}
              style={{
                padding: "8px 12px",
                backgroundColor: "#dc3545",
                color: "white",
                border: "none",
                borderRadius: "4px",
                cursor: "pointer",
                fontSize: "14px",
              }}
            >
              ลบ
            </button>
          </li>
        ))}
      </ul>

      {/* Empty State */}
      {todos.length === 0 && (
        <p style={{ textAlign: "center", color: "#999", marginTop: "20px" }}>
          ยังไม่มีรายการ เพิ่มเลย! 🎯
        </p>
      )}

      {/* Stats */}
      {todos.length > 0 && (
        <div
          style={{
            marginTop: "20px",
            padding: "15px",
            backgroundColor: "#e7f3ff",
            borderRadius: "4px",
            textAlign: "center",
            color: "#0066cc",
          }}
        >
          <strong>
            {todos.filter((t) => t.completed).length} / {todos.length}{" "}
            สำเร็จแล้ว
          </strong>
        </div>
      )}
    </div>
  );
}
```

เพิ่มใน App:

```javascript
export default function App() {
  return (
    <div style={{ backgroundColor: "#f5f5f5", minHeight: "100vh" }}>
      <Counter />
      <ToggleMenu />
      <UserInfo />
      <InputExample />
      <LoginForm />
      <LoginStatus />
      <Notification />
      <TodoApp />
    </div>
  );
}
```

**ตรวจสอบ:**

- สามารถเพิ่ม todo ได้
- สามารถทำเครื่องหมาย todo ว่าสำเร็จได้
- สามารถลบ todo ได้
- แสดงสถิติการสำเร็จ

---

## Checklist - ตรวจสอบความสำเร็จ

- [ ] ใช้ useState Hook สร้าง Counter ได้
- [ ] ใช้ useState สร้าง Toggle Menu ได้
- [ ] สร้าง State เป็น Object สำเร็จ
- [ ] จัดการ Input onChange ได้
- [ ] สร้าง Form Submit ปกติ
- [ ] ใช้ Ternary Operator สำหรับ Conditional Rendering
- [ ] ใช้ Logical AND (&&) สำหรับแสดง/ซ่อน elements
- [ ] สร้าง Todo App ครบถ้วน
- [ ] เบราว์เซอร์แสดงผลถูกต้องโดยไม่มี error
- [ ] สามารถใช้ Enter key เพื่อเพิ่ม todo ได้

---

## 🧪 การทดสอบ (Testing)

### ทดสอบ 1: Counter

- กดปุ่ม "เพิ่ม" 5 ครั้ง ตรวจสอบค่า
- กดปุ่ม "ลด" 3 ครั้ง ตรวจสอบค่า
- กดปุ่ม "รีเซ็ต" ตรวจสอบว่ากลับเป็น 0

### ทดสอบ 2: Form

- กรอก username และ password
- ส่ง form ตรวจสอบ console.log
- ลองส่ง form ที่ว่าง (ควรไม่ส่ง)

### ทดสอบ 3: Todo App

- เพิ่ม todo 3 รายการ
- ทำเครื่องหมาย 2 รายการ
- ลบ 1 รายการ
- ตรวจสอบสถิติ

### ทดสอบ 4: Console

- เปิด DevTools (F12) ตรวจสอบ Console
- ไม่มี Error ให้ปรากฏ

---

## 📝 Best Practices

### State Updates

```javascript
// ถูก - รีเซ็ต state
setCount(0);
setText("");

// ถูก - คำนวณจากค่าเดิม
setCount(count + 1);

// ถูก - อัปเดต Object ด้วย spread
setUser({ ...user, name: newName });

// ❌ ผิด - อัปเดต state โดยตรง
count = count + 1;
```

### Event Handling

```javascript
// ถูก - named function
function handleClick() {
  setCount(count + 1);
}
<button onClick={handleClick}>

// ถูก - arrow function
<button onClick={() => setCount(count + 1)}>

// ❌ ผิด - เรียกใช้ฟังก์ชันโดยตรง
<button onClick={handleClick()}>
```

### Form Handling

```javascript
// ถูก - prevent default
function handleSubmit(e) {
  e.preventDefault();
  // ส่งข้อมูล
}

// ถูก - controlled input
<input value={state} onChange={(e) => setState(e.target.value)} />

// ❌ ผิด - uncontrolled input
<input onChange={...} />
```

### Conditional Rendering

```javascript
// ถูก - Ternary
{
  isLoggedIn ? <Dashboard /> : <Login />;
}

// ถูก - Logical AND
{
  hasMessage && <Alert />;
}

// ❌ ผิด - ไม่ควรใช้ if ใน JSX
{
  if (condition) <Component />;
}
```

---

## 🔧 Tips & Tricks

### Prevent Double Submit

```javascript
const [isSubmitting, setIsSubmitting] = useState(false);

function handleSubmit(e) {
  e.preventDefault();
  if (isSubmitting) return;

  setIsSubmitting(true);
  // ส่งข้อมูล
  setIsSubmitting(false);
}
```

### Dynamic Button State

```javascript
<button disabled={input.trim() === ""}>เพิ่ม</button>
```

### Array Operations

```javascript
// เพิ่ม
setTodos([...todos, newTodo]);

// ลบ
setTodos(todos.filter((t) => t.id !== id));

// แก้ไข
setTodos(todos.map((t) => (t.id === id ? newTodo : t)));
```

---

## 📝 คำถามท้ายปฏิบัติการ - เขียนคำตอบ

#### **คำถาม 1: useState Hook**

**1.1 อธิบายความแตกต่างระหว่าง state ธรรมดากับ useState Hook**

เขียนตัวอย่างโค้ด 2 แบบเพื่อแสดงความแตกต่าง:

- แบบ 1: ตัวแปรธรรมดา (ไม่ใช้ useState)
- แบบ 2: ตัวแปร state (ใช้ useState)

แล้วอธิบายว่าทำไม UI ในแบบ 2 จึงอัปเดตอัตโนมัติ

**คำตอบควรมี:**

- ตัวอย่างโค้ดทั้ง 2 แบบ
- อธิบายว่า setState ทำให้ component re-render
- ตัวอย่างผลลัพธ์หรือสถานการณ์ใช้งาน

---

**1.2 เมื่อต้องการจัดการ state แบบ Object (เช่น user ที่มี name, email, age) ควรเขียนแบบไหน?**

เขียนโค้ดสั้นๆ ที่แสดง:

- การสร้าง state เป็น Object
- การอัปเดต property หนึ่งของ Object โดยไม่ทำให้ property อื่นหายไป

**คำตอบควรมี:**

- ใช้ `useState` สร้าง Object state
- ใช้ spread operator `...` อัปเดต property
- อธิบายว่าเหตุใด spread operator จำเป็น

---

#### **คำถาม 2: Event Handling**

**2.1 เขียนรายการ Event ทั่วไปใน React และบอกว่าแต่ละ Event ใช้เมื่อไหร่**

| Event      | ใช้เมื่อไหร่ | ตัวอย่าง |
| ---------- | ------------ | -------- |
| onClick    | ?            | ?        |
| onChange   | ?            | ?        |
| onSubmit   | ?            | ?        |
| onFocus    | ?            | ?        |
| onKeyPress | ?            | ?        |

**คำตอบควรมี:**

- ใส่คำอธิบาย 5 Event อย่างน้อย
- อธิบายว่าแต่ละ Event ใช้ในสถานการณ์ไหน
- ยกตัวอย่างการใช้งาน (เช่น ปุ่ม, input, form)

---

**2.2 เมื่อสร้าง Form ใน React ควรใช้ Controlled Component ทำไม?**

อธิบายพร้อมเขียนตัวอย่างโค้ด input ที่เป็น controlled component

**คำตอบควรมี:**

- อธิบายความหมายของ Controlled Component
- ตัวอย่างโค้ด input ที่อ่านค่าจาก state
- บอกประโยชน์ (สามารถตรวจสอบ validate, reset form, เป็นต้น)

---

#### **คำถาม 3: Conditional Rendering**

**3.1 มีวิธี 3 วิธีในการ render ตามเงื่อนไข ให้เขียนตัวอย่างแต่ละวิธี**

1. **Ternary Operator** - แสดง/ซ่อน 2 element
2. **Logical AND (&&)** - แสดง element เมื่อเงื่อนไขเป็น true
3. **if/else ภายนอก JSX** - ใช้ variable เก็บ element

ข้อใด ควรใช้ เมื่อไหร่ และทำไม?

**คำตอบควรมี:**

- ตัวอย่างโค้ดทั้ง 3 วิธี
- อธิบายกรณีการใช้ของแต่ละวิธี
- ข้อดีและข้อเสีย

---

**3.2 เขียน Component ที่แสดงสถานะ Loading, Success, Error**

- เมื่อ status = "idle" แสดง "กรุณากดปุ่ม"
- เมื่อ status = "loading" แสดง "⏳ กำลังโหลด..."
- เมื่อ status = "success" แสดง "สำเร็จ!"
- เมื่อ status = "error" แสดง "❌ เกิดข้อผิดพลาด"

**คำตอบควรมี:**

- ใช้ useState เก็บ status
- ใช้ conditional rendering แสดงข้อความต่างกัน
- ปุ่มสำหรับเปลี่ยน status

---

#### **คำถาม 4: Form & State Management**

**4.1 เขียน Component LoginForm ที่มี:**

- Input: username
- Input: password
- ปุ่ม: ส่งข้อมูล
- แสดงข้อความ "เข้าสู่ระบบสำเร็จเป็น [username]" เมื่อส่งเสร็จ

**คำตอบควรมี:**

- ใช้ useState เก็บ username, password
- ใช้ onChange อัปเดต state
- ใช้ onSubmit ส่งข้อมูล
- ใช้ conditional rendering แสดงข้อความสำเร็จ
- ใช้ e.preventDefault() ป้องกัน refresh หน้า

---

**4.2 เขียน Component ที่มี Checkbox ติดต่อได้**

- Checkbox: "ต้องการรับข้อมูลข่าวสาร"
- แสดงว่า Checkbox เลือก/ไม่เลือก

**คำตอบควรมี:**

- ใช้ `checked` property สำหรับ Checkbox
- ใช้ `event.target.checked` (ไม่ใช่ value)
- อธิบายความแตกต่างระหว่างเหตุการณ์ onChange ของ input vs checkbox

---

#### **คำถาม 5: Array Operations with State**

**5.1 เขียนฟังก์ชัน 3 ตัวสำหรับจัดการ array state:**

```javascript
const [todos, setTodos] = useState([]);

function addTodo(newTodo) {
  // เพิ่ม todo ใหม่เข้าไป
  // setTodos(???)
}

function deleteTodo(id) {
  // ลบ todo ที่มี id นั้น
  // setTodos(???)
}

function updateTodo(id, newText) {
  // อัปเดต text ของ todo ที่มี id นั้น
  // setTodos(???)
}
```

ให้กรอกโค้ดที่ขาดหาย

**คำตอบควรมี:**

- ใช้ spread operator `[...todos, newTodo]` เพิ่มรายการ
- ใช้ `.filter()` ลบรายการ
- ใช้ `.map()` อัปเดตรายการ

---

**5.2 เขียน Component ที่มี Todo List พร้อม:**

- Input สำหรับเพิ่ม todo
- ปุ่มเพิ่ม
- รายการ todo พร้อมปุ่มลบแต่ละรายการ
- แสดง "ยังไม่มีรายการ" เมื่อไม่มี todo

**คำตอบควรมี:**

- ใช้ useState เก็บ todos และ input
- ใช้ .map() แสดงรายการ
- ใช้ conditional rendering
- ฟังก์ชัน add และ delete ทำงานได้

---

### ตัวอย่างคำตอบ (Sample Answers)

#### ตัวอย่าง 1.1:

```javascript
// ❌ ตัวแปรธรรมดา - UI ไม่อัปเดต
let count = 0;
function increment() {
  count++;
  console.log(count); // console แสดง 1, 2, 3...
  // แต่หน้าเว็บไม่เปลี่ยน!
}

// useState - UI อัปเดตอัตโนมัติ
import { useState } from "react";

function Counter() {
  const [count, setCount] = useState(0);

  function increment() {
    setCount(count + 1);
  }

  return <p>{count}</p>; // อัปเดตทุกครั้ง!
}
```

**อธิบาย:** useState จะให้ React ทำการ re-render Component เมื่อ state เปลี่ยน แต่ตัวแปรธรรมดาเปลี่ยนแต่ UI ไม่อัปเดต

---

#### ตัวอย่าง 4.1:

```javascript
import { useState } from "react";

function LoginForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    setSubmitted(true);
    // อาจเรียก API ส่งข้อมูล
    console.log("Login:", { username, password });

    // รีเซ็ต
    setTimeout(() => {
      setUsername("");
      setPassword("");
      setSubmitted(false);
    }, 2000);
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="ชื่อผู้ใช้"
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="รหัสผ่าน"
      />
      <button type="submit">เข้าสู่ระบบ</button>

      {submitted && <p>เข้าสู่ระบบสำเร็จเป็น {username}!</p>}
    </form>
  );
}
```

---

## 📚 ทรัพยากรเพิ่มเติม

- [React Hooks Guide](https://react.dev/reference/react)
- [Event Handling](https://react.dev/learn/responding-to-events)
- [Form Inputs](https://react.dev/learn/sharing-state-between-components)

---

## 🎓 ขั้นตอนถัดไป

เมื่อจบ Lab 12 แล้ว คุณพร้อมสำหรับ **Week 13: React #3 (useEffect & API)**

ในสัปดาห์ถัดไป เราจะเรียนรู้:

- **useEffect Hook** - Side effects
- **Fetching Data** - เรียก API
- **Loading + Error states** - สถานะการดึงข้อมูล
- **Dependency Array** - ตรวจสอบการเปลี่ยนแปลง

---
