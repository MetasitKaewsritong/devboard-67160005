import PostList from "../components/PostList";
import AddPostForm from "../components/AddPostForm";

// HomePage คือหน้า landing ของแอป: มีฟอร์มเพิ่มโพสต์ + รายการโพสต์ล่าสุด
function HomePage() {
  return (
    <div style={{ maxWidth: "700px", margin: "2rem auto", padding: "0 1rem" }}>
      {/* ตอนนี้ onAddPost เป็น placeholder: โชว์แนวคิด controlled form + callback */}
      <AddPostForm onAddPost={() => {}} />
      {/* PostList รับผิดชอบ fetch/search/render รายการโพสต์ */}
      <PostList />
    </div>
  );
}

export default HomePage;
