// Redux
import { useSelector, useDispatch } from "react-redux";
import { getSearchQuery, setSearchQuery } from "./taskSlice";

// Components
import { FormControl, Stack } from "react-bootstrap";
import { Search } from "react-feather";

// Styles
import "./styles.css";

export const SearchTask = () => {
    const dispatch = useDispatch();
    const searchQuery = useSelector(getSearchQuery);

    return (
        <Stack direction="horizontal" id="search-bar">
            <Search />
            <FormControl
                id="search"
                type="text"
                role="searchbox"
                placeholder="Search for todos..."
                value={searchQuery}
                onChange={(e) => {
                    dispatch(setSearchQuery(e.target.value));
                }}
            />
        </Stack>
    );
};
