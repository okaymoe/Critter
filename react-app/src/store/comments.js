const GET_ALL_COMMENTS = "/comments/GET_ALL_COMMENTS";
const CREATE_COMMENT = "/comments/CREATE_COMMENT";
const DELETE_COMMENT = "/comments/DELETE_COMMENT";

const loadComments = (comments) => ({
	type: GET_ALL_COMMENTS,
	comments,
});

const createComment = (comment) => ({
	type: CREATE_COMMENT,
	comment,
});

const deleteComment = (commentId) => ({
	type: DELETE_COMMENT,
	commentId,
});

export const getComments = () => async (dispatch) => {
	const response = await fetch("/api/comments");

	if (response.ok) {
		const commentList = await response.json();
		dispatch(loadComments(commentList));
		return commentList;
	}
};

export const addComment = (comment) => async (dispatch) => {

	const {
		user_id,
		content,
		creet_id,
		image_url
	} = comment;

	const formData = new FormData();

	formData.append("content", content);
	formData.append("creet_id", creet_id);
	formData.append("user_id", user_id);
	formData.append("image_url", image_url);

	const response = await fetch("/api/comments/new", {
		method: "POST",
		body: formData
	});

	if (response.ok) {
		const comment = await response.json();
		dispatch(createComment(comment));

		return comment;

	} else if (response.status < 500) {
		const data = await response.json();
		if (data.errors) {
			return data.errors;
		}
	} else {
		return ["An error occurred. Please try again."];
	}
};

export const editThisComment = (editComment) => async (dispatch) => {

	const {
		content,
		user_id,
		creet_id,
		image_url
	} = editComment;

	const formData = new FormData();

	formData.append("content", content);
	formData.append("user_id", user_id);
	formData.append("creet_id", creet_id);
	formData.append("image_url", image_url);

	const response = await fetch(`/api/comments/edit/${editComment.id}`, {
		method: "PUT",
		body: formData
	});

	const data = await response.json();
	if (response.ok) {
		dispatch(createComment(data));
		return null;
	} else if (response.status < 500) {
		if (data.errors) {
			return data.errors;
		}
	} else {
		return ["An error occurred. Please try again."];
	}
};

export const eraseComment = (destroyedComment) => async (dispatch) => {
	const response = await fetch(`/api/comments/${destroyedComment.id}`, {
		method: "DELETE"
	});

	if (response.ok) {
		dispatch(deleteComment(destroyedComment.id));
	}
};

const commentsReducer = (state = {}, action) => {
	switch (action.type) {
		case GET_ALL_COMMENTS:
			const allComments = action.comments;
			return allComments;
		case CREATE_COMMENT:
			return { ...state, [action.comment.id]: action.comment };
		case DELETE_COMMENT:
			const newState = { ...state };
			delete newState[action.commentId];
			return newState;
		default:
			return state;
	}
};

export default commentsReducer;
