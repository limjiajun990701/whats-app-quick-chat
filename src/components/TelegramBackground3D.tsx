
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
      group.current.rotation.y = Math.sin(clock.getElapsedTime() * 0.15) * 0.2;
      group.current.rotation.x = Math.cos(clock.getElapsedTime() * 0.15) * 0.1;
    }
  });

  // Create fewer, more optimized spheres with Telegram brand colors
  return (
    <group ref={group}>
      {Array.from({ length: 5 }).map((_, i) => {
        const radius = Math.random() * 0.4 + 0.2;
        const position = [
          (Math.random() - 0.5) * 7,
          (Math.random() - 0.5) * 7,
          (Math.random() - 0.5) * 7
        ];
        
        // Use Telegram blue colors with variation
        const color = new THREE.Color(0x0088cc).offsetHSL(0, 0, (Math.random() - 0.5) * 0.2);
        
        return (
          <mesh key={i} position={position as [number, number, number]}>
            <sphereGeometry args={[radius, 12, 12]} />
            <meshStandardMaterial 
              color={color} 
              roughness={0.4} 
              metalness={0.6}
              transparent
              opacity={0.8}
            />
          </mesh>
        );
      })}
    </group>
  );
};

// Add simple gradient backdrop for additional visual effect
const GradientBackdrop = () => {
  return (
    <mesh position={[0, 0, -10]}>
      <planeGeometry args={[50, 50]} />
      <meshBasicMaterial>
        <gradientTexture
          stops={[0, 1]}
          colors={['#051c34', '#0a3464']}
          attach="map"
        />
      </meshBasicMaterial>
    </mesh>
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
    // Improved static fallback with gradient
    return (
      <div className="fixed inset-0 -z-10 bg-gradient-to-b from-[#051c34] to-[#0a3464] animate-gradient-y"></div>
    );
  }

  return (
    <div className="fixed inset-0 -z-10">
      <Canvas 
        camera={{ position: [0, 0, 7], fov: 55 }}
        gl={{ 
          powerPreference: "low-power",
          antialias: false,
          alpha: true,
          stencil: false,
          depth: true,
          precision: "lowp",
          failIfMajorPerformanceCaveat: true
        }}
        frameloop="demand"
        style={{ opacity: isReady ? 1 : 0 }}
        dpr={[0.5, 1]}
      >
        <ambientLight intensity={0.4} />
        <directionalLight position={[10, 10, 5]} intensity={0.8} />
        <pointLight position={[-10, -10, -5]} intensity={0.4} color="#0088cc" />
        
        <FloatingSpheres />
        <GradientBackdrop />
        
        <OrbitControls 
          enableZoom={false}
          enablePan={false}
          rotateSpeed={0.2}
          autoRotate
          autoRotateSpeed={0.2}
        />
        
        {/* Background gradient */}
        <color attach="background" args={['#051c34']} />
        <fog attach="fog" args={['#051c34', 7, 20]} />
      </Canvas>
    </div>
  );
};

export default TelegramBackground3D;
