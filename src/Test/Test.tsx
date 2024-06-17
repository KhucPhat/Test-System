import CustomTextField from "./TestChangeInput/TestInputChangeParameter";

function Test() {
  function downloadJSON(data, filename = "data.json") {
    // Không cần chuyển đổi data sang JSON vì nó đã là một chuỗi JSON đúng định dạng
    const blob = new Blob([data], { type: "application/json" });

    // Tạo liên kết tải xuống
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();

    // Dọn dẹp sau khi tải xuống
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }

  return (
    <div>
      <h1>JSON Data Viewer</h1>
      <CustomTextField />
    </div>
  );
}

export default Test;
