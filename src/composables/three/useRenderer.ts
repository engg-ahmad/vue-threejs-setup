import { ref, markRaw, type Ref } from 'vue';
import { Scene, Camera, WebGLRenderer } from 'three';


export const useRenderer = (containerRef: Ref) => {
  const renderer = ref<WebGLRenderer | null>(null);

  // Create a WebGL renderer and append it to the container
  const createRenderer = () => {
    if (renderer.value) return;

    const { clientWidth, clientHeight } = containerRef.value
    const newRenderer = new WebGLRenderer();
    newRenderer.setSize(clientWidth, clientHeight);
    newRenderer.setPixelRatio(window.devicePixelRatio);

    containerRef.value.appendChild(newRenderer.domElement)

    renderer.value = newRenderer;

    console.log('Renderer created with size:', clientWidth, 'x', clientHeight);
    return newRenderer
  };

   // Render a scene
  const render = (scene: Scene, camera: Camera) => {
    if (!renderer.value || !scene || !camera) return
    
    renderer.value.render(scene, camera)
  }

  return {
    createRenderer,
    renderer,
    render
  };
} 