
import React, { useRef } from 'react';
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
      {Array.from({ length: 12 }).map((_, i) => {
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
const TelegramBackground3D: React.FC = () => {
  return (
    <div className="fixed inset-0 -z-10">
      <Canvas camera={{ position: [0, 0, 8], fov: 60 }}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={1} />
        <pointLight position={[-10, -10, -5]} intensity={0.5} color="#0088cc" />
        
        <FloatingSpheres />
        
        <OrbitControls 
          enableZoom={false}
          enablePan={false}
          rotateSpeed={0.5}
          autoRotate
          autoRotateSpeed={0.5}
        />
        
        {/* Background gradient */}
        <color attach="background" args={['#141e30']} />
        <fog attach="fog" args={['#141e30', 8, 25]} />
      </Canvas>
    </div>
  );
};

export default TelegramBackground3D;
