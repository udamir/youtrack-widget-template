declare module "hub-dashboard-addons" {
  import type { DashboardApi, WidgetApi } from "youtrack-client"

  const addon: {
    registerWidget: (widget: (dashboardApi: DashboardApi, widgetApi: WidgetApi) => Promise<void>) => void
  }

  export default addon
}
