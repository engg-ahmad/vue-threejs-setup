import { ref, markRaw, type Ref } from 'vue';
import { PerspectiveCamera } from 'three';

import { CAMERA } from '@/config/constants'

export const useCamera = (containerRef: Ref) => {
  const camera = ref<PerspectiveCamera | null>(null);
  const fov = ref(CAMERA.FOV);
  const aspect = ref(1);
  const near = ref(CAMERA.NEAR);
  const far = ref(CAMERA.FAR);
  const position = ref({ x: 0, y: 0, z: CAMERA.POSITION_Z });

  const createCamera = () => {
    if (!containerRef.value) return null

    const width = containerRef.value.clientWidth
    const height = containerRef.value.clientHeight
    aspect.value = width / height

    const newCamera = markRaw(new PerspectiveCamera(fov.value, aspect.value, near.value, far.value));
    // every object is initially created at ( 0, 0, 0 )
    // move the camera back so we can view the scene
    newCamera.position.set(position.value.x, position.value.y, position.value.z); // Set initial position
    camera.value = newCamera;
    
    console.log('Camera created with FOV:', fov.value, 'and near/far:', near.value, '/', far.value);
    console.log('Camera created with position:', position.value, 'and aspect ratio:', aspect.value);
    return newCamera
  }

  return {
    camera,
    createCamera
  }
}
