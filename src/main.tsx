import DashboardAddons from "hub-dashboard-addons"
import { YouTrack } from "youtrack-client"
import ReactDOM from "react-dom/client"

import { userFields, WidgetContextProvider } from "./contexts/WidgetContext"
import { Widget } from "./components/Widget"

import "./index.css"

DashboardAddons.registerWidget(async (dashboardApi, widgetApi) => {
  const youtrack = await YouTrack.widget(dashboardApi)
  const user = await youtrack.Users.getCurrentUserProfile({ fields: userFields })

  ReactDOM.createRoot(document.getElementById("root")!).render(
    <WidgetContextProvider dashboardApi={dashboardApi} widgetApi={widgetApi} youtrack={youtrack} user={user}>
      <Widget />
    </WidgetContextProvider>,
  )
})
