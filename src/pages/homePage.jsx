import React, { useEffect } from "react"
import "../App.css"

const Header = () => (
  <div className="d-flex justify-content-between">
    <h4 className="text-light">Tiktok Games</h4>
    {/* <img
      src="https://upload.wikimedia.org/wikipedia/en/thumb/a/a9/TikTok_logo.svg/1280px-TikTok_logo.svg.png"
      width={100}
    /> */}
  </div>
)

const GameList = () => (
  <section className="mb-5">
    {/* <div className="row">
      <div className="col-md col-md-12 col-lg-8 mx-auto"> */}
    <div className="row justify-content-center">
      <div className="col-4 col-md-3 col-lg-2 col-xl-2 text-center">
        <a href="/wheel-of-fortune" className="">
          <img
            className="d-block p-2 rounded-3 bg-trans"
            src="/assets/images/wheeloffortune-img.png"
            width="100%"
          />
          <span>Wheel of Fortune</span>
        </a>
      </div>
    </div>
    {/* </div>
    </div> */}
  </section>
)

const Accordion = () => (
  <section className="mb-5">
    <div className="row">
      <div className="col-md col-md-12 col-lg-8 mx-auto">
        <h5 className="text-center">Câu hỏi thường gặp</h5>
        <div
          className="accordion accordion-borderless"
          id="accordionFlushExampleX"
        >
          <div className="accordion-item">
            <h2 className="accordion-header" id="flush-headingOneX">
              <button
                className="accordion-button"
                type="button"
                data-mdb-toggle="collapse"
                data-mdb-target="#flush-collapseOneX"
                aria-expanded="true"
                aria-controls="flush-collapseOneX"
              >
                <i className="fas fa-question-circle fa-sm me-2 opacity-70">
                  {" "}
                </i>
                Làm thế nào để hiển thị game lên livestream Tiktok?
              </button>
            </h2>
            <div
              id="flush-collapseOneX"
              className="accordion-collapse collapse show"
              aria-labelledby="flush-headingOneX"
              data-mdb-parent="#accordionFlushExampleX"
            >
              <div className="accordion-body">
                Để hiển thị game lên livestream Tiktok, trước tiên tài khoản
                Tiktok của bạn cần được{" "}
                <a className="text-nowrap" href="#">
                  cấp quyền
                </a>{" "}
                Live PC qua OBS hoặc Live Studio, sau đó truy cập vào game, copy
                link widget của game, gắn vào cửa sổ "nguồn trình duyệt" trên
                OBS / Live Studio với kích thước phù hợp
              </div>
            </div>
          </div>

          <div className="accordion-item">
            <h2 className="accordion-header" id="flush-headingTwoX">
              <button
                className="accordion-button collapsed"
                type="button"
                data-mdb-toggle="collapse"
                data-mdb-target="#flush-collapseTwoX"
                aria-expanded="false"
                aria-controls="flush-collapseTwoX"
              >
                <i className="fas fa-question-circle fa-sm me-2 opacity-70">
                  {" "}
                </i>
                Làm sao để đăng ký sử dụng
              </button>
            </h2>
            <div
              id="flush-collapseTwoX"
              className="accordion-collapse collapse"
              aria-labelledby="flush-headingTwoX"
              data-mdb-parent="#accordionFlushExampleX"
            >
              <div className="accordion-body">
                <ul className="list-unstyled">
                  <li>
                    Để đăng ký / gia hạn bạn vui lòng thanh toán theo thông tin
                    sau:
                  </li>
                  <br />
                  <li>Momo: 0794014600</li>
                  <li>Bank: Vietcombank - 0021000326989 - Trịnh Đắc Quang</li>
                  <li>Nội dung ck: ID tài khoản Tiktok (@xxx)</li>
                  <br />
                  <li>Gói theo ngày: 20.000đ/ngày (24h)</li>
                  <li>Gói theo tháng: 300.000đ/tháng</li>
                  <br />
                  <li>
                    Nếu cần hỗ trợ thêm, vui lòng liên hệ theo thông tin dưới
                    chân trang
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
)

export default function Page() {
  useEffect(() => {
    const script = document.createElement("script")
    script.src = "/assets/js/mdb.min.js"
    script.async = true
    document.body.appendChild(script)
    return () => script.remove()
  }, [])
  return (
    <div className="animate__animated animate__fadeIn">
      <Header />
      <main className="pt-5">
        <GameList />
        <Accordion />
      </main>
    </div>
  )
}
