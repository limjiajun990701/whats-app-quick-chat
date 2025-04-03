
import React, { useRef, useEffect } from 'react';
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
  // Ref to track if component is mounted
  const isMounted = useRef(true);

  // Effect to handle cleanup properly
  useEffect(() => {
    return () => {
      isMounted.current = false;
    };
  }, []);

  return (
    <div className="fixed inset-0 -z-10">
      <Canvas 
        camera={{ position: [0, 0, 8], fov: 60 }}
        gl={{ 
          powerPreference: "high-performance",
          antialias: true,
          preserveDrawingBuffer: true
        }}
        frameloop="demand"
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
