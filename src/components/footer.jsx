import React from "react"
import { Link } from "react-router-dom"

export default function Footer() {
  return (
    <footer className="container d-flex justify-content-between py-2">
      <div>
        Developed by
        <a href="https://fb.com/trinhdacquang" target="_blank">
          {" "}
          QuangPlus
        </a>
      </div>
      <div>
        <Link className="me-4" to="/">
          Trang chủ
        </Link>
        <Link className="me-4" to="/support">
          Hỗ trợ
        </Link>
        <a href="https://www.messenger.com/t/100006470628881" target="_blank">
          Liên hệ
        </a>
      </div>
    </footer>
  )
}
