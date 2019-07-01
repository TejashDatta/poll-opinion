import React from "react";
import moment from "moment";
import Liker from "./Liker";
import DeletePost from "../DeletePost";

function PostItem({ post, likeHandler, flagHandler, removePost }) {
  const colorSelect = party => {
    switch (party) {
      case "BJP":
        return "orange";
      case "TMC":
        return "green";
      case "CPIM":
        return "red";
      case "INC":
        return "blue";
      default:
        return "grey";
    }
  };
  const {
    _id,
    content,
    party,
    date,
    voteUpsLength,
    flagsLength,
    liked,
    flagged,
  } = post;
  const dateDisplay = moment(date).fromNow();
  const color = colorSelect(party);
  return (
    <div className="card ">
      <div className={`card-content ${color} lighten-4`}>
        <p>{content}</p>
      </div>
      <div className={`card-action ${color} lighten-5`}>
        <div className="row nomargin">
          <div className="col s6 m4">
            <span>Voted for</span>{" "}
            <span className={`${color}-text`}>{party}</span>
          </div>
          <div className="col s6 m4 push-m4">
            <div className="right">
              <DeletePost removePost={() => removePost(_id)} />
              <Liker
                icon="thumb_up"
                votes={voteUpsLength}
                active={liked}
                handler={() => {
                  likeHandler(_id);
                }}
              />
              <Liker
                icon="flag"
                votes={flagsLength}
                active={flagged}
                handler={() => {
                  flagHandler(_id);
                }}
              />
            </div>
          </div>
          <div className="col s12 m4 pull-m4 text-center">
            <span>Posted</span> {dateDisplay}
          </div>
        </div>
      </div>
    </div>
  );
}

export default PostItem;
