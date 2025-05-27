//
//  ContentVIew.swift
//  Pods
//
//  Created by Oleksandr Palamarchuk on 22.05.2025.
//

import ExpoModulesCore
import SwiftUI
import DeviceActivity
import UIKit

// SwiftUI wrapper for the device activity report
@available(iOS 16.0, *)
struct ScreenTimeSwiftUIView: View {
    @State private var context: DeviceActivityReport.Context = .init(rawValue: "Total Activity")
    @State private var filter = DeviceActivityFilter(
        segment: .daily(
            during: Calendar.current.dateInterval(
                of: .day, for: .now
            )!
        ),
        devices: .init([.iPhone, .iPad])
    )

    var body: some View {
        VStack {
            DeviceActivityReport(context, filter: filter)
                .frame(width: 500, height: 700)
                .background(.red)
            Text("Hello world 1")
                .font(.title)
                .foregroundColor(.red)
        }
    }
}

// ExpoView wrapping the SwiftUI view
@available(iOS 16.0, *)
class ExpoScreenTimeView: ExpoView {
    let view = UIView()

    required init(appContext: AppContext? = nil) {
        super.init(appContext: appContext)
        addSubview(view)

        let mySwiftUIView = ScreenTimeSwiftUIView()
        let vc = UIHostingController(rootView: mySwiftUIView)
        let swiftUIView = vc.view!
        
        swiftUIView.translatesAutoresizingMaskIntoConstraints = false
        let controller = appContext?.utilities?.currentViewController()
        controller?.addChild(vc)

        view.addSubview(swiftUIView)

        NSLayoutConstraint.activate([
            swiftUIView.topAnchor.constraint(equalTo: self.topAnchor),
            swiftUIView.bottomAnchor.constraint(equalTo: self.bottomAnchor),
            swiftUIView.leadingAnchor.constraint(equalTo: self.leadingAnchor),
            swiftUIView.trailingAnchor.constraint(equalTo: self.trailingAnchor),
        ])

        vc.didMove(toParent: controller)
    }

    override func layoutSubviews() {
        view.frame = bounds
    }
}
