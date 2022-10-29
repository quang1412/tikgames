import React, { useEffect, useState, memo } from "react"
// import { useOutletContext } from "react-router-dom"
import style from "./style.module.css"
import Winwheel from "winwheel"

const size = 400
const defaultSettings = {
  tiktokId: "",
  commentKey: "JOIN",
  follower: true,
  friend: true,
  giftCount: 1,
  giftName: "rose",
  joinEvent: "chat",
  maxPlayer: 100,
  unfollower: true,
  winnerShowDuration: 10,
}

window.wheelSoundTrigger = () => console.log("play sound")

const WheelBackground = () => {
  const [index, setindex] = useState(0)

  useEffect(() => {
    const i = setTimeout(() => setindex(1 - index), 1000)
    return () => clearTimeout(i)
  }, [index])

  return (
    <>
      <div
        className={style.wheelBg + (index ? " d-none" : "")}
        style={{
          backgroundImage: `url('/assets/images/wheel-of-fortune-bg-1.webp')`,
        }}
      ></div>
      <div
        className={style.wheelBg + (!index ? " d-none" : "")}
        style={{
          backgroundImage: `url('/assets/images/wheel-of-fortune-bg-2.webp')`,
        }}
      ></div>
    </>
  )
}

const Wheel = (props) => {
  const { players } = props

  useEffect(() => {
    function createWheel() {
      const keys = Object.keys(players)
      const segments = !keys.length
        ? [
            {
              fillStyle: "#ff0000",
              textFillStyle: "#ff0000",
              text: "",
            },
          ]
        : keys.map((uniqueId, index) => {
            const player = players[uniqueId]
            return {
              id: player.uniqueId,
              text: player.uniqueId,
              name: player.nickname || "",
              fillStyle: index % 2 === 0 ? "#ff0000" : "#ffffff",
              textFillStyle: index % 2 === 0 ? "#ffffff" : "#ff0000",
              image: player.profilePictureUrl,
            }
          })
      window.wheel = new Winwheel({
        numSegments: segments.length,
        responsive: true,
        innerRadius: (size / 2) * 0.08,
        outerRadius: (size / 2) * 0.725,
        centerY: (size / 2) * 0.9,
        centerX: size / 2,
        textFontSize: (size / 2) * 0.07,
        lineWidth: 1,
        segments: segments,
        animation: {
          type: "spinToStop",
          easing: "Power2.easeOut",
          duration: 30,
          spins: 30,
          // callbackSound: "window.wheelSoundTrigger()",
          soundTrigger: "pin",
          callbackFinished: "window.wheelFinished()",
        },
        pins: {
          number: segments.length,
          responsive: true,
          outerRadius: 0,
        },
      })
      window.wheel.rotationAngle = 0
      window.wheel.draw()
    }

    createWheel()

    return () => {
      try {
        window.wheel.stopAnimation(false)
      } catch (e) {}
      window.wheel = null
    }
  }, [players])

  return (
    <canvas
      className={style.wheelCanvas}
      id="canvas"
      width={size}
      height={size}
    >
      Canvas not supported, use another browser.
    </canvas>
  )
}

const Winner = (props) => {
  const { info, duration } = props
  const [isShow, setShow] = useState(true)

  function onAnimationEnd(e) {
    const target = e.target
    target.classList.remove("animate__zoomInDown")
    setTimeout(() => {
      target.classList.add("animate__fadeOut")
      target.removeEventListener("animationend", onAnimationEnd)
      target.addEventListener("animationend", () => {
        setShow(false)
      })
    }, duration * 1000)
  }
  return (
    isShow && (
      <div
        className="animate__animated animate__zoomInDown h-100 text-center d-flex flex-column justify-content-center align-items-center"
        style={{ marginTop: "-40px" }}
        onAnimationEnd={onAnimationEnd}
      >
        <span
          className="fw-bolder fs-4 text-info"
          style={{
            textShadow:
              "2px 2px 0 #ffffff, 2px -2px 0 #ffffff, -2px 2px 0 #ffffff, -2px -2px 0 #ffffff, 2px 0px 0 #ffffff, 0px 2px 0 #ffffff, -2px 0px 0 #ffffff, 0px -2px 0 #ffffff",
          }}
        >
          WINNER
        </span>
        <img
          className="d-block rounded-circle mx-auto border border-5 border-info"
          width="150"
          height="150"
          alt="winner"
          src={info.image}
          onError={window.imageOnError}
        />
        <span
          className="fw-bolder fs-4 text-info lh-1"
          style={{
            textShadow:
              "2px 2px 0 #ffffff, 2px -2px 0 #ffffff, -2px 2px 0 #ffffff, -2px -2px 0 #ffffff, 2px 0px 0 #ffffff, 0px 2px 0 #ffffff, -2px 0px 0 #ffffff, 0px -2px 0 #ffffff",
          }}
        >
          {info.name}
          <br />
          <small className="fs-6">{info.text}</small>
        </span>
      </div>
    )
  )
}

const TutorialCard = ({ settings, playerCount, show }) => {
  const O = {
    "bạn bè": settings.friend,
    "người theo dõi": settings.follower,
    "chưa theo dõi": settings.unfollower,
  }
  const players = []
  for (const key in O) {
    O[key] && players.push(key)
  }
  return (
    <div
      style={{ fontSize: ".8rem", width: "85%" }}
      className={
        "bg-light border border-1 text-dark text-start p-2 rounded-5 mx-auto animate__animated " +
        (show ? "animate__flipInX" : "animate__flipOutX")
      }
    >
      <p className="mb-0 text-nowrap">- Người chơi: {players.join(" / ")}</p>
      <p className="mb-0 text-nowrap">
        - Điều kiện:{" "}
        {settings.joinEvent === "chat" ? (
          <>
            comment nội dung
            <span className="text-danger ms-2">{settings.commentKey}</span>
          </>
        ) : (
          settings.joinEvent === "gift" && (
            <>
              tặng tối thiểu combo
              <span className="text-danger ms-2">
                {settings.giftCount} {settings.giftName}
              </span>
            </>
          )
        )}
      </p>
      <p className="mb-0 text-nowrap">
        - Đã tham gia: {playerCount + " / " + settings.maxPlayer}
      </p>
    </div>
  )
}

const JoinedPlayer = ({ players, show }) => {
  const container = document.getElementById("joined-players")

  const handleAnimationEnd = (e) => {
    e.target.classList.remove("animate__backInUp", "opacity-100")
    setTimeout(() => {
      e.target.classList.add("animate__zoomOut")
    }, 3000)
    e.target.onanimationend = e.target.remove
  }

  useEffect(() => {
    const lastPlayer = Object.values(players).pop()
    const image = window.document.createElement("img")
    image.src = window.imageUrlFixing(
      lastPlayer?.profilePictureUrl || window.defaultAvatar
    )
    image.className =
      "position-absolute start-0 top-0 rounded-circle rounded-circle border border-light border-5 opacity-100 animate__animated animate__slow animate__backInUp"
    image.setAttribute("width", 80)
    image.setAttribute("height", 80)
    image.onanimationend = handleAnimationEnd
    image.style.marginLeft = window.randomInt(0, 320) + "px"
    image.style.marginTop = window.randomInt(0, 320) + "px"

    lastPlayer &&
      setTimeout(() => {
        container.appendChild(image)
      }, window.randomInt(100, 500))
  }, [players])

  return (
    <div
      className={
        "position-relative " + (!show && "animate__animated animate__zoomOut")
      }
      id="joined-players"
    ></div>
  )
}

function WheelofFortune({ event, settings }) {
  const [setting_1, updateSettings] = useState(defaultSettings)
  const [players, setPlayers] = useState({})
  const [canJoin, setCanjoin] = useState(true)
  const [winner, setWinner] = useState(false)
  const [isSpining, setIsSpining] = useState(false)

  function startSpin() {
    if (Object.keys(players).length < 2 || isSpining) return
    window.wheel.rotationAngle = Math.floor(Math.random() * 359) + 1
    window.wheel.draw()
    window.wheel.startAnimation()
    setCanjoin(false)
    setWinner(false)
    setIsSpining(true)
  }

  function resetWheel() {
    try {
      window.wheel.stopAnimation(false)
    } catch (e) {}
    window.wheel.rotationAngle = 0
    window.wheel.draw()
    setPlayers({})
    setIsSpining(false)
    setCanjoin(true)
    setWinner(false)
  }

  useEffect(() => {
    settings && updateSettings(settings)
  }, [settings])

  useEffect(() => {
    const validFollowrRole = {
      0: setting_1.unfollower,
      1: setting_1.follower,
      2: setting_1.friend,
    }

    const { name, uniqueId, nickname, profilePictureUrl, followRole } = event

    if (name === "spin") return startSpin()
    if (name === "restart") return resetWheel()
    setPlayers((current) => {
      // if (!window.cid) return demoPlayer

      const isLimit = Object.keys(current).length >= setting_1.maxPlayer
      if (isLimit || !canJoin) return current

      const isJoined = current[uniqueId]
      if (
        isJoined ||
        name !== setting_1.joinEvent ||
        !validFollowrRole[followRole]
      )
        return current

      var valid
      switch (name) {
        case "chat":
          const { comment } = event
          valid = comment && comment.includes(setting_1.commentKey)
          break
        case "gift":
          const { giftType, giftName, repeatCount, repeatEnd } = event
          if (giftType === 1 && !repeatEnd) break
          valid =
            giftName === setting_1.giftName && repeatCount < setting_1.giftCount
          break
        default:
      }
      return valid
        ? { ...current, [uniqueId]: { uniqueId, nickname, profilePictureUrl } }
        : current
    })
  }, [event, canJoin, setting_1])

  useEffect(() => {
    window.wheelFinished = () => {
      let winningSegment = window.wheel.getIndicatedSegment()
      setWinner(winningSegment.id ? winningSegment : false)
      setIsSpining(false)
      console.warn(winningSegment.text, "is winner")
    }
    return () => {
      window.wheelFinished = null
    }
  }, [])

  return (
    <div
      className="position-relative mx-auto p-2"
      style={{ width: `${size}px`, height: `${size}px` }}
    >
      <TutorialCard
        settings={setting_1}
        playerCount={Object.keys(players).length}
        show={canJoin}
      />
      <div
        className="position-absolute w-100 text-center"
        style={{ zIndex: "1" }}
      >
        <JoinedPlayer players={players} show={canJoin} />
      </div>
      <div className="position-absolute  ">
        <Wheel players={players} />
      </div>
      <div className="position-absolute w-100 h-100">
        <WheelBackground />
      </div>
      <div className="position-absolute w-100 h-100">
        {winner && winner.id && (
          <Winner info={winner} duration={setting_1.winnerShowDuration || 10} />
        )}
      </div>
    </div>
  )
}
export default memo(WheelofFortune)
