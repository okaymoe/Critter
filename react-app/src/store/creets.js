const GET_ALL_CREETS = "/creets/GET_ALL_CREETS";
const CREATE_CREET = "/creets/CREATE_CREET";
const EDIT_CREET = "/creets/EDIT_CREET";
const DELETE_CREET = "/creets/DELETE_CREET";

const loadCreets = (creets) => ({
	type: GET_ALL_CREETS,
	creets,
});

const createCreet = (creet) => ({
	type: CREATE_CREET,
	creet,
});

const editingCreet = (creet) => ({
	type: EDIT_CREET,
	creet
})

const deleteCreet = (creetId) => ({
	type: DELETE_CREET,
	creetId,
});

export const getCreets = () => async (dispatch) => {
	const response = await fetch("/api/creets");

	if (response.ok) {
		const creetList = await response.json();
		dispatch(loadCreets(creetList));
		return creetList;
	}
};

export const addCreet = (creet) => async (dispatch) => {

	const {
		content,
		user_id,
		image_url
	} = creet;

	const formData = new FormData();

	formData.append("content", content);
	formData.append("user_id", user_id);
	formData.append("image_url", image_url);

	const response = await fetch("/api/creets/new", {
		method: "POST",
		body: formData
	});

	if (response.ok) {
		const creet = await response.json();
		dispatch(createCreet(creet));

		return creet;

	} else if (response.status < 500) {
		const data = await response.json();
		if (data.errors) {
			return data.errors;
		}
	} else {
		return ["An error occurred. Please try again."];
	}
};

export const editThisCreet = (editCreet) => async (dispatch) => {

	const {
		user_id,
		content,
		image_url
	} = editCreet;

	const formData = new FormData();

	formData.append("content", content);
	formData.append("user_id", user_id);
	formData.append("image_url", image_url);

	const response = await fetch(`/api/creets/edit/${editCreet.id}`, {
		method: "PUT",
		body: formData
	});

	const data = await response.json();
	if (response.ok) {
		dispatch(editingCreet(data));
		return data;
	} else if (response.status < 500) {
		if (data.errors) {
			return data.errors;
		}
	} else {
		return ["An error occurred. Please try again."];
	}
};

export const eraseCreet = (destroyedCreet) => async (dispatch) => {
	const response = await fetch(`/api/creets/${destroyedCreet.id}`, {
		method: "DELETE"
	});

	if (response.ok) {
		dispatch(deleteCreet(destroyedCreet.id));
	}
};


const creetsReducer = (state = {}, action) => {
	switch (action.type) {
		case GET_ALL_CREETS:
			const allCreets = action.creets;
			return allCreets;
		case CREATE_CREET:
			return { ...state, [action.creet.id]: action.creet };
		case EDIT_CREET:
			return {...state, [action.creet.id]: action.creet};
		case DELETE_CREET:
			const newState = { ...state };
			delete newState[action.creetId];
			return newState;
		default:
			return state;
	}
};

export default creetsReducer;
