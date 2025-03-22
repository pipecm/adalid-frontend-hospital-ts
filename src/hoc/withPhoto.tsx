import PropTypes from "prop-types";

export default function withPhoto(WrapperComponent) {
    return function ComponentWithPhoto(props) {
        return (
          <div>
            <img src={props.imageUrl} alt={props.name} className="service__img" />
            <WrapperComponent {...props} />
          </div>
        );
    };
}

withPhoto.propTypes = {
  props: PropTypes.shape({
    name: PropTypes.string.isRequired,
    imageUrl: PropTypes.string.isRequired
  }).isRequired
}