import { Scene, Color, DirectionalLight } from 'three';
import { ref } from 'vue';
import { COLORS } from '@/config/constants';

export const useScene = () => {
  const scene = ref<Scene | null>(null);
  const backgroundColor = ref<string>(COLORS.BACKGROUND);

  // light properties
  const directionalLight = ref<DirectionalLight | null>(null);
  const directionalLightColor = ref<string | number>('white'); // Default white light color
  const directionalLightIntensity = ref<number>(16); // Default intensity
  const directionalLightPosition = ref<{ x: number, y: number, z: number }>({ x: 10, y: 10, z: 10 });

  const createScene = () => {
    const newScene = new Scene();
    newScene.background = new Color(backgroundColor.value) // Default background color
    scene.value = newScene

    console.log('Scene created with background color:', backgroundColor.value);

    return newScene;
  }

  const createLights = () => {
    const light = new DirectionalLight(directionalLightColor.value, directionalLightIntensity.value);
  
    light.position.set(directionalLightPosition.value.x, directionalLightPosition.value.y, directionalLightPosition.value.z); // Set the position of the light

    directionalLight.value = light

    return light;
  }

   // Update directional light
  const updateDirectionalLight = (color: string | number, intensity: number, position: { x: number, y: number, z: number }) => {
    if (!directionalLight.value) {
      return console.warn('Directional light is not initialized. Creating a new one.');
    }

    if (color) directionalLightColor.value = color
    if (intensity) directionalLightIntensity.value = intensity
    if (position) directionalLightPosition.value = position

    directionalLight.value.color.set(directionalLightColor.value);
    directionalLight.value.intensity = directionalLightIntensity.value;
    directionalLight.value.position.set(
      directionalLightPosition.value.x,
      directionalLightPosition.value.y,
      directionalLightPosition.value.z
    );
    console.log('Directional light updated:', {
      color: directionalLightColor.value,
      intensity: directionalLightIntensity.value,
      position: directionalLightPosition.value
    });
  }

  return {
    scene,
    createScene,
    createLights,
    updateDirectionalLight
  };
}