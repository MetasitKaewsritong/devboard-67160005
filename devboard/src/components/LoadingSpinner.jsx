// LoadingSpinner — แสดงขณะกำลังโหลดข้อมูล
function LoadingSpinner() {
    return (
        // wrapper จัด spinner ให้อยู่กึ่งกลางพื้นที่ที่เรียกใช้
        <div
            style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                padding: "2rem",
            }}
        >
            <div
                style={{
                    // วงกลม spinner: ใช้ border + animation แทนภาพ gif
                    width: "40px",
                    height: "40px",
                    border: "4px solid #e2e8f0",
                    // top คนละสีเพื่อให้เห็นการหมุนชัดเจน
                    borderTop: "4px solid #1e40af",
                    borderRadius: "50%",
                    animation: "spin 0.8s linear infinite",
                }}
            />
            {/* ประกาศ keyframes ใน component เพื่อให้ไฟล์นี้ใช้งานได้ทันที */}
            <style>{`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
        </div>
    );
}

export default LoadingSpinner;
