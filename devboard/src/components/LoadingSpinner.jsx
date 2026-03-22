// LoadingSpinner — แสดงขณะกำลังโหลดข้อมูล
function LoadingSpinner() {
    return (
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
                    width: "40px",
                    height: "40px",
                    border: "4px solid #e2e8f0",
                    // top คนละสีเพื่อให้เห็นการหมุนชัดเจน
                    borderTop: "4px solid #1e40af",
                    borderRadius: "50%",
                    animation: "spin 0.8s linear infinite",
                }}
            />
            <style>{`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
        </div>
    );
}

export default LoadingSpinner;
