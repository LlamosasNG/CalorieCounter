import type { Activity } from "../types";

export type ActivityActions =
  | {
      type: "save-activity";
      payload: { newActivity: Activity };
    }
  | {
      type: "set-activeId";
      payload: { id: Activity["id"] };
    }
  | {
      type: "delete-activity";
      payload: { id: Activity["id"] };
    }
  | {
      type: "restart-app";
    };

export type ActivityState = {
  activities: Activity[];
  activeId: Activity["id"];
};

const localStorageActivity = (): Activity[] => {
  const activities = localStorage.getItem("activities");
  return activities ? JSON.parse(activities) : [];
};

export const initialState: ActivityState = {
  activities: localStorageActivity(),
  activeId: "",
};

export const activityReducer = (
  state: ActivityState = initialState,
  action: ActivityActions
) => {
  if (action.type === "save-activity") {
    //Manejo de la lógica para actualizar el state
    let updatedActivity: Activity[] = [];

    if (state.activeId) {
      updatedActivity = state.activities.map((activity) =>
        activity.id === state.activeId ? action.payload.newActivity : activity
      );
    } else {
      updatedActivity = [...state.activities, action.payload.newActivity];
    }
    return {
      ...state,
      activities: updatedActivity,
      activeId: "",
    };
  }

  if (action.type === "set-activeId") {
    return {
      ...state,
      activeId: action.payload.id,
    };
  }

  if (action.type === "delete-activity") {
    return {
      ...state,
      activities: state.activities.filter(
        (activity) => activity.id !== action.payload.id
      ),
      activeId: "",
    };
  }

  if (action.type === "restart-app") {
    return {
      activities: [],
      activeId: "",
    };
  }

  return state;
};
