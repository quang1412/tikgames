const freeTrialPeriod = 10 * 24 * 26 * 60 * 1000 // Days

function getRandomNum(min = 1, max = 100) {
  return parseInt(Math.random() * (max - min) + min)
}

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

function getTimestamp() {
  return new Date().getTime()
}

function defaultSettings(cid = 0) {
  return {
    basic_ispro: false,
    basic_proexpirationdate: 0,
    widget_alertbox_follow_imageurl: "assets/images/jumpy-t-rex.gif",
    widget_alertbox_share_active: true,
    widget_likeranking_titleColor: "#ffffff",
    widget_alertbox_like_layout: "banner",
    basic_coinpercomment: 1,
    basic_coinper100likeenabled: true,
    widget_alertbox_like_fontsize: 40,
    widget_alertbox_follow_texthighlightcolor: "#32c3a6",
    widget_alertbox_follow_alertduration: 10,
    widget_likeranking_title: "Top tha tim",
    widget_alertbox_gift_textanimation: "wave",
    widget_likeranking_textColor: "#fffafa",
    widget_alertbox_follow_alertanimationout: "backOutDown",
    widget_alertbox_general_censortimeout: 0,
    widget_alertbox_like_alertduration: 10,
    widget_alertbox_like_soundvolume: 50,
    basic_coinper100like: 100,
    widget_alertbox_general_censorrecentevents: true,
    widget_likeranking_autoResetEnabled: false,
    widget_alertbox_gift_fontweight: 800,
    widget_alertbox_general_parryalertdelay: 3,
    widget_alertbox_share_imageurl: "assets/images/jumpy-t-rex.gif",
    widget_alertbox_like_messagetemplate: "",
    widget_wof_giftCount: 1,
    widget_alertbox_share_layout: "banner",
    widget_alertbox_share_soundvolume: 100,
    widget_alertbox_like_active: true,
    widget_alertbox_gift_messagetemplate: null,
    widget_alertbox_general_backgroundcolor: "#80ffac",
    basic_tiktokid: "norinpham_m4",
    widget_alertbox_like_soundurl: "/assets/sounds/new-message-4.ogg",
    basic_coinperdiamond: 1,
    widget_alertbox_gift_alertminamount: 3,
    widget_wof_unfollower: true,
    widget_alertbox_general_alertparries: false,
    widget_alertbox_gift_texthighlightcolor: "#32c3a6",
    basic_followerbonus: 10,
    widget_alertbox_like_textcolor: "#ffffff",
    basic_coinperdiamondenabled: true,
    widget_alertbox_follow_alerttextdelay: 0,
    widget_alertbox_share_texthighlightcolor: "#32c3a6",
    basic_levelcoin: 2,
    widget_alertbox_share_textanimation: "wiggle",
    widget_alertbox_share_messagetemplate: "",
    widget_alertbox_like_texthighlightcolor: "#ff4242",
    widget_alertbox_general_alertdelay: 3,
    widget_alertbox_gift_fontsize: 40,
    widget_alertbox_follow_alertanimationin: "backInDown",
    widget_alertbox_share_alertanimationin: "backInDown",
    widget_likeranking_barColor: "#3d3d3d",
    widget_alertbox_follow_active: true,
    widget_alertbox_follow_messagetemplate: " ",
    widget_wof_commentKey: "a",
    widget_alertbox_share_alertanimationout: "backOutDown",
    widget_alertbox_gift_imageurl: "assets/images/jumpy-t-rex.gif",
    widget_alertbox_share_alerttextdelay: 0,
    widget_alertbox_like_fontweight: 800,
    uid: cid,
    widget_alertbox_follow_soundvolume: 50,
    widget_likeranking_bgOpacity: 0,
    widget_likeranking_barBgColor: "#e7a6e2",
    widget_alertbox_gift_alertanimationout: "rotateOut",
    widget_alertbox_general_layout: "banner",
    widget_wof_friend: true,
    widget_alertbox_like_imageurl: "assets/images/Explosion.gif",
    widget_alertbox_like_alertanimationin: "rotateIn",
    basic_coinpercommentenabled: true,
    widget_alertbox_share_fontsize: 40,
    widget_alertbox_gift_soundvolume: 79,
    widget_alertbox_share_soundurl: "assets/sounds/new-message-4.ogg",
    widget_alertbox_gift_textcolor: "#ffffff",
    widget_alertbox_follow_fontweight: 800,
    widget_alertbox_follow_textcolor: "#ffffff",
    widget_wof_maxPlayer: 10,
    widget_alertbox_share_fontweight: 800,
    widget_wof_giftName: "rose",
    widget_alertbox_follow_layout: "banner",
    widget_likeranking_bgImageEnabled: true,
    basic_updateidat: getTimestamp() - 3600000,
    widget_alertbox_gift_alerttextdelay: 0,
    widget_alertbox_gift_soundurl: "assets/sounds/new-message-4.ogg",
    widget_alertbox_share_alertduration: 10,
    widget_alertbox_follow_soundurl: "assets/sounds/new-message-4.ogg",
    basic_coinpershare: 1,
    basic_levelmultiplier: 1.3,
    widget_alertbox_general_approvedmanually: false,
    widget_wof_joinEvent: "chat",
    widget_alertbox_gift_alert_text_delay: 16,
    widget_likeranking_resetAfterMinute: 1,
    widget_alertbox_gift_layout: "side",
    widget_likeranking_bgImageUrl: "/assets/images/likerank-default-bg.jpg",
    basic_coinpershareenabled: true,
    widget_alertbox_follow_textanimation: "wiggle",
    widget_wof_follower: true,
    widget_alertbox_like_alerttextdelay: 0,
    widget_alertbox_like_alertanimationout: "rotateOut",
    widget_alertbox_like_textanimation: "wiggle",
    widget_alertbox_follow_fontsize: 40,
    widget_alertbox_gift_active: true,
    widget_alertbox_share_textcolor: "#ffffff",
    basic_nameofcoin: "Xu",
    widget_alertbox_gift_alertanimationin: "rotateIn",
    widget_alertbox_gift_alertduration: 7,
  }
}

const eventBasicData = {
  test: true,
  msgId: getRandomNum(10000000, 99999999),
  userId: "1234567890",
  secUid: makeid(12),
  profilePictureUrl: "/assets/images/default-avatar.webp",
  uniqueId: "tester",
  nickname: "Tester",
  followRole: 1,
  userBadges: [],
  userDetails: {
    createTime: "0",
    bioDescription: "",
    profilePictureUrls: [
      "/assets/images/default-avatar.webp",
      "/assets/images/default-avatar.webp",
      "/assets/images/default-avatar.webp",
      "/assets/images/default-avatar.webp",
    ],
  },
  followInfo: {
    followingCount: 367,
    followerCount: 41,
    followStatus: 0,
    pushStatus: 0,
  },
  isModerator: false,
  isNewGifter: false,
  isSubscriber: false,
  topGifterRank: null,
  createTime: getTimestamp(),
  id: makeid(10),
}

function fakeChatEvent() {
  return {
    ...eventBasicData,
    comment: "sample chat content",
    name: "chat",
  }
}

function fakeGiftEvent() {
  return {
    ...eventBasicData,
    giftId: 5655,
    repeatCount: getRandomNum(),
    repeatEnd: true,
    groupId: "1664513361727",
    monitorExtra: {
      anchor_id: 6785781095260341000,
      from_idc: "useast2a",
      from_user_id: 6520398859397579000,
      gift_id: 5655,
      gift_type: 1,
      log_id: "2022093004492001009907303038EC57ED",
      msg_id: 7149028878764674000,
      repeat_count: 1,
      repeat_end: 1,
      room_id: 7149021975414263000,
      send_gift_profit_core_start_ms: 0,
      send_gift_send_message_success_ms: 1664513364960,
      to_user_id: 6785781095260341000,
    },
    displayType: "webcast_aweme_gift_send_message",
    label: "{0:user} sent {1:gift} {2:string}",
    gift: {
      gift_id: 5655,
      repeat_count: 1,
      repeat_end: 1,
      gift_type: 1,
    },
    describe: "Sent Rose",
    giftType: 1,
    diamondCount: 1,
    giftName: "Rose",
    giftPictureUrl:
      "https://p19-webcast.tiktokcdn.com/img/maliva/webcast-va/eba3a9bb85c33e017f3648eaf88d7189~tplv-obj.png",
    timestamp: getTimestamp(),
    receiverUserId: "6785781095260341249",
    extendedGiftInfo: {
      action_type: 0,
      app_id: 0,
      business_text: "",
      can_put_in_gift_box: false,
      color_infos: [],
      combo: true,
      deprecated10: false,
      deprecated11: false,
      deprecated12: 0,
      deprecated14: "",
      deprecated2: false,
      deprecated3: false,
      deprecated4: 0,
      deprecated5: [],
      deprecated6: 0,
      deprecated7: 0,
      deprecated8: 0,
      deprecated9: false,
      describe: "sent Rose",
      diamond_count: 1,
      duration: 1000,
      event_name: "livesdk_gift_click",
      for_custom: false,
      for_linkmic: true,
      gift_rank_recommend_info: "",
      gift_scene: 1,
      gold_effect: "",
      gray_scheme_url: "",
      guide_url: "",
      icon: {
        avg_color: "#CCBEA3",
        height: 0,
        image_type: 0,
        is_animated: false,
        open_web_url: "",
        uri: "webcast-va/eba3a9bb85c33e017f3648eaf88d7189",
        url_list: [
          "https://p16-webcast.tiktokcdn.com/img/maliva/webcast-va/eba3a9bb85c33e017f3648eaf88d7189~tplv-obj.webp",
          "https://p19-webcast.tiktokcdn.com/img/maliva/webcast-va/eba3a9bb85c33e017f3648eaf88d7189~tplv-obj.webp",
        ],
        width: 0,
      },
      id: 5655,
      image: {
        avg_color: "#DCDCFA",
        height: 0,
        image_type: 0,
        is_animated: false,
        open_web_url: "",
        uri: "webcast-va/eba3a9bb85c33e017f3648eaf88d7189",
        url_list: [
          "https://p16-webcast.tiktokcdn.com/img/maliva/webcast-va/eba3a9bb85c33e017f3648eaf88d7189~tplv-obj.webp",
          "https://p19-webcast.tiktokcdn.com/img/maliva/webcast-va/eba3a9bb85c33e017f3648eaf88d7189~tplv-obj.webp",
        ],
        width: 0,
      },
      is_box_gift: false,
      is_broadcast_gift: false,
      is_displayed_on_panel: true,
      is_effect_befview: false,
      is_gray: false,
      is_random_gift: false,
      item_type: 1,
      lock_info: {
        lock: false,
        lock_type: 0,
      },
      manual: "",
      name: "Rose",
      notify: false,
      primary_effect_id: 0,
      region: "",
      scheme_url: "",
      special_effects: {},
      tracker_params: {},
      trigger_words: [],
      type: 1,
    },
    name: "gift",
  }
}

function fakeFollowEvent() {
  return {
    ...eventBasicData,
    displayType: "pm_main_follow_message_viewer_2",
    label: "{0:user} followed the host",
    name: "follow",
  }
}

function fakeShareEvent() {
  return {
    ...eventBasicData,
    displayType: "pm_mt_guidance_share",
    label: "{0:user} shared the LIVE",
    name: "share",
  }
}

function fakeLikeEvent() {
  return {
    ...eventBasicData,
    likeCount: getRandomNum(),
    totalLikeCount: getRandomNum(1000, 9999),
    displayType: "pm_mt_msg_viewer",
    label: "{0:user} liked the LIVE",
    name: "like",
  }
}

function fakeEvent(name = null) {
  const events = {
    gift: fakeGiftEvent(),
    like: fakeLikeEvent(),
    share: fakeShareEvent(),
    follow: fakeFollowEvent(),
    chat: fakeChatEvent(),
  }
  return events[name] || fakeLikeEvent()
}

module.exports = { fakeLikeEvent, fakeEvent, defaultSettings }
