import ExpoModulesCore

@available(iOS 16.0, *)
public class ExpoScreenTimeModule: Module {
  public func definition() -> ModuleDefinition {
    Name("ExpoScreenTime")

    View(ExpoScreenTimeView.self) {}
  }
}
