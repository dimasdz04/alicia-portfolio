"use client";
import { useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import { Environment, Text } from '@react-three/drei';
import { Physics, RigidBody, useSphericalJoint } from '@react-three/rapier';
import type { RapierRigidBody } from '@react-three/rapier';

// Tambahkan "positionX" ke dalam props agar kita bisa menggeser posisi kartu
function IDCard({ role, positionX }: { role: string, positionX: number }) {
  const cardRef = useRef<RapierRigidBody>(null!);
  const anchorRef = useRef<RapierRigidBody>(null!);

  useSphericalJoint(anchorRef, cardRef, [
    [0, 0, 0], // Posisi joint di anchor
    [0, 1.5, 0] // Posisi joint di kartu
  ]);

  return (
    <>
      {/* Anchor Point (Titik gantung statis) digeser berdasarkan positionX */}
      <RigidBody ref={anchorRef} type="fixed" position={[positionX, 2, 0]} />

      {/* Dynamic Card (Kartu yang berayun) juga digeser berdasarkan positionX */}
      <RigidBody 
        ref={cardRef} 
        type="dynamic" 
        position={[positionX, 0, 0]}
        colliders="cuboid"
        linearDamping={0.8} 
        angularDamping={0.8}
      >
        <mesh castShadow>
          <boxGeometry args={[2, 3, 0.1]} />
          <meshStandardMaterial color="#0f172a" metalness={0.6} roughness={0.4} />
        </mesh>
        
        <Text position={[0, 0.8, 0.06]} fontSize={0.2} color="#22d3ee" fontWeight="bold">
          COMMITTEE ID
        </Text>
        
        <Text position={[0, 0.4, 0.06]} fontSize={0.25} color="#f8fafc" fontWeight="bold">
          ALICIA MAHARANI
        </Text>

        <Text position={[0, -0.4, 0.06]} fontSize={0.15} color="#cbd5e1" maxWidth={1.8} textAlign="center">
          {role}
        </Text>
        
        <mesh position={[0, 1.2, 0.06]}>
          <ringGeometry args={[0.1, 0.2, 32]} />
          <meshBasicMaterial color="#f97316" />
        </mesh>
      </RigidBody>
    </>
  );
}

export default function LanyardSection() {
  const roles = [
    "Hardware Div\nDrone Racing Event", // \n untuk enter agar teks tidak terlalu panjang ke samping
    "Staff\nCampus IoT Seminar",
    "Logistics Head\nRobotics Comp"
  ];

  return (
    <div className="relative w-full h-[600px] flex flex-col items-center justify-center">
      <div className="absolute inset-0 cursor-grab active:cursor-grabbing">
        {/* Kamera dijauhkan ke [0, 0, 10] agar 3 kartu muat */}
        <Canvas camera={{ position: [0, 0, 10], fov: 45 }}>
          <Environment preset="city" />
          <ambientLight intensity={0.5} />
          <directionalLight position={[5, 5, 5]} intensity={1} castShadow />
          <Physics gravity={[0, -9.81, 0]}>
            
            {/* Kita render ketiga kartu sekaligus dengan jarak X = -2.5, 0, dan 2.5 */}
            <IDCard role={roles[0]} positionX={-2.6} />
            <IDCard role={roles[1]} positionX={0} />
            <IDCard role={roles[2]} positionX={2.6} />

          </Physics>
        </Canvas>
      </div>
    </div>
  );
}