// UserCard — การ์ดแสดงข้อมูลสมาชิก พร้อม avatar
function UserCard({ name, email }) {
    // ดึงตัวอักษรแรกของแต่ละคำมาทำ avatar
    const initials = name
        .split(" ")
        .map((n) => n[0])
        .join("");

    return (
        <div
            style={{
                display: "flex",
                alignItems: "center",
                gap: "1rem",
                border: "1px solid #e2e8f0",
                borderRadius: "8px",
                padding: "0.75rem 1rem",
                marginBottom: "0.75rem",
                background: "white",
            }}
        >
            {/* วงกลม avatar */}
            <div
                style={{
                    width: "40px",
                    height: "40px",
                    background: "#1e40af",
                    color: "white",
                    borderRadius: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontWeight: "bold",
                    fontSize: "0.9rem",
                }}
            >
                {initials}
            </div>

            {/* ชื่อและอีเมล */}
            <div>
                <div style={{ fontWeight: "bold", color: "#2d3748" }}>{name}</div>
                <div style={{ fontSize: "0.85rem", color: "#718096" }}>{email}</div>
            </div>
        </div>
    );
}

export default UserCard;