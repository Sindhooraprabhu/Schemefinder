import React from "react";

const skipFields = key => [
  "_id", "userId", "__v", "eligibleSchemes"
].includes(key);

const formatFieldName = field =>
  field.replace(/([A-Z])/g, " $1").replace(/^./, s => s.toUpperCase());

const isImage = fname => /\.(jpg|jpeg|png|gif|bmp|webp)$/i.test(fname);

const getFileName = val => typeof val === "string" ? val.split(/[\\/]/).pop() : "";

const renderValue = (key, value) => {
  if (Array.isArray(value)) {
    if (!value.length) return <span style={{ color: "#888" }}>N/A</span>;
    return (
      <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
        {value.map((item, idx) => {
          if (item && typeof item === "object") {
            const url = item.url || item.filePath || item.filename || item.path;
            const name = item.name || item.title || getFileName(url) || `File #${idx + 1}`;
            if (url) {
              if (isImage(url)) {
                return (
                  <div key={idx} style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                    <img
                      src={`http://localhost:5000/${url}`}
                      alt={name}
                      style={{ height: 54, border: "1px solid #ddd", borderRadius: 8 }}
                    />
                    <span style={{ fontWeight: 500 }}>{name}</span>
                  </div>
                );
              }
              return (
                <a
                  key={idx}
                  href={`http://localhost:5000/${url}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ fontWeight: 500, color: "#176fe4" }}
                >
                  {name}
                </a>
              );
            }
            return (
              <div key={idx} style={{ color: "#888" }}>
                {Object.keys(item).map(k =>
                  <span key={k}><b>{formatFieldName(k)}:</b> {item[k]} </span>
                )}
              </div>
            );
          }
          if (isImage(item)) {
            return (
              <img
                key={idx}
                src={`http://localhost:5000/${item}`}
                alt={formatFieldName(key)}
                style={{ height: 54, border: "1px solid #ddd", borderRadius: 8 }}
              />
            );
          }
          return (
            <a
              href={`http://localhost:5000/${item}`}
              target="_blank"
              rel="noopener noreferrer"
              key={idx}
              style={{ fontWeight: 500, color: "#176fe4" }}
            >
              {getFileName(item) || `${formatFieldName(key)} #${idx + 1}`}
            </a>
          );
        })}
      </div>
    );
  }
  if (typeof value === "object" && value !== null) {
    return <span style={{ color: "#888" }}>N/A</span>;
  }
  if (key.toLowerCase().includes("date")) {
    try {
      const d = new Date(value);
      if (!isNaN(d)) return d.toLocaleString();
    } catch {}
  }
  return value !== undefined && value !== null && value !== ""
    ? <span style={{ fontWeight: 500 }}>{value}</span>
    : <span style={{ color: "#888" }}>N/A</span>;
};

const UserDashboardDetails = ({ dashboardData }) => {
  if (!dashboardData) return null;
  return (
    <div style={{
      margin: "0 auto 36px auto",
      maxWidth: 500,
      padding: "32px 24px",
      background: "#f7f9fa",
      borderRadius: "14px",
      boxShadow: "0 2px 12px rgba(0,0,0,0.08)"
    }}>
      <h5 style={{ textAlign: "center", fontWeight: 600, marginBottom: 28 }}>User Specific Data</h5>
      {Object.entries(dashboardData)
        .filter(([key]) => !skipFields(key))
        .map(([key, value]) => (
          <div key={key} style={{ marginBottom: "28px" }}>
            <div style={{ fontSize: "1rem", fontWeight: 600, marginBottom: 7 }}>
              {formatFieldName(key)}
            </div>
            <div style={{ fontSize: "1rem" }}>
              {renderValue(key, value)}
            </div>
          </div>
      ))}
    </div>
  );
};

export default UserDashboardDetails;
