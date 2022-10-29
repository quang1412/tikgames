import React from "react"
import { Link } from "react-router-dom"

export default function Footer() {
  return (
    <footer className="container mt-3 mt-md-0 d-flex justify-content-between py-2">
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
        <a className="me-4" href="https://fb.com/trinhdacquang" target="_blank">
          Facebook
        </a>
        <a className="me-4" href="https://tiktok.com" target="_blank">
          Tiktok
        </a>
        <a className="me-4" href="https://zalo.me/0794014600" target="_blank">
          Zalo
        </a>
      </div>
    </footer>
  )
}
