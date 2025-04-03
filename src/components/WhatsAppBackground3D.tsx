
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

  // Create multiple spheres with WhatsApp brand colors
  return (
    <group ref={group}>
      {Array.from({ length: 12 }).map((_, i) => {
        const radius = Math.random() * 0.5 + 0.2;
        const position = [
          (Math.random() - 0.5) * 8,
          (Math.random() - 0.5) * 8,
          (Math.random() - 0.5) * 8
        ];
        
        // WhatsApp green colors with variations
        const color = new THREE.Color().setHSL(0.32, 0.8, 0.4 + Math.random() * 0.3);
        
        return (
          <mesh key={i} position={position as [number, number, number]}>
            <sphereGeometry args={[radius, 32, 32]} />
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
const WhatsAppBackground3D: React.FC = () => {
  // State to control when to render the canvas
  const [isReady, setIsReady] = useState(false);
  
  // Ref to track if component is mounted
  const isMounted = useRef(true);

  // Effect to handle canvas initialization and cleanup
  useEffect(() => {
    // Mark component as ready after a short delay to ensure DOM is fully ready
    const timer = setTimeout(() => {
      if (isMounted.current) {
        setIsReady(true);
      }
    }, 50);

    // Preload any necessary textures or resources
    THREE.DefaultLoadingManager.onLoad = () => {
      console.log('Three.js resources loaded for WhatsApp');
    };

    return () => {
      isMounted.current = false;
      clearTimeout(timer);
      // Clean up any Three.js resources
      THREE.DefaultLoadingManager.onLoad = () => {};
    };
  }, []);

  if (!isReady) {
    return <div className="fixed inset-0 -z-10 bg-[#075E54]"></div>;
  }

  return (
    <div className="fixed inset-0 -z-10">
      <Canvas 
        camera={{ position: [0, 0, 8], fov: 60 }}
        gl={{ 
          powerPreference: "high-performance",
          antialias: true,
          preserveDrawingBuffer: true,
          alpha: true,
          stencil: false,
          depth: true,
          failIfMajorPerformanceCaveat: false
        }}
        frameloop="demand"
        style={{ opacity: isReady ? 1 : 0 }}
        dpr={[1, 2]} // Limit pixel ratio for better performance
      >
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={1} />
        <pointLight position={[-10, -10, -5]} intensity={0.5} color="#25D366" />
        
        <FloatingSpheres />
        
        <OrbitControls 
          enableZoom={false}
          enablePan={false}
          rotateSpeed={0.5}
          autoRotate
          autoRotateSpeed={0.5}
        />
        
        {/* Background gradient */}
        <color attach="background" args={['#075E54']} />
        <fog attach="fog" args={['#075E54', 8, 25]} />
      </Canvas>
    </div>
  );
};

export default WhatsAppBackground3D;
