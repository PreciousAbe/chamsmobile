import * as types from "../types"

const initialState = {
  data: [],
  loading: false,
}

const todoReducer = (state = initialState,action: any) => {
  const { type, payload } = action
  switch (type) {
    case types.GET_TODOS_BEGIN:
    case types.DELETE_TODOS_BEGIN:
    case types.EDIT_TODOS_BEGIN:
      return {
        data: [],
        loading: true,
      };

      case types.GET_TODOS_SUCCESS:
      case types.DELETE_TODOS_SUCCESS:
        return { ...state, data: payload, loading: false }

    case types.GET_TODOS_FAILURE:
      return { ...state, data: 'failed to fetch', loading: false}

    case types.CREATE_TODOS_SUCCESS:
      return {...state,
        data: [...state.data, payload],
        loading: false,
      }
    case types.EDIT_TODOS_SUCCESS:
      return {
        ...state,
        data: state.data.map((yourEntity: any) =>
          yourEntity.id === (payload).id
            ? (payload)
            : yourEntity
        ),
        loading: false,
      }
    // case YourEntityActionType.DELETE:
    //   return {
    //     ...state,
    //     data: state.data.filter(
    //       (yourEntity) => yourEntity.id !== (action.payload as number)
    //     ),
    //     loading: false,
    //   }
    default:
      return state
  }
}
export default todoReducer;