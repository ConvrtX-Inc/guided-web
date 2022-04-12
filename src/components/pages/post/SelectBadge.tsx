import Select from "react-select";

const SelectBadge = ({
  mainBadge,
  badgeData,
  handleBadgeChange,
}: {
  mainBadge: any;
  badgeData: any;
  handleBadgeChange: any;
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
      styles={controlStyles}
      defaultValue={badgeData[0]}
      getOptionLabel={(e) => e.badge_name}
      getOptionValue={(e) => e.id}
      options={badgeData}
      formatOptionLabel={(badgeData) => (
        <div className="badge-option">
          <img
            src={badgeData.imgBase64}
            alt={badgeData.badge_name}
            className="me-4"
          />
          <span>{badgeData.badge_name}</span>
        </div>
      )}
      value={mainBadge}
      onChange={handleBadgeChange}
    />
  );
};
export default SelectBadge;
