import Select from "react-select";

const SelectContactPerson = ({
  contactPersons,
  handleContactPerson,
}: {
  contactPersons: any[];
  handleContactPerson: any;
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
      //width: `364px`,
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
      placeholder="Contact Person"
      styles={controlStyles}
      getOptionLabel={(e) => e.full_name}
      getOptionValue={(e) => e.id}
      options={contactPersons}
      onChange={handleContactPerson}
    />
  );
};
export default SelectContactPerson;
