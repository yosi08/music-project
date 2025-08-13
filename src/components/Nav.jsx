// components/Nav.js
import React from "react";
import { Link } from "react-router-dom";

export default function Nav() {
  return (
    <nav>
      <Link to="/">홈</Link> |{" "}
      <Link to="/about">소개</Link> |{" "}
      <Link to="/profile/123">내 프로필</Link>
    </nav>
  );
}