"use client";
/* eslint-disable @next/next/no-img-element -- raw images are the non-WebGL fallback and must remain provider-independent */

import { Canvas, useFrame } from "@react-three/fiber";
import { Component, Suspense, useCallback, useEffect, useRef, useState, type ErrorInfo, type MutableRefObject, type PointerEvent as ReactPointerEvent, type ReactNode, type WheelEvent as ReactWheelEvent } from "react";
import * as THREE from "three";
import MediaSphere, { type MediaSphereHandle } from "./MediaSphere";
import { type RobotMediaAsset } from "./robotMedia";

const OUTSIDE_Z = 22;

function CameraController({ targetZ }: { targetZ: MutableRefObject<number> }) {
  useFrame(({ camera }) => { camera.position.z = THREE.MathUtils.lerp(camera.position.z, targetZ.current, 0.055); });
  return null;
}

function StaticOrbFallback() {
  return (
    <div className="orb-fallback" aria-label="World Humanoid Robot Games media collage">
      <img src="/images/robot-olympics/b1_01_solo_sprint_midstride.jpg" alt="Humanoid robot sprinting" />
      <img src="/images/robot-olympics/b2_01_football_kick_match.jpg" alt="Humanoid robots playing football" />
      <img src="/images/robot-olympics/b2_05a_boxing_bout_exchange.png" alt="Humanoid boxing match" />
      <img src="/images/robot-olympics/b1_07b_tug_of_war_action1.jpg" alt="Humanoid tug-of-war" />
    </div>
  );
}

class OrbBoundary extends Component<{ children: ReactNode }, { failed: boolean }> {
  state = { failed: false };
  static getDerivedStateFromError() { return { failed: true }; }
  componentDidCatch(error: Error, info: ErrorInfo) { console.error("Robot media orb failed", error, info); }
  render() { return this.state.failed ? <StaticOrbFallback /> : this.props.children; }
}

export default function RobotMediaOrb({ active }: { active: boolean }) {
  const sphereControls = useRef<MediaSphereHandle>(null);
  const dragging = useRef(false);
  const dragged = useRef(false);
  const pointer = useRef({ x: 0, y: 0, originX: 0, originY: 0 });
  const targetZ = useRef(OUTSIDE_Z);
  const closeButton = useRef<HTMLButtonElement>(null);
  const exitTimer = useRef<number | null>(null);
  const [grabbed, setGrabbed] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [exiting, setExiting] = useState(false);
  const [compact, setCompact] = useState(() => typeof window !== "undefined" && window.matchMedia("(max-width:760px)").matches);
  const [reducedMotion, setReducedMotion] = useState(() => typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion:reduce)").matches);
  const [selected, setSelected] = useState<RobotMediaAsset | null>(null);

  useEffect(() => {
    const mobile = window.matchMedia("(max-width:760px)");
    const motion = window.matchMedia("(prefers-reduced-motion:reduce)");
    const sync = () => { setCompact(mobile.matches); setReducedMotion(motion.matches); };
    sync();
    mobile.addEventListener("change", sync);
    motion.addEventListener("change", sync);
    return () => { mobile.removeEventListener("change", sync); motion.removeEventListener("change", sync); };
  }, []);

  useEffect(() => {
    if (!expanded) return;
    const reel = document.querySelector<HTMLElement>(".deck-reel");
    const previousOverflow = reel?.style.overflowY ?? "";
    if (reel) reel.style.overflowY = "hidden";
    closeButton.current?.focus();
    return () => { if (reel) reel.style.overflowY = previousOverflow; };
  }, [expanded]);

  const close = useCallback(() => {
    if (exiting) return;
    document.body.style.cursor = "auto";
    targetZ.current = OUTSIDE_Z;
    setSelected(null);
    setExiting(true);
    exitTimer.current = window.setTimeout(() => {
      setExpanded(false);
      setExiting(false);
      exitTimer.current = null;
    }, reducedMotion ? 0 : 650);
  }, [exiting, reducedMotion]);

  useEffect(() => {
    if (!expanded) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") close();
      if (event.key === "ArrowLeft") sphereControls.current?.nudge(0, -0.012);
      if (event.key === "ArrowRight") sphereControls.current?.nudge(0, 0.012);
      if (event.key === "ArrowUp") sphereControls.current?.nudge(-0.01, 0);
      if (event.key === "ArrowDown") sphereControls.current?.nudge(0.01, 0);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [close, expanded]);

  useEffect(() => () => {
    if (exitTimer.current) window.clearTimeout(exitTimer.current);
    document.body.style.cursor = "auto";
  }, []);

  const enter = () => {
    setExpanded(true);
    setExiting(false);
    setSelected(null);
    targetZ.current = reducedMotion ? 0.7 : 0.45;
  };

  const onPointerDown = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (event.pointerType === "touch" && !expanded) return;
    dragging.current = true;
    dragged.current = false;
    setGrabbed(true);
    pointer.current = { x: event.clientX, y: event.clientY, originX: event.clientX, originY: event.clientY };
    event.currentTarget.setPointerCapture(event.pointerId);
  };
  const onPointerMove = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (!dragging.current) return;
    const deltaX = event.clientX - pointer.current.x;
    const deltaY = event.clientY - pointer.current.y;
    pointer.current.x = event.clientX;
    pointer.current.y = event.clientY;
    if (Math.hypot(event.clientX - pointer.current.originX, event.clientY - pointer.current.originY) > 7) dragged.current = true;
    sphereControls.current?.drag(deltaX, deltaY);
  };
  const onPointerUp = () => {
    dragging.current = false;
    setGrabbed(false);
    window.setTimeout(() => { dragged.current = false; }, 0);
  };
  const onWheel = (event: ReactWheelEvent<HTMLDivElement>) => {
    if (!expanded) return;
    event.preventDefault();
    targetZ.current = THREE.MathUtils.clamp(targetZ.current + event.deltaY * 0.003, -2.6, 2.6);
  };

  return (
    <div className={`robot-media-orb ${grabbed ? "is-grabbed" : ""} ${expanded ? "is-expanded" : ""} ${exiting ? "is-exiting" : ""}`} aria-label="Interactive World Humanoid Robot Games media sphere">
      <div className="orb-halo" aria-hidden="true" />
      <div className="orb-canvas" onPointerDown={onPointerDown} onPointerMove={onPointerMove} onPointerUp={onPointerUp} onPointerCancel={onPointerUp} onWheel={onWheel}>
        <OrbBoundary>
          <Canvas
            camera={{ position: [0, 0, OUTSIDE_Z], fov: 42, near: 0.1, far: 100 }}
            dpr={[1, 1.5]}
            frameloop={active || expanded ? "always" : "demand"}
            gl={{ alpha: true, antialias: true, powerPreference: "high-performance" }}
            fallback={<StaticOrbFallback />}
          >
            <CameraController targetZ={targetZ} />
            <Suspense fallback={null}>
              <MediaSphere ref={sphereControls} dragging={dragging} dragged={dragged} active={active} expanded={expanded} compact={compact} reducedMotion={reducedMotion} selected={selected} onSelect={setSelected} />
            </Suspense>
          </Canvas>
        </OrbBoundary>
      </div>

      {!expanded && <button type="button" className="orb-enter" onClick={enter} aria-label="Enter the robot games media sphere"><span>{compact ? "EXPLORE" : "DRAG"}</span><b>ENTER</b></button>}

      {expanded && (
        <div className="orb-interface">
          <span className="orb-mode">{compact ? "WORLD HUMANOID ROBOT GAMES · DRAG TO LOOK · TAP A MOMENT" : "WORLD HUMANOID ROBOT GAMES · DRAG TO LOOK · SCROLL TO MOVE"}</span>
          <button ref={closeButton} type="button" className="orb-close" onClick={close}>EXIT <b>×</b></button>
          <div className={`orb-selection ${selected ? "is-visible" : ""}`} aria-live="polite">
            <span>{selected?.kind === "video" ? "PLAYING ON THE SPHERE" : "SELECTED MOMENT"}</span>
            <strong>{selected?.title}</strong>
          </div>
        </div>
      )}
    </div>
  );
}
