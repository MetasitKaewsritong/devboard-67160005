import { createContext, useContext, useState } from "react";

// 1. สร้าง context object
const FavoritesContext = createContext();

// 2. Provider component — ครอบ App ทั้งหมด
export function FavoritesProvider({ children }) {
  // favorites เก็บ postId ที่ผู้ใช้กดหัวใจไว้
  const [favorites, setFavorites] = useState([]);

  // toggle: ถ้ามีอยู่แล้วให้เอาออก, ถ้ายังไม่มีให้เพิ่มเข้า list
  function toggleFavorite(postId) {
    setFavorites((prev) =>
      prev.includes(postId)
        ? prev.filter((id) => id !== postId)
        : [...prev, postId],
    );
  }

  return (
    // value ที่ส่งให้ทั้งแอปใช้: ข้อมูล favorites + ฟังก์ชัน toggle
    <FavoritesContext.Provider value={{ favorites, toggleFavorite }}>
      {children}
    </FavoritesContext.Provider>
  );
}

// 3. Custom hook สำหรับใช้งาน context ง่าย ๆ
export function useFavorites() {
  // component ไหนเรียก hook นี้จะเข้าถึง { favorites, toggleFavorite } ได้
  return useContext(FavoritesContext);
}
