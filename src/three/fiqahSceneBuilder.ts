import * as THREE from 'three';
import {
  createAstrolabeDialTexture,
  createContactShadowTexture,
  createLeatherCoverTexture,
  createQuranPageTexture,
  createWalnutWoodTexture,
} from './proceduralTextures';

export interface FiqahSceneAssets {
  rootGroup: THREE.Group;
  mushafGroup: THREE.Group;
  astrolabeGroup: THREE.Group;
  geometryGroup: THREE.Group;
  leftWing: THREE.Group;
  rightWing: THREE.Group;
  astrolabeRete: THREE.Mesh;
  qiblaNeedle: THREE.Group;
  outerStarRing: THREE.Mesh;
  innerStarRing: THREE.Mesh;
  floatingMotes: THREE.InstancedMesh;
  moteBasePositions: Float32Array;
  dispose: () => void;
}

function createCurvedPageGeometry(
  width: number,
  height: number,
  side: 'left' | 'right'
): THREE.BufferGeometry {
  const geo = new THREE.PlaneGeometry(width, height, 28, 12);
  const pos = geo.attributes.position;
  for (let i = 0; i < pos.count; i++) {
    const x = pos.getX(i);
    // Normalize t from 0 (spine edge) to 1 (outer page edge)
    const t = side === 'right' ? (x + width / 2) / width : (width / 2 - x) / width;
    // Gentle calligraphic scroll arch near spine, settling softly at outer margin
    const arch = Math.sin(t * Math.PI) * 0.085 + (1 - Math.pow(1 - t, 2)) * 0.03;
    pos.setZ(i, arch);
  }
  geo.computeVertexNormals();
  return geo;
}

function createEightPointStarShape(outerRadius: number, innerHoleRadius: number): THREE.Shape {
  const shape = new THREE.Shape();
  const points = 16;
  const rInner = outerRadius * 0.72;
  for (let i = 0; i < points; i++) {
    const angle = (i / points) * Math.PI * 2;
    const r = i % 2 === 0 ? outerRadius : rInner;
    const x = Math.cos(angle) * r;
    const y = Math.sin(angle) * r;
    if (i === 0) shape.moveTo(x, y);
    else shape.lineTo(x, y);
  }
  shape.closePath();

  const hole = new THREE.Path();
  hole.absarc(0, 0, innerHoleRadius, 0, Math.PI * 2, true);
  shape.holes.push(hole);
  return shape;
}

export function buildFiqahSceneAssets(
  maxAnisotropy: number,
  isSoftwareGl: boolean
): FiqahSceneAssets {
  const disposables: { dispose: () => void }[] = [];
  const track = <T extends { dispose: () => void }>(item: T): T => {
    disposables.push(item);
    return item;
  };

  // Textures
  const rightPageTex = track(createQuranPageTexture('right', maxAnisotropy));
  const leftPageTex = track(createQuranPageTexture('left', maxAnisotropy));
  const leatherTex = track(createLeatherCoverTexture(maxAnisotropy));
  const walnutTex = track(createWalnutWoodTexture(maxAnisotropy));
  const astrolabeTex = track(createAstrolabeDialTexture(maxAnisotropy));
  const shadowTex = track(createContactShadowTexture());

  // Shared PBR Materials with distinct roughness/metalness contrast (>= 0.25 delta)
  const goldMat = track(
    new THREE.MeshPhysicalMaterial({
      color: 0xd4af37,
      metalness: 0.92,
      roughness: 0.2,
      clearcoat: 0.35,
      clearcoatRoughness: 0.25,
    })
  );

  const brushedBrassMat = track(
    new THREE.MeshPhysicalMaterial({
      color: 0xc59b27,
      metalness: 0.88,
      roughness: 0.28,
      anisotropy: 0.7,
    })
  );

  const walnutMat = track(
    new THREE.MeshStandardMaterial({
      map: walnutTex,
      roughness: 0.62,
      metalness: 0.04,
    })
  );

  const leatherMat = track(
    new THREE.MeshStandardMaterial({
      map: leatherTex,
      roughness: 0.52,
      metalness: 0.08,
    })
  );

  const emeraldEnamelMat = track(
    new THREE.MeshPhysicalMaterial({
      color: 0x1b5e20,
      roughness: 0.24,
      metalness: 0.14,
      clearcoat: 0.85,
      clearcoatRoughness: 0.15,
    })
  );

  const rightPageMat = track(
    new THREE.MeshStandardMaterial({
      map: rightPageTex,
      roughness: 0.86,
      metalness: 0.0,
      side: THREE.DoubleSide,
    })
  );

  const leftPageMat = track(
    new THREE.MeshStandardMaterial({
      map: leftPageTex,
      roughness: 0.86,
      metalness: 0.0,
      side: THREE.DoubleSide,
    })
  );

  const giltEdgeMat = track(
    new THREE.MeshStandardMaterial({
      color: 0xe6c767,
      roughness: 0.38,
      metalness: 0.68,
    })
  );

  const travertineMat = track(
    new THREE.MeshStandardMaterial({
      color: 0xebe5d7,
      roughness: 0.78,
      metalness: 0.02,
    })
  );

  const glassMat = track(
    new THREE.MeshPhysicalMaterial({
      color: 0xffffff,
      roughness: 0.06,
      metalness: 0.0,
      transmission: isSoftwareGl ? 0 : 0.92,
      transparent: true,
      opacity: isSoftwareGl ? 0.32 : 1,
      ior: 1.55,
      thickness: 0.4,
      clearcoat: 1.0,
      depthWrite: false,
    })
  );

  const rootGroup = new THREE.Group();

  // Grounding Contact Shadow Plane (prevents floating appearance)
  const shadowPlaneGeo = track(new THREE.PlaneGeometry(5.2, 5.2));
  const shadowPlaneMat = track(
    new THREE.MeshBasicMaterial({
      map: shadowTex,
      transparent: true,
      depthWrite: false,
      opacity: 0.46,
    })
  );
  const contactShadow = new THREE.Mesh(shadowPlaneGeo, shadowPlaneMat);
  contactShadow.rotation.x = -Math.PI / 2;
  contactShadow.position.y = 0.01;
  rootGroup.add(contactShadow);

  // Architectural Travertine Display Pedestal (sits flush on y = 0)
  const pedestalGroup = new THREE.Group();
  const baseSlabGeo = track(new THREE.CylinderGeometry(1.92, 2.02, 0.14, 48));
  const baseSlab = new THREE.Mesh(baseSlabGeo, travertineMat);
  baseSlab.position.y = 0.07;
  baseSlab.receiveShadow = true;
  baseSlab.castShadow = true;
  pedestalGroup.add(baseSlab);

  const brassRimGeo = track(new THREE.TorusGeometry(1.92, 0.022, 16, 64));
  const brassRim = new THREE.Mesh(brassRimGeo, brushedBrassMat);
  brassRim.rotation.x = Math.PI / 2;
  brassRim.position.y = 0.145;
  pedestalGroup.add(brassRim);
  rootGroup.add(pedestalGroup);

  // =========================================================================
  // ASSEMBLY 1: ILLUMINATED QURAN MUSHAF ON HANDCRAFTED REHAL (8+ distinct parts)
  // =========================================================================
  const mushafGroup = new THREE.Group();
  mushafGroup.position.y = 0.145;

  // 1. Walnut Rehal Stand (Left & Right interlocking legs + central brass hinge pin)
  const rehalGroup = new THREE.Group();
  const slatGeo = track(new THREE.BoxGeometry(1.75, 0.055, 1.32));

  const rehalLeft = new THREE.Mesh(slatGeo, walnutMat);
  rehalLeft.position.set(-0.35, 0.34, 0);
  rehalLeft.rotation.z = -0.52;
  rehalLeft.castShadow = true;
  rehalLeft.receiveShadow = true;
  rehalGroup.add(rehalLeft);

  const rehalRight = new THREE.Mesh(slatGeo, walnutMat);
  rehalRight.position.set(0.35, 0.34, 0);
  rehalRight.rotation.z = 0.52;
  rehalRight.castShadow = true;
  rehalRight.receiveShadow = true;
  rehalGroup.add(rehalRight);

  // Rehal brass hinge pin
  const hingeGeo = track(new THREE.CylinderGeometry(0.032, 0.032, 1.38, 16));
  const hingeMesh = new THREE.Mesh(hingeGeo, brushedBrassMat);
  hingeMesh.rotation.x = Math.PI / 2;
  hingeMesh.position.set(0, 0.44, 0);
  rehalGroup.add(hingeMesh);

  // Rehal curved feet caps
  const footGeo = track(new THREE.BoxGeometry(0.18, 0.04, 1.34));
  const footLeft = new THREE.Mesh(footGeo, brushedBrassMat);
  footLeft.position.set(-0.98, 0.02, 0);
  const footRight = new THREE.Mesh(footGeo, brushedBrassMat);
  footRight.position.set(0.98, 0.02, 0);
  rehalGroup.add(footLeft, footRight);

  mushafGroup.add(rehalGroup);

  // 2. Open Mushaf Wings (Left & Right Hinged Book Assemblies)
  const spinePivot = new THREE.Group();
  spinePivot.position.set(0, 0.62, 0);

  // Spine leather bridge
  const spineGeo = track(new THREE.CylinderGeometry(0.075, 0.075, 1.48, 20, 1, false, 0, Math.PI));
  const spineMesh = new THREE.Mesh(spineGeo, leatherMat);
  spineMesh.rotation.x = Math.PI / 2;
  spineMesh.rotation.z = Math.PI;
  spineMesh.position.y = -0.02;
  spinePivot.add(spineMesh);

  const pageW = 0.96;
  const pageH = 1.34;
  const coverW = 1.04;
  const coverH = 1.44;

  // Right Wing
  const rightWing = new THREE.Group();
  rightWing.rotation.z = 0.36;

  const coverGeo = track(new THREE.BoxGeometry(coverW, 0.035, coverH));
  const rightCover = new THREE.Mesh(coverGeo, leatherMat);
  rightCover.position.set(coverW / 2 + 0.02, 0, 0);
  rightCover.castShadow = true;
  rightWing.add(rightCover);

  // Brass corner filigree on cover
  const cornerBracketGeo = track(new THREE.BoxGeometry(0.12, 0.044, 0.12));
  const rb1 = new THREE.Mesh(cornerBracketGeo, goldMat);
  rb1.position.set(coverW - 0.02, 0, coverH / 2 - 0.06);
  const rb2 = new THREE.Mesh(cornerBracketGeo, goldMat);
  rb2.position.set(coverW - 0.02, 0, -coverH / 2 + 0.06);
  rightWing.add(rb1, rb2);

  // Gilded Page Stack Block
  const pageBlockGeo = track(new THREE.BoxGeometry(pageW, 0.085, pageH));
  const rightPageBlock = new THREE.Mesh(pageBlockGeo, giltEdgeMat);
  rightPageBlock.position.set(pageW / 2 + 0.03, 0.06, 0);
  rightPageBlock.castShadow = true;
  rightWing.add(rightPageBlock);

  // Illuminated Top Right Parchment Page
  const rightPageGeo = track(createCurvedPageGeometry(pageW, pageH, 'right'));
  const rightPageMesh = new THREE.Mesh(rightPageGeo, rightPageMat);
  rightPageMesh.rotation.x = -Math.PI / 2;
  rightPageMesh.position.set(pageW / 2 + 0.03, 0.106, 0);
  rightPageMesh.receiveShadow = true;
  rightWing.add(rightPageMesh);

  // Left Wing
  const leftWing = new THREE.Group();
  leftWing.rotation.z = -0.36;

  const leftCover = new THREE.Mesh(coverGeo, leatherMat);
  leftCover.position.set(-(coverW / 2 + 0.02), 0, 0);
  leftCover.castShadow = true;
  leftWing.add(leftCover);

  const lb1 = new THREE.Mesh(cornerBracketGeo, goldMat);
  lb1.position.set(-(coverW - 0.02), 0, coverH / 2 - 0.06);
  const lb2 = new THREE.Mesh(cornerBracketGeo, goldMat);
  lb2.position.set(-(coverW - 0.02), 0, -coverH / 2 + 0.06);
  leftWing.add(lb1, lb2);

  const leftPageBlock = new THREE.Mesh(pageBlockGeo, giltEdgeMat);
  leftPageBlock.position.set(-(pageW / 2 + 0.03), 0.06, 0);
  leftPageBlock.castShadow = true;
  leftWing.add(leftPageBlock);

  const leftPageGeo = track(createCurvedPageGeometry(pageW, pageH, 'left'));
  const leftPageMesh = new THREE.Mesh(leftPageGeo, leftPageMat);
  leftPageMesh.rotation.x = -Math.PI / 2;
  leftPageMesh.position.set(-(pageW / 2 + 0.03), 0.106, 0);
  leftPageMesh.receiveShadow = true;
  leftWing.add(leftPageMesh);

  // Silk Bookmark Ribbon flowing from spine
  const ribbonCurve = new THREE.CatmullRomCurve3([
    new THREE.Vector3(0, 0.1, 0.25),
    new THREE.Vector3(0.06, 0.08, 0.72),
    new THREE.Vector3(0.14, -0.18, 0.94),
    new THREE.Vector3(0.22, -0.42, 1.06),
  ]);
  const ribbonGeo = track(new THREE.TubeGeometry(ribbonCurve, 24, 0.016, 8, false));
  const ribbonMesh = new THREE.Mesh(ribbonGeo, goldMat);
  spinePivot.add(ribbonMesh);

  spinePivot.add(leftWing, rightWing);
  mushafGroup.add(spinePivot);
  rootGroup.add(mushafGroup);

  // =========================================================================
  // ASSEMBLY 2: 3D BRASS QIBLA ASTROLABE & KAABA COMPASS
  // =========================================================================
  const astrolabeGroup = new THREE.Group();
  astrolabeGroup.position.y = 0.22;
  astrolabeGroup.visible = false;

  // Turned brass outer bezel (LatheGeometry)
  const lathePoints = [
    new THREE.Vector2(0.0, 0.0),
    new THREE.Vector2(1.26, 0.0),
    new THREE.Vector2(1.32, 0.08),
    new THREE.Vector2(1.32, 0.24),
    new THREE.Vector2(1.22, 0.29),
    new THREE.Vector2(1.14, 0.29),
    new THREE.Vector2(1.14, 0.16),
    new THREE.Vector2(0.0, 0.16),
  ];
  const bezelGeo = track(new THREE.LatheGeometry(lathePoints, 64));
  const bezelMesh = new THREE.Mesh(bezelGeo, brushedBrassMat);
  bezelMesh.castShadow = true;
  bezelMesh.receiveShadow = true;
  astrolabeGroup.add(bezelMesh);

  // Suspension Crown (Kursi) at North top
  const kursiGeo = track(new THREE.TorusGeometry(0.16, 0.032, 14, 32));
  const kursiMesh = new THREE.Mesh(kursiGeo, goldMat);
  kursiMesh.rotation.x = Math.PI / 2;
  kursiMesh.position.set(0, 0.18, -1.42);
  astrolabeGroup.add(kursiMesh);

  // Engraved Emerald Dial Face
  const dialGeo = track(new THREE.CircleGeometry(1.13, 64));
  const dialMat = track(
    new THREE.MeshStandardMaterial({
      map: astrolabeTex,
      roughness: 0.34,
      metalness: 0.22,
    })
  );
  const dialMesh = new THREE.Mesh(dialGeo, dialMat);
  dialMesh.rotation.x = -Math.PI / 2;
  dialMesh.position.y = 0.175;
  astrolabeGroup.add(dialMesh);

  // Rotating Star Rete Ring
  const reteShape = createEightPointStarShape(0.84, 0.56);
  const reteGeo = track(
    new THREE.ExtrudeGeometry(reteShape, {
      depth: 0.024,
      bevelEnabled: true,
      bevelThickness: 0.008,
      bevelSize: 0.008,
      bevelSegments: 2,
    })
  );
  const astrolabeRete = new THREE.Mesh(reteGeo, goldMat);
  astrolabeRete.rotation.x = -Math.PI / 2;
  astrolabeRete.position.y = 0.2;
  astrolabeGroup.add(astrolabeRete);

  // Qibla Needle + Central Pivot
  const qiblaNeedle = new THREE.Group();
  qiblaNeedle.position.y = 0.245;
  const needlePointerGeo = track(new THREE.ConeGeometry(0.055, 0.78, 4));
  const qiblaTip = new THREE.Mesh(needlePointerGeo, goldMat);
  qiblaTip.rotation.x = -Math.PI / 2;
  qiblaTip.position.z = -0.39;

  const counterTip = new THREE.Mesh(needlePointerGeo, emeraldEnamelMat);
  counterTip.rotation.x = Math.PI / 2;
  counterTip.position.z = 0.39;

  const capGeo = track(new THREE.CylinderGeometry(0.09, 0.11, 0.06, 24));
  const capMesh = new THREE.Mesh(capGeo, goldMat);
  qiblaNeedle.add(qiblaTip, counterTip, capMesh);
  qiblaNeedle.rotation.y = 0.65;
  astrolabeGroup.add(qiblaNeedle);

  // Miniature Kaaba Stone Emblem on rim
  const kaabaGeo = track(new THREE.BoxGeometry(0.18, 0.2, 0.18));
  const kaabaMat = track(
    new THREE.MeshStandardMaterial({ color: 0x16161a, roughness: 0.42, metalness: 0.15 })
  );
  const kaabaMesh = new THREE.Mesh(kaabaGeo, kaabaMat);
  kaabaMesh.position.set(-0.62, 0.28, -0.78);
  const kiswahBandGeo = track(new THREE.BoxGeometry(0.186, 0.036, 0.186));
  const kiswahBand = new THREE.Mesh(kiswahBandGeo, goldMat);
  kiswahBand.position.y = 0.035;
  kaabaMesh.add(kiswahBand);
  astrolabeGroup.add(kaabaMesh);

  // Sapphire Dome Crystal
  const domeGeo = track(new THREE.SphereGeometry(1.15, 48, 24, 0, Math.PI * 2, 0, Math.PI * 0.28));
  const domeMesh = new THREE.Mesh(domeGeo, glassMat);
  domeMesh.position.y = -0.42;
  domeMesh.renderOrder = 2;
  astrolabeGroup.add(domeMesh);

  rootGroup.add(astrolabeGroup);

  // =========================================================================
  // ASSEMBLY 3: SACRED RUB EL HIZB GEOMETRIC LATTICE
  // =========================================================================
  const geometryGroup = new THREE.Group();
  geometryGroup.position.y = 1.18;
  geometryGroup.visible = false;

  const starShape1 = createEightPointStarShape(0.98, 0.64);
  const starGeo1 = track(
    new THREE.ExtrudeGeometry(starShape1, {
      depth: 0.09,
      bevelEnabled: true,
      bevelThickness: 0.025,
      bevelSize: 0.02,
      bevelSegments: 3,
    })
  );
  starGeo1.center();

  const outerStarRing = new THREE.Mesh(starGeo1, goldMat);
  outerStarRing.castShadow = true;
  geometryGroup.add(outerStarRing);

  const starShape2 = createEightPointStarShape(0.68, 0.36);
  const starGeo2 = track(
    new THREE.ExtrudeGeometry(starShape2, {
      depth: 0.11,
      bevelEnabled: true,
      bevelThickness: 0.02,
      bevelSize: 0.02,
      bevelSegments: 3,
    })
  );
  starGeo2.center();

  const innerStarRing = new THREE.Mesh(starGeo2, emeraldEnamelMat);
  innerStarRing.castShadow = true;
  geometryGroup.add(innerStarRing);

  // Armillary Brass Orbits
  const orbitGeo1 = track(new THREE.TorusGeometry(1.16, 0.022, 16, 72));
  const orbit1 = new THREE.Mesh(orbitGeo1, brushedBrassMat);
  orbit1.rotation.x = Math.PI / 3;
  const orbit2 = new THREE.Mesh(orbitGeo1, brushedBrassMat);
  orbit2.rotation.y = Math.PI / 3;
  geometryGroup.add(orbit1, orbit2);

  // Central Glowing Emerald Core Jewel
  const coreGeo = track(new THREE.OctahedronGeometry(0.24, 0));
  const coreMesh = new THREE.Mesh(coreGeo, emeraldEnamelMat);
  geometryGroup.add(coreMesh);

  rootGroup.add(geometryGroup);

  // =========================================================================
  // AMBIENT INSTANCED GOLDEN LIGHT MOTES (InstancedMesh > 20 items)
  // =========================================================================
  const moteCount = 36;
  const moteGeo = track(new THREE.OctahedronGeometry(0.024, 0));
  const moteMat = track(
    new THREE.MeshStandardMaterial({
      color: 0xf5e6a3,
      emissive: 0xd4af37,
      emissiveIntensity: 0.55,
      roughness: 0.25,
      metalness: 0.85,
    })
  );
  const floatingMotes = new THREE.InstancedMesh(moteGeo, moteMat, moteCount);
  const moteBasePositions = new Float32Array(moteCount * 3);
  const dummy = new THREE.Object3D();

  for (let i = 0; i < moteCount; i++) {
    const angle = (i / moteCount) * Math.PI * 2 * 2.3;
    const radius = 1.45 + (i % 5) * 0.22;
    const y = 0.38 + ((i * 0.37) % 1.85);
    const x = Math.cos(angle) * radius;
    const z = Math.sin(angle) * radius;

    moteBasePositions[i * 3] = x;
    moteBasePositions[i * 3 + 1] = y;
    moteBasePositions[i * 3 + 2] = z;

    dummy.position.set(x, y, z);
    const s = 0.7 + (i % 4) * 0.22;
    dummy.scale.setScalar(s);
    dummy.updateMatrix();
    floatingMotes.setMatrixAt(i, dummy.matrix);
  }
  floatingMotes.instanceMatrix.needsUpdate = true;
  floatingMotes.computeBoundingSphere();
  floatingMotes.frustumCulled = false;
  rootGroup.add(floatingMotes);

  return {
    rootGroup,
    mushafGroup,
    astrolabeGroup,
    geometryGroup,
    leftWing,
    rightWing,
    astrolabeRete,
    qiblaNeedle,
    outerStarRing,
    innerStarRing,
    floatingMotes,
    moteBasePositions,
    dispose: () => {
      for (const item of disposables) {
        item.dispose();
      }
      bezelGeo.dispose();
      rightPageGeo.dispose();
      leftPageGeo.dispose();
      starGeo1.dispose();
      starGeo2.dispose();
      reteGeo.dispose();
      moteGeo.dispose();
    },
  };
}
