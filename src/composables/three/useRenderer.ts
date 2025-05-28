import { ref, type Ref } from 'vue';
import { Scene, Camera, WebGLRenderer } from 'three';

export const useRenderer = (containerRef: Ref) => {
  const renderer = ref<WebGLRenderer | null>(null);

  // Create a WebGL renderer and append it to the container
  const createRenderer = () => {
    if (!containerRef.value) return null

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
    if (!renderer.value || !scene || !camera) return null
    
    renderer.value.render(scene, camera)
  }

  return {
    renderer,
    createRenderer,
    render
  };
} 