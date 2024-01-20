import CreatableSelect from "react-select/creatable";
import styles from "../../css/components.module.css";
function MultiWithCreatable({ value, callbackfn, optionList }) {
  function handleCreateOption(val) {
    if (!val) {
      callbackfn("value", []);
    } else {
      callbackfn("value", [...value, val]);
    }
  }
  function handleChange(e) {
    const val = e.map(function (item, idx) {
      return item.value;
    });
    callbackfn("value", [...val]);
  }

  return (
    <>
      <CreatableSelect
        isMulti
        isClearable={true}
        options={optionList}
        value={
          Array.isArray(value)
            ? value?.map((item) => {
                return { label: item, value: item };
              })
            : []
        }
        onChange={handleChange}
        onCreateOption={handleCreateOption}
        className={styles.select_field}
        placeholder="Select or create multiple values"
      />
    </>
  );
}

export default MultiWithCreatable;
