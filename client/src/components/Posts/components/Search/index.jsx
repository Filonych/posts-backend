import { useDispatch, useSelector } from "react-redux";
import { setSearchValue } from "../../../../redux/slices/filterSlice";
import { useEffect, useState } from "react";
import { Input } from "../../../ui/Input";

export const Search = () => {
  const dispatch = useDispatch();
  const { searchValue } = useSelector((state) => state.filter.filter);

  const [inputValue, setInputValue] = useState(searchValue);
  const [debouncedValue, setDebouncedValue] = useState("");

  useEffect(() => {
    dispatch(setSearchValue(inputValue));
  }, [debouncedValue]);

  const updateSearchValue = () => {
    const timeoutId = setTimeout(() => {
      setDebouncedValue(inputValue);
    }, 1000);
    return () => clearTimeout(timeoutId);
  };

  const onChangeInput = (event) => {
    setInputValue(event.target.value);
    updateSearchValue(event.target.value);
  };

  return (
    <div>
      <h3>Фильтрация</h3>
      <Input type="text" value={inputValue} onChange={onChangeInput} />
    </div>
  );
};
