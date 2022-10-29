const {
  WebcastPushConnection,
  signatureProvider,
} = require("tiktok-live-connector")
const request = require("request")
const bodyParser = require("body-parser")
const socket = require("socket.io")
const express = require("express")
const path = require("path")
const app = express()
const { defaultSettings, fakeEvent } = require("./fakeData")
signatureProvider.config.extraParams.apiKey =
  "MzI2OGMwZDAxNjdhNzQ4ZjFhNDJmOTM0ZjliZmYyYWJhZmZiODUwMWQ4OTI3ZWVhNDRmYzY5"

app.use(express.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(bodyParser.raw())

// Express port-switching logic
let port
console.log("❇️ NODE_ENV is", process.env.NODE_ENV)
if (process.env.NODE_ENV === "production") {
  port = process.env.PORT || 3000
  app.use(express.static(path.join(__dirname, "../build")))
  app.get(/^((?!\/api\/).)*$/, (request, response) => {
    response.sendFile(path.join(__dirname, "../build", "index.html"))
  })
} else {
  port = 3001
  console.log("⚠️ Not seeing your changes as you develop?")
  console.log(
    "⚠️ Do you need to set 'start': 'npm run development' in package.json?"
  )
}
// Start the listener!
const server = app.listen(port, () => {
  console.log("❇️ Express server is running on port", server.address().port)
})

// const io = socket(server)
const io = socket(server, { path: "/socket" })

app.get("/api/channel-approve", async (req, res) => {
  const result = { error: false, error_msg: null, data: null }
  const cid = req.query.cid
  if (!cid || cid === "undefined") {
    result.error = true
    result.error_msg = "Dữ liệu đầu vào không hợp lệ"
  } else {
    const channelIsExist = socketsCustomInfo.countChannelId(cid)
    result.error = channelIsExist
    result.error_msg = channelIsExist
      ? "Phát hiện trùng lặp trang admin."
      : null
  }
  return res.status(200).send(result)
})

app.get("/api/ggtts", (req, res) => {
  let text = req.query.text || "xin chào"
  let lang = req.query.lang || "vi"
  let slow = (req.query.slow || false) == "true"
  speechBase64(text, lang, slow, (base64) => {
    base64
      ? res.status(200).send("data:audio/wav;base64," + base64)
      : res.status(500).send("fail")
  })
})

app.get("*", (req, res) => {
  res.redirect("/")
})

function makeid(length) {
  var result = ""
  var characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"
  var charactersLength = characters.length
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength))
  }
  return result
}
function currentTimeStamp() {
  return new Date().getTime()
}

function socketBroadcastRoomList() {
  const data = tiktokRoomsStorage.rooms.map((room) => room.info)
  io.of("/").emit("broadcast-roomList", data)
}

const tiktokRoomsStorage = {
  rooms: [],
  getRoomById: function (id) {
    const array = this.rooms.filter((room) => id === room.id)
    return array[0]
  },
}

const socketsCustomInfo = {
  data: {},
  create: function (socketId, channelId) {
    this.data = {
      ...this.data,
      [socketId]: {
        channelId: channelId,
        tiktokId: null,
        settings: {},
      },
    }
  },
  remove: function (socketId) {
    delete this.data[socketId]
  },
  set: function (socketId, props) {
    const current = this.data[socketId] || {}
    this.data[socketId] = { ...current, ...props }
  },
  getChannelByTiktokId: function (id = null) {
    const subscribers = []
    Object.keys(this.data).forEach((socketId) => {
      const { channelId, tiktokId } = this.data[socketId]
      tiktokId === id && subscribers.push(channelId)
    })
    return [...new Set(subscribers)] //unique filter
  },
  countChannelId: function (cid = null) {
    let count = 0
    for (var key in this.data) {
      const { channelId } = this.data[key]
      channelId === cid && count++
    }
    return count
  },
  getChannelSettings: function (cid = null) {
    let response = defaultSettings()
    for (var key in this.data) {
      const { channelId, settings } = this.data[key]
      if (channelId === cid) response = settings
    }
    return response
  },
}

class TiktokLive {
  constructor(tiktokId, socketId) {
    this.id = tiktokId
    this.socketId = socketId
    this.channelIds = []
    this.tiktok = new WebcastPushConnection(tiktokId || "norinpham_m4", {
      clientParams: { app_language: "en-US", device_platform: "web" },
      enableExtendedGiftInfo: false,
      processInitialData: false,
      requestHeaders: {},
      websocketHeaders: {},
    })
    this.info = {
      isConnected: false,
      roomInfo: {
        owner: {
          display_id: this.id,
          avatar_thumb: {
            url_list: ["/assets/images/default-avatar.webp"],
          },
        },
      },
    }
    this.listening()
    this.startConnect()

    tiktokRoomsStorage.rooms.push(this)
  }
  updateChannelIds() {
    this.channelIds = socketsCustomInfo.getChannelByTiktokId(this.id)
  }
  emit(messenger, data = true) {
    io.of("/").to(this.socketId).emit(messenger, data)
    io.of("/widget").to(this.socketId).emit(messenger, data)
    // io.of("/").to(`tiktok-${this.id}`).emit(messenger, data)
    // this.channelIds.map((id) => io.of("/widget").to(id).emit(messenger, data))
  }
  startConnect() {
    clearTimeout(this.disconnectDelay)
    this.emit("tiktok-roomInfo", this.info)
    if (this.info.isConnected) return

    this.info.isConnected = true
    this.tiktok
      .connect()
      .then((roomInfo) => {
        this.info = roomInfo
        this.emit("tiktok-connectSuccess")
        console.log("[tiktok] ✅ ", this.id, "connected :)")
      })
      .catch((err) => {
        this.emit(
          "tiktok-connectFailed",
          `Kết nối tới livestream ${this.id} thất bại - (${err})`
        )
        this.info.isConnected = false
        console.log("[tiktok] ❌ ", this.id, "connect failed :(" + err)
      })
      .finally(() => {
        this.emit("tiktok-roomInfo", this.info)
        // socketBroadcastRoomList()
      })
  }
  stopConnect() {
    this.disconnectDelay = setTimeout(() => this.tiktok.disconnect(), 60000)
  }
  listening() {
    this.tiktok.on("disconnected", () => {
      this.info.isConnected = false
      console.log("[tiktok] ❌", this.id, "disconnected")
      this.emit("tiktok-roomInfo", this.info)
      socketBroadcastRoomList()
    })

    this.tiktok.on("chat", (data) => {
      // console.log(this.id, `${data.uniqueId} writes: ${data.comment}`);
      this.emit("tiktok-chat", { ...data, name: "chat", id: makeid(10) })
    })

    this.tiktok.on("gift", (data) => {
      this.emit("tiktok-gift", { ...data, name: "gift", id: makeid(10) })
    })

    this.tiktok.on("like", (data) => {
      // console.log(this.id, `${data.uniqueId} sent ${data.likeCount} likes, total likes: ${data.totalLikeCount}`);
      this.emit("tiktok-like", { ...data, name: "like", id: makeid(10) })
    })

    this.tiktok.on("follow", (data) => {
      // console.log(this.id, 'social event data:', data);
      this.emit("tiktok-follow", { ...data, name: "follow", id: makeid(10) })
    })

    this.tiktok.on("share", (data) => {
      // console.log(this.id, 'social event data:', data);
      this.emit("tiktok-share", { ...data, name: "share", id: makeid(10) })
    })

    this.tiktok.on("roomUser", (data) => {
      this.emit("tiktok-roomUser", {
        ...data,
        name: "roomUser",
        id: makeid(10),
      })
    })

    this.tiktok.on("streamEnd", (actionId) => {
      const reason =
        actionId === 3
          ? "Stream ended by user"
          : actionId === 4 && "Stream ended by platform moderator (ban)"
      this.emit("tiktok-streamEnd", reason)
      console.log("streamEnd", reason)
    })
  }
}

const widgetSettings = {
  socketId: {
    option_1: "value_1",
    option_2: "value_2",
  },
}

/// WIDGET SOCKET CONNECT /////////////////
io.of("/widget").on("connection", async (s) => {
  const cid = s.handshake.query.cid
  console.log("CID", cid)
  if (!cid) return s.disconnect()
  s.join(cid)

  let settings = widgetSettings[cid] || new Object()
  s.emit("updateSettings", settings)

  s.on("disconnect", (reason) => {
    console.log("widget disconnect", reason)
  })
})

/// CHANNEL SOCKET CONNECT /////////////////
io.of("/").on("connection", async (socket) => {
  var tiktokRoom = {}
  socket.on("createRoom", (tiktokId) => {
    fetch("https://isetup.vn/tiktok/assets/js/tiktokgame.json")
      .then((resp) => resp.json())
      .then((body) => {
        console.log(body)
        if (body.expirationDate[tiktokId] > currentTimeStamp()) {
          console.log("create new room", tiktokId)
          tiktokRoom.tiktok && tiktokRoom.tiktok.disconnect()
          tiktokRoom = new TiktokLive(tiktokId, socket.id)
        } else {
          throw new Error()
        }
      })
      .catch((e) => {
        socket.emit(
          "tiktok-connectFailed",
          "Tài khoản Tiktok chưa đăng ký hoặc đã hết hạn"
        )
      })
  })

  socket.on("updateSettings", (settings) => {
    widgetSettings[socket.id] = settings
    io.of("/widget").to(socket.id).emit("updateSettings", settings)
  })

  socket.on("control", (action) => {
    io.of("/").to(socket.id).emit("control", action)
    io.of("/widget").to(socket.id).emit("control", action)
  })

  socket.on("disconnect", (reason) => {
    tiktokRoom.tiktok && tiktokRoom.tiktok.disconnect()
    delete widgetSettings[socket.id]
  })
})

// function speechBase64(text, lang, slow, callback) {
//   getAudioBase64(text, {
//     lang: lang,
//     slow: slow,
//     host: "https://translate.google.com",
//     timeout: 10000,
//     splitPunct: ",.?",
//   })
//     .then((base64sound) => {
//       return callback(base64sound)
//     })
//     .catch((error) => {
//       return callback(false)
//     })
// }
