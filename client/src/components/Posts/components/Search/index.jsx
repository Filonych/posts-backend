import { useDispatch, useSelector } from "react-redux";
import { setSearchValue } from "../../../../redux/slices/filterSlice";
import { useCallback, useState } from "react";
import { Input } from "../../../ui/Input";

export const Search = ({ updatePosts }) => {
  const dispatch = useDispatch();
  const { searchValue, currentPage, sort, order } = useSelector(
    (state) => state.filter.filter
  );

  const [inputValue, setInputValue] = useState(searchValue);

  const debounce = (fn, delay) => {
    let timerId;
    return (...args) => {
      clearTimeout(timerId);
      timerId = setTimeout(() => fn(...args), delay);
    };
  };

  const debouncedUpdatePosts = useCallback(
    debounce((value) => {
      updatePosts(value, currentPage, sort, order);
    }, 500),
    []
  );

  const onChangeInput = (event) => {
    const value = event.target.value;
    setInputValue(value);
    debouncedUpdatePosts(value);
    dispatch(setSearchValue(value));
  };

  return (
    <div>
      <h3>Фильтрация</h3>
      <Input type="text" value={inputValue} onChange={onChangeInput} />
    </div>
  );
};
