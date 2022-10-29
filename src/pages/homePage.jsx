import React, { useEffect } from "react"
import "../App.css"

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
      <div className="row">
        <div className="col-md col-md-12 col-lg-8 col-xl-6 mx-auto">
          <section className="mb-5">
            <h5 className="text-light">Mini game tương tác Tiktok</h5>
            <div className="d-flex text-center">
              <a href="/wheel-of-fortune" className="text-light">
                <img
                  className="d-block m-1 p-2 rounded-3 bg-trans"
                  src="/assets/images/wheeloffortune-img.png"
                  width="90"
                  height="90"
                />
                <small>Wheel of Fortune</small>
              </a>
            </div>
          </section>

          <section className="mb-5">
            <h5 className="text-light">Câu hỏi thường gặp</h5>
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
                    Live PC qua OBS hoặc Live Studio, sau đó truy cập vào game,
                    copy link widget của game, gắn vào cửa sổ "nguồn trình
                    duyệt" trên OBS / Live Studio với kích thước phù hợp
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
                        Để đăng ký / gia hạn bạn vui lòng thanh toán theo thông
                        tin sau:
                      </li>
                      <br />
                      <li>Momo: 0794014600</li>
                      <li>
                        Bank: Vietcombank - 0021000326989 - Trịnh Đắc Quang
                      </li>
                      <li>Nội dung ck: ID tài khoản Tiktok (@xxx)</li>
                      <br />
                      <li>Gói theo ngày: 20.000đ/ngày (24h)</li>
                      <li>Gói theo tháng: 300.000đ/tháng</li>
                      <br />
                      <li>
                        Nếu cần hỗ trợ thêm, vui lòng liên hệ theo thông tin
                        dưới chân trang
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* <div className="accordion-item">
              <h2 className="accordion-header" id="flush-headingThreeX">
                <button
                  className="accordion-button collapsed"
                  type="button"
                  data-mdb-toggle="collapse"
                  data-mdb-target="#flush-collapseThreeX"
                  aria-expanded="false"
                  aria-controls="flush-collapseThreeX"
                >
                  <i className="fas fa-question-circle fa-sm me-2 opacity-70"> </i>
                  Accordion Item #3
                </button>
              </h2>
              <div
                id="flush-collapseThreeX"
                className="accordion-collapse collapse"
                aria-labelledby="flush-headingThreeX"
                data-mdb-parent="#accordionFlushExampleX"
              >
                <div className="accordion-body">
                  Placeholder content for this accordion, which is intended to
                  demonstrate the
                  <code>.accordion-flush</code> class. This is the third item's
                  accordion body. Nothing more exciting happening here in terms of
                  content, but just filling up the space to make it look, at least
                  at first glance, a bit more representative of how this would
                  look in a real-world application.
                </div>
              </div>
            </div> */}
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}
