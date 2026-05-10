'use client';
import { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Stage, useGLTF } from '@react-three/drei';

// Komponen terpisah agar hook useGLTF berjalan aman
function ActualModel({ url }: { url: string }) {
  const { scene } = useGLTF(url);
  return <primitive object={scene} />;
}

// Komponen penengah untuk mengecek placeholder
function Model({ url }: { url: string }) {
  if (url.includes('placeholder')) {
    return (
      <mesh>
        <boxGeometry args={[1.5, 1.5, 1.5]} />
        <meshStandardMaterial color="#334155" wireframe />
      </mesh>
    );
  }
  return <ActualModel url={url} />;
}

interface ProjectCardProps {
  title: string;
  description: string;
  modelUrl: string;
  tags: string[];
}

export default function ProjectCard3D({ title, description, modelUrl, tags }: ProjectCardProps) {
  return (
    <div className="bg-slate-900/80 border border-slate-800 rounded-xl overflow-hidden flex flex-col group hover:border-cyan-500/50 transition-colors">
      <div className="h-64 w-full bg-slate-950 relative cursor-move">
        <Canvas shadows camera={{ position: [0, 0, 4], fov: 45 }}>
          <Suspense fallback={null}>
            <Stage environment="studio" intensity={0.5}>
              <Model url={modelUrl} />
            </Stage>
            <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={1.5} />
          </Suspense>
        </Canvas>
        <div className="absolute top-2 right-2 bg-slate-900/80 text-xs px-2 py-1 text-cyan-400 font-mono rounded border border-slate-800 backdrop-blur-sm">
          Interactive 3D
        </div>
      </div>

      <div className="p-6">
        <h3 className="text-xl font-bold text-slate-100 mb-2">{title}</h3>
        <p className="text-slate-400 text-sm mb-4 leading-relaxed">{description}</p>
        <div className="flex flex-wrap gap-2">
          {tags.map((tag) => (
            <span key={tag} className="text-xs font-mono text-orange-400 bg-orange-400/10 px-2 py-1 rounded">
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}