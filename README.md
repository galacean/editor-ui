# Galacean Editor UI

A comprehensive UI component library designed for building professional 3D editors and interactive tools in the browser. This monorepo contains two complementary packages that work together to provide both low-level UI components and high-level GUI solutions.

Checkout the [storybook](https://main--66ceb847fb9e976339fd906e.chromatic.com/) for more information.

## @galacean/editor-ui

A dedicated React component library for building 3D editor interfaces, featuring:

- **Basic Components**: `Button`, `Input`, `Slider`, etc.
- **Editor-Specific Components**: `ColorPicker`, `BezierCurveEditor`, `GradientSlider`, `ParticleSlider`, `AssetPicker`
- **Accessibility First**: All components are designed with accessibility in mind
- **Theme Support**: Built-in light and dark themes
- **TypeScript**: Full type safety and IntelliSense support
- **Controllable State**: Most components support both controlled and uncontrolled modes

```tsx
import { Button, ColorPicker } from '@galacean/editor-ui'

function App() {
  return (
    <div>
      <Button>Galacean Editor</Button>
      <ColorPicker mode="solid" value={color} onValueChange={setColor} />
    </div>
  )
}
```

## @galacean/gui

An opinionated GUI library built on top of `@galacean/editor-ui`, providing:

- **Imperative API**: dat.gui-like interface for quick prototyping
- **Declarative Components**: React form components for complex UIs
- **Rich Input Types**: Vector inputs, color pickers, sliders, and more
- **Group Management**: Organize controls into collapsible groups
- **3D Engine Integration**: Perfect for 3D scene manipulation

```javascript
// Imperative API (similar to dat.gui)
const gui = new GUI(sceneData, [
  {
    label: 'Camera Position',
    bindPath: 'camera.position',
    type: 'Vector3',
    onChange(value) {
      camera.transform.setPosition(value.x, value.y, value.z)
    },
  },
])
```

```tsx
// Declarative React Components
import { FormItemVector3, FormItemColor } from '@galacean/gui'

function ScenePanel() {
  return (
    <div>
      <FormItemVector3 label="Position" value={position} onChange={setPosition} />
      <FormItemColor label="Light Color" value={lightColor} onChange={setLightColor} />
    </div>
  )
}
```

## Quick Start

### Installation

```bash
# For basic UI components
npm install @galacean/editor-ui

# For GUI controls (includes editor-ui)
npm install @galacean/gui
```

### CDN Usage (Non-React Projects)

```html
<script src="https://unpkg.com/@galacean/gui/dist/index.umd.js"></script>
<script>
  const gui = new GUI(data, [
    {
      label: 'Camera Position',
      bindPath: 'camera.position',
      type: 'Vector3',
      onChange(value) {
        // Update your 3D scene
      },
    },
  ])
</script>
```

## Use Cases

- **3D Scene Editors**: Build professional 3D content creation tools
- **Game Development Tools**: Create level editors and asset management interfaces
- **Data Visualization**: Interactive controls for complex visualizations
- **Prototyping**: Quickly add GUI controls to 3D experiments
- **Galacean Editor Plugins**: Extend the official Galacean Editor

## Key Features

- **🎛️ Dual API**: Choose between imperative (dat.gui-style) or declarative (React) approaches
- **🎨 Rich Components**: Specialized components for 3D editor workflows
- **♿ Accessible**: WCAG compliant with full keyboard navigation
- **🌗 Themeable**: Built-in light/dark themes with customization options
- **📱 Responsive**: Works seamlessly across desktop and mobile devices
- **🔧 TypeScript**: Complete type definitions for better DX
- **⚡ Performance**: Optimized for real-time 3D applications

## Integration Examples

### With Galacean Engine

```javascript
import { WebGLEngine, Camera } from '@galacean/engine'
import { GUI } from '@galacean/gui'

const engine = await WebGLEngine.create({ canvas: 'canvas' })
const camera = scene.createRootEntity().addComponent(Camera)

const gui = new GUI({ camera: { fov: 45 } }, [
  {
    label: 'Field of View',
    bindPath: 'camera.fov',
    type: 'Slider',
    min: 10,
    max: 120,
    onChange(value) {
      camera.fieldOfView = value
    },
  },
])
```

### With Three.js

```javascript
import * as THREE from 'three'
import { GUI } from '@galacean/gui'

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)

const gui = new GUI({ camera: { position: { x: 0, y: 0, z: 5 } } }, [
  {
    label: 'Camera Position',
    bindPath: 'camera.position',
    type: 'Vector3',
    onChange(value) {
      camera.position.set(value.x, value.y, value.z)
    },
  },
])
```

## 📚 Documentation

- [Editor UI Documentation](./packages/ui/README.md)
- [GUI Documentation](./packages/gui/README.md)
- [Storybook Examples](https://galacean.github.io/editor-ui)

## 🛠️ Development

```bash
# Install dependencies
pnpm install

# Start development server for editor-ui
pnpm dev

# Start development server for gui
pnpm dev:gui

# Build packages
pnpm build && pnpm build:gui
```

## License

MIT License - see [LICENSE](LICENSE) for details.

## Acknowledgments

Built with these excellent open-source projects:

- [@radix-ui](https://radix-ui.com/) - Accessible component primitives
- [@stitches/react](https://stitches.dev/) - CSS-in-JS solution
- [react-colorful](https://github.com/omgovich/react-colorful) - Color picker component
- [colord](https://github.com/omgovich/colord) - Color manipulation utilities

---
