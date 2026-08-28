import { useFrame } from "@react-three/fiber";
import { forwardRef, useImperativeHandle, useMemo, useRef, type MutableRefObject } from "react";
import * as THREE from "three";
import MediaTile from "./MediaTile";
import { ROBOT_MEDIA, type RobotMediaAsset } from "./robotMedia";

export type MediaSphereHandle = {
  drag: (deltaX: number, deltaY: number) => void;
  nudge: (x: number, y: number) => void;
};

const MediaSphere = forwardRef<MediaSphereHandle, {
  dragging: MutableRefObject<boolean>;
  dragged: MutableRefObject<boolean>;
  active: boolean;
  expanded: boolean;
  compact: boolean;
  reducedMotion: boolean;
  selected: RobotMediaAsset | null;
  onSelect: (asset: RobotMediaAsset) => void;
}>(function MediaSphere({ dragging, dragged, active, expanded, compact, reducedMotion, selected, onSelect }, ref) {
  const group = useRef<THREE.Group>(null);
  const rotation = useRef({ x: 0.08, y: -0.42 });
  const velocity = useRef({ x: 0, y: 0.00165 });
  const assets = useMemo(() => compact && !expanded ? ROBOT_MEDIA.filter((_, index) => index % 2 === 0).slice(0, 28) : ROBOT_MEDIA, [compact, expanded]);

  useImperativeHandle(ref, () => ({
    drag(deltaX, deltaY) { velocity.current.y = deltaX * 0.0028; velocity.current.x = deltaY * 0.0028; },
    nudge(x, y) { velocity.current.x += x; velocity.current.y += y; },
  }), []);

  useFrame((_, delta) => {
    if (!group.current || (!active && !expanded)) return;
    const frameScale = Math.min(delta * 60, 2);
    rotation.current.x += velocity.current.x * frameScale;
    rotation.current.y += velocity.current.y * frameScale;
    rotation.current.x = THREE.MathUtils.clamp(rotation.current.x, -0.82, 0.82);
    if (!dragging.current) {
      velocity.current.x *= 0.92;
      const idle = reducedMotion ? 0 : expanded ? 0.0005 : 0.00165;
      velocity.current.y = THREE.MathUtils.lerp(velocity.current.y, idle, 0.028);
    }
    group.current.rotation.set(rotation.current.x, rotation.current.y, 0);
  });

  return (
    <group ref={group} rotation={[0.08, -0.42, 0]}>
      {assets.map((asset, index) => (
        <MediaTile key={asset.id} asset={asset} index={index} total={assets.length} expanded={expanded} selected={selected?.id === asset.id} dragged={dragged} onSelect={onSelect} />
      ))}
    </group>
  );
});

export default MediaSphere;
