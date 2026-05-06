import type { Rotation } from '../types';

export function getCameraDirectives(rotation: Rotation): string {
  const { x: pitch, y: yaw } = rotation;
  const directives = [
    "RED FRAME (FRONT): 이 평면은 물체의 '진정한 정면'입니다. 이미지 1의 정면 얼굴이 이 프레임 안에 완벽히 정렬되어야 합니다.",
  ];

  if (pitch > 0) {
    directives.push(
      `TOP VIEW (Pitch: ${pitch}°): 카메라가 위에서 내려다봅니다. 물체의 '윗부분(TOP)'이 노출되어야 합니다.`,
    );
  } else if (pitch < 0) {
    directives.push(
      `BOTTOM VIEW (Pitch: ${pitch}°): 카메라가 아래에서 위를 봅니다. 물체의 '밑바닥(BOTTOM)'이 노출되어야 합니다.`,
    );
  }

  if (yaw > 0) {
    directives.push(
      `SIDE VIEW (Yaw: ${yaw}°): 카메라가 오른쪽으로 이동했습니다. 따라서 물체의 '왼쪽 측면(LEFT SIDE)'이 보여야 합니다.`,
    );
  } else if (yaw < 0) {
    directives.push(
      `SIDE VIEW (Yaw: ${yaw}°): 카메라가 왼쪽으로 이동했습니다. 따라서 물체의 '오른쪽 측면(RIGHT SIDE)'이 보여야 합니다.`,
    );
  }

  return directives.join('\n- ');
}

export function buildMultiviewPerspectivePrompt(rotation: Rotation): string {
  const cameraDirectives = getCameraDirectives(rotation);
  return `
[SYSTEM: 3D SPATIAL VECTORING ENGINE]

### 1. COORDINATE TRUTH (CAMERA DYNAMICS)
- **PITCH (${rotation.x}°)**: 
  - If Positive: Camera is UP. Show TOP thickness.
  - If Negative: Camera is DOWN. Show BOTTOM thickness.
- **YAW (${rotation.y}°)**:
  - If Positive (+): Camera is to the RIGHT of the object. You MUST show the **LEFT SIDE** of the object.
  - If Negative (-): Camera is to the LEFT of the object. You MUST show the **RIGHT SIDE** of the object.

### 2. IDENTITY ANCHOR (RED FRAME)
- **IMAGE 1** is the source identity.
- **IMAGE 2** is the perspective guide. 
- Map the Front of the object from Image 1 EXACTLY onto the **RED FRAME** in Image 2. 
- The object's eyes/face must point in the same direction the Red Frame is facing. 
- **ERROR TO VOID**: Do not just paste the 2D image. Use the Red Frame as a window to define the object's 3D orientation.

### 3. VOLUMETRIC RULES
- Extrude the 2D shape along the Blue and Green axis.
- The object must be a solid, volumetric asset (like a game character model).
- Lighting must emphasize the 3D form, with shadows on the side away from the camera.

### 4. OUTPUT INSTRUCTIONS
- ${cameraDirectives}
- Render the result on a pure white (#FFFFFF) background.
- NO cube, NO labels, NO UI elements.
- Style: Clean 3D render (High-quality 3D asset).

**FINAL CHECK**: If Yaw is positive (+), is the LEFT side visible? If Pitch is positive, is the TOP visible? If the orientation does not match the Red Frame, you have failed.
`;
}
