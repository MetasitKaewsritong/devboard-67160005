import { useState, useEffect } from "react";
import UserCard from "./UserCard";
import LoadingSpinner from "./LoadingSpinner";

// UserList — ดึงรายชื่อสมาชิกจาก API แล้วแสดงเป็น UserCard
function UserList() {
    // users: เก็บข้อมูลสมาชิกที่ดึงมาจาก API
    const [users, setUsers] = useState([]);
    // loading: ใช้ควบคุมสถานะระหว่างรอข้อมูล
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // ดึง users ครั้งเดียวตอนเปิดหน้า profile
        async function fetchUsers() {
            try {
                // ยิง request ไป JSONPlaceholder เพื่อดึง users ทั้งหมด
                const res = await fetch("https://jsonplaceholder.typicode.com/users");
                // แปลง response เป็น JSON ก่อนใช้งาน
                const data = await res.json();
                // เก็บข้อมูลลง state เพื่อให้ React render รายการสมาชิก
                setUsers(data);
            } catch {
                // ตัวอย่างนี้ยังไม่โชว์ error UI
                // ถ้าจะให้สมบูรณ์ขึ้น ควรเพิ่ม error state แล้วแสดงข้อความแจ้งผู้ใช้
            } finally {
                // ไม่ว่าสำเร็จหรือพลาด ต้องปิด loading เสมอ
                setLoading(false);
            }
        }
        // เรียกฟังก์ชัน fetch จริง
        fetchUsers();
        // dependency ว่าง [] = ทำงานครั้งเดียวตอน component mount
    }, []);

    // ระหว่างโหลดให้แสดง spinner ก่อน เพื่อให้ผู้ใช้รู้ว่าระบบกำลังทำงาน
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
            {/* map ข้อมูลสมาชิกแต่ละคนออกมาเป็น UserCard */}
            {users.map((user) => (
                // key ช่วยให้ React track แต่ละรายการได้ถูกต้องและอัปเดตมีประสิทธิภาพ
                <UserCard key={user.id} name={user.name} email={user.email} />
            ))}
        </div>
    );
}

export default UserList;
