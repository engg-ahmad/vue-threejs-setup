<script setup lang="ts">
  import { onMounted, ref, watch } from 'vue'
  import { useThreeScene } from '@/composables/three/useThreeScene';
  import { useObjectManager } from '@/composables/object/useObjectManager';

  const container = ref<HTMLCanvasElement | null>(null);
  
  // Initialize the Three.js scene
  const threeScene = useThreeScene(container);
  // Initialize object manager
  const objectManager = useObjectManager(threeScene.scene)

  // Watch for scene changes - using deep equality to prevent unnecessary updates
  watch(() => threeScene.scene.value, (newScene, oldScene) => {
    // Only update if the scene reference actually changed to a different object
    if (newScene && newScene !== oldScene) {
      console.log('Scene reference changed - objects will use new scene on next operation')
      // Avoid explicit updateScene() calls to prevent GL_INVALID_OPERATION errors
      // The scene reference is already reactive, so new operations will use the updated reference
    }
  }, { deep: true })

  onMounted(() => {
  })
</script>

<template>
  <div id="scene-container" ref="container"></div>
</template>

<style scoped>
</style>
