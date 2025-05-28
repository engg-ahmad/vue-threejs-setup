import { markRaw } from 'vue';
import { BufferGeometry, BufferAttribute, Mesh, MeshBasicMaterial, BoxGeometry } from 'three';

export const useObjectManager = () => {
  // Create a 3D cube
  const createObject = (type: String) => {
    let geometry
    switch (type) {
      case 'cube':
        geometry = new BoxGeometry(2, 2, 2)
        break;
      case 'triangle':
        const vertices = new Float32Array( [
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

    const material = new MeshBasicMaterial();
    const mesh = markRaw(new Mesh(geometry, material));

    return mesh
  }

  return {
    createObject
  }
}