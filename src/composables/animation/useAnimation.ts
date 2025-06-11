import type { Object3D } from 'three';
import { reactive, ref } from 'vue';

export const useAnimation = (renderCallback: Function) => {
  const updateables = ref<Object3D[]>([]); // Use ref to make it reactive
  const animationState = reactive<{
    isRunning: boolean;
    frameId: number | null;
    startTime: number;
    lastFrameTime: number;
    frameCount: number;
  }>({
    isRunning: false,
    frameId: null,
    startTime: 0,
    lastFrameTime: 0,
    frameCount: 0
  })

  const start = () => {
    if (animationState.isRunning) return

    animationState.isRunning = true
    animationState.startTime = performance.now()
    animationState.lastFrameTime = animationState.startTime
    animationState.frameCount = 0

    animate();
  }

  const stop = () => {
    if (!animationState.isRunning) return
  
    if (animationState.frameId !== null) {
      cancelAnimationFrame(animationState.frameId)
      animationState.frameId = null
    }
    
    animationState.isRunning = false
    
  }

  const animate = () => {
    animationState.frameId = requestAnimationFrame(animate)
    
    tick();

    // Execute render callback
    try {
      if (typeof renderCallback === 'function') {
        renderCallback()
      }
    } catch (error) {
      console.error('Error in animation loop:', error)
      stop()
    }
  }

  const tick = () => {
    if (updateables.value.length === 0) return;

    for (const object of updateables.value) {
      if (typeof (object as any).tick === 'function') {
        (object as any).tick();
      }
    }
  }
  
  // Use this function to add an object to updateables reactively
  const addUpdateable = (object: Object3D) => {
    if (!updateables.value.includes(object)) {
      updateables.value = [...updateables.value, object];
    }
  };

  // Use this function to remove an object from updateables reactively
  const removeUpdateable = (object: Object3D) => {
    updateables.value = updateables.value.filter(o => o !== object);
  };

  return {
    start,
    stop,
    updateables,
    addUpdateable,
    removeUpdateable
  };
}