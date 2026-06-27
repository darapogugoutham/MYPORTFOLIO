import React, { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Text } from '@react-three/drei';
import * as THREE from 'three';
import portfolioData from '../data/portfolioData';

const colors = ['#a855f7', '#3b82f6', '#22c55e', '#eab308', '#ec4899', '#06b6d4', '#f59e0b', '#14b8a6', '#ef4444', '#84cc16', '#8b5cf6'];
const icons = ['🌌', '🧠', '🔗', '📊', '🌾', '☁️', '📚', '🔬', '🌐', '💬', '💧'];

const projectData = portfolioData.projects.map((project, index) => ({
  id: project.id,
  name: project.title,
  color: colors[index % colors.length],
  emissive: colors[index % colors.length],
  radius: 2 + index * 0.75,
  speed: Math.max(0.055, 0.5 - index * 0.04),
  description: project.shortDescription || project.description,
  tech: project.technologies.slice(0, 5),
  icon: icons[index % icons.length],
  github: project.github,
  demo: project.demo,
  linkedin: portfolioData.contact.linkedin,
}));

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
