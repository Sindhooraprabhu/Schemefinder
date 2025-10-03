import React from "react";

const SchemeCard = ({ scheme }) => (
  <div style={{
    background: "#fff",
    borderRadius: "12px",
    boxShadow: "0 2px 12px #0001",
    padding: "20px 28px",
    marginBottom: "22px",
    maxWidth: "540px"
  }}>
    <div style={{ fontSize: "1.2rem", fontWeight: "700", marginBottom: "6px", color: "#1a3c84" }}>
      {scheme.Name_en}
      <span style={{ fontWeight: 400, fontSize: ".93rem", color: "#5f5f88", marginLeft: 7 }}>
        {scheme.Name_kn}
      </span>
    </div>
    <div style={{ marginBottom: "8px" }}>
      <b>Description:</b> {scheme.Description_en}
    </div>
    <div style={{ marginBottom: "5px" }}>
      <b>Category:</b> {scheme.Category}
    </div>
    <div style={{ marginBottom: "5px" }}>
      <b>Target Audience:</b> {scheme.Target_audience}
    </div>
    {scheme.Objective_en &&
      <div style={{ marginBottom: "5px" }}>
        <b>Objective:</b> {scheme.Objective_en}
      </div>
    }
    {scheme.Benefits_en &&
      <div style={{ marginBottom: "7px", color: "#218833", fontWeight: 500 }}>
        <b>Benefits:</b> {scheme.Benefits_en}
      </div>
    }
    {scheme.Required_documents &&
      <div style={{ marginBottom: "5px" }}>
        <b>Required Documents:</b> {scheme.Required_documents}
      </div>
    }
  </div>
);

export default SchemeCard;
