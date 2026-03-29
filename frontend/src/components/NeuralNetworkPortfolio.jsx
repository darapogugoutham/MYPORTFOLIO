import React, { useMemo, useRef, useState, useEffect } from "react";
import ForceGraph2D from "react-force-graph-2d";
import "./NeuralNetworkPortfolio.css";

const portfolioItems = [
  {
    id: "EmotiveChat",
    type: "project",
    description:
      "Emotion-aware chatbot using BERT, Flask, BlenderBot, and response ranking. Analyzes user sentiment and tailors responses accordingly.",
    tech: ["React", "Flask", "BERT", "NLP", "HuggingFace"],
    impact: "Built an intelligent chatbot with emotion-aware response flow that improves user engagement by 35%.",
    link: "#",
    color: "#22d3ee",
  },
  {
    id: "Electro-Mart",
    type: "project",
    description:
      "Microservices-based e-commerce platform with frontend, cart, product catalog, and backend APIs. Handles 10K+ concurrent users.",
    tech: ["Angular", "Spring Boot", "MySQL", "Docker", "Microservices"],
    impact: "Designed a scalable e-commerce system with modular services achieving 99.9% uptime.",
    link: "#",
    color: "#a78bfa",
  },
  {
    id: "Food Calorie Estimation",
    type: "project",
    description:
      "Deep learning and computer vision project for estimating food calories from images using CNN models trained on 50K+ images.",
    tech: ["Python", "CNN", "Computer Vision", "Deep Learning", "TensorFlow"],
    impact: "Combined food recognition with calorie approximation achieving 92% accuracy in real-world scenarios.",
    link: "#",
    color: "#38bdf8",
  },
  {
    id: "Learnova",
    type: "project",
    description:
      "AI-powered learning app for intelligent summaries, flashcards, and personalized study planning using LLMs.",
    tech: ["React", "Python", "Supabase", "LLMs", "Prompt Engineering"],
    impact: "Built an AI study companion for personalized learning that reduces study time by 40%.",
    link: "#",
    color: "#06b6d4",
  },
  {
    id: "Multi-Cloud Optimizer",
    type: "project",
    description:
      "Cost optimization platform across AWS, Azure, and GCP with real-time analytics and ML-based resource predictions.",
    tech: ["Python", "Kubernetes", "AWS", "Azure", "GCP", "Machine Learning"],
    impact: "Achieved 40% reduction in cloud costs for enterprise clients through intelligent resource scaling.",
    link: "#",
    color: "#10b981",
  },
];

function buildGraphData(items) {
  const nodes = [];
  const links = [];
  const skillSet = new Map();

  items.forEach((item) => {
    nodes.push({
      id: item.id,
      type: item.type,
      description: item.description,
      tech: item.tech,
      impact: item.impact,
      link: item.link,
      color: item.color,
      val: 20,
    });

    item.tech.forEach((skill) => {
      if (!skillSet.has(skill)) {
        skillSet.set(skill, {
          id: skill,
          type: "skill",
          color: "#60a5fa",
          val: 9,
        });
      }

      links.push({
        source: item.id,
        target: skill,
      });
    });
  });

  skillSet.forEach((skillNode) => nodes.push(skillNode));

  return { nodes, links };
}

export default function NeuralNetworkPortfolio() {
  const graphRef = useRef();
  const [selectedNode, setSelectedNode] = useState(portfolioItems[0]);
  const [hoverNode, setHoverNode] = useState(null);

  const data = useMemo(() => buildGraphData(portfolioItems), []);

  const connectedNodes = useMemo(() => {
    if (!hoverNode) return new Set();

    const neighbors = new Set([hoverNode.id]);
    data.links.forEach((link) => {
      const sourceId =
        typeof link.source === "object" ? link.source.id : link.source;
      const targetId =
        typeof link.target === "object" ? link.target.id : link.target;

      if (sourceId === hoverNode.id) neighbors.add(targetId);
      if (targetId === hoverNode.id) neighbors.add(sourceId);
    });
    return neighbors;
  }, [hoverNode, data.links]);

  useEffect(() => {
    if (graphRef.current) {
      setTimeout(() => {
        graphRef.current.zoomToFit(800, 80);
      }, 500);
    }
  }, []);

  return (
    <section className="neural-section">
      <div className="neural-background"></div>

      <div className="container neural-container">
        <div className="neural-header">
          <h2 className="neural-title">Neural Network View</h2>
          <p className="neural-subtitle">
            Explore my work as a connected system of projects, tools, and technologies.
          </p>
        </div>

        <div className="neural-grid">
          <div className="neural-graph-container">
            <ForceGraph2D
              ref={graphRef}
              graphData={data}
              backgroundColor="rgba(0,0,0,0)"
              nodeRelSize={8}
              cooldownTicks={120}
              linkWidth={(link) => {
                const sourceId =
                  typeof link.source === "object" ? link.source.id : link.source;
                const targetId =
                  typeof link.target === "object" ? link.target.id : link.target;

                if (
                  hoverNode &&
                  (sourceId === hoverNode.id || targetId === hoverNode.id)
                ) {
                  return 2.8;
                }
                return 1.2;
              }}
              linkColor={(link) => {
                const sourceId =
                  typeof link.source === "object" ? link.source.id : link.source;
                const targetId =
                  typeof link.target === "object" ? link.target.id : link.target;

                if (
                  hoverNode &&
                  (sourceId === hoverNode.id || targetId === hoverNode.id)
                ) {
                  return "rgba(34, 211, 238, 0.9)";
                }
                return "rgba(148, 163, 184, 0.25)";
              }}
              linkDirectionalParticles={(link) => {
                const sourceId =
                  typeof link.source === "object" ? link.source.id : link.source;
                const targetId =
                  typeof link.target === "object" ? link.target.id : link.target;

                if (
                  hoverNode &&
                  (sourceId === hoverNode.id || targetId === hoverNode.id)
                ) {
                  return 3;
                }
                return 0;
              }}
              linkDirectionalParticleWidth={2}
              linkDirectionalParticleColor={() => "#22d3ee"}
              onNodeHover={(node) => setHoverNode(node || null)}
              onNodeClick={(node) => {
                setSelectedNode(node);
              }}
              onBackgroundClick={() => {
                setSelectedNode(null);
              }}
              nodeCanvasObject={(node, ctx, globalScale) => {
                const label = node.id;
                const fontSize = node.type === "project" ? 15 : 11;
                const isHovered = hoverNode?.id === node.id;
                const isConnected =
                  !hoverNode || connectedNodes.has(node.id);
                const radius =
                  node.type === "project" ? (isHovered ? 14 : 11) : isHovered ? 9 : 7;

                ctx.save();
                ctx.globalAlpha = isConnected ? 1 : 0.2;

                // outer glow
                ctx.beginPath();
                ctx.arc(node.x, node.y, radius + 8, 0, 2 * Math.PI, false);
                ctx.fillStyle =
                  node.type === "project"
                    ? "rgba(34,211,238,0.12)"
                    : "rgba(96,165,250,0.10)";
                ctx.fill();

                // node body
                ctx.beginPath();
                ctx.arc(node.x, node.y, radius, 0, 2 * Math.PI, false);
                ctx.fillStyle = node.color || "#22d3ee";
                ctx.shadowBlur = 18;
                ctx.shadowColor = node.color || "#22d3ee";
                ctx.fill();

                ctx.shadowBlur = 0;

                if (node.type === "project" || isHovered) {
                  ctx.font = `${fontSize / globalScale}px Inter, sans-serif`;
                  ctx.fillStyle = "#e2e8f0";
                  ctx.textAlign = "center";
                  ctx.textBaseline = "top";
                  ctx.fillText(label, node.x, node.y + radius + 6);
                }

                ctx.restore();
              }}
            />
          </div>

          <div className="neural-details-panel">
            {!selectedNode ? (
              <div className="neural-empty-state">
                <h3>Explore the graph</h3>
                <p>
                  Click a glowing node to view details. Project nodes show full case-study 
                  summaries, while skill nodes reveal the technologies connected to your work.
                </p>

                <div className="neural-guide">
                  <p>• Larger glowing nodes = projects</p>
                  <p>• Smaller blue nodes = skills / tools</p>
                  <p>• Hover highlights connected technologies</p>
                  <p>• Click background to reset zoom</p>
                </div>
              </div>
            ) : (
              <div className="neural-details-content">
                <span className="neural-badge">
                  {selectedNode.type === "project" ? "📁 Project" : "⚙ Skill"}
                </span>

                <h3 className="neural-details-title">{selectedNode.id}</h3>

                {selectedNode.type === "project" ? (
                  <>
                    <p className="neural-description">
                      {selectedNode.description}
                    </p>

                    <div className="neural-tech-section">
                      <h4>Tech Stack</h4>
                      <div className="neural-tech-tags">
                        {selectedNode.tech?.map((tech) => (
                          <span key={tech} className="neural-tech-tag">
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="neural-impact-section">
                      <h4>Impact</h4>
                      <p>{selectedNode.impact}</p>
                    </div>

                    <button className="neural-btn-primary">
                      View Case Study →
                    </button>
                  </>
                ) : (
                  <>
                    <p className="neural-description">
                      This skill is connected to multiple projects in the portfolio. 
                      Hover or click surrounding project nodes to see where it is used.
                    </p>

                    <div className="neural-skill-info">
                      <h4>Type</h4>
                      <p>Technology / Skill Node</p>
                    </div>
                  </>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
