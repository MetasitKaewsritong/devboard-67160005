// PostCard — การ์ดแสดงโพสต์แต่ละรายการ พร้อมปุ่มถูกใจและลบ
function PostCard({ title, body, isFavorite, onToggleFavorite, onDeletePost }) {
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
            {/* หัวข้อโพสต์ */}
            <h3 style={{ margin: "0 0 0.5rem", color: "#1e40af" }}>{title}</h3>

            {/* เนื้อหาโพสต์ */}
            <p style={{ margin: "0 0 0.75rem", color: "#4a5568", lineHeight: 1.6 }}>
                {body}
            </p>

            {/* กลุ่มปุ่ม: ถูกใจ + ลบ */}
            <div style={{ display: "flex", gap: "0.5rem" }}>
                {/* ปุ่มถูกใจ — สลับระหว่าง ❤️ กับ 🤍 */}
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

                {/* ปุ่มลบโพสต์ */}
                <button
                    onClick={onDeletePost}
                    style={{
                        background: "none",
                        border: "none",
                        cursor: "pointer",
                        fontSize: "1.2rem",
                        padding: "0.25rem 0.5rem",
                        borderRadius: "4px",
                        color: "#a0aec0",
                    }}
                >
                    🗑️ ลบ
                </button>
            </div>
        </div>
    );
}

export default PostCard;