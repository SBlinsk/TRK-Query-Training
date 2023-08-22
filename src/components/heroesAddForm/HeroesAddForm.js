import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { heroCreated } from "../../components/heroesList/heroesSlice";
import { v4 as uuidv4 } from "uuid";
import { useHttp } from "../../hooks/http.hook";
import store from "../../store";
import { selectAll } from "../heroesFilters/heroFiltersSlice";

const HeroesAddForm = () => {
  const [heroName, setHeroName] = useState("");
  const [heroDescr, setHeroDescr] = useState("");
  const [heroElement, setHeroElement] = useState("");

  const { filtersLoadingStatus } = useSelector(
    (state) => state.filters
  );
  const filters = selectAll(store.getState())
  const dispatch = useDispatch();
  const { request } = useHttp();

  const onHandleSubmit = (event) => {
    event.preventDefault();
    const hero = {
      id: uuidv4(),
      name: heroName,
      description: heroDescr,
      element: heroElement,
    };

    request(`http://localhost:3001/heroes/`, "POST", JSON.stringify(hero))
      .then((res) => console.log(res, "Отправка успешна"))
      .then(dispatch(heroCreated(hero)))
      .catch((err) => console.log(err));

    setHeroName("");
    setHeroDescr("");
    setHeroElement("");
  };

  const renderFilters = (filters, status) => {
    if (status === "loading") {
      return <option>Downloading of elements</option>;
    } else if (status === "error") {
      return <option>Error of download</option>;
    }
    if (filters && filters.length > 0) {
      return filters.map(({ name, label }) => {
        if (name === "all") {
          return;
        }
        return (
          <option key={name} value={name}>
            {label}
          </option>
        );
      });
    }
  };

  return (
    <form className="border p-4 shadow-lg rounded" onSubmit={onHandleSubmit}>
      <div className="mb-3">
        <label htmlFor="name" className="form-label fs-4">
          Имя нового героя
        </label>
        <input
          required
          type="text"
          name="name"
          className="form-control"
          id="name"
          placeholder="Как меня зовут?"
          value={heroName}
          onChange={(e) => setHeroName(e.target.value)}
        />
      </div>

      <div className="mb-3">
        <label htmlFor="text" className="form-label fs-4">
          Описание
        </label>
        <textarea
          required
          name="text"
          className="form-control"
          id="text"
          placeholder="Что я умею?"
          style={{ height: "130px" }}
          value={heroDescr}
          onChange={(e) => setHeroDescr(e.target.value)}
        />
      </div>

      <div className="mb-3">
        <label htmlFor="element" className="form-label">
          Выбрать элемент героя
        </label>
        <select
          required
          className="form-select"
          id="element"
          name="element"
          value={heroElement}
          onChange={(e) => setHeroElement(e.target.value)}
        >
          <option>Я владею элементом...</option>
          {renderFilters(filters, filtersLoadingStatus)}
        </select>
      </div>

      <button type="submit" className="btn btn-primary">
        Создать
      </button>
    </form>
  );
};

export default HeroesAddForm;
