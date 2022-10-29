import React, { Suspense } from "react"
import ReactDOM from "react-dom"
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Outlet,
  useOutletContext,
  Link,
} from "react-router-dom"
import * as serviceWorker from "./serviceWorker"
import { ToastContainer, toast } from "react-toastify"
import { MDBContainer } from "mdb-react-ui-kit"
import "mdb-react-ui-kit/dist/css/mdb.min.css"
import "@fortawesome/fontawesome-free/css/all.min.css"
import "./index.css"
import "./libs/css/gradientBg.css"
import "./libs/css/Animate.min.css"
// import HomePage from "./pages/homePage"
import Footer from "./components/footer"

window.toast = toast

window.wait = async (t = 1) => {
  return new Promise((resolve) => setTimeout(() => resolve, t * 1000))
}

window.imageUrlFixing = (url = "") => {
  return url.replace("p16-sign-va.tiktokcdn.com", "p16-va.tiktokcdn.com")
}

window.randomInt = (min = 10, max = 99) =>
  Math.floor(Math.random() * (max - min + 1) + min)

const Loading = () => {
  return <></>
}

const LazyHomePage = React.lazy(() => import("./pages/homePage"))
const HomePage = (
  <Suspense fallback={<Loading />}>
    <LazyHomePage />
  </Suspense>
)

const WheelMng = React.lazy(() => import("./App"))
const MngWheelGame = (
  <Suspense fallback={<Loading />}>
    <WheelMng />
  </Suspense>
)

const WheelGame = React.lazy(() => import("./games/wheelOfFortune"))
const WidgetWheelOfFortune = () => {
  const [event, settings] = useOutletContext()
  return (
    <Suspense fallback={<Loading />}>
      <WheelGame event={event} settings={settings} />
    </Suspense>
  )
}

const LazyWidgetPage = React.lazy(() => import("./widgetPage"))
const WidgetPage = (
  <Suspense fallback={<Loading />}>
    <LazyWidgetPage />
  </Suspense>
)

const GeneralLayout = (
  <>
    <MDBContainer
      style={{
        paddingTop: "30px",
        minHeight: "calc(100vh - 40px)",
      }}
    >
      <Outlet />
    </MDBContainer>
    <Footer />

    <ToastContainer
      theme="light"
      position="bottom-right"
      toastStyle={{
        fontSize: "14px",
        textAlign: "left",
      }}
      hideProgressBar={false}
    />
    <div id="gradient_bg"></div>
  </>
)

const Main = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={GeneralLayout}>
          <Route index element={HomePage} />
          <Route path="wheel-of-fortune" element={MngWheelGame} />
          <Route
            path="*"
            element={
              <div className="text-center">
                <h5>ERROR! Page not found</h5>
              </div>
            }
          />
        </Route>
        <Route path="widget" element={WidgetPage}>
          <Route path="wheel-of-fortune" element={<WidgetWheelOfFortune />} />
        </Route>
      </Routes>
    </Router>
  )
}

ReactDOM.render(<Main />, document.getElementById("root"))

serviceWorker.unregister()
