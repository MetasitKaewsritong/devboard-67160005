// กำหนดสี avatar ตามตัวอักษรแรกของชื่อ
function getAvatarColor(name) {
    const code = name.toUpperCase().charCodeAt(0);
    if (code >= 65 && code <= 71) return "#1e40af"; // A–G → น้ำเงิน
    if (code >= 72 && code <= 78) return "#16a34a"; // H–N → เขียว
    return "#7c3aed"; // O–Z → ม่วง
}

// UserCard — การ์ดแสดงข้อมูลสมาชิก พร้อม avatar ที่มีสีตามชื่อ
function UserCard({ name, email }) {
    // ดึงตัวอักษรแรกของแต่ละคำมาทำ avatar
    const initials = name
        .split(" ")
        .map((n) => n[0])
        .join("");

    const avatarColor = getAvatarColor(name);

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
                    background: avatarColor,
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