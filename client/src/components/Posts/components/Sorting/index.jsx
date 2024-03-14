import { useDispatch, useSelector } from "react-redux";
import { setSort } from "../../../../redux/slices/filterSlice";
import { Link } from "../../../ui/Link";
import * as SC from "./styles";

export const Sorting = () => {
  const filter = useSelector((state) => state.filter.filter);
  const dispatch = useDispatch();

  const sortList = [
    { name: "A-Z", sortProperty: "title&_order=asc" },
    { name: "Z-A", sortProperty: "title&_order=desc" },
  ];

  const sortPosts = (sortProperty) => {
    dispatch(setSort(sortProperty));
  };

  return (
    <div>
      <h3>Сортировка</h3>
      <SC.LinkWrap>
        {sortList.map((obj) => (
          <Link
            onClick={() => sortPosts(obj.sortProperty)}
            className={obj.sortProperty === filter.sort ? "active" : undefined}
            key={obj.name}
          >
            {obj.name}
          </Link>
        ))}
      </SC.LinkWrap>
    </div>
  );
};
