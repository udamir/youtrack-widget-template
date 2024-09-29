import DashboardAddons from "hub-dashboard-addons"
import { YouTrack } from "youtrack-client"
import ReactDOM from "react-dom/client"

import { userFields, WidgetContextProvider } from "./contexts/WidgetContext"
import ConfigWrapper from "@jetbrains/hub-widget-ui/dist/config-wrapper"
import { Widget } from "./components/Widget"

import "./index.css"

const CONFIG_FIELDS = ["search", "context", "title", "refreshPeriod", "youTrack"]

DashboardAddons.registerWidget(async (dashboardApi, widgetApi) => {
  const youtrack = await YouTrack.widget(dashboardApi)
  const user = await youtrack.Users.getCurrentUserProfile({ fields: userFields })
  const configWrapper = new ConfigWrapper(dashboardApi, CONFIG_FIELDS)

  ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
    <WidgetContextProvider dashboardApi={dashboardApi} widgetApi={widgetApi} youtrack={youtrack} user={user}>
      <Widget 
        configWrapper={configWrapper}
        editable={DashboardAddons.editable}
      />
    </WidgetContextProvider>,
  )
})
