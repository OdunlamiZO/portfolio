import "./App.css";
import Project from "./Project";
import Loader from "./Loader";
import SocialLink from "./SocialLink";
import ProjectButton from "./ProjectButton";
import { useRef, useState, useEffect } from "react";

function App() {
    const [project, setProject] = useState(null);
    const [projects, setProjects] = useState(null);

    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const response = await fetch(
                    "https://api.jsonbin.io/v3/b/65b9e853266cfc3fde83a460/latest?meta=false",
                    {
                        headers: {
                            "X-Master-Key":
                                "$2a$10$nzb.n.ZfctuHk6jNJUR0SuCPQIOoBqW4DE8B0jebRDdLZ7XEees9e",
                        },
                    }
                );
                if (!response.ok) {
                    throw new Error("Could not fetch projects.");
                }
                const projects = await response.json();
                setProjects(projects);
            } catch (error) {
                console.log(error);
            }
        };
        fetchProjects();
    }, []);

    const toggleProject = async (name) => {
        let commandText;
        if (project !== null) {
            // eslint-disable-next-line no-useless-concat
            commandText = "cd " + "~";
            await typeCommand(commandText);
            document.getElementById("directory").innerText = "~";
            if (project.name === name) {
                setProject(null);
                return;
            }
        }
        let selectedProject;
        for (let i = 0; i < projects.length; i++) {
            if (projects[i].name === name) {
                selectedProject = projects[i];
                break;
            }
        }
        commandText = `cd ${selectedProject.name}/`;
        await typeCommand(commandText);
        document.getElementById(
            "directory"
        ).innerText = `~/${selectedProject.name}`;
        setProject(selectedProject);
    };

    const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

    const typeCommand = async (commandText) => {
        let typedText = "";
        for (let i = 0; i < commandText.length; i++) {
            typedText += commandText.charAt(i);
            document.getElementById("command").innerText = typedText;
            await delay(35);
        }
        document.getElementById("command").innerText = "";
    };

    const messageRef = useRef(null);

    useEffect(() => {
        if (messageRef.current) {
            const height = messageRef.current.clientHeight;
            messageRef.current.style.minHeight = `${height}px`;
            console.log(height);
        }
    }, [projects]);

    return (
        <div id="app">
            {projects ? (
                <div
                    style={{
                        position: "relative",
                        width: "100%",
                    }}
                >
                    <header className="header">
                        <div
                            style={{
                                display: "flex",
                                alignItems: "center",
                                gap: "5px",
                                fontFamily: "Ubuntu Condensed, 'sans-serif'",
                                color: "darkgreen",
                                letterSpacing: "1.5px",
                            }}
                        >
                            <div>
                                <span>odunlamizo@OdunlamiZO</span>
                                <span style={{ color: "white" }}>:</span>
                                <span
                                    id="directory"
                                    style={{ color: "darkblue" }}
                                >
                                    ~
                                </span>
                                <span style={{ color: "white" }}>$</span>
                            </div>
                            <div
                                style={{
                                    display: "flex",
                                    alignItems: "center",
                                }}
                            >
                                <span
                                    id="command"
                                    style={{ color: "white" }}
                                ></span>
                                <span
                                    className="animate-blink"
                                    style={{
                                        width: "6.5px",
                                        height: "18.5px",
                                        backgroundColor: "white",
                                    }}
                                ></span>
                            </div>
                        </div>
                        <div id="social-links">
                            <SocialLink
                                url="https://github.com/OdunlamiZO"
                                icon="fa-brands fa-github fa-xl"
                            />
                            <SocialLink
                                url="https://twitter.com/OdunlamiZO"
                                icon="fa-brands fa-twitter fa-xl"
                            />
                            <SocialLink
                                url="https://www.linkedin.com/in/zacchaeus-odunlami-4749ba160/"
                                icon="fa-brands fa-linkedin fa-xl"
                            />
                        </div>
                    </header>
                    <main className="main">
                        <div className="content-1">
                            <div ref={messageRef}>
                                {project === null ? (
                                    <div id="about" className="animate-pulse">
                                        <div className="header">Welcome</div>
                                        <div className="message animate-border">
                                            <p style={{ marginBottom: "15px" }}>
                                                My name is Odunlami Zacchaeus,
                                                I'm a backend developer based in
                                                Lagos, Nigeria. I have
                                                experience building with Java
                                                and its popular framework,
                                                Spring; PHP and Laravel; NodeJS
                                                and Go. I have knowledge of SQL
                                                databases (MySQL & PostgreSQL)
                                                and MongoDB (NoSQL). I am an
                                                expert in building RESTful APIs
                                                and services; even GraphQL APIs.
                                            </p>
                                            <p>
                                                I have also some proficiency in
                                                frontend development, having
                                                strong knowledge of HTML, CSS3
                                                and JavaScript with its popular
                                                library, React.
                                            </p>
                                            <div style={{ marginTop: "20px" }}>
                                                <a
                                                    href="https://docs.google.com/document/d/1TF3HtRsea6YeK2dMsbhB31YRlIQWl0veFQkUfukjE4A/edit?usp=sharing"
                                                    className="animate-border"
                                                    style={{
                                                        borderBottom:
                                                            "2px solid",
                                                        paddingBottom: "5px",
                                                    }}
                                                >
                                                    Resume
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                ) : (
                                    <Project
                                        name={project.name}
                                        message={project.message}
                                        site={project.site}
                                        github={project.github}
                                    />
                                )}
                            </div>
                        </div>
                        <div className="content-2">
                            <div style={{ width: "100%" }}>
                                <div style={{ width: "100%" }}>
                                    <div
                                        style={{
                                            marginBottom: "25px",
                                            fontSize: "32px",
                                            letterSpacing: "1.25",
                                        }}
                                    >
                                        Projects
                                    </div>
                                    <div
                                        style={{
                                            position: "relative",
                                            padding: "35px",
                                            display: "flex",
                                            flexDirection: "column",
                                            gap: "25px",
                                        }}
                                    >
                                        <div
                                            style={{
                                                zIndex: "-1",
                                                position: "absolute",
                                                top: "0",
                                                left: "0",
                                                width: "70px",
                                                height: "70px",
                                                borderRadius: "5px",
                                                overflow: "hidden",
                                            }}
                                        >
                                            <div
                                                className="animate-border"
                                                style={{
                                                    width: "100%",
                                                    height: "100%",
                                                    borderTop: "2.5px solid",
                                                    borderLeft: "2.5px solid",
                                                }}
                                            ></div>
                                        </div>
                                        {projects.map((project) => (
                                            <ProjectButton
                                                key={project.id}
                                                text={project.name}
                                                toggleProject={toggleProject}
                                            />
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </main>
                    <footer
                        style={{
                            width: "100%",
                            padding: "25px 3.5%",
                            fontSize: "14px",
                            textAlign: "right",
                        }}
                    >
                        &copy; {new Date().getFullYear()} OdunlamiZO
                    </footer>
                </div>
            ) : (
                <div
                    style={{
                        width: "100%",
                        height: "100vh",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                    }}
                >
                    <Loader />
                </div>
            )}
        </div>
    );
}

export default App;
