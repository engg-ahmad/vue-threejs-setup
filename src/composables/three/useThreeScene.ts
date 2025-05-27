import { onMounted, nextTick, type Ref } from "vue";

import { useScene } from '@/composables/three/useScene';
import { useCamera } from '@/composables/three/useCamera';
import { useRenderer } from '@/composables/three/useRenderer';
import { useObjectManager } from '@/composables/object/useObjectManager';

export const useThreeScene = (containerRef: Ref) => {
  // Use sceneManager to manage your Three.js scenes
  const sceneManager = useScene();
  // Use cameraManager to manage your Three.js cameras
  const cameraManager = useCamera(containerRef);
  // Use rendererManager to manage your Three.js renderers
  const rendererManager = useRenderer(containerRef);

  const objectManager = useObjectManager(sceneManager.scene);

  const init = async () => {
    try {
      await nextTick(); // Ensure the DOM is updated before accessing containerRef
      if (!containerRef.value) {
        console.error("Container reference is not defined");
        return;
      }
      // Set up the Three.js scene
      sceneManager.createScene()
      cameraManager.createCamera();
      rendererManager.createRenderer();
    }
    catch (error) {
      console.error("Error initializing Three.js scene:", error);
    }
  }

  onMounted(async () => {
    await init();
    if (containerRef.value) {
      containerRef.value.focus()
    }
    // Initialize the Three.js scene here
    console.log("Three.js scene initialized");
    // You can add your Three.js setup code here
    
    // Render scene
    if (rendererManager.renderer.value && 
        sceneManager.scene.value && 
        cameraManager.camera.value) {
      objectManager.addObject('cube'); // Example of adding a cube object
      rendererManager.render(
        sceneManager.scene.value, 
        cameraManager.camera.value
      )
    }
  });

  return {
    scene: sceneManager.scene,
    camera: cameraManager.camera,
    renderer: rendererManager.renderer
  }
}