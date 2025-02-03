import { useState } from "react";
import styles from "./App.module.css";

export const App = () => {
  const [value, setValue] = useState(""); // value изначально пустая строка (для ввода текста).
  const [list, setList] = useState([]); //  list изначально пустой массив (для хранения списка элементов).
  const [error, setError] = useState(""); //  error изначально пустая строка (для возможных сообщений об ошибках).

  const isValueValid = value.length >= 3; // // Проверка, корректно ли значение

  const onInputButtonClick = () => {
    const promptValue = prompt("Ввести новое");
    console.log(promptValue);
    // promptValue && promptValue.length >= 3 защищает код от ошибок, если пользователь нажмёт "Отмена" или оставит строку пустой
    if (promptValue && promptValue.length >= 3) {
      setValue(promptValue); // Обновляем состояние value
      setError(""); // Очищаем сообщение об ошибке
    } else {
      setError("Введенное значение должно содержать минимум 3 символа");
    }
  };

  const onAddButtonClick = () => {
    if (isValueValid) {
      const newItem = {
        id: Date.now(),
        value,
        timestamp: new Date().toLocaleString(), //  Добавляем дату и время
      };
      const updateList = [...list, newItem];

      setList(updateList);
      setValue("");
      setError("");
    }
  };

  return (
    <div className={styles.app}>
      <h1 className={styles["page-heading"]}>Ввод значения</h1>

      <p className={styles["no-margin-text"]}>
        Текущее значение <code>value</code>: "
        <output className={styles["current-value"]}>{value}</output>"
      </p>

      {error && <div className={styles.error}>{error}</div>}

      <div className={styles["buttons-container"]}>
        <button className={styles.button} onClick={onInputButtonClick}>
          Ввести новое
        </button>
        <button
          className={styles.button}
          disabled={!isValueValid}
          onClick={onAddButtonClick}
        >
          Добавить в список
        </button>
      </div>
      <div className={styles["list-container"]}>
        <h2 className={styles["list-heading"]}>Список:</h2>
        {list.length > 0 ? (
          <ul className={styles.list}>
            {list.map((item) => (
              <li key={item.id} className={styles["list-item"]}>
                {item.value}
                <span className={styles.timestamp}>({item.timestamp})</span>
              </li>
            ))}
          </ul>
        ) : (
          <p className={styles["no-margin-text"]}>Нет добавленных элементов</p>
        )}
      </div>
    </div>
  );
};

export default App;
