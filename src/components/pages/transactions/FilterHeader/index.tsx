import React, { FocusEvent } from "react";
import { Button, Form } from "react-bootstrap";
import Image from "react-bootstrap/Image";

import filter from "../../../../assets/admin/filter.png";

import "./styles.scss";
type Props = {};

const FilterHeader = (props: Props) => {
  const handleTimeFocusEvent = (e: FocusEvent<any>) => {
    e.target.type = "date";
  };

  return (
    <div className="filter-header d-flex mb-3">
      <div className="d-flex">
        <Form.Control
          className="input-date me-2"
          type="text"
          placeholder="End date"
          onFocus={handleTimeFocusEvent}
        />
        <Form.Control
          className="input-date  me-2"
          type="text"
          placeholder="Set start date"
          onFocus={handleTimeFocusEvent}
        />
      </div>

      <div className="d-flex">
        <span className="icon-group-input  me-1">
          <label htmlFor="search-transaction" className="left-icon-input">
            <img src="svgs/search.svg" />
          </label>
          <Form.Control
            type="text"
            placeholder="Search"
            id="search-transaction"
          />
        </span>
        <span className="icon-group-input me-3">
          <label htmlFor="sortby-transaction">
            <img src="svgs/caret_down.svg" className="icon right" />
          </label>
          <Form.Select className="custom-select" id="sortby-transaction">
            <option>Sort by</option>
          </Form.Select>
        </span>
        <Button className="btn btn-light btn-filter">
          <Image src={filter} alt="" /> Filter
        </Button>
      </div>
    </div>
  );
};

export default FilterHeader;
