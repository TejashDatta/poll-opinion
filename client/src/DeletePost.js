import React, { useState } from "react";

function DeletePost({ removePost }) {
  const [modalShown, setModalShown] = useState(false);
  return (
    <span>
      <button
        className="foot-btn"
        style={{ transform: "translateY(4px)" }}
        onClick={() => setModalShown(true)}
      >
        <i className="material-icons right">delete</i>
      </button>
      {modalShown ? (
        <div class="modal">
          <div class="modal-content">
            <h4>Delete Post</h4>
            <p>
              Are you sure you want to delete your post? This action cannot be
              undone.
            </p>
          </div>
          <div class="modal-footer">
            <button class="btn-flat" onClick={() => setModalShown(false)}>
              Cancel
            </button>
            <button
              class="btn-flat"
              onClick={() => {
                setModalShown(false);
                removePost();
              }}
            >
              Delete
            </button>
          </div>
        </div>
      ) : null}
    </span>
  );
}

export default DeletePost;
