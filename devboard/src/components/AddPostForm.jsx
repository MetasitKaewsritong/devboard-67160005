import { useState } from "react";

// AddPostForm — ฟอร์มสำหรับเพิ่มโพสต์ใหม่
function AddPostForm({ onAddPost }) {
    // state ของ controlled form
    const [title, setTitle] = useState("");
    const [body, setBody] = useState("");

    // จัดการส่งฟอร์ม
    function handleSubmit(e) {
        e.preventDefault();
        // กันเคสผู้ใช้กดส่งทั้งที่ยังไม่กรอก
        if (!title.trim() || !body.trim()) return; // ป้องกันส่งว่าง

        // ส่งข้อมูลขึ้น parent (lifting state up)
        onAddPost({ title, body });
        setTitle(""); // เคลียร์ฟอร์มหลังส่ง
        setBody("");
    }

    return (
        <form
            onSubmit={handleSubmit}
            // ใช้ onSubmit ที่ form เพื่อรองรับทั้งคลิกปุ่มและกด Enter
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

            {/* ช่องกรอกหัวข้อ */}
            <input
                type="text"
                placeholder="หัวข้อโพสต์"
                value={title}
                // controlled input: ทุกตัวอักษรถูกเก็บใน state
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

            {/* ช่องกรอกเนื้อหาโพสต์ */}
            <textarea
                placeholder="เนื้อหาโพสต์"
                value={body}
                // controlled textarea แบบเดียวกับ title
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

            {/* ปุ่มส่งโพสต์ */}
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
