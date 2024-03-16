import { useDispatch, useSelector } from "react-redux";
import { setCurrentPage, setSort } from "../../../../redux/slices/filterSlice";
import { Link } from "../../../ui/Link";
import * as SC from "./styles";

export const Sorting = ({ updatePosts }) => {
  const { searchValue, sort } = useSelector(
    (state) => state.filter.filter
  );
  const dispatch = useDispatch();

  const sortList = [
    { name: "A-Z", sortProperty: "ASC" },
    { name: "Z-A", sortProperty: "DESC" },
  ];

  const sortPosts = (sortProperty) => {
    dispatch(setSort(sortProperty));
    dispatch(setCurrentPage(1));
    updatePosts(searchValue, 1, sortProperty);
  };

  return (
    <div>
      <h3>Сортировка</h3>
      <SC.LinkWrap>
        {sortList.map((obj) => (
          <Link
            onClick={() => sortPosts(obj.sortProperty)}
            className={obj.sortProperty === sort ? "active" : undefined}
            key={obj.name}
          >
            {obj.name}
          </Link>
        ))}
      </SC.LinkWrap>
    </div>
  );
};
