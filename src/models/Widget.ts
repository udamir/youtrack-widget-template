export type WidgetApi = (props: WidgetApiProps) => void

export type WidgetApiProps = {
  onRefresh?(): Promise<void>
  onConfigure?(): Promise<void>
}
