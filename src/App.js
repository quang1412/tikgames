import React, { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import io from "socket.io-client"
import "react-toastify/dist/ReactToastify.css"
import "./App.css"
import WheelOfFortune from "./games/wheelOfFortune"
import ConnectCard from "./components/connectCard"
import {
  MDBInputGroup,
  MDBBtn,
  MDBIcon,
  MDBRow,
  MDBCol,
  MDBCheckbox,
  MDBRange,
  MDBRadio,
  MDBCard,
  MDBCardHeader,
  MDBCardBody,
} from "mdb-react-ui-kit"
const socket = io({
  path: "/socket",
})

const defaultSettings = JSON.stringify({
  commentKey: "join",
  follower: true,
  friend: true,
  giftCount: 1,
  giftName: "rose",
  joinEvent: "chat",
  maxPlayer: 100,
  unfollower: true,
  winnerShowDuration: 10,
})

const LoadingPage = () => {
  return <></>
}

const SettingsCard = ({ current, update }) => {
  function handleChange(e) {
    const target = e.target
    const type = target.type
    const name = target.name
    var value = target.value
    switch (type) {
      case "radio":
        if ("true false".includes(value)) {
          value = value === "true"
        }
        break
      case "checkbox":
        value = target.checked
        break
      case "number":
      case "range":
        const min = parseInt(target.min)
        const int = parseInt(value || min)
        const float = parseFloat(value || min)
        value = Math.max(min, int, float)
        target.value = value
        break
      case "text":
        break
      default:
    }
    return update((current) => ({ ...current, [name]: value }))
  }

  return (
    <div>
      <MDBRow className="mb-3">
        <MDBCol size="md" md="4" lg="5">
          <label>Người chơi</label>
        </MDBCol>
        <MDBCol size="md" md="8" lg="7">
          <MDBCheckbox
            label="Bạn bè"
            name="friend"
            defaultChecked={current["friend"]}
            onChange={handleChange}
          />
          <MDBCheckbox
            label="Người theo dõi"
            name="follower"
            defaultChecked={current["follower"]}
            onChange={handleChange}
          />
          <MDBCheckbox
            label="Người chưa theo dõi"
            name="unfollower"
            defaultChecked={current["unfollower"]}
            onChange={handleChange}
          />
        </MDBCol>
      </MDBRow>
      <MDBRow className="mb-3">
        <MDBCol size="md" md="4" lg="5">
          <label>Số lượng người chơi</label>
        </MDBCol>
        <MDBCol size="md" md="8" lg="7">
          <MDBRange
            name="maxPlayer"
            defaultValue={current["maxPlayer"]}
            onChange={handleChange}
            step="1"
            min="2"
            max="100"
            type="range"
            className="form-range"
          />
        </MDBCol>
      </MDBRow>
      <MDBRow className="mb-3">
        <MDBCol size="md" md="4" lg="5">
          <label>Hành động</label>
        </MDBCol>
        <MDBCol size="md" lg="7" className="d-flex align-items-center gap-3">
          <MDBRadio
            name="joinEvent"
            label="Comment"
            value="chat"
            defaultChecked={current["joinEvent"] === "chat"}
            onChange={handleChange}
          />
          <MDBRadio
            name="joinEvent"
            label="Tặng quà"
            value="gift"
            defaultChecked={current["joinEvent"] === "gift"}
            onChange={handleChange}
          />
        </MDBCol>
      </MDBRow>
      {current["joinEvent"] === "chat" && (
        <MDBRow className="mb-3">
          <MDBCol size="md" md="4" lg="5">
            <label>Từ khoá comment</label>
          </MDBCol>
          <MDBCol size="md" md="8" lg="7">
            <input
              name="commentKey"
              defaultValue={current["commentKey"]}
              placeholder="bất kỳ"
              onInput={handleChange}
              type="text"
              className="form-control"
            />
          </MDBCol>
        </MDBRow>
      )}
      {current["joinEvent"] === "gift" && (
        <MDBRow className="mb-3">
          <MDBCol size="md" md="4" lg="5">
            <label>Quà tặng</label>
          </MDBCol>
          <MDBCol size="md" md="8" lg="7" className="d-flex align-items-center">
            <MDBInputGroup>
              <input
                name="giftCount"
                defaultValue={current["giftCount"]}
                onInput={handleChange}
                className="form-control "
                type="number"
                min="1"
                step="1"
              />
              <select
                name="giftName"
                defaultValue={current["giftName"]}
                onInput={handleChange}
                className="form-control w-75"
              >
                <option value="rose">Hoa Hồng</option>
                <option value="tiktok">Tiktok</option>
              </select>
            </MDBInputGroup>
          </MDBCol>
        </MDBRow>
      )}
      <MDBRow className="mb-3">
        <MDBCol size="md" md="4" lg="5">
          <label>
            Thời gian hiện người thắng <small>(giây)</small>
          </label>
        </MDBCol>
        <MDBCol size="md" md="8" lg="7">
          <MDBRange
            name="winnerShowDuration"
            defaultValue={current["winnerShowDuration"] || 5}
            onChange={handleChange}
            step="5"
            min="5"
            max="100"
            type="range"
            className="form-range"
          />
        </MDBCol>
      </MDBRow>
    </div>
  )
}

function App() {
  const [isConnected, setIsConnected] = useState(socket.connected)
  const [event, updateEvent] = useState({})
  const [settings, updateSettings] = useState(
    JSON.parse(window.localStorage.settings || defaultSettings)
  )

  const widgetControl = (action) => {
    updateEvent({ name: action })
    socket.emit("control", action)
  }

  useEffect(() => {
    socket.on("connect", async () => {
      setIsConnected(true)
      console.log("socket connected")
    })

    socket.on("disconnect", () => {
      setIsConnected(false)
    })

    socket.on("tiktok-chat", (data) => {
      updateEvent(data)
    })

    socket.on("tiktok-gift", (data) => {
      updateEvent(data)
    })

    socket.on("tiktok-follow", (data) => {
      updateEvent(data)
    })

    socket.on("tiktok-share", (data) => {
      updateEvent(data)
    })

    socket.on("tiktok-like", (data) => {
      updateEvent(data)
    })

    socket.on("tiktok-streamEnd", (reason) => {
      window.toast.info(`Livestream has ended: ${reason}`)
    })

    return () => {
      socket.off("connect")
      socket.off("disconnect")
      socket.off("tiktok-streamEnd")
    }
  }, [])

  useEffect(() => {
    window.localStorage.setItem("settings", JSON.stringify(settings))
    clearTimeout(window.saveDelay)
    window.saveDelay = setTimeout(
      () => socket.emit("updateSettings", settings),
      1000
    )
  }, [settings])

  useEffect(() => {
    console.log(event.name, event.uniqueId)
  }, [event])

  return (
    <>
      {!isConnected ? (
        <LoadingPage />
      ) : (
        <>
          <MDBRow className="animate__animated animate__fadeIn">
            <h5 className="text-light">Wheel of Fortune</h5>
            <MDBCol size="md" md="12" lg="5">
              <MDBCard className="mb-3 rounded-7 bg-trans">
                <MDBCardHeader className="border-0 pb-0">
                  <h6 className="mb-0">Kết nối Tiktok</h6>
                </MDBCardHeader>
                <MDBCardBody>
                  <ConnectCard socket={socket} />
                </MDBCardBody>
              </MDBCard>
              <MDBCard className="mb-3 rounded-7 bg-trans">
                <MDBCardHeader className="border-0 pb-0">
                  <h6 className="mb-0">Cài đặt</h6>
                </MDBCardHeader>
                <MDBCardBody>
                  <SettingsCard current={settings} update={updateSettings} />
                </MDBCardBody>
              </MDBCard>
              <MDBCard className="mb-3 rounded-7 bg-trans">
                <MDBCardHeader className="border-0 pb-0 ">
                  <h6 className="mb-0">Hiển thị lên Livestream</h6>
                </MDBCardHeader>
                <MDBCardBody>
                  <p className="mb-0">
                    Tạo cửa sô{" "}
                    <a href="https://obsproject.com/" target="_blank">
                      OBS studio
                    </a>{" "}
                    /{" "}
                    <a
                      href="https://www.tiktok.com/studio/download"
                      target="_blank"
                    >
                      Livestudio
                    </a>{" "}
                    nguồn trình duyệt bằng Url bên dưới
                  </p>
                  <p
                    style={{
                      marginBottom: 0,
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                    }}
                  >
                    <span>👉 </span>
                    <a
                      className="text-nowrap"
                      href={
                        window.location.origin +
                        "/widget/wheel-of-fortune" +
                        "?cid=" +
                        socket.id
                      }
                      target="_blank"
                    >
                      {window.location.origin +
                        "/widget/wheel-of-fortune" +
                        "?cid=" +
                        socket.id}
                    </a>
                  </p>
                </MDBCardBody>
              </MDBCard>
            </MDBCol>
            <MDBCol
              size="md"
              md="12"
              lg="7"
              className="overflow-hidden d-flex flex-column align-items-center justify-content-center"
            >
              <div className="mb-3">
                <div style={{ paddingBottom: "100px" }}>
                  <WheelOfFortune settings={settings} event={event} />
                </div>
                <div className="text-center text-light">
                  Lưu ý: đây là bản xem trước, kết quả không được đồng bộ với
                  livestream
                </div>
              </div>
              <div className="d-flex justify-content-center  align-items-center">
                <MDBBtn
                  color="light"
                  className="text-nowrap"
                  onClick={() => widgetControl("spin")}
                >
                  Quay <MDBIcon className="ms-1" fas icon="play" />
                </MDBBtn>
                <MDBBtn
                  color="light"
                  className="mx-1 text-nowrap"
                  onClick={() => widgetControl("restart")}
                >
                  Đặt lại <MDBIcon className="ms-1" fas icon="redo" />
                </MDBBtn>
              </div>
            </MDBCol>
          </MDBRow>
        </>
      )}
    </>
  )
}

export default App
