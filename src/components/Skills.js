"use client";
import React, { useEffect, useState } from "react";

const skills = [
  { name: "HTML", level: 90 },
  { name: "CSS", level: 85 },
  { name: "JavaScript", level: 80 },
  { name: "React", level: 85 },
  { name: "Node.js", level: 80 },
  { name: "Bootstrap", level: 88 },
  { name: "MongoDB", level: 75 },
  { name: "Express", level: 78 },
    { name: "Next Js", level: 70 }
];

const Skills = () => {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setLoaded(true), 300);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="row  w-100 p-3">
      <h2 className="text-center text-light mb-4">My Skills</h2>
      <hr className="bg-light" />
      <div className="row">
        {skills.map((skill, index) => (
          <div key={index} className="col-md-6 mb-4">
            <div className="d-flex justify-content-between mb-1 text-light">
              <strong>{skill.name}</strong>
              <span>{skill.level}%</span>
            </div>
            <div className="progress" style={{ height: "25px" }}>
              <div
                className="progress-bar bg-success"
                role="progressbar"
                style={{
                  width: loaded ? `${skill.level}%` : "0%",
                  transition: "width 1s ease-in-out",
                }}
                aria-valuenow={skill.level}
                aria-valuemin="0"
                aria-valuemax="100"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Skills;