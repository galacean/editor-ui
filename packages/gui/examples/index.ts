async function start() {
  const Galacean = (window as any).Galacean
  const {
    AssetType,
    Color,
    BlinnPhongMaterial,
    Camera,
    DirectLight,
    GLTFResource,
    MeshRenderer,
    RenderFace,
    Texture2D,
    Vector3,
    WebGLEngine,
  } = Galacean
  const { OrbitControl } = Galacean.Toolkit

  // Create engine
  const engine = await WebGLEngine.create({ canvas: document.getElementById('canvas') as HTMLCanvasElement })
  engine.canvas.resizeByClientSize()

  const scene = engine.sceneManager.activeScene
  const rootEntity = scene.createRootEntity()

  // Create camera
  const cameraEntity = rootEntity.createChild('Camera')
  cameraEntity.transform.setPosition(0, 10, 30)
  cameraEntity.addComponent(Camera)
  const control = cameraEntity.addComponent(OrbitControl)
  control.target.y = 5

  // Create Direct Light
  const light1 = rootEntity.createChild()
  const light2 = rootEntity.createChild()
  light1.transform.lookAt(new Vector3(-1, -1, -1))
  light2.transform.lookAt(new Vector3(1, 1, 1))
  light1.addComponent(DirectLight)
  light2.addComponent(DirectLight)

  engine.run()

  const resources = await engine.resourceManager.load([
    {
      type: AssetType.Texture2D,
      url: 'https://gw.alipayobjects.com/mdn/rms_7c464e/afts/img/A*g_HIRqQdNUcAAAAAAAAAAAAAARQnAQ',
    },
    {
      type: AssetType.Texture2D,
      url: 'https://gw.alipayobjects.com/mdn/rms_7c464e/afts/img/A*H7nMRY2SuWcAAAAAAAAAAAAAARQnAQ',
    },
    {
      type: AssetType.GLTF,
      url: 'https://gw.alipayobjects.com/os/bmw-prod/72a8e335-01da-4234-9e81-5f8b56464044.gltf',
    },
  ])
  const baseTexture = resources[0]
  const normalTexture = resources[1]
  const gltf = resources[2]

  const { defaultSceneRoot } = gltf
  const rendererArray = new Array()
  const materials = new Array()

  rootEntity.addChild(defaultSceneRoot)
  defaultSceneRoot.getComponentsIncludeChildren(MeshRenderer, rendererArray)

  rendererArray.forEach((renderer) => {
    const material = new BlinnPhongMaterial(engine)
    material.baseTexture = baseTexture
    material.normalTexture = normalTexture
    material.shininess = 64
    material.renderFace = RenderFace.Double
    renderer.setMaterial(material)
    materials.push(material)
  })

  addGUI(cameraEntity, materials)
}

function addGUI(cameraEntity, materials: any[]): void {
  const data = {
    baseColor: { r: 1, g: 1, b: 1, a: 1 },
    specularColor: { r: 1, g: 1, b: 1, a: 1 },
    shininess: 64,
    normalIntensity: 1,
    isTransparent: false,
    position: {
      x: 0,
      y: 0,
      z: 0,
    },
    opacity: 1,
    materials: [
      {
        baseColor: { r: 1, g: 1, b: 1, a: 1 },
        specularColor: { r: 1, g: 1, b: 1, a: 1 },
        shininess: 64,
        normalIntensity: 1,
        isTransparent: false,
        opacity: 1,
      },
    ],
  }
  const gui = new GalaceanGUI(data, [
    {
      label: 'baseColor',
      bindPath: 'baseColor',
      type: 'Color',
      onChange(value) {
        materials.forEach((material) => {
          material.specularColor.set(value.r, value.g, value.b, value.a)
        })
      },
    },
    {
      bindPath: 'position',
      type: 'Vector3',
      onChange(value) {
        cameraEntity.transform.setPosition(value.x, value.y, value.z)
      },
    },
    {
      bindPath: 'specularColor',
      type: 'Color',
      onChange(value) {
        materials.forEach((material) => {
          material.specularColor.set(value.r, value.g, value.b, 1)
        })
      },
    },
    {
      bindPath: 'shininess',
      type: 'Slider',
      min: 0,
      max: 100,
      onChange(value) {
        materials.forEach((material) => {
          material.shininess = value
        })
      },
    },
    {
      bindPath: 'normalIntensity',
      type: 'Number',
      min: 0,
      max: 1,
      dragStep: 0.1,
      onChange(value) {
        materials.forEach((material) => {
          material.normalIntensity = value
        })
      },
    },
    {
      bindPath: 'isTransparent',
      type: 'Toggle',
      onChange(value) {
        materials.forEach((material) => {
          material.isTransparent = value
        })
      },
    },
    {
      bindPath: 'opacity',
      type: 'Number',
      min: 0,
      max: 1,
      dragStep: 0.1,
      onChange(value) {
        materials.forEach((material) => {
          material.baseColor.a = value
        })
      },
    },
    {
      label: 'Materials',
      bindPath: 'materials',
      type: 'Array',
      items: [
        {
          label: 'baseColor',
          bindPath: 'materials.0.baseColor',
          type: 'Color',
          onChange(value) {
            materials.forEach((material) => {
              material.specularColor.set(value.r, value.g, value.b, value.a)
            })
          },
        },
      ],
    },
  ])

  gui.addGroup('Transform', [
    {
      bindPath: 'position',
      type: 'Vector3',
      onChange(value) {
        cameraEntity.transform.setPosition(value.x, value.y, value.z)
      },
    },
  ])
}

start()
