import React from "react";
import { parties, sortByOptions } from "../constants";

function NavBar({ filterHandler, sortByHandler, sortBy, filter }) {
  let partiesAndAll = ["All", ...parties];
  return (
    <div>
      <ul id="sort-dropdown" className="dropdown-content">
        {sortByOptions.map(option => {
          return (
            <li key={option}>
              <a
                href="#!"
                onClick={() => sortByHandler(option)}
                className={option === sortBy ? "active" : ""}
              >
                {option}
              </a>
            </li>
          );
        })}
      </ul>
      <ul id="filter-dropdown" className="dropdown-content">
        {partiesAndAll.map(party => {
          return (
            <li key={party}>
              <a
                href="#!"
                onClick={() => filterHandler(party)}
                className={filter === party ? "active" : ""}
              >
                {party}
              </a>
            </li>
          );
        })}
      </ul>

      <nav>
        <div className="nav-wrapper deep-purple">
          <div className="container">
            <div className="brand-logo">Poll Opinions</div>
            <ul className="right">
              <li>
                <a
                  className="dropdown-trigger"
                  href="#!"
                  data-target="sort-dropdown"
                >
                  Sort by
                  <i className="material-icons right">arrow_drop_down</i>
                </a>
              </li>
              <li>
                <a
                  className="dropdown-trigger"
                  href="#!"
                  data-target="filter-dropdown"
                >
                  Party
                  <i className="material-icons right">arrow_drop_down</i>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default NavBar;
