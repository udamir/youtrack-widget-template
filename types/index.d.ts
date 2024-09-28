declare module "hub-dashboard-addons" {
  import type { DashboardApi, WidgetApi } from "youtrack-client"

  const addon: {
    locale: string;
    editable: boolean;
    registerWidget: (widget: (dashboardApi: DashboardApi, widgetApi: WidgetApi) => Promise<void>) => void
  }

  export default addon
}
