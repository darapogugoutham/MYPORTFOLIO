import React, { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Text } from '@react-three/drei';
import * as THREE from 'three';

const projectData = [
  {
    id: 'multicloud',
    name: 'Multi-Cloud Optimizer',
    color: '#a855f7',
    emissive: '#a855f7',
    radius: 2,
    speed: 0.5,
    description: 'Resource allocation and performance monitoring across AWS, Azure, and GCP with interactive analytics dashboard.',
    tech: ['React', 'TypeScript', 'Node.js', 'CSS'],
    icon: '☁️',
    github: 'https://github.com/darapogugoutham/multi-cloud-resource-allocation-app',
    demo: 'https://github.com/darapogugoutham/multi-cloud-resource-allocation-app',
    linkedin: 'https://www.linkedin.com/in/goutham-darapogu-184004219/',
  },
  {
    id: 'learnova',
    name: 'Learnova',
    color: '#3b82f6',
    emissive: '#3b82f6',
    radius: 3.2,
    speed: 0.35,
    description: 'AI-powered learning platform. Upload documents to generate summaries, quizzes, flashcards and chatbot assistance.',
    tech: ['React', 'Python', 'LLMs', 'Node.js', 'AI'],
    icon: '📚',
    github: 'https://github.com/darapogugoutham/learnova',
    demo: 'https://github.com/darapogugoutham/learnova',
    linkedin: 'https://www.linkedin.com/in/goutham-darapogu-184004219/',
  },
  {
    id: 'fracture',
    name: 'Bone Fracture Detection',
    color: '#22c55e',
    emissive: '#22c55e',
    radius: 4.4,
    speed: 0.22,
    description: 'Automated detection of bone fractures in shoulder X-ray images using deep learning ensemble methods.',
    tech: ['PyTorch', 'Python', 'CNN', 'Computer Vision', 'ResNet'],
    icon: '🔬',
    github: 'https://github.com/darapogugoutham/bone-fracture-detection',
    demo: 'https://github.com/darapogugoutham/bone-fracture-detection',
    linkedin: 'https://www.linkedin.com/in/goutham-darapogu-184004219/',
  },
  {
    id: 'network',
    name: 'Network Failure Detection',
    color: '#eab308',
    emissive: '#eab308',
    radius: 5.6,
    speed: 0.15,
    description: 'Machine learning system for predicting network failures using real-time metrics and classification models.',
    tech: ['Python', 'scikit-learn', 'LightGBM', 'ML', 'Data Science'],
    icon: '🌐',
    github: 'https://github.com/darapogugoutham/network-failure-detection',
    demo: 'https://github.com/darapogugoutham/network-failure-detection',
    linkedin: 'https://www.linkedin.com/in/goutham-darapogu-184004219/',
  },
  {
    id: 'ecommerce',
    name: 'Full-Stack E-commerce',
    color: '#ec4899',
    emissive: '#ec4899',
    radius: 6.8,
    speed: 0.1,
    description: 'Production-scale booking and order management system with real-time inventory management.',
    tech: ['React', 'Node.js', 'MongoDB', 'Stripe'],
    icon: '🛒',
    github: 'https://github.com/darapogugoutham',
    demo: 'https://github.com/darapogugoutham',
    linkedin: 'https://www.linkedin.com/in/goutham-darapogu-184004219/',
  },
  {
    id: 'portfolio',
    name: 'Interactive Portfolio',
    color: '#06b6d4',
    emissive: '#06b6d4',
    radius: 7.6,
    speed: 0.08,
    description: 'Microservices galaxy visualization with 3D interactive UI and real-time analytics.',
    tech: ['React', 'Three.js', 'TypeScript', 'CSS'],
    icon: '🌌',
    github: 'https://github.com/darapogugoutham/portfolio',
    demo: 'https://github.com/darapogugoutham/portfolio',
    linkedin: 'https://www.linkedin.com/in/goutham-darapogu-184004219/',
  },
  {
    id: 'analytics',
    name: 'Data Analytics Suite',
    color: '#f59e0b',
    emissive: '#f59e0b',
    radius: 8.4,
    speed: 0.06,
    description: 'Comprehensive data pipeline for ETL, data warehouse, and real-time reporting.',
    tech: ['Python', 'SQL', 'Apache Spark', 'PostgreSQL'],
    icon: '📊',
    github: 'https://github.com/darapogugoutham',
    demo: 'https://github.com/darapogugoutham',
    linkedin: 'https://www.linkedin.com/in/goutham-darapogu-184004219/',
  },
];

function PlanetSatellites({ position, techs, planetColor }) {
  return (
    <group position={position}>
      {techs.map((tech, index) => {
        const angle = (index / techs.length) * Math.PI * 2;
        const satRadius = 0.8;
        const x = Math.cos(angle) * satRadius;
        const z = Math.sin(angle) * satRadius;

        return (
          <mesh key={tech} position={[x, 0, z]}>
            <sphereGeometry args={[0.12, 16, 16]} />
            <meshStandardMaterial
              color={planetColor}
              emissive={planetColor}
              emissiveIntensity={0.5}
              wireframe
            />
            <Text
              position={[0, 0.3, 0]}
              fontSize={0.08}
              color="#ffffff"
              anchorX="center"
              anchorY="bottom"
            >
              {tech.charAt(0)}
            </Text>
          </mesh>
        );
      })}
    </group>
  );
}

function Planet({
  name,
  radius,
  speed,
  color,
  emissive,
  techs,
  icon,
  onSelect,
}) {
  const groupRef = useRef();
  const planetRef = useRef();
  const [hovered, setHovered] = useState(false);

  useFrame((state) => {
    const t = state.clock.getElapsedTime() * speed;
    groupRef.current.position.x = Math.cos(t) * radius;
    groupRef.current.position.z = Math.sin(t) * radius;

    if (planetRef.current) {
      planetRef.current.scale.lerp(
        { x: hovered ? 1.4 : 1, y: hovered ? 1.4 : 1, z: hovered ? 1.4 : 1 },
        0.1
      );

      if (hovered) {
        planetRef.current.rotation.x += 0.01;
        planetRef.current.rotation.y += 0.015;
      }
    }
  });

  const handleClick = () => {
    const project = projectData.find((p) => p.name === name);
    onSelect({
      name,
      color,
      techs,
      linkedin: project?.linkedin,
      icon,
      description: project?.description,
      github: project?.github,
      demo: project?.demo,
    });
  };

  return (
    <group ref={groupRef}>
      {/* Orbit ring */}
      <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, 0, 0]}>
        <ringGeometry args={[radius - 0.05, radius + 0.05, 64]} />
        <meshBasicMaterial color={color} transparent opacity={0.15} />
      </mesh>

      {/* Planet */}
      <mesh
        ref={planetRef}
        onClick={handleClick}
        onPointerEnter={() => setHovered(true)}
        onPointerLeave={() => setHovered(false)}
        scale={1}
      >
        <sphereGeometry args={[0.35, 32, 32]} />
        <meshStandardMaterial
          color={color}
          emissive={emissive}
          emissiveIntensity={hovered ? 0.8 : 0.4}
          metalness={0.3}
          roughness={0.4}
        />
      </mesh>

      {/* Glow effect */}
      <mesh scale={1.15} position={[0, 0, 0]}>
        <sphereGeometry args={[0.35, 32, 32]} />
        <meshBasicMaterial
          color={emissive}
          transparent
          opacity={hovered ? 0.3 : 0.1}
        />
      </mesh>

      {/* Label */}
      <Text
        position={[0, 0.6, 0]}
        fontSize={0.2}
        color={color}
        anchorX="center"
        anchorY="bottom"
        fontWeight="bold"
      >
        {icon} {name}
      </Text>

      {/* Tech satellites */}
      {hovered && <PlanetSatellites position={[0, 0, 0]} techs={techs} planetColor={color} />}
    </group>
  );
}

function Core() {
  const coreRef = useRef();

  useFrame(() => {
    if (coreRef.current) {
      coreRef.current.rotation.x += 0.005;
      coreRef.current.rotation.y += 0.008;
    }
  });

  return (
    <group ref={coreRef}>
      {/* Core sphere */}
      <mesh>
        <sphereGeometry args={[0.6, 64, 64]} />
        <meshStandardMaterial
          color="#00ffff"
          emissive="#00ffff"
          emissiveIntensity={0.8}
          metalness={0.7}
          roughness={0.2}
        />
      </mesh>

      {/* Core glow */}
      <mesh scale={1.3}>
        <sphereGeometry args={[0.6, 32, 32]} />
        <meshBasicMaterial color="#00ffff" transparent opacity={0.2} />
      </mesh>

      {/* Label */}
      <Text
        position={[0, -1.2, 0]}
        fontSize={0.25}
        color="#00ffff"
        anchorX="center"
        anchorY="top"
        fontWeight="bold"
      >
        GOUTHAM
      </Text>
      <Text
        position={[0, -1.5, 0]}
        fontSize={0.12}
        color="#00d9ff"
        anchorX="center"
        anchorY="top"
        fontWeight="500"
      >
        System Orchestrator
      </Text>
    </group>
  );
}

export default function Galaxy({ onProjectSelect }) {
  return (
    <>
      {/* Ambient lighting */}
      <ambientLight intensity={0.4} />

      {/* Main point light at center */}
      <pointLight position={[0, 0, 0]} intensity={2} color="#00ffff" />

      {/* Additional lights */}
      <pointLight position={[5, 5, 5]} intensity={1.5} color="#a855f7" />
      <pointLight position={[-5, -5, 5]} intensity={1.5} color="#3b82f6" />

      {/* Core */}
      <Core />

      {/* Planets */}
      {projectData.map((project) => (
        <Planet
          key={project.id}
          name={project.name}
          radius={project.radius}
          speed={project.speed}
          color={project.color}
          emissive={project.emissive}
          techs={project.tech}
          icon={project.icon}
          onSelect={onProjectSelect}
        />
      ))}

      {/* Particle background stars */}
      {Array.from({ length: 200 }).map((_, i) => {
        const x = (Math.random() - 0.5) * 50;
        const y = (Math.random() - 0.5) * 50;
        const z = (Math.random() - 0.5) * 50;
        const size = Math.random() * 0.1;

        return (
          <mesh key={i} position={[x, y, z]}>
            <sphereGeometry args={[size, 8, 8]} />
            <meshBasicMaterial
              color={new THREE.Color().setHSL(Math.random(), 0.5, 0.7)}
              transparent
              opacity={0.6}
            />
          </mesh>
        );
      })}
    </>
  );
}
