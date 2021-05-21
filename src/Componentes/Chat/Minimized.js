import * as React from "react";
import { IconButton, ChatIcon } from "@livechat/ui-kit";
import Cookies from "universal-cookie";

const cookies = new Cookies();
const Minimized = ({ maximize }) => (
  <div
    onClick={maximize}
    style={{
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      width: "60px",
      height: "60px",
      background: "#0093FF",
      color: "#fff",
      borderRadius: "50%",
      cursor: "pointer",
    }}
  >
    {cookies.remove("idrow", { path: "/" })}
    {cookies.remove("id2row", { path: "/" })}
    {cookies.remove("nombrerow", { path: "/" })}
    {cookies.remove("fotorow", { path: "/" })}
    <IconButton color="#fff">
      <ChatIcon />
    </IconButton>
  </div>
);

export default Minimized;