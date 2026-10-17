# SwiftUI 6 Design System Patterns

Patterns for building native Apple platform UIs with SwiftUI, targeting iOS 18+ / macOS 15+. Covers token integration, custom styles, accessibility, and platform adaptation.

---

## Token Integration

### Color Extensions from Design Tokens

Map `tokens/colors.json` to Swift via Asset Catalogs or code-defined colors:

```swift
// DesignSystem/Tokens/Colors.swift
import SwiftUI

extension Color {
    // MARK: - Semantic Colors (map to tokens/colors.json → semantic tier)

    enum DS {
        // Action
        static let actionPrimary = Color("ActionPrimary") // Asset Catalog
        static let actionPrimaryHover = Color("ActionPrimaryHover")
        static let actionDestructive = Color("ActionDestructive")

        // Text
        static let textPrimary = Color(.label) // System adaptive
        static let textSecondary = Color(.secondaryLabel)
        static let textTertiary = Color(.tertiaryLabel)
        static let textOnAction = Color.white

        // Surface
        static let surfacePage = Color(.systemBackground)
        static let surfaceCard = Color(.secondarySystemBackground)
        static let surfaceSunken = Color(.tertiarySystemBackground)

        // Border
        static let borderDefault = Color(.separator)
        static let borderStrong = Color(.opaqueSeparator)

        // Feedback
        static let feedbackSuccess = Color.green
        static let feedbackWarning = Color.orange
        static let feedbackError = Color.red
        static let feedbackInfo = Color.blue
    }
}
```

### Typography Extensions

```swift
// DesignSystem/Tokens/Typography.swift
import SwiftUI

extension Font {
    enum DS {
        static let heading1 = Font.system(size: 48, weight: .bold, design: .default)
        static let heading2 = Font.system(size: 36, weight: .bold)
        static let heading3 = Font.system(size: 30, weight: .semibold)
        static let heading4 = Font.system(size: 24, weight: .semibold)
        static let heading5 = Font.system(size: 20, weight: .semibold)
        static let heading6 = Font.system(size: 18, weight: .semibold)

        static let bodyLarge = Font.system(size: 18, weight: .regular)
        static let bodyBase = Font.system(size: 16, weight: .regular)
        static let bodySmall = Font.system(size: 14, weight: .regular)

        static let caption = Font.system(size: 12, weight: .regular)
        static let label = Font.system(size: 14, weight: .medium)
        static let code = Font.system(size: 14, weight: .regular, design: .monospaced)
    }
}
```

### Spacing Scale

```swift
// DesignSystem/Tokens/Spacing.swift
import SwiftUI

enum Spacing {
    static let xxs: CGFloat = 2    // 0.5
    static let xs: CGFloat = 4     // 1
    static let sm: CGFloat = 8     // 2
    static let md: CGFloat = 12    // 3
    static let base: CGFloat = 16  // 4
    static let lg: CGFloat = 20    // 5
    static let xl: CGFloat = 24    // 6
    static let xxl: CGFloat = 32   // 8
    static let xxxl: CGFloat = 48  // 12
}
```

---

## Component Patterns

### Button with `ButtonStyle`

```swift
// DesignSystem/Components/DSButton.swift
import SwiftUI

struct DSButtonStyle: ButtonStyle {
    enum Variant {
        case primary, secondary, ghost, destructive
    }
    enum Size {
        case sm, md, lg
    }

    let variant: Variant
    let size: Size
    let isLoading: Bool

    @Environment(\.isEnabled) private var isEnabled

    func makeBody(configuration: Configuration) -> some View {
        HStack(spacing: Spacing.sm) {
            if isLoading {
                ProgressView()
                    .tint(foregroundColor)
                    .scaleEffect(0.8)
            }
            configuration.label
        }
        .font(fontSize)
        .fontWeight(.medium)
        .foregroundStyle(foregroundColor)
        .padding(.horizontal, horizontalPadding)
        .frame(height: height)
        .background(backgroundColor(isPressed: configuration.isPressed))
        .clipShape(RoundedRectangle(cornerRadius: 6))
        .overlay {
            if variant == .secondary {
                RoundedRectangle(cornerRadius: 6)
                    .strokeBorder(Color.DS.borderDefault, lineWidth: 1)
            }
        }
        .opacity(isEnabled ? 1 : 0.5)
        .animation(.easeOut(duration: 0.15), value: configuration.isPressed)
    }

    // MARK: - Computed Properties

    private var height: CGFloat {
        switch size {
        case .sm: 32
        case .md: 40
        case .lg: 48
        }
    }

    private var horizontalPadding: CGFloat {
        switch size {
        case .sm: Spacing.md
        case .md: Spacing.base
        case .lg: Spacing.xl
        }
    }

    private var fontSize: Font {
        switch size {
        case .sm: .DS.bodySmall
        case .md: .DS.bodyBase
        case .lg: .DS.bodyLarge
        }
    }

    private var foregroundColor: Color {
        switch variant {
        case .primary, .destructive: .DS.textOnAction
        case .secondary, .ghost: .DS.textPrimary
        }
    }

    private func backgroundColor(isPressed: Bool) -> Color {
        switch variant {
        case .primary:
            isPressed ? .DS.actionPrimaryHover : .DS.actionPrimary
        case .secondary:
            isPressed ? .DS.surfaceSunken : .DS.surfaceCard
        case .ghost:
            isPressed ? .DS.surfaceSunken : .clear
        case .destructive:
            isPressed ? Color.red.opacity(0.8) : .DS.actionDestructive
        }
    }
}

// MARK: - Convenience Extension

extension Button {
    func dsStyle(
        _ variant: DSButtonStyle.Variant = .primary,
        size: DSButtonStyle.Size = .md,
        isLoading: Bool = false
    ) -> some View {
        self.buttonStyle(DSButtonStyle(variant: variant, size: size, isLoading: isLoading))
    }
}

// Usage:
// Button("Save") { save() }.dsStyle(.primary, size: .md)
// Button("Cancel") { cancel() }.dsStyle(.ghost)
```

### Card with ViewModifier

```swift
// DesignSystem/Components/CardModifier.swift
import SwiftUI

struct CardModifier: ViewModifier {
    enum Style {
        case outlined, elevated
    }

    let style: Style
    let padding: CGFloat

    func body(content: Content) -> some View {
        content
            .padding(padding)
            .background(Color.DS.surfaceCard)
            .clipShape(RoundedRectangle(cornerRadius: 8))
            .overlay {
                if style == .outlined {
                    RoundedRectangle(cornerRadius: 8)
                        .strokeBorder(Color.DS.borderDefault, lineWidth: 1)
                }
            }
            .shadow(
                color: style == .elevated ? .black.opacity(0.05) : .clear,
                radius: 2, y: 1
            )
    }
}

extension View {
    func dsCard(_ style: CardModifier.Style = .outlined, padding: CGFloat = Spacing.xl) -> some View {
        modifier(CardModifier(style: style, padding: padding))
    }
}

// Usage:
// VStack { ... }.dsCard(.elevated)
```

---

## Accessibility

### Dynamic Type with `@ScaledMetric`

```swift
struct AdaptiveIcon: View {
    @ScaledMetric(relativeTo: .body) private var iconSize: CGFloat = 20

    var body: some View {
        Image(systemName: "bell.fill")
            .frame(width: iconSize, height: iconSize)
    }
}
```

### Accessibility Modifiers

```swift
// Button with full accessibility
Button {
    toggleFavorite()
} label: {
    Image(systemName: isFavorite ? "heart.fill" : "heart")
}
.accessibilityLabel(isFavorite ? "Remove from favorites" : "Add to favorites")
.accessibilityHint("Double-tap to toggle")
.accessibilityAddTraits(.isButton)

// Custom control with value
Slider(value: $volume, in: 0...100)
    .accessibilityValue("\(Int(volume)) percent")
    .accessibilityLabel("Volume")

// Grouping
HStack {
    Image(systemName: "star.fill")
    Text("4.8")
    Text("(128 reviews)")
}
.accessibilityElement(children: .combine)
.accessibilityLabel("Rating: 4.8 out of 5, 128 reviews")

// Announce changes
.onChange(of: saveState) { _, newValue in
    if newValue == .saved {
        AccessibilityNotification.Announcement("Changes saved").post()
    }
}
```

### Reduced Motion

```swift
struct AnimatedView: View {
    @Environment(\.accessibilityReduceMotion) private var reduceMotion

    var body: some View {
        content
            .animation(reduceMotion ? nil : .spring(duration: 0.3), value: isExpanded)
    }
}
```

---

## Platform Adaptation

### Conditional Platform Code

```swift
struct AdaptiveLayout: View {
    var body: some View {
        #if os(iOS)
        NavigationStack {
            content
        }
        #elseif os(macOS)
        NavigationSplitView {
            sidebar
        } detail: {
            content
        }
        #endif
    }
}
```

### Adaptive Layout with `ViewThatFits`

```swift
ViewThatFits {
    // Try horizontal first
    HStack(spacing: Spacing.base) {
        label
        control
    }
    // Fall back to vertical if horizontal doesn't fit
    VStack(alignment: .leading, spacing: Spacing.sm) {
        label
        control
    }
}
```

### Navigation Patterns

```swift
// iOS 18+ — NavigationStack with typed destinations
struct AppNavigation: View {
    @State private var path = NavigationPath()

    var body: some View {
        NavigationStack(path: $path) {
            ContentListView()
                .navigationDestination(for: Item.ID.self) { id in
                    ItemDetailView(id: id)
                }
                .navigationDestination(for: Route.self) { route in
                    route.destination
                }
        }
    }
}
```

---

## File Organization

```
Sources/
├── DesignSystem/
│   ├── Tokens/
│   │   ├── Colors.swift          ← Color.DS extensions
│   │   ├── Typography.swift      ← Font.DS extensions
│   │   └── Spacing.swift         ← Spacing enum
│   ├── Components/
│   │   ├── DSButtonStyle.swift   ← ButtonStyle implementations
│   │   ├── CardModifier.swift    ← ViewModifier implementations
│   │   └── InputField.swift      ← Reusable form input
│   └── Utilities/
│       └── Accessibility.swift   ← A11y helpers
├── Features/
│   ├── Dashboard/
│   ├── Auth/
│   └── Settings/
├── Navigation/
│   └── AppNavigation.swift
└── App.swift
```
