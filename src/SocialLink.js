import "./SocialLink.css";

function SocialLink(props) {
	return (
		<a href={props.url} className="social-link">
			<i className={props.icon}></i>
		</a>
	);
}

export default SocialLink;
