import { onMounted, nextTick, type Ref } from "vue";

import { useScene } from '@/composables/three/useScene';
import { useCamera } from '@/composables/three/useCamera';
import { useRenderer } from '@/composables/three/useRenderer';
import { useObjectManager } from "@/composables/object/useObjectManager";
import { useAnimation } from '@/composables/animation/useAnimation';

export const useThreeScene = (containerRef: Ref) => {
  // Use sceneManager to manage your Three.js scenes
  const sceneManager = useScene();
  // Use cameraManager to manage your Three.js cameras
  const cameraManager = useCamera(containerRef);
  // Use rendererManager to manage your Three.js renderers
  const rendererManager = useRenderer(containerRef);

  // Render function for animation
  const renderFrame = () => {
    // Render scene
    if (rendererManager.renderer.value &&
        sceneManager.scene.value &&
        cameraManager.camera.value) {
      rendererManager.render(
        sceneManager.scene.value,
        cameraManager.camera.value
      )
    }
  }

    // Animation manager
  const animationManager = useAnimation(renderFrame)

  const init = async () => {
    try {
      await nextTick(); // Ensure the DOM is updated before accessing containerRef
      if (!containerRef.value) {
        console.error("Container reference is not defined");
        return;
      }
      // Set up the Three.js scene
      sceneManager.createScene();
      cameraManager.createCamera();
      rendererManager.createRenderer();

      const objectManager = useObjectManager();

      // Add lights to the scene
      const light = sceneManager.createLights();
      const cube = objectManager.createCube();
      animationManager.addUpdateable(cube);
      sceneManager.scene.value?.add(cube, light);

      // Add window resize handler
      window.addEventListener('resize', onWindowResize)
    }
    catch (error) {
      console.error("Error initializing Three.js scene:", error);
    }
  }

  // Handle window resize
  const onWindowResize = () => {
    if (!containerRef.value) return
    
    const width = containerRef.value.clientWidth
    const height = containerRef.value.clientHeight
    
    cameraManager.updateAspect(width, height)
    rendererManager.resize(width, height)
  }

  onMounted(async () => {
    await init();
    if (containerRef.value) {
      containerRef.value.focus()
    }

    // You can add your Three.js setup code here
    if (!sceneManager.scene.value || !cameraManager.camera.value || !rendererManager.renderer.value) {
      console.error("Failed to initialize Three.js scene, camera, or renderer");
      return;
    }

    // Initialize the Three.js scene here
    console.log("Three.js scene initialized");

    animationManager.start()
  });

  return {
    scene: sceneManager.scene,
    camera: cameraManager.camera,
    renderer: rendererManager.renderer
  }
}