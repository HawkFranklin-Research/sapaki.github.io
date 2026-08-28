import { useFrame, useLoader } from "@react-three/fiber";
import { useEffect, useMemo, useRef, type MutableRefObject } from "react";
import * as THREE from "three";
import type { RobotMediaAsset } from "./robotMedia";

export const SPHERE_RADIUS = 6.15;
export const VERTICAL_STRETCH = 1.34;
const CARD_ASPECT = 1.48;

function coverTexture(texture: THREE.Texture, sourceAspect: number) {
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.center.set(0.5, 0.5);
  if (sourceAspect > CARD_ASPECT) texture.repeat.set(CARD_ASPECT / sourceAspect, 1);
  else texture.repeat.set(1, sourceAspect / CARD_ASPECT);
  texture.needsUpdate = true;
}

function fibonacciPoint(index: number, total: number) {
  const y = 1 - (index / Math.max(total - 1, 1)) * 2;
  const ring = Math.sqrt(Math.max(0, 1 - y * y));
  const theta = Math.PI * (3 - Math.sqrt(5)) * index;
  return new THREE.Vector3(Math.cos(theta) * ring * SPHERE_RADIUS, y * SPHERE_RADIUS * VERTICAL_STRETCH, Math.sin(theta) * ring * SPHERE_RADIUS);
}

export default function MediaTile({ asset, index, total, expanded, selected, dragged, onSelect }: {
  asset: RobotMediaAsset;
  index: number;
  total: number;
  expanded: boolean;
  selected: boolean;
  dragged: MutableRefObject<boolean>;
  onSelect: (asset: RobotMediaAsset) => void;
}) {
  const poster = useLoader(THREE.TextureLoader, asset.poster ?? asset.src);
  const mesh = useRef<THREE.Mesh>(null);
  const material = useRef<THREE.MeshBasicMaterial>(null);
  const worldPosition = useMemo(() => new THREE.Vector3(), []);
  const scale = 0.82 + ((index * 37) % 13) / 43;
  const position = useMemo(() => fibonacciPoint(index, total), [index, total]);
  const quaternion = useMemo(() => {
    const anchor = new THREE.Object3D();
    anchor.position.copy(position);
    anchor.lookAt(position.clone().multiplyScalar(2));
    return anchor.quaternion.clone();
  }, [position]);
  const geometry = useMemo(() => {
    const width = 1.82 * scale;
    const height = width / CARD_ASPECT;
    const plane = new THREE.PlaneGeometry(width, height, 12, 8);
    const points = plane.attributes.position;
    for (let point = 0; point < points.count; point += 1) {
      const x = points.getX(point);
      const y = points.getY(point);
      const theta = x / SPHERE_RADIUS;
      const phi = y / SPHERE_RADIUS;
      points.setXYZ(point, SPHERE_RADIUS * Math.sin(theta) * Math.cos(phi), SPHERE_RADIUS * Math.sin(phi), SPHERE_RADIUS * Math.cos(theta) * Math.cos(phi) - SPHERE_RADIUS);
    }
    plane.computeVertexNormals();
    return plane;
  }, [scale]);
  const posterTexture = useMemo(() => {
    const texture = poster.clone();
    const source = poster.image as { width?: number; height?: number } | undefined;
    coverTexture(texture, source?.width && source?.height ? source.width / source.height : CARD_ASPECT);
    return texture;
  }, [poster]);

  useEffect(() => () => { posterTexture.dispose(); geometry.dispose(); }, [geometry, posterTexture]);

  useEffect(() => {
    if (asset.kind !== "video" || !expanded || !selected) return;
    const meshMaterial = material.current;
    const element = document.createElement("video");
    element.src = asset.src;
    element.crossOrigin = "anonymous";
    element.muted = true;
    element.loop = true;
    element.playsInline = true;
    element.preload = "metadata";
    let texture: THREE.VideoTexture | null = null;
    const start = () => {
      texture = new THREE.VideoTexture(element);
      coverTexture(texture, element.videoWidth && element.videoHeight ? element.videoWidth / element.videoHeight : CARD_ASPECT);
      texture.minFilter = THREE.LinearFilter;
      texture.magFilter = THREE.LinearFilter;
      if (meshMaterial) {
        meshMaterial.map = texture;
        meshMaterial.needsUpdate = true;
      }
      void element.play().catch(() => undefined);
    };
    element.addEventListener("loadeddata", start, { once: true });
    element.load();
    return () => {
      element.pause();
      element.removeEventListener("loadeddata", start);
      element.removeAttribute("src");
      element.load();
      if (meshMaterial) {
        meshMaterial.map = posterTexture;
        meshMaterial.needsUpdate = true;
      }
      texture?.dispose();
    };
  }, [asset, expanded, posterTexture, selected]);

  useFrame((_, delta) => {
    if (!mesh.current) return;
    mesh.current.getWorldPosition(worldPosition);
    const front = THREE.MathUtils.clamp((worldPosition.z / SPHERE_RADIUS + 0.18) / 1.18, 0, 1);
    const horizontalCenter = 1 - THREE.MathUtils.clamp(Math.abs(worldPosition.x) / (SPHERE_RADIUS * 0.9), 0, 1);
    const verticalCenter = 1 - THREE.MathUtils.clamp(Math.abs(worldPosition.y) / (SPHERE_RADIUS * VERTICAL_STRETCH * 0.92), 0, 1);
    const centreEmphasis = Math.pow(front, 2.2) * (0.35 + horizontalCenter * verticalCenter * 0.65);
    const targetScale = selected ? 1.65 : 1 + centreEmphasis * 1.12;
    const nextScale = THREE.MathUtils.damp(mesh.current.scale.x, targetScale, 7, delta);
    mesh.current.scale.setScalar(nextScale);
  });

  return (
    <mesh
      ref={mesh}
      position={position}
      quaternion={quaternion}
      geometry={geometry}
      onClick={(event) => { event.stopPropagation(); if (expanded && !dragged.current) onSelect(asset); }}
      onPointerOver={(event) => { if (!expanded) return; event.stopPropagation(); document.body.style.cursor = "pointer"; }}
      onPointerOut={() => { document.body.style.cursor = "auto"; }}
    >
      <meshBasicMaterial ref={material} map={posterTexture} side={THREE.DoubleSide} toneMapped={false} />
    </mesh>
  );
}
