import CreatableSelect from "react-select/creatable";

const CreatableSelectServices = ({
  mainServices,
  services,
  handleServicesChange,
}: {
  mainServices: any;
  services: any[];
  handleServicesChange: any;
}) => {
  const controlStyles = {
    control: (styles: any) => ({
      ...styles,
      fontFamily: `Gilroy`,
      fontStyle: `normal`,
      fontWeight: `400`,
      fontSize: `16px`,
      lineHeight: `19px`,
      color: `#181B1B`,
      width: `364px`,
      height: `66px`,
      border: `1px solid #C4C4C4`,
      borderRadius: `18px`,
      ":hover": {
        border: `1px solid #C4C4C4`,
      },
    }),
  };
  return (
    <CreatableSelect
      placeholder="Search free services"
      isMulti
      styles={controlStyles}
      options={services}
      getOptionLabel={(e: any) => e.label}
      getOptionValue={(e: any) => String(e.value)}
      onChange={handleServicesChange}
      value={mainServices}
    />
  );
};

export default CreatableSelectServices;
