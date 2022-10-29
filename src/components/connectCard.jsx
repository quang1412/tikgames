import React, { useState, useEffect, useRef } from "react"
import {
  MDBSpinner,
  MDBInputGroup,
  MDBBtn,
  MDBIcon,
  MDBCard,
  MDBCardHeader,
  MDBCardBody,
} from "mdb-react-ui-kit"

export default function InputCard({ socket }) {
  const [isLoading, setLoading] = useState(false)
  const tiktokIdRef = useRef(null)
  const btnRef = useRef(null)

  function start() {
    tiktokIdRef.current.setAttribute("disabled", true)
    btnRef.current.setAttribute("disabled", true)
    const id = tiktokIdRef.current.value
    socket.emit("createRoom", id)
    window.localStorage.setItem("lastTiktokId", id)
    setLoading(true)
  }

  useEffect(() => {
    return tiktokIdRef.current.focus()
  })

  useEffect(() => {
    socket.on("tiktok-connectSuccess", () => {
      window.toast.success(`Connected successfully!`)
      setLoading(false)
    })

    socket.on("tiktok-connectFailed", (error) => {
      tiktokIdRef.current.removeAttribute("disabled")
      btnRef.current.removeAttribute("disabled")
      window.toast.error(`${error}`)
      setLoading(false)
    })

    socket.on("tiktok-streamEnd", (reason) => {
      tiktokIdRef.current.removeAttribute("disabled")
      btnRef.current.removeAttribute("disabled")
      window.toast.info(`Livestream has ended: ${reason}`)
    })

    return () => {
      socket.off("tiktok-connectSuccess")
      socket.off("tiktok-connectFailed")
      socket.off("tiktok-streamEnd")
    }
  }, [])

  return (
    <>
      <MDBInputGroup>
        <input
          ref={tiktokIdRef}
          className="form-control"
          placeholder="enter tiktok id"
          type="text"
          defaultValue={window.localStorage.lastTiktokId}
        />
        <MDBBtn ref={btnRef} onClick={start} className="position-relative">
          <span className={isLoading ? "invisible" : ""}>
            Kết nối <MDBIcon className="ms-1" fas icon="angle-right" />
          </span>
          {isLoading && (
            <div className="position-absolute top-0 bottom-0 start-0 end-0 mx-auto">
              <MDBSpinner className="my-2" size="sm">
                <span className="visually-hidden">Loading...</span>
              </MDBSpinner>
            </div>
          )}
        </MDBBtn>
      </MDBInputGroup>
    </>
  )
}
