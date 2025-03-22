import PropTypes from "prop-types";

export default function ShowInfoComponent({ name, specialty, description }) {
    return (
        <div>
            <h3>{name}</h3>
            {specialty && <p className="card-text"><small className="text-muted">{specialty}</small></p>}
            <p className="card-text">{description}</p>  
        </div>
    );
}

ShowInfoComponent.propTypes = {
    name: PropTypes.string,
    specialty: PropTypes.string,
    description: PropTypes.string
}