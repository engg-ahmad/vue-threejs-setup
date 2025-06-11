import { markRaw } from 'vue';
import { BufferGeometry, BufferAttribute, Mesh, MeshStandardMaterial, BoxGeometry } from 'three';

// Extend Mesh to allow a 'tick' method for animation
declare module 'three' {
  interface Mesh {
    tick?: () => void;
  }
}

export const useObjectManager = () => {
  // Create a 3D cube
  const createObject = (type: String) => {
    let geometry
    switch (type) {
      case 'cube':
        geometry = new BoxGeometry(2, 2, 2)
        break;
      case 'triangle':
        const vertices = new Float32Array([
          0, 1, 0,   // Vertex A (top)
          -1, -1, 0, // Vertex B (bottom left)
          1, -1, 0   // Vertex C (bottom right)
        ]);
        geometry = new BufferGeometry();

        // itemSize = 3 because there are 3 values (components) per vertex
        geometry.setAttribute( 'position', new BufferAttribute( vertices, 3 ) );

        break;
      // Add more cases for different object types if needed
      default:
        throw new Error(`Unknown object type: ${type}`);
    }

    const material = new MeshStandardMaterial({ color: 'purple' });
    const mesh = markRaw(new Mesh(geometry, material));

    return mesh
  }

  const createCube = () => {
    const cube = createObject('cube');
    cube.rotation.set(-0.5, -0.1, 0.8); // Set the rotation of the cube

    // this method will be called once per frame
    cube.tick = () => {
      // increase the cube's rotation each frame
      cube.rotation.z += 0.01;
      cube.rotation.x += 0.01;
      cube.rotation.y += 0.01;
    }

    // Log creation for debugging
    console.log(`Created new cube at scene center`)
    return cube
  }

  return {
    createObject,
    createCube
  }
}