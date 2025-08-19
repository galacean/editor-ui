# @galacean/gui

An opinionated GUI library designed to create engaging and functional online tools with ease. Built on top of React and [@galacean/editor-ui](https://github.com/galacean/editor-ui), it provides both imperative GUI controls (similar to dat.gui) and declarative React components for building interactive 3D editors and tools.

## Features

- 🎛️ **Imperative GUI Controls** - dat.gui-like API for quick prototyping
- ⚛️ **React Components** - Full-featured form components for complex UIs
- 🎨 **Rich Input Types** - Color pickers, sliders, vectors, and more
- 🌗 **Theme Support** - Light and dark themes out of the box
- ♿ **Accessibility First** - Built with accessibility in mind
- 🔧 **TypeScript Support** - Full type safety and IntelliSense

## Installation

### For React Projects

```bash
npm install @galacean/gui
# or
yarn add @galacean/gui
# or
pnpm add @galacean/gui
```

### For Non-React Projects

Even if you're not using React in your project, you still need to install React as a dependency since the GUI class uses React internally:

```bash
npm install @galacean/gui react react-dom
```

## Quick Start

### CDN Usage (Recommended for Non-React Projects)

```html
<!doctype html>
<html>
  <head>
    <title>Galacean GUI Example</title>
    <script src="https://unpkg.com/@galacean/gui/dist/index.umd.js"></script>
  </head>
  <body>
    <canvas id="canvas"></canvas>

    <script>
      const { GUI } = window.GalaceanGUI

      // Your 3D scene data
      const sceneData = {
        camera: {
          position: { x: 0, y: 10, z: 30 },
          fov: 45,
        },
        light: {
          color: { r: 1, g: 1, b: 1, a: 1 },
          intensity: 1.0,
        },
      }

      // Create GUI
      const gui = new GUI(sceneData, [
        {
          label: 'Camera Position',
          bindPath: 'camera.position',
          type: 'Vector3',
          onChange(value) {
            // Update your 3D scene
            console.log('Camera position changed:', value)
          },
        },
        {
          label: 'Light Color',
          bindPath: 'light.color',
          type: 'Color',
          onChange(value) {
            // Update your 3D scene
            console.log('Light color changed:', value)
          },
        },
        {
          label: 'Light Intensity',
          bindPath: 'light.intensity',
          type: 'Slider',
          min: 0,
          max: 2,
          step: 0.1,
          onChange(value) {
            // Update your 3D scene
            console.log('Light intensity changed:', value)
          },
        },
      ])
    </script>
  </body>
</html>
```

### Use the individual components

```tsx
import React, { useState } from 'react'
import { FormItemInput, FormItemColor, FormItemVector3, FormItemSlider, Panel } from '@galacean/gui'

function App() {
  const [sceneData, setSceneData] = useState({
    name: 'My Scene',
    camera: { position: { x: 0, y: 10, z: 30 } },
    light: {
      color: { r: 1, g: 1, b: 1, a: 1 },
      intensity: 1.0,
    },
  })

  return (
    <Panel>
      <FormItemInput
        label="Scene Name"
        value={sceneData.name}
        onChange={(value) => setSceneData((prev) => ({ ...prev, name: value }))}
      />

      <FormItemVector3
        label="Camera Position"
        value={sceneData.camera.position}
        onChange={(value) =>
          setSceneData((prev) => ({
            ...prev,
            camera: { ...prev.camera, position: value },
          }))
        }
      />

      <FormItemColor
        label="Light Color"
        value={sceneData.light.color}
        onChange={(value) =>
          setSceneData((prev) => ({
            ...prev,
            light: { ...prev.light, color: value },
          }))
        }
      />

      <FormItemSlider
        label="Light Intensity"
        value={sceneData.light.intensity}
        min={0}
        max={2}
        step={0.1}
        onChange={(value) =>
          setSceneData((prev) => ({
            ...prev,
            light: { ...prev.light, intensity: value },
          }))
        }
      />
    </Panel>
  )
}

export default App
```

## GUI Class API

The `GUI` class provides a dat.gui-like imperative API for quick prototyping and non-React environments.

### Constructor

```typescript
new GUI(data: Record<string, any>, items?: GUIItemConfig[])
```

### Basic Example

```javascript
const data = {
  position: { x: 0, y: 0, z: 0 },
  color: { r: 1, g: 0, b: 0, a: 1 },
  intensity: 1.0,
  enabled: true,
  name: 'My Object',
}

const gui = new GUI(data, [
  {
    label: 'Object Name',
    bindPath: 'name',
    type: 'Input',
    onChange(value) {
      console.log('Name changed:', value)
    },
  },
  {
    label: 'Position',
    bindPath: 'position',
    type: 'Vector3',
    onChange(value) {
      console.log('Position changed:', value)
    },
  },
  {
    label: 'Color',
    bindPath: 'color',
    type: 'Color',
    onChange(value) {
      console.log('Color changed:', value)
    },
  },
  {
    label: 'Intensity',
    bindPath: 'intensity',
    type: 'Slider',
    min: 0,
    max: 2,
    step: 0.1,
    onChange(value) {
      console.log('Intensity changed:', value)
    },
  },
  {
    label: 'Enabled',
    bindPath: 'enabled',
    type: 'Toggle',
    onChange(value) {
      console.log('Enabled changed:', value)
    },
  },
])
```

### Adding Groups

You can organize GUI controls into collapsible groups for better organization:

```javascript
const data = {
  transform: {
    position: { x: 0, y: 0, z: 0 },
    rotation: { x: 0, y: 0, z: 0 },
    scale: { x: 1, y: 1, z: 1 },
  },
  material: {
    color: { r: 1, g: 1, b: 1, a: 1 },
    metallic: 0.0,
    roughness: 0.5,
  },
  lighting: {
    intensity: 1.0,
    shadows: true,
  },
}

const gui = new GUI(data)

// Add Transform group
gui.addGroup('Transform', [
  {
    label: 'Position',
    bindPath: 'transform.position',
    type: 'Vector3',
    onChange(value) {
      // Update object position
      object.position.set(value.x, value.y, value.z)
    },
  },
  {
    label: 'Rotation',
    bindPath: 'transform.rotation',
    type: 'Vector3',
    onChange(value) {
      // Update object rotation
      object.rotation.set(value.x, value.y, value.z)
    },
  },
  {
    label: 'Scale',
    bindPath: 'transform.scale',
    type: 'Vector3',
    onChange(value) {
      // Update object scale
      object.scale.set(value.x, value.y, value.z)
    },
  },
])

// Add Material group
gui.addGroup('Material', [
  {
    label: 'Base Color',
    bindPath: 'material.color',
    type: 'Color',
    onChange(value) {
      material.color.set(value.r, value.g, value.b, value.a)
    },
  },
  {
    label: 'Metallic',
    bindPath: 'material.metallic',
    type: 'Slider',
    min: 0,
    max: 1,
    step: 0.01,
    onChange(value) {
      material.metallic = value
    },
  },
  {
    label: 'Roughness',
    bindPath: 'material.roughness',
    type: 'Slider',
    min: 0,
    max: 1,
    step: 0.01,
    onChange(value) {
      material.roughness = value
    },
  },
])

// Add Lighting group
gui.addGroup('Lighting', [
  {
    label: 'Intensity',
    bindPath: 'lighting.intensity',
    type: 'Slider',
    min: 0,
    max: 3,
    step: 0.1,
    onChange(value) {
      light.intensity = value
    },
  },
  {
    label: 'Cast Shadows',
    bindPath: 'lighting.shadows',
    type: 'Toggle',
    onChange(value) {
      light.castShadow = value
    },
  },
])
```

### Group Configuration Options

Groups support additional configuration options:

```javascript
gui.addGroup(
  'Advanced Settings',
  [
    // ... items
  ],
  {
    defaultOpen: false, // Start collapsed
    collapsible: true, // Allow collapse/expand
    nesting: true, // Enable nested styling
  }
)
```

### Nested Groups

You can create nested groups for complex hierarchies:

```javascript
const data = {
  scene: {
    environment: {
      skybox: { color: { r: 0.5, g: 0.7, b: 1, a: 1 } },
      fog: { density: 0.1, color: { r: 0.8, g: 0.8, b: 0.9, a: 1 } },
    },
    postProcessing: {
      bloom: { intensity: 1.0, threshold: 0.9 },
      colorGrading: { exposure: 1.0, contrast: 1.0 },
    },
  },
}

const gui = new GUI(data)

// Main Scene group
gui.addGroup('Scene', [
  // Environment subgroup
  {
    type: 'Group',
    label: 'Environment',
    items: [
      {
        label: 'Skybox Color',
        bindPath: 'scene.environment.skybox.color',
        type: 'Color',
        onChange(value) {
          skybox.color.set(value.r, value.g, value.b, value.a)
        },
      },
      {
        label: 'Fog Density',
        bindPath: 'scene.environment.fog.density',
        type: 'Slider',
        min: 0,
        max: 1,
        step: 0.01,
        onChange(value) {
          scene.fog.density = value
        },
      },
      {
        label: 'Fog Color',
        bindPath: 'scene.environment.fog.color',
        type: 'Color',
        onChange(value) {
          scene.fog.color.set(value.r, value.g, value.b, value.a)
        },
      },
    ],
  },
  // Post Processing subgroup
  {
    type: 'Group',
    label: 'Post Processing',
    items: [
      {
        label: 'Bloom Intensity',
        bindPath: 'scene.postProcessing.bloom.intensity',
        type: 'Slider',
        min: 0,
        max: 3,
        step: 0.1,
        onChange(value) {
          bloomPass.intensity = value
        },
      },
      {
        label: 'Bloom Threshold',
        bindPath: 'scene.postProcessing.bloom.threshold',
        type: 'Slider',
        min: 0,
        max: 2,
        step: 0.1,
        onChange(value) {
          bloomPass.threshold = value
        },
      },
      {
        label: 'Exposure',
        bindPath: 'scene.postProcessing.colorGrading.exposure',
        type: 'Slider',
        min: 0,
        max: 3,
        step: 0.1,
        onChange(value) {
          colorGradingPass.exposure = value
        },
      },
    ],
  },
])
```

### Dynamic Groups

You can add and remove groups dynamically:

```javascript
const gui = new GUI(data)

// Add initial groups
gui.addGroup('Basic', basicControls)

// Add group conditionally
if (advancedMode) {
  gui.addGroup('Advanced', advancedControls)
}

// Remove a group (if needed)
// gui.removeGroup('Advanced');
```

### Group Events

Groups support open/close events:

```javascript
gui.addGroup('Animation', animationControls, {
  defaultOpen: true,
  onOpenChange: (isOpen) => {
    console.log(`Animation group ${isOpen ? 'opened' : 'closed'}`)

    // Pause animations when group is closed
    if (!isOpen) {
      pauseAnimations()
    } else {
      resumeAnimations()
    }
  },
})
```

### Complete Example with Groups

```javascript
const sceneData = {
  object: {
    transform: {
      position: { x: 0, y: 0, z: 0 },
      rotation: { x: 0, y: 0, z: 0 },
      scale: { x: 1, y: 1, z: 1 },
    },
    material: {
      color: { r: 1, g: 1, b: 1, a: 1 },
      metallic: 0.0,
      roughness: 0.5,
      emissive: false,
    },
  },
  camera: {
    position: { x: 0, y: 5, z: 10 },
    target: { x: 0, y: 0, z: 0 },
    fov: 45,
  },
  lighting: {
    ambient: { color: { r: 0.2, g: 0.2, b: 0.2, a: 1 }, intensity: 0.5 },
    directional: { color: { r: 1, g: 1, b: 1, a: 1 }, intensity: 1.0 },
  },
}

const gui = new GUI(sceneData)

// Object controls
gui.addGroup(
  'Object',
  [
    {
      type: 'Group',
      label: 'Transform',
      items: [
        {
          label: 'Position',
          bindPath: 'object.transform.position',
          type: 'Vector3',
          onChange: updateObjectPosition,
        },
        {
          label: 'Rotation',
          bindPath: 'object.transform.rotation',
          type: 'Vector3',
          onChange: updateObjectRotation,
        },
        {
          label: 'Scale',
          bindPath: 'object.transform.scale',
          type: 'Vector3',
          onChange: updateObjectScale,
        },
      ],
    },
    {
      type: 'Group',
      label: 'Material',
      items: [
        {
          label: 'Color',
          bindPath: 'object.material.color',
          type: 'Color',
          onChange: updateMaterialColor,
        },
        {
          label: 'Metallic',
          bindPath: 'object.material.metallic',
          type: 'Slider',
          min: 0,
          max: 1,
          onChange: updateMaterialMetallic,
        },
        {
          label: 'Roughness',
          bindPath: 'object.material.roughness',
          type: 'Slider',
          min: 0,
          max: 1,
          onChange: updateMaterialRoughness,
        },
        {
          label: 'Emissive',
          bindPath: 'object.material.emissive',
          type: 'Toggle',
          onChange: updateMaterialEmissive,
        },
      ],
    },
  ],
  {
    defaultOpen: true,
  }
)

// Camera controls
gui.addGroup(
  'Camera',
  [
    {
      label: 'Position',
      bindPath: 'camera.position',
      type: 'Vector3',
      onChange: updateCameraPosition,
    },
    {
      label: 'Target',
      bindPath: 'camera.target',
      type: 'Vector3',
      onChange: updateCameraTarget,
    },
    {
      label: 'Field of View',
      bindPath: 'camera.fov',
      type: 'Slider',
      min: 10,
      max: 120,
      onChange: updateCameraFOV,
    },
  ],
  {
    defaultOpen: false,
  }
)

// Lighting controls
gui.addGroup(
  'Lighting',
  [
    {
      type: 'Group',
      label: 'Ambient Light',
      items: [
        {
          label: 'Color',
          bindPath: 'lighting.ambient.color',
          type: 'Color',
          onChange: updateAmbientColor,
        },
        {
          label: 'Intensity',
          bindPath: 'lighting.ambient.intensity',
          type: 'Slider',
          min: 0,
          max: 2,
          onChange: updateAmbientIntensity,
        },
      ],
    },
    {
      type: 'Group',
      label: 'Directional Light',
      items: [
        {
          label: 'Color',
          bindPath: 'lighting.directional.color',
          type: 'Color',
          onChange: updateDirectionalColor,
        },
        {
          label: 'Intensity',
          bindPath: 'lighting.directional.intensity',
          type: 'Slider',
          min: 0,
          max: 3,
          onChange: updateDirectionalIntensity,
        },
      ],
    },
  ],
  {
    defaultOpen: false,
    onOpenChange: (isOpen) => {
      console.log(`Lighting controls ${isOpen ? 'opened' : 'closed'}`)
    },
  }
)
```

### Supported Input Types

| Type       | Description     | Example Value                             |
| ---------- | --------------- | ----------------------------------------- |
| `Input`    | Text input      | `"Hello World"`                           |
| `Number`   | Number input    | `42`                                      |
| `Slider`   | Range slider    | `0.5`                                     |
| `Color`    | Color picker    | `{ r: 1, g: 0, b: 0, a: 1 }`              |
| `Toggle`   | Boolean toggle  | `true`                                    |
| `Vector2`  | 2D vector       | `{ x: 1, y: 2 }`                          |
| `Vector3`  | 3D vector       | `{ x: 1, y: 2, z: 3 }`                    |
| `Vector4`  | 4D vector       | `{ x: 1, y: 2, z: 3, w: 4 }`              |
| `Rect`     | Rectangle       | `{ x: 0, y: 0, width: 100, height: 100 }` |
| `Select`   | Dropdown select | `"option1"`                               |
| `Textarea` | Multi-line text | `"Long text..."`                          |
| `Button`   | Action button   | N/A                                       |
| `Array`    | Array of items  | `[item1, item2, ...]`                     |

### Configuration Options

Each GUI item supports various configuration options:

```javascript
{
  label: 'Custom Label',           // Display label
  bindPath: 'object.property',     // Data binding path
  type: 'Slider',                  // Input type
  min: 0,                          // Minimum value (for sliders/numbers)
  max: 100,                        // Maximum value (for sliders/numbers)
  step: 0.1,                       // Step size (for sliders/numbers)
  options: [                       // Options for select
    { label: 'Option 1', value: 'opt1' },
    { label: 'Option 2', value: 'opt2' }
  ],
  onChange(value) {                // Change callback
    console.log('Value changed:', value);
  },
  info: 'Helpful tooltip text',    // Tooltip information
  disabled: false                  // Disable the input
}
```

## React Components

For React applications, you can use individual form components for more control:

### Available Components

- `FormItemInput` - Text input
- `FormItemInputNumber` - Number input
- `FormItemSlider` - Range slider
- `FormItemColor` - Color picker
- `FormItemToggle` - Boolean toggle
- `FormItemVector2` - 2D vector input
- `FormItemVector3` - 3D vector input
- `FormItemVector4` - 4D vector input
- `FormItemRect` - Rectangle input
- `FormItemSelect` - Dropdown select
- `FormItemTextarea` - Multi-line text input
- `FormItemButton` - Action button
- `FormItemArray` - Array input

### Component Props

All form components share common props:

```typescript
interface BaseFormItemProps<T> {
  label?: string // Display label
  value?: T // Current value
  onChange?: (value: T) => void // Change handler
  info?: string // Tooltip text
  disabled?: boolean // Disable state
  direction?: 'row' | 'column' // Layout direction
}
```

## Theming

The library supports both light and dark themes:

```javascript
// For GUI class
const gui = new GUI(data, items)
gui.setTheme('dark') // or 'light'

// For React components, wrap your app with ThemeProvider
import { ThemeProvider, darkTheme } from '@galacean/editor-ui'

function App() {
  return <ThemeProvider theme={darkTheme}>{/* Your components */}</ThemeProvider>
}
```

## Integration with 3D Engines

This library works great with various 3D engines. Here's an example with Galacean Engine:

```javascript
// Galacean Engine integration
import { WebGLEngine, Camera, DirectLight, BlinnPhongMaterial } from '@galacean/engine'

async function createScene() {
  const engine = await WebGLEngine.create({ canvas: 'canvas' })
  const scene = engine.sceneManager.activeScene
  const camera = scene.createRootEntity().addComponent(Camera)
  const light = scene.createRootEntity().addComponent(DirectLight)

  const sceneData = {
    camera: {
      position: { x: 0, y: 10, z: 30 },
      fov: 45,
    },
    light: {
      color: { r: 1, g: 1, b: 1, a: 1 },
      intensity: 1.0,
    },
  }

  const gui = new GUI(sceneData, [
    {
      label: 'Camera Position',
      bindPath: 'camera.position',
      type: 'Vector3',
      onChange(value) {
        camera.entity.transform.setPosition(value.x, value.y, value.z)
      },
    },
    {
      label: 'Camera FOV',
      bindPath: 'camera.fov',
      type: 'Slider',
      min: 10,
      max: 120,
      onChange(value) {
        camera.fieldOfView = value
      },
    },
    {
      label: 'Light Color',
      bindPath: 'light.color',
      type: 'Color',
      onChange(value) {
        light.color.set(value.r, value.g, value.b, value.a)
      },
    },
    {
      label: 'Light Intensity',
      bindPath: 'light.intensity',
      type: 'Slider',
      min: 0,
      max: 2,
      onChange(value) {
        light.intensity = value
      },
    },
  ])
}
```

## TypeScript Support

The library is written in TypeScript and provides full type definitions:

```typescript
import { GUI, GUIItemConfig, GUIItemTypeEnum } from '@galacean/gui'

interface SceneData {
  camera: {
    position: { x: number; y: number; z: number }
    fov: number
  }
  light: {
    color: { r: number; g: number; b: number; a: number }
    intensity: number
  }
}

const sceneData: SceneData = {
  camera: {
    position: { x: 0, y: 10, z: 30 },
    fov: 45,
  },
  light: {
    color: { r: 1, g: 1, b: 1, a: 1 },
    intensity: 1.0,
  },
}

const guiConfig: GUIItemConfig[] = [
  {
    label: 'Camera Position',
    bindPath: 'camera.position',
    type: GUIItemTypeEnum.Vector3,
    onChange(value: { x: number; y: number; z: number }) {},
  },
]

const gui = new GUI(sceneData, guiConfig)
```

## Browser Support

- Chrome 88+
- Firefox 85+
- Safari 14+
- Edge 88+

## Contributing

We welcome contributions! Please see our [Contributing Guide](CONTRIBUTING.md) for details.

## License

MIT License. See [LICENSE](LICENSE) for details.
