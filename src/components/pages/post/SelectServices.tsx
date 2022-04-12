import Select from "react-select";
import { Services } from "../../../shared/interfaces/Services.interface";

const SelectServices = ({
  services,
  handleServicesChange,
}: {
  services: Services[];
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
    <Select
      placeholder="Search free services"
      isMulti
      styles={controlStyles}
      options={services}
      getOptionLabel={(e) => e.text || ""}
      getOptionValue={(e) => String(e.id)}
      onChange={handleServicesChange}
    />
  );
};

export default SelectServices;
