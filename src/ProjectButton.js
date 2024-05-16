import "./ProjectButton.css";

function ProjectButton(props) {
    return (
        <div
            className="project-button animate-border"
            onClick={() => props.toggleProject(props.text)}
        >
            {props.text}
        </div>
    );
}

export default ProjectButton;
