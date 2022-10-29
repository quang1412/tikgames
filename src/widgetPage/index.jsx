import React, { useState, useEffect } from "react"
import io from "socket.io-client"
import "./style.module.css"

import { Outlet } from "react-router-dom"
const socket = io("/widget", {
  path: "/socket",
  query: {
    cid: new URLSearchParams(document.location.search).get("cid"),
  },
})

export default function Widget() {
  const [event, setEvent] = useState({})
  const [settings, updateSettings] = useState({})
  const [isConnected, setIsConnected] = useState(false)

  useEffect(() => {
    socket.on("connect", () => setIsConnected(true))
    socket.on("disconnect", () => setIsConnected(false))

    socket.on("updateSettings", (data) => updateSettings(data))
    socket.on("control", (action) => setEvent({ name: action }))

    socket.on("tiktok-gift", (data) => setEvent(data))
    socket.on("tiktok-chat", (data) => setEvent(data))
    socket.on("tiktok-like", (data) => setEvent(data))
    socket.on("tiktok-share", (data) => setEvent(data))
    socket.on("tiktok-follow", (data) => setEvent(data))

    return () => {
      socket.off("connect")
      socket.off("disconnect")
      socket.off("uodateSettings")
      socket.off("tiktok-gift")
      socket.off("tiktok-follow")
      socket.off("tiktok-share")
      socket.off("tiktok-like")
      socket.off("tiktok-chat")
    }
  }, [])

  return isConnected ? (
    <Outlet context={[event, settings]} />
  ) : (
    <h5>server connecting...</h5>
  )
}
