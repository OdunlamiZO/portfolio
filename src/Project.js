function Project(props) {
	return (
		<div>
			<div
				style={{
					marginTop: "5px",
					marginBottom: "20px",
					fontSize: "32px",
					letterSpacing: "1.25px",
				}}
			>
				{props.name}
			</div>
			<div className="message animate-border">
				{props.message}
				<div style={{ marginTop: "20px", display: "flex", gap: "15px" }}>
					{props.site !== undefined && (
						<a
							href={props.site}
							className="animate-border"
							style={{ borderBottom: "2px solid", paddingBottom: "5px" }}
						>
							Visit Site
						</a>
					)}
					<a
						href={props.github}
						className="animate-border"
						style={{ borderBottom: "2px solid", paddingBottom: "5px" }}
					>
						GitHub
					</a>
				</div>
			</div>
		</div>
	);
}

export default Project;
