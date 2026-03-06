import { useState } from "react";
import PostCard from "./PostCard";
import PostCount from "./PostCount";

// PostList — แสดงรายการโพสต์ พร้อมระบบค้นหาและเรียงลำดับ
function PostList({ posts, favorites, onToggleFavorite, onDeletePost }) {
    const [search, setSearch] = useState("");
    const [sortOrder, setSortOrder] = useState("desc");

    // กรองโพสต์ตามคำค้นหา
    const filtered = posts.filter((post) =>
        post.title.toLowerCase().includes(search.toLowerCase())
    );

    // เรียงลำดับตาม id (ใหม่สุด/เก่าสุด)
    const sorted = [...filtered].sort((a, b) =>
        sortOrder === "desc" ? b.id - a.id : a.id - b.id
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

            {/* แสดงจำนวนโพสต์ทั้งหมด */}
            <PostCount count={posts.length} />

            {/* ช่องค้นหาโพสต์ */}
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

            {/* ปุ่มสลับการเรียงลำดับ */}
            <button
                onClick={() => setSortOrder((prev) => (prev === "desc" ? "asc" : "desc"))}
                style={{
                    background: "none",
                    border: "1px solid #cbd5e0",
                    borderRadius: "6px",
                    padding: "0.4rem 0.75rem",
                    cursor: "pointer",
                    fontSize: "0.9rem",
                    color: "#4a5568",
                    marginBottom: "1rem",
                }}
            >
                {sortOrder === "desc" ? "🔽 ใหม่สุดก่อน" : "🔼 เก่าสุดก่อน"}
            </button>

            {/* ข้อความเมื่อไม่พบโพสต์ */}
            {sorted.length === 0 && (
                <p style={{ color: "#718096", textAlign: "center", padding: "2rem" }}>
                    ไม่พบโพสต์ที่ค้นหา
                </p>
            )}

            {/* แสดงรายการโพสต์ */}
            {sorted.map((post) => (
                <PostCard
                    key={post.id}
                    title={post.title}
                    body={post.body}
                    isFavorite={favorites?.includes(post.id)}
                    onToggleFavorite={() => onToggleFavorite?.(post.id)}
                    onDeletePost={() => onDeletePost?.(post.id)}
                />
            ))}
        </div>
    );
}

export default PostList;