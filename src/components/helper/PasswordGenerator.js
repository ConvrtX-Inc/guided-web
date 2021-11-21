//Generate random 12 characters alphanumeric password
const PasswordGenerator = () => {
  const password = Array.from(Array(12), () =>
    Math.floor(Math.random() * 36).toString(36)
  ).join("");

  return (
    <div>
      <input type="text" defaultValue={password} />
    </div>
  );
};

export default PasswordGenerator;
