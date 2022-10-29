import React, { useEffect } from "react"

export default function SupportPage() {
  useEffect(() => {
    const script = document.createElement("script")

    script.src = "/assets/js/mdb.min.js"
    script.async = true

    document.body.appendChild(script)

    return () => script.remove()
  }, [])
  return (
    <div className="row">
      <h5 className="text-light">Hỗ trợ</h5>
      <div className="col-md col-md-12 col-lg-8 col-xl-6 mx-auto">
        <div class="accordion accordion-borderless" id="accordionFlushExampleX">
          <div class="accordion-item">
            <h2 class="accordion-header" id="flush-headingOneX">
              <button
                class="accordion-button"
                type="button"
                data-mdb-toggle="collapse"
                data-mdb-target="#flush-collapseOneX"
                aria-expanded="true"
                aria-controls="flush-collapseOneX"
              >
                <i class="fas fa-question-circle fa-sm me-2 opacity-70"> </i>
                Làm thế nào để hiển thị game lên livestream Tiktok?
              </button>
            </h2>
            <div
              id="flush-collapseOneX"
              class="accordion-collapse collapse show"
              aria-labelledby="flush-headingOneX"
              data-mdb-parent="#accordionFlushExampleX"
            >
              <div class="accordion-body">
                Để hiển thị game lên livestream Tiktok, trước tiên tài khoản
                Tiktok của bạn cần được{" "}
                <a className="text-nowrap" href="#">
                  cấp quyền
                </a>{" "}
                Live PC hoặc Live Studio, sau đó truy cập vào game, copy link
                widget của game, gắn vào cửa sổ "nguồn trình duyệt" trên OBS /
                Live Studio với kích thước phù hợp
              </div>
            </div>
          </div>

          <div class="accordion-item">
            <h2 class="accordion-header" id="flush-headingTwoX">
              <button
                class="accordion-button collapsed"
                type="button"
                data-mdb-toggle="collapse"
                data-mdb-target="#flush-collapseTwoX"
                aria-expanded="false"
                aria-controls="flush-collapseTwoX"
              >
                <i class="fas fa-question-circle fa-sm me-2 opacity-70"> </i>
                Làm sao để đăng ký sử dụng
              </button>
            </h2>
            <div
              id="flush-collapseTwoX"
              class="accordion-collapse collapse"
              aria-labelledby="flush-headingTwoX"
              data-mdb-parent="#accordionFlushExampleX"
            >
              <div class="accordion-body">
                <span>
                  Để đăng ký / gia hạn bạn vui lòng thanh toán theo thông tin
                  sau:
                </span>
                <br />
                <span>Momo: 0794014600</span>
                <br />
                <span>Bank: Vietcombank - 0021000326989 - Trịnh Đắc Quang</span>
                <br />

                <span>Gói theo ngày: 20.000đ/ngày (24h)</span>
                <br />
                <span>Gói theo tháng: 300.000đ/tháng</span>
                <br />
              </div>
            </div>
          </div>

          <div class="accordion-item">
            <h2 class="accordion-header" id="flush-headingThreeX">
              <button
                class="accordion-button collapsed"
                type="button"
                data-mdb-toggle="collapse"
                data-mdb-target="#flush-collapseThreeX"
                aria-expanded="false"
                aria-controls="flush-collapseThreeX"
              >
                <i class="fas fa-question-circle fa-sm me-2 opacity-70"> </i>
                Accordion Item #3
              </button>
            </h2>
            <div
              id="flush-collapseThreeX"
              class="accordion-collapse collapse"
              aria-labelledby="flush-headingThreeX"
              data-mdb-parent="#accordionFlushExampleX"
            >
              <div class="accordion-body">
                Placeholder content for this accordion, which is intended to
                demonstrate the
                <code>.accordion-flush</code> class. This is the third item's
                accordion body. Nothing more exciting happening here in terms of
                content, but just filling up the space to make it look, at least
                at first glance, a bit more representative of how this would
                look in a real-world application.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
