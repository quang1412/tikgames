// const express = require("express");
// const path = require("path");

// const app = express();

// // PWAs want HTTPS!
// function checkHttps(request, response, next) {
//   // Check the protocol — if http, redirect to https.
//   if (request.get("X-Forwarded-Proto").indexOf("https") != -1) {
//     return next();
//   } else {
//     response.redirect("https://" + request.hostname + request.url);
//   }
// }

// app.all("*", checkHttps);

// // A test route to make sure the server is up.
// app.get("/api/ping", (request, response) => {
//   console.log("❇️ Received GET request to /api/ping");
//   response.send("pong!");
// });

// // Express port-switching logic
// let port;
// console.log("❇️ NODE_ENV is", process.env.NODE_ENV);
// if (process.env.NODE_ENV === "production") {
//   port = process.env.PORT || 3000;
//   app.use(express.static(path.join(__dirname, "../build")));
//   app.get("*", (request, response) => {
//     response.sendFile(path.join(__dirname, "../build", "index.html"));
//   });
// } else {
//   port = 3001;
//   console.log("⚠️ Not seeing your changes as you develop?");
//   console.log(
//     "⚠️ Do you need to set 'start': 'npm run development' in package.json?"
//   );
// }

// // Start the listener!
// const listener = app.listen(port, () => {
//   console.log("❇️ Express server is running on port", listener.address().port);
// });



// const { database, getChannelSettings } = require("./fireStore")
const {
  WebcastPushConnection,
  signatureProvider,
} = require("tiktok-live-connector")
const bodyParser = require("body-parser")
const socket = require("socket.io")
const express = require("express")
const path = require("path")
const app = express()
const { defaultSettings, fakeEvent } = require("./fakeData")
const tiktokSocketPrefix = "tiktok-"
// let activeTiktokRoom = {}

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
  constructor(id) {
    this.id = id
    this.channelIds = []
    this.tiktok = new WebcastPushConnection(id || "norinpham_m4", {
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

    tiktokRoomsStorage.rooms.push(this)

    console.log("CREATE NEW TIKTOK ROOM", this.id)
  }
  updateChannelIds() {
    this.channelIds = socketsCustomInfo.getChannelByTiktokId(this.id)
  }
  emit(messenger, data = true) {
    io.of("/").to(`tiktok-${this.id}`).emit(messenger, data)
    this.channelIds.map((id) => io.of("/widget").to(id).emit(messenger, data))
  }
  startConnect() {
    // return

    clearTimeout(this.disconnectDelay)
    this.emit("tiktok-roomInfo", this.info)
    if (this.info.isConnected) return

    this.info.isConnected = true
    this.tiktok
      .connect()
      .then((roomInfo) => {
        this.info = roomInfo
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
        socketBroadcastRoomList()
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
  }
}

/// WIDGET SOCKET CONNECT /////////////////
io.of("/widget").on("connection", async (socket) => {
  const cid = socket.handshake.query.cid

  if (!cid) return socket.disconnect()

  console.log("🏞 A WIDGET WAS CONNECTED", cid)
  socket.join(cid)

  let settings = socketsCustomInfo.getChannelSettings(cid)
  socket.emit("updateSetting", settings)

  socket.on("disconnect", (reason) => {
    console.log("🏞 A WIDGET WAS DISCONNECTED", cid)
    console.log(reason)
  })
})

/// CHANNEL SOCKET CONNECT /////////////////
io.of("/").on("connection", async (socket) => {
  const cid = socket.handshake.query.cid
  if (!cid) return socket.disconnect()

  let currentTiktokID = null

  socketsCustomInfo.create(socket.id, cid)
  socket.join(cid)

  socket.on("updateSetting", (newSettings = {}) => {
    io.of("/widget").to(cid).emit("updateSetting", newSettings)
    const newTiktokID = newSettings.basic_tiktokid

    socketsCustomInfo.set(socket.id, {
      tiktokId: newTiktokID,
      settings: newSettings,
    })

    // const isPro =
    //   (newSettings.basic_proexpirationdate || 0) - currentTimeStamp() >= 0

    if (newTiktokID !== currentTiktokID) {
      socket.leave(tiktokSocketPrefix + currentTiktokID)
      socket.join(tiktokSocketPrefix + newTiktokID)
      currentTiktokID = newTiktokID
    }
  })

  const randomEventName = () =>
    ["like", "gift", "follow", "share", "chat"][Math.floor(Math.random() * 5)]
  socket.on("fakeEvent", (name = randomEventName()) => {
    const event = fakeEvent(name)
    io.of("/")
      .to(cid)
      .emit("tiktok-" + name, event)
    io.of("/widget")
      .to(cid)
      .emit("tiktok-" + name, event)
  })

  socket.on("widget-control", (action = "reset-likerank") => {
    io.of("/widget").to(cid).emit("widget-control", action)
  })

  console.log("🔰 A CHANNEL WAS CONNECTED", cid)

  socket.on("disconnect", (_) => {
    console.log("🔰 A CHANNEL WAS DISCONNECTED", cid)
    socketsCustomInfo.remove(socket.id)
  })
})

io.of("/").adapter.on("create-room", (room) => {
  if (room.includes(tiktokSocketPrefix)) {
    const tiktokId = room.replace(tiktokSocketPrefix, "")
    const r =
      tiktokRoomsStorage.getRoomById(tiktokId) || new TiktokLive(tiktokId)

    // tiktokRoom.updateChannelIds()
    // tiktokRoom.startConnect()
    // activeTiktokRoom[tiktokId] = tiktokRoom
  }
})

io.of("/").adapter.on("join-room", (room, id) => {
  if (room.includes(tiktokSocketPrefix)) {
    const tiktokId = room.replace(tiktokSocketPrefix, "")
    // const tiktokRoom = activeTiktokRoom[tiktokId]
    const tiktokRoom = tiktokRoomsStorage.getRoomById(tiktokId)
    tiktokRoom && (tiktokRoom.updateChannelIds(), tiktokRoom.startConnect())

    socketBroadcastRoomList()
  }
})

io.of("/").adapter.on("leave-room", (room, id) => {
  if (room.includes(tiktokSocketPrefix)) {
    const tiktokId = room.replace(tiktokSocketPrefix, "")
    // const tiktokRoom = activeTiktokRoom[tiktokId]
    const tiktokRoom = tiktokRoomsStorage.getRoomById(tiktokId)
    tiktokRoom && tiktokRoom.updateChannelIds()
  }
})

io.of("/").adapter.on("delete-room", (room) => {
  if (room.includes(tiktokSocketPrefix)) {
    const tiktokId = room.replace(tiktokSocketPrefix, "")
    // const tiktokRoom = activeTiktokRoom[tiktokId]
    const tiktokRoom = tiktokRoomsStorage.getRoomById(tiktokId)
    tiktokRoom && tiktokRoom.stopConnect()
  }
})

// setInterval(() => {
//   const data = tiktokRoomsStorage.rooms.map((room) => room.info)
//   io.of("/").emit("tiktok-roomList", data)
// }, 10000)

// app.get("/api/tts/word/:word", async (req, res) => {
//   const word = req.params.word
//   const subscriptionKey = "5046803c86b0454c9b854a51d6234c43"
//   const serviceRegion = "southeastasia"

//   const speechConfig = SpeechConfig.fromSubscription(
//     subscriptionKey,
//     serviceRegion
//   )

//   speechConfig.speechSynthesisOutputFormat =
//     SpeechSynthesisOutputFormat.Ogg24Khz16BitMonoOpus

//   const synthesizer = new SpeechSynthesizer(speechConfig)

//   synthesizer.speakSsmlAsync(
//     `
//     <speak version="1.0" xmlns="http://www.w3.org/2001/10/synthesis"
//        xmlns:mstts="https://www.w3.org/2001/mstts" xml:lang="vi-VN">
//     <voice name="vi-VN-HoaiMyNeural">
//             ${word}
//     </voice>
//     </speak>
//     `,
//     (resp) => {
//       const audio = resp.audioData
//       synthesizer.close()
//       const buffer = Buffer.from(audio)
//       res.set("Content-Type", "audio/ogg; codecs=opus; rate=24000")
//       res.send(buffer)
//     }
//   )
// })

// PWAs want HTTPS!
// function checkHttps(request, response, next) {
//   // Check the protocol — if http, redirect to https.
//   if (request.get("X-Forwarded-Proto").indexOf("https") != -1) {
//     return next();
//   } else {
//     response.redirect("https://" + request.hostname + request.url);
//   }
// }
// app.all("*", checkHttps);

// class Channel {
//   constructor(cid) {
//     const start = async () => {
//       this.cid = cid;
//       this.socket = socket;
//       this.widgetSocket = io.of('/widget').to(this.cid)
//       this.settings = await store.getChannelSettings(this.cid);
//       this.tiktokRoom = null;
//       this.tiktokID = null;

//       this.offSettingsSnapshot = () => { };
//       this.settings && this.onSettingSnapshot();
//     }
//     start();
//   }
//   onSettingSnapshot() {
//     const doc = database.collection('channelSettings').doc(this.cid);
//     this.offSettingsSnapshot = doc.onSnapshot(async docSnapshot => {
//       // console.log(`📝 Received doc snapshot`);
//       const snapShotData = docSnapshot.data();
//       const newTtId = snapShotData.basic_tiktokid;

//       if (this.tiktokRoom) {
//         if (newTtId !== this.tiktokRoom.id) {
//           this.tiktokRoom.removeChannel(this.cid);
//           this.tiktokRoom = activeTiktokRoom[newTtId] || new TiktokLive(newTtId);
//           this.tiktokRoom.addChannel(this.cid);
//         }
//       } else {
//         const existRoom = activeTiktokRoom[newTtId];
//         if (existRoom) {
//           existRoom.addChannel(this.cid);
//           this.tiktokRoom = existRoom;
//         } else {
//           const newRoom = new TiktokLive(newTtId);
//           newRoom.addChannel(this.cid);
//           this.tiktokRoom = newRoom;
//         }
//       }

//       this.settings = snapShotData;
//       this.widgetSocket.emit('updateSetting', this.settings);

//     }, err => {
//       console.log(`Encountered error: ${err}`);
//     });
//   }
// }
