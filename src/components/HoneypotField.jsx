const HoneypotField = ({
  id = "website",
  name = "website",
  value,
  onChange,
}) => (
  <div className="absolute -left-[9999px] h-px w-px overflow-hidden" aria-hidden="true" inert>
    <input
      id={id}
      name={name}
      type="text"
      tabIndex={-1}
      autoComplete="off"
      value={value}
      onChange={onChange}
    />
  </div>
);

export default HoneypotField;
