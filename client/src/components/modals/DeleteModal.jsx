import React from "react";
import { useDispatch } from "react-redux";
import { deleteFromGallery } from "../../redux/actions/photos";

const DeleteModal = (props) => {
  const dispatch = useDispatch();

  const handleDelete = () => {
    const userId = props.deleteMode.userId;
    const imageId = props.deleteMode.imageId;
    dispatch(deleteFromGallery(userId, imageId));
  };

  return (
    <div
      className="modal fade"
      id="deleteModal"
      tabIndex="-1"
      role="dialog"
      aria-labelledby="deleteModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog " role="document">
        <div className="modal-content ">
          <div className="modal-body deleteModalBody">
            <div className="modalText">
              Are you sure you want to delete this post ??
            </div>
            <button
              type="button"
              class="btn btn-primary deleteAndCloseModalButton"
              data-dismiss="modal"
            >
              Nope
            </button>
            <button
              onClick={handleDelete}
              type="button"
              className="btn btn-primary deleteAndCloseModalButton"
            >
              Yes, Sure !!
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeleteModal;
