import { BrowserRouter, Routes, Route } from "react-router-dom";
import { FavoritesProvider } from "./context/FavoritesContext";
import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import PostDetailPage from "./pages/PostDetailPage";
import ProfilePage from "./pages/ProfilePage";
import FavoritesPage from "./pages/FavoritesPage";

// App คือ root component ที่รวม "Context + Router + Layout หลัก" ไว้จุดเดียว
function App() {
  return (
    // ครอบทั้งแอปด้วย Context เพื่อให้ทุกหน้าจัดการ favorites ร่วมกันได้
    <FavoritesProvider>
      {/* BrowserRouter อ่าน path จาก URL และ render หน้าแบบไม่ reload */}
      <BrowserRouter>
        {/* Navbar วางนอก Routes เพื่อให้แสดงทุกหน้า */}
        <Navbar />
        {/* Routes คือจุด mapping ระหว่าง path กับ page component */}
        <Routes>
          {/* route หลักของแอป */}
          <Route path="/" element={<HomePage />} />
          {/* dynamic route: /posts/3 -> id = 3 ใน PostDetailPage */}
          <Route path="/posts/:id" element={<PostDetailPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/favorites" element={<FavoritesPage />} />
        </Routes>
      </BrowserRouter>
    </FavoritesProvider>
  );
}

export default App;
