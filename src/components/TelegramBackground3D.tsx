
import React, { useRef, useEffect, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import * as THREE from 'three';

// Animated floating spheres component
const FloatingSpheres = () => {
  const group = useRef<THREE.Group>(null);
  
  // Use frame to animate the spheres
  useFrame(({ clock }) => {
    if (group.current) {
      group.current.rotation.y = Math.sin(clock.getElapsedTime() * 0.2) * 0.3;
      group.current.rotation.x = Math.cos(clock.getElapsedTime() * 0.2) * 0.2;
    }
  });

  // Create multiple spheres with Telegram brand colors
  return (
    <group ref={group}>
      {Array.from({ length: 8 }).map((_, i) => {
        const radius = Math.random() * 0.5 + 0.2;
        const position = [
          (Math.random() - 0.5) * 8,
          (Math.random() - 0.5) * 8,
          (Math.random() - 0.5) * 8
        ];
        
        // Use Telegram blue colors
        const color = new THREE.Color().setHSL(0.58, 0.8, 0.4 + Math.random() * 0.3);
        
        return (
          <mesh key={i} position={position as [number, number, number]}>
            <sphereGeometry args={[radius, 16, 16]} />
            <meshStandardMaterial 
              color={color} 
              roughness={0.5} 
              metalness={0.8}
              transparent
              opacity={0.7}
            />
          </mesh>
        );
      })}
    </group>
  );
};

// Main background component
const TelegramBackground3D: React.FC = () => {
  // State to control when to render the canvas
  const [isReady, setIsReady] = useState(false);
  const [hasWebGLSupport, setHasWebGLSupport] = useState(true);
  
  // Ref to track if component is mounted
  const isMounted = useRef(true);

  // Effect to handle canvas initialization and cleanup
  useEffect(() => {
    // Check for WebGL support
    try {
      const canvas = document.createElement('canvas');
      const gl = canvas.getContext('webgl2') || canvas.getContext('webgl');
      if (!gl) {
        console.warn('WebGL not supported, falling back to static background');
        setHasWebGLSupport(false);
      }
    } catch (e) {
      console.error('Error checking WebGL support:', e);
      setHasWebGLSupport(false);
    }

    // Mark component as ready after a short delay to ensure DOM is fully ready
    const timer = setTimeout(() => {
      if (isMounted.current) {
        setIsReady(true);
      }
    }, 100);

    return () => {
      isMounted.current = false;
      clearTimeout(timer);
      
      // Force dispose any remaining Three.js resources
      THREE.Cache.clear();
      
      // Clean up any Three.js resources
      THREE.DefaultLoadingManager.onLoad = () => {};
    };
  }, []);

  if (!isReady || !hasWebGLSupport) {
    return <div className="fixed inset-0 -z-10 bg-[#141e30]"></div>;
  }

  return (
    <div className="fixed inset-0 -z-10">
      <Canvas 
        camera={{ position: [0, 0, 8], fov: 60 }}
        gl={{ 
          powerPreference: "default", // Changed from high-performance to default
          antialias: false, // Reduced quality for better performance
          alpha: true,
          stencil: false,
          depth: true,
          precision: "lowp", // Lower precision for better performance
          failIfMajorPerformanceCaveat: true // Will use fallback if performance is poor
        }}
        frameloop="always" // Changed from demand to always
        style={{ opacity: isReady ? 1 : 0 }}
        dpr={[0.5, 1]} // Reduced pixel ratio for performance
      >
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={1} />
        <pointLight position={[-10, -10, -5]} intensity={0.5} color="#0088cc" />
        
        <FloatingSpheres />
        
        <OrbitControls 
          enableZoom={false}
          enablePan={false}
          rotateSpeed={0.3}
          autoRotate
          autoRotateSpeed={0.3}
        />
        
        {/* Background gradient */}
        <color attach="background" args={['#141e30']} />
        <fog attach="fog" args={['#141e30', 8, 25]} />
      </Canvas>
    </div>
  );
};

export default TelegramBackground3D;
