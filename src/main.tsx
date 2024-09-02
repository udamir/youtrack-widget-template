// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
import DashboardAddons from "hub-dashboard-addons"
import ReactDOM from "react-dom/client"

import { WidgetProvider } from "./contexts/WidgetContext"
import type { DashboardApi } from "./models/Dashboard"
import type { WidgetApi } from "./models/Widget"
import { Widget } from "./Widget"
import "./index.css"

DashboardAddons.registerWidget((dashboardApi: DashboardApi, widgetApi: WidgetApi) => {
  ReactDOM.createRoot(document.getElementById("root")!).render(
    <WidgetProvider dashboardApi={dashboardApi} widgetApi={widgetApi}>
      <Widget />
    </WidgetProvider>,
  )
})
