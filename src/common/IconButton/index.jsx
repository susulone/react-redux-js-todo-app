// React
import PropTypes from "prop-types";

// Components
import { Edit, Trash2, Download } from "react-feather";
import { Button } from "react-bootstrap";

export const IconButton = ({ iconName, handleOnClick }) => {
    const getIconFromName = (iconName) => {
        switch (iconName) {
            case "delete":
                return <Trash2 />;
            case "edit":
                return <Edit />;
            case "save":
                return <Download />;
        }
    };
    const icon = getIconFromName(iconName);

    return <Button onClick={handleOnClick}>{icon}</Button>;
};

IconButton.propTypes = {
    iconName: PropTypes.oneOf(["edit", "delete", "save"]).isRequired,
    handleOnClick: PropTypes.func.isRequired,
};
