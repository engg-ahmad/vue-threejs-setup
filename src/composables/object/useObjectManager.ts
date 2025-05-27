import { ref, markRaw, type Ref } from 'vue';
import { BoxGeometry, Mesh, MeshBasicMaterial } from 'three';


export const useObjectManager = (scene: Ref) => {
  const objects = ref<Mesh[]>([]); // Store created objects
  const objectCounter = ref(0); // Unique ID counter for objects

  // Create a 3D cube
  const createObject = (type: String) => {
    let geometery
    switch (type) {
      case 'cube':
        geometery = markRaw(new BoxGeometry(1, 1, 1));
        break;
      // Add more cases for different object types if needed
      default:
        throw new Error(`Unknown object type: ${type}`);
    }

    const material = markRaw(new MeshBasicMaterial());
    const mesh = markRaw(new Mesh(geometery, material));
    mesh.position.set(0, 0, 0)

     // Add unique ID and type
    objectCounter.value++
    mesh.userData = {
      id: objectCounter.value,
      type: type,
      createdAt: Date.now()
    }

    return mesh
  }

   // Track an object
  const trackObject = (object: Mesh) => {
    // Use spread to create new arrays for reactivity
    objects.value = [...objects.value, object]
    
  }

  // Add object to scene
  const addObject = (type: String) => {
    console.log('addObject called with scene:', scene.value)
    if (!scene.value) {
      console.error('Scene is not available')
      return null
    }
    
    try {
      // Create the object
      const object = createObject(type)
      
      // Add to scene and track
      scene.value.add(object)
      trackObject(object)
      
      // Log creation for debugging
      console.log(`Created new ${type} (ID: ${object.userData.id}) at scene center`)
      
      return object
    } catch (error) {
      console.error('Error creating object:', error)
      return null
    }
  }

  return {
    objects,
    addObject,
    createObject
  }
}