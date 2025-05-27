import { Scene, Color } from 'three';
import { ref, markRaw } from 'vue';
import { COLORS } from '@/config/constants';

export const useScene = () => {
  const scene = ref<Scene | null>(null);
  const backgroundColor = ref<string>(COLORS.BACKGROUND);

  const createScene = () => {
    const newScene = new Scene();
    newScene.background = new Color(backgroundColor.value) // Default background color
    scene.value = newScene

    console.log('Scene created with background color:', backgroundColor.value);

    return newScene;
  }
  
  return {
    scene,
    createScene
  };
}