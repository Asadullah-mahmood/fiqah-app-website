import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { RoomEnvironment } from 'three/addons/environments/RoomEnvironment.js';
import { RectAreaLightUniformsLib } from 'three/addons/lights/RectAreaLightUniformsLib.js';
import {
  BookOpen,
  ChevronDown,
  ChevronUp,
  Compass,
  Pause,
  Play,
  RotateCcw,
  Sparkles,
} from 'lucide-react';
import { buildFiqahSceneAssets, FiqahSceneAssets } from '../three/fiqahSceneBuilder';
import { CameraPreset, SceneMode } from '../types/fiqah';

interface ThreeQuranCanvasProps {
  variant?: 'parchment' | 'emerald';
  initialMode?: SceneMode;
  className?: string;
  compact?: boolean;
}

const CAMERA_PRESETS: Record<
  CameraPreset,
  { pos: [number, number, number]; target: [number, number, number] }
> = {
  perspective: { pos: [2.75, 2.55, 3.35], target: [0, 0.85, 0] },
  front: { pos: [0.0, 2.05, 4.1], target: [0, 0.82, 0] },
  top: { pos: [0.0, 4.35, 1.35], target: [0, 0.65, 0] },
};

const _dummyObj = new THREE.Object3D();

export const ThreeQuranCanvas: React.FC<ThreeQuranCanvasProps> = ({
  variant = 'parchment',
  initialMode = 'mushaf',
  className = '',
  compact = false,
}) => {
  const mountRef = useRef<HTMLDivElement | null>(null);
  const [sceneMode, setSceneMode] = useState<SceneMode>(initialMode);
  const [cameraPreset, setCameraPreset] = useState<CameraPreset>('perspective');
  const [autoRotate, setAutoRotate] = useState<boolean>(true);
  const [openAngle, setOpenAngle] = useState<number>(36); // degrees
  const [dockCollapsed, setDockCollapsed] = useState<boolean>(false);
  const [webglFailed, setWebglFailed] = useState<boolean>(false);
  const [hoveredMode, setHoveredMode] = useState<SceneMode | null>(null);

  // Mutable refs for WebGL loop without tearing down canvas on React state changes
  const modeRef = useRef<SceneMode>(initialMode);
  const autoRotateRef = useRef<boolean>(true);
  const openAngleRef = useRef<number>(36);
  const desiredCamPosRef = useRef<THREE.Vector3 | null>(null);
  const desiredTargetRef = useRef<THREE.Vector3 | null>(null);
  const pointerNormRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const isDraggingRef = useRef<boolean>(false);
  const lastPointerXRef = useRef<number>(0);
  const dragMomentumRef = useRef<number>(0);

  useEffect(() => {
    modeRef.current = sceneMode;
  }, [sceneMode]);

  useEffect(() => {
    autoRotateRef.current = autoRotate;
  }, [autoRotate]);

  useEffect(() => {
    openAngleRef.current = openAngle;
  }, [openAngle]);

  const applyCameraPreset = (preset: CameraPreset) => {
    setCameraPreset(preset);
    const cfg = CAMERA_PRESETS[preset];
    desiredCamPosRef.current = new THREE.Vector3(...cfg.pos);
    desiredTargetRef.current = new THREE.Vector3(...cfg.target);
  };

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const prefersReducedMotion =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      autoRotateRef.current = false;
      setAutoRotate(false);
    }

    // Software WebGL detection from GPU renderer string (never userAgent)
    const isSoftwareGl = (() => {
      try {
        const probeCanvas = document.createElement('canvas');
        const gl = probeCanvas.getContext('webgl2');
        if (!gl) return true;
        const ext = gl.getExtension('WEBGL_debug_renderer_info');
        const param = ext ? ext.UNMASKED_RENDERER_WEBGL : gl.RENDERER;
        const gpu = String(gl.getParameter(param));
        gl.getExtension('WEBGL_lose_context')?.loseContext();
        return /SwiftShader|llvmpipe|softpipe|Software|Basic Render/i.test(gpu);
      } catch {
        return true;
      }
    })();

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({
        antialias: !isSoftwareGl,
        powerPreference: 'high-performance',
        alpha: false,
      });
    } catch {
      setWebglFailed(true);
      return;
    }

    const bgHex = variant === 'emerald' ? 0x144718 : 0xffffff;
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = variant === 'emerald' ? 1.18 : 1.08;
    renderer.setPixelRatio(isSoftwareGl ? 1 : Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = !isSoftwareGl;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.setClearColor(bgHex, 1);

    const width = container.clientWidth || 640;
    const height = container.clientHeight || 520;
    renderer.setSize(width, height);
    renderer.domElement.style.display = 'block';
    renderer.domElement.style.width = '100%';
    renderer.domElement.style.height = '100%';
    renderer.domElement.setAttribute(
      'aria-label',
      'Interactive 3D Fiqah Quran and Islamic Geometry Visualization'
    );

    container.innerHTML = '';
    container.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(bgHex);
    scene.fog = new THREE.FogExp2(bgHex, 0.055);

    const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 100);
    camera.position.set(...CAMERA_PRESETS.perspective.pos);

    // Mandatory studio environment reflection (RoomEnvironment)
    const pmremGenerator = new THREE.PMREMGenerator(renderer);
    const envTex = pmremGenerator.fromScene(new RoomEnvironment(), 0.04).texture;
    scene.environment = envTex;
    pmremGenerator.dispose();

    // 3-Point Studio Lighting Rig (warm key + cool fill + rim)
    const hemiLight = new THREE.HemisphereLight(
      variant === 'emerald' ? 0xdbeafe : 0xeff6ff,
      variant === 'emerald' ? 0x0b2a0e : 0x8b7355,
      0.85
    );
    scene.add(hemiLight);

    const keyLight = new THREE.DirectionalLight(0xfff4d6, 2.15);
    keyLight.position.set(4.5, 7.2, 4.8);
    if (!isSoftwareGl) {
      keyLight.castShadow = true;
      keyLight.shadow.mapSize.width = 1024;
      keyLight.shadow.mapSize.height = 1024;
      keyLight.shadow.camera.near = 1;
      keyLight.shadow.camera.far = 20;
      const d = 3.4;
      keyLight.shadow.camera.left = -d;
      keyLight.shadow.camera.right = d;
      keyLight.shadow.camera.top = d;
      keyLight.shadow.camera.bottom = -d;
      keyLight.shadow.bias = -0.0005;
      keyLight.shadow.normalBias = 0.02;
    }
    scene.add(keyLight);

    const rimLight = new THREE.DirectionalLight(0xd4af37, 0.95);
    rimLight.position.set(-4.5, 4.0, -4.2);
    scene.add(rimLight);

    if (!isSoftwareGl) {
      RectAreaLightUniformsLib.init();
      const softbox = new THREE.RectAreaLight(0xfffbf0, 2.2, 4, 2.4);
      softbox.position.set(-2.8, 3.8, 2.8);
      softbox.lookAt(0, 0.8, 0);
      scene.add(softbox);
    }

    const maxAnisotropy = renderer.capabilities.getMaxAnisotropy();
    const assets: FiqahSceneAssets = buildFiqahSceneAssets(maxAnisotropy, isSoftwareGl);
    scene.add(assets.rootGroup);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.target.set(...CAMERA_PRESETS.perspective.target);
    controls.enableDamping = !isSoftwareGl;
    controls.dampingFactor = 0.045;
    controls.rotateSpeed = 0.85;
    controls.enablePan = false;
    controls.minDistance = 2.6;
    controls.maxDistance = 7.0;
    controls.minPolarAngle = 0.25;
    controls.maxPolarAngle = Math.PI / 2 - 0.08;
    controls.update();

    const handleControlStart = () => {
      // Cancel scripted camera transition immediately so we never fight user input
      desiredCamPosRef.current = null;
      desiredTargetRef.current = null;
    };
    controls.addEventListener('start', handleControlStart);

    // Cursor parallax tilt + drag momentum listeners
    const handlePointerMove = (e: PointerEvent) => {
      const rect = container.getBoundingClientRect();
      if (rect.width > 0 && rect.height > 0) {
        const nx = ((e.clientX - rect.left) / rect.width) * 2 - 1;
        const ny = ((e.clientY - rect.top) / rect.height) * 2 - 1;
        pointerNormRef.current.x = THREE.MathUtils.clamp(nx, -1, 1);
        pointerNormRef.current.y = THREE.MathUtils.clamp(ny, -1, 1);
      }
      if (isDraggingRef.current) {
        const dx = e.clientX - lastPointerXRef.current;
        lastPointerXRef.current = e.clientX;
        dragMomentumRef.current = THREE.MathUtils.clamp(dx * 0.045, -1.8, 1.8);
      }
    };

    const handlePointerDown = (e: PointerEvent) => {
      isDraggingRef.current = true;
      lastPointerXRef.current = e.clientX;
      dragMomentumRef.current = 0;
    };

    const handlePointerUp = () => {
      isDraggingRef.current = false;
    };

    const handlePointerLeave = () => {
      isDraggingRef.current = false;
      pointerNormRef.current.x = 0;
      pointerNormRef.current.y = 0;
    };

    container.addEventListener('pointermove', handlePointerMove);
    container.addEventListener('pointerdown', handlePointerDown);
    window.addEventListener('pointerup', handlePointerUp);
    container.addEventListener('pointerleave', handlePointerLeave);

    // Pre-warm shaders on hardware GPUs
    if (!isSoftwareGl) {
      renderer.compile(scene, camera);
    }

    const handleContextLost = (e: Event) => {
      e.preventDefault();
      setWebglFailed(true);
    };
    const handleContextRestored = () => {
      setWebglFailed(false);
    };
    renderer.domElement.addEventListener('webglcontextlost', handleContextLost);
    renderer.domElement.addEventListener('webglcontextrestored', handleContextRestored);

    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth || 640;
      const h = container.clientHeight || 520;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    const resizeObserver = new ResizeObserver(handleResize);
    resizeObserver.observe(container);

    let frameId = 0;
    let disposed = false;
    const clock = new THREE.Clock();
    let currentWingAngle = (openAngleRef.current * Math.PI) / 180;

    function afterDraw(cb: () => void) {
      if (disposed) return;
      const gl = renderer.getContext() as WebGL2RenderingContext;
      if (gl && typeof gl.fenceSync === 'function') {
        const sync = gl.fenceSync(gl.SYNC_GPU_COMMANDS_COMPLETE, 0);
        gl.flush();
        const poll = () => {
          if (disposed) return;
          const state = sync && gl.getSyncParameter(sync, gl.SYNC_STATUS);
          if (state === gl.UNSIGNALED) {
            frameId = window.setTimeout(poll, 5);
          } else {
            if (sync) gl.deleteSync(sync);
            frameId = window.setTimeout(cb, 80);
          }
        };
        frameId = window.setTimeout(poll, 5);
      } else {
        frameId = window.setTimeout(cb, 80);
      }
    }

    const tick = () => {
      if (disposed) return;
      const delta = Math.min(clock.getDelta(), 0.08);
      const elapsed = clock.getElapsedTime();

      // Switch visible 3D assembly cleanly
      const activeMode = modeRef.current;
      assets.mushafGroup.visible = activeMode === 'mushaf';
      assets.astrolabeGroup.visible = activeMode === 'astrolabe';
      assets.geometryGroup.visible = activeMode === 'geometry';

      // Smooth exponential damping for Mushaf opening angle
      const targetWingRad = THREE.MathUtils.degToRad(openAngleRef.current);
      currentWingAngle = THREE.MathUtils.damp(currentWingAngle, targetWingRad, 7, delta);
      assets.leftWing.rotation.z = -currentWingAngle;
      assets.rightWing.rotation.z = currentWingAngle;

      // Ambient kinetic motions + drag momentum + responsive cursor parallax tilt
      if (autoRotateRef.current && !desiredCamPosRef.current && !isDraggingRef.current) {
        assets.rootGroup.rotation.y += delta * 0.24;
      }

      if (!isDraggingRef.current && Math.abs(dragMomentumRef.current) > 0.001) {
        assets.rootGroup.rotation.y += dragMomentumRef.current * delta;
        dragMomentumRef.current = THREE.MathUtils.damp(dragMomentumRef.current, 0, 4.2, delta);
      }

      if (!prefersReducedMotion) {
        const targetTiltX = pointerNormRef.current.y * 0.08;
        const targetTiltZ = -pointerNormRef.current.x * 0.06;
        assets.rootGroup.rotation.x = THREE.MathUtils.damp(
          assets.rootGroup.rotation.x,
          targetTiltX,
          5.5,
          delta
        );
        assets.rootGroup.rotation.z = THREE.MathUtils.damp(
          assets.rootGroup.rotation.z,
          targetTiltZ,
          5.5,
          delta
        );
      }

      if (activeMode === 'astrolabe') {
        assets.astrolabeRete.rotation.z = elapsed * 0.14;
        assets.qiblaNeedle.rotation.y = 0.65 + Math.sin(elapsed * 1.4) * 0.04;
      } else if (activeMode === 'geometry') {
        assets.outerStarRing.rotation.y = elapsed * 0.35;
        assets.outerStarRing.rotation.x = Math.sin(elapsed * 0.5) * 0.18;
        assets.innerStarRing.rotation.y = -elapsed * 0.48;
      }

      // Update floating golden light motes without GC allocations
      const moteCount = assets.floatingMotes.count;
      const base = assets.moteBasePositions;
      for (let i = 0; i < moteCount; i++) {
        const bx = base[i * 3];
        const by = base[i * 3 + 1];
        const bz = base[i * 3 + 2];
        _dummyObj.position.set(
          bx,
          by + Math.sin(elapsed * 1.2 + i * 0.65) * 0.08,
          bz
        );
        _dummyObj.rotation.set(elapsed * 0.6 + i, elapsed * 0.8 + i, 0);
        const s = 0.72 + (i % 4) * 0.2;
        _dummyObj.scale.setScalar(s);
        _dummyObj.updateMatrix();
        assets.floatingMotes.setMatrixAt(i, _dummyObj.matrix);
      }
      assets.floatingMotes.instanceMatrix.needsUpdate = true;

      // Smoothly interpolate camera presets
      if (desiredCamPosRef.current && desiredTargetRef.current) {
        camera.position.x = THREE.MathUtils.damp(
          camera.position.x,
          desiredCamPosRef.current.x,
          6,
          delta
        );
        camera.position.y = THREE.MathUtils.damp(
          camera.position.y,
          desiredCamPosRef.current.y,
          6,
          delta
        );
        camera.position.z = THREE.MathUtils.damp(
          camera.position.z,
          desiredCamPosRef.current.z,
          6,
          delta
        );
        controls.target.x = THREE.MathUtils.damp(
          controls.target.x,
          desiredTargetRef.current.x,
          6,
          delta
        );
        controls.target.y = THREE.MathUtils.damp(
          controls.target.y,
          desiredTargetRef.current.y,
          6,
          delta
        );
        controls.target.z = THREE.MathUtils.damp(
          controls.target.z,
          desiredTargetRef.current.z,
          6,
          delta
        );

        if (camera.position.distanceTo(desiredCamPosRef.current) < 0.02) {
          desiredCamPosRef.current = null;
          desiredTargetRef.current = null;
        }
      }

      controls.update();
      renderer.render(scene, camera);

      if (isSoftwareGl) afterDraw(tick);
      else frameId = requestAnimationFrame(tick);
    };

    if (isSoftwareGl) {
      renderer.render(scene, camera);
      afterDraw(tick);
    } else {
      frameId = requestAnimationFrame(tick);
    }

    return () => {
      disposed = true;
      cancelAnimationFrame(frameId);
      clearTimeout(frameId);
      resizeObserver.disconnect();
      container.removeEventListener('pointermove', handlePointerMove);
      container.removeEventListener('pointerdown', handlePointerDown);
      window.removeEventListener('pointerup', handlePointerUp);
      container.removeEventListener('pointerleave', handlePointerLeave);
      controls.removeEventListener('start', handleControlStart);
      controls.dispose();
      renderer.domElement.removeEventListener('webglcontextlost', handleContextLost);
      renderer.domElement.removeEventListener('webglcontextrestored', handleContextRestored);
      assets.dispose();
      envTex.dispose();
      renderer.dispose();
    };
  }, [variant]);

  const isEmerald = variant === 'emerald';

  return (
    <div
      className={`relative w-full overflow-hidden rounded-[8px] ${
        isEmerald ? 'bg-[#144718]' : 'bg-[#FFFFFF]'
      } ${compact ? 'h-[420px] sm:h-[460px]' : 'h-[440px] sm:h-[520px] lg:h-[560px]'} ${className}`}
    >
      {/* WebGL Canvas Mount Target */}
      {!webglFailed ? (
        <div
          ref={mountRef}
          className="h-full w-full cursor-grab active:cursor-grabbing"
          title="Drag to rotate · Scroll to zoom"
        />
      ) : (
        /* Graceful Stylized 2D Fallback when WebGL is unavailable */
        <div className="flex h-full w-full flex-col items-center justify-center p-8 text-center">
          <div className="max-w-sm rounded-[8px] bg-[#F7FAF7] p-6">
            <BookOpen className="mx-auto mb-3 h-10 w-10 text-[#1B5E20]" />
            <p className="font-sans text-2xl font-semibold text-[#1A1A1A]">
              Al-Qur&apos;an Al-Karim
            </p>
            <p className="mt-2 text-sm text-[#4A554C]">
              Illuminated Mushaf, Qibla Astrolabe, and Rub el Hizb sacred geometry viewer.
            </p>
          </div>
        </div>
      )}

      {/* Subtle Top-Left Model Title Label */}
      <div className="pointer-events-none absolute top-4 left-4 z-10">
        <div
          className={`rounded-[8px] px-3 py-1.5 text-xs font-medium ${
            isEmerald
              ? 'bg-[#0F3512]/90 text-white'
              : 'bg-[#F7FAF7] text-[#1B5E20]'
          }`}
        >
          <span>
            {sceneMode === 'mushaf'
              ? 'Illuminated Mushaf · Drag to Orbit'
              : sceneMode === 'astrolabe'
              ? 'Qibla Astrolabe · 360° Bearing'
              : 'Rub el Hizb · Sacred Geometry'}
          </span>
        </div>
      </div>

      {/* Collapsible Bottom Control Dock */}
      <div className="pointer-events-none absolute inset-x-0 bottom-3 z-20 flex flex-col items-center px-3">
        <button
          type="button"
          onClick={() => setDockCollapsed((prev) => !prev)}
          className={`pointer-events-auto mb-1.5 inline-flex items-center gap-1.5 rounded-[8px] px-3 py-1 text-xs font-medium transition-colors ${
            isEmerald
              ? 'bg-[#0F3512]/95 text-white hover:bg-[#1B5E20]'
              : 'bg-[#F7FAF7] text-[#1B5E20] hover:bg-[#ECF4EC]'
          }`}
        >
          {dockCollapsed ? (
            <>
              <ChevronUp className="h-3.5 w-3.5" />
              <span>Show 3D Controls</span>
            </>
          ) : (
            <>
              <ChevronDown className="h-3.5 w-3.5" />
              <span>Hide Controls</span>
            </>
          )}
        </button>

        {!dockCollapsed && (
          <div
            className={`pointer-events-auto flex w-full max-w-[660px] flex-wrap items-center justify-between gap-2 rounded-[8px] p-2 ${
              isEmerald
                ? 'bg-[#0E3211]/95 text-white'
                : 'bg-[#F7FAF7] text-[#1A1A1A]'
            }`}
          >
            {/* 3D Model Mode Switcher with Hover Tooltips */}
            <div className="flex items-center gap-1">
              {(
                [
                  {
                    id: 'mushaf',
                    label: 'Mushaf',
                    tooltip: 'Illuminated 3D Mushaf on walnut stand',
                    icon: <BookOpen className="h-3.5 w-3.5" />,
                  },
                  {
                    id: 'astrolabe',
                    label: 'Astrolabe',
                    tooltip: '360° brass Qibla Astrolabe compass',
                    icon: <Compass className="h-3.5 w-3.5" />,
                  },
                  {
                    id: 'geometry',
                    label: 'Geometry',
                    tooltip: 'Interactive Rub el Hizb sacred geometry',
                    icon: <Sparkles className="h-3.5 w-3.5" />,
                  },
                ] as const
              ).map((item) => {
                const isActive = sceneMode === item.id;
                const isTooltipOpen = hoveredMode === item.id;
                return (
                  <div key={item.id} className="relative">
                    {isTooltipOpen && (
                      <div
                        role="tooltip"
                        className={`pointer-events-none absolute bottom-full z-30 mb-2 rounded-[6px] bg-[#1A1A1A] px-2.5 py-1 text-[11px] font-medium whitespace-nowrap text-white shadow-md ${
                          item.id === 'mushaf'
                            ? 'left-0 sm:left-1/2 sm:-translate-x-1/2'
                            : 'left-1/2 -translate-x-1/2'
                        }`}
                      >
                        {item.tooltip}
                      </div>
                    )}
                    <button
                      type="button"
                      onClick={() => setSceneMode(item.id)}
                      onMouseEnter={() => setHoveredMode(item.id)}
                      onMouseLeave={() => setHoveredMode(null)}
                      onFocus={() => setHoveredMode(item.id)}
                      onBlur={() => setHoveredMode(null)}
                      title={item.tooltip}
                      aria-label={`${item.label} — ${item.tooltip}`}
                      className={`inline-flex items-center gap-1.5 rounded-[6px] px-2.5 py-1.5 text-xs font-medium whitespace-nowrap transition-colors ${
                        isActive
                          ? 'bg-[#1B5E20] text-white'
                          : isEmerald
                          ? 'text-white/80 hover:bg-white/10'
                          : 'text-[#4A554C] hover:bg-[#ECF4EC]'
                      }`}
                    >
                      {item.icon}
                      <span>{item.label}</span>
                    </button>
                  </div>
                );
              })}
            </div>

            {/* Book Open Angle Slider (only for Mushaf) */}
            {sceneMode === 'mushaf' && (
              <label className="flex items-center gap-2 px-1 text-xs">
                <span className={isEmerald ? 'text-white/85' : 'text-[#4A554C]'}>
                  Open
                </span>
                <input
                  type="range"
                  min={14}
                  max={52}
                  value={openAngle}
                  onChange={(e) => setOpenAngle(Number(e.target.value))}
                  aria-label="Mushaf open angle"
                  className="h-1.5 w-16 cursor-pointer accent-[#1B5E20]"
                />
              </label>
            )}

            {/* Camera Angle Presets & Auto-Rotate */}
            <div className="flex items-center gap-1">
              {(['perspective', 'front', 'top'] as CameraPreset[]).map((preset) => (
                <button
                  key={preset}
                  type="button"
                  onClick={() => applyCameraPreset(preset)}
                  className={`rounded-[6px] px-2 py-1 text-xs font-medium capitalize whitespace-nowrap transition-colors ${
                    cameraPreset === preset
                      ? 'bg-[#1B5E20] text-white'
                      : isEmerald
                      ? 'text-white/80 hover:bg-white/10'
                      : 'text-[#4A554C] hover:bg-[#F7FAF7]'
                  }`}
                >
                  {preset === 'perspective' ? '3/4' : preset}
                </button>
              ))}

              <button
                type="button"
                onClick={() => setAutoRotate((r) => !r)}
                title={autoRotate ? 'Pause rotation' : 'Resume rotation'}
                aria-label={autoRotate ? 'Pause rotation' : 'Resume rotation'}
                className={`rounded-[6px] p-1.5 transition-colors ${
                  isEmerald
                    ? 'text-white hover:bg-white/10'
                    : 'text-[#1B5E20] hover:bg-[#F7FAF7]'
                }`}
              >
                {autoRotate ? (
                  <Pause className="h-3.5 w-3.5" />
                ) : (
                  <Play className="h-3.5 w-3.5" />
                )}
              </button>

              <button
                type="button"
                onClick={() => {
                  setOpenAngle(36);
                  applyCameraPreset('perspective');
                }}
                title="Reset view"
                aria-label="Reset 3D view"
                className={`rounded-[6px] p-1.5 transition-colors ${
                  isEmerald
                    ? 'text-white hover:bg-white/10'
                    : 'text-[#1B5E20] hover:bg-[#F7FAF7]'
                }`}
              >
                <RotateCcw className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
