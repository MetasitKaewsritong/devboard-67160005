import UserList from "../components/UserList";

function ProfilePage() {
  return (
    <div style={{ maxWidth: "500px", margin: "2rem auto", padding: "0 1rem" }}>
      {/* หน้านี้แยก concern ชัดเจน: รับผิดชอบแค่แสดงสมาชิกผ่าน UserList */}
      <UserList />
    </div>
  );
}

export default ProfilePage;
