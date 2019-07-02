import React from "react";
import { parties } from "../constants";

class AddForm extends React.Component {
  initState = {
    content: "",
    party: "",
    other: "",
  };
  state = this.initState;
  handleSubmit = e => {
    e.preventDefault();
    let data = { ...this.state };
    if (data.party === "Others") data.party = data.other;
    this.props.addPost(data);
    this.setState(this.initState);
  };
  handleTyping = e => {
    this.setState({
      [e.target.id]: e.target.value,
    });
  };
  render() {
    const otherTextField =
      this.state.party === "Others" ? (
        <div className="input-field">
          <input
            id="other"
            type="text"
            value={this.state.other}
            onChange={this.handleTyping}
            required
          />
          <label htmlFor="other">Other party</label>
        </div>
      ) : null;
    return (
      <div className="card" style={{ position: "relative" }}>
        {!this.props.canPost ? (
          <div className="card-content valign-wrapper cover">
            <h4 className="text-center" style={{ margin: "1.5rem auto" }}>
              Thank you for sharing your views
            </h4>
          </div>
        ) : (
          ""
        )}
        <div className="card-content row">
          <form className="col s12" onSubmit={this.handleSubmit}>
            <div className="row nomargin">
              <div className="input-field col s12">
                <textarea
                  id="content"
                  className="materialize-textarea"
                  value={this.state.content}
                  onChange={this.handleTyping}
                  required
                />
                <label htmlFor="content">
                  Why did you vote for the party of your choice?
                </label>
              </div>
            </div>
            <div className="row nomargin">
              <div className="valign-wrapper">
                <div className="input-field col s4 m5">
                  <select
                    required
                    value={this.state.party}
                    onChange={this.handleTyping}
                    id="party"
                  >
                    <option value="" disabled>
                      Select
                    </option>
                    {parties.map(party => {
                      return (
                        <option value={party} key={party}>
                          {party}
                        </option>
                      );
                    })}
                  </select>
                  <label>Party you voted for</label>
                </div>
                <div className="col s5">{otherTextField}</div>
                <button
                  type="submit"
                  className="btn right col s3 m2 deep-purple darken-1"
                >
                  Submit
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default AddForm;
