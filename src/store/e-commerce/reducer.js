import {
  GET_CART_DATA_FAIL,
  GET_CART_DATA_SUCCESS,
  GET_CUSTOMERS_FAIL,
  GET_CUSTOMERS_SUCCESS,
  ADD_CUSTOMER_SUCCESS,
  ADD_CUSTOMER_FAIL,
  UPDATE_CUSTOMER_SUCCESS,
  UPDATE_CUSTOMER_FAIL,
  DELETE_CUSTOMER_SUCCESS,
  DELETE_CUSTOMER_FAIL,
  GET_ORDERS_FAIL,
  GET_ORDERS_SUCCESS,
  GET_PRODUCTS_FAIL,
  GET_PRODUCTS_SUCCESS,
  GET_SHOPS_FAIL,
  GET_SHOPS_SUCCESS,
  GET_PRODUCT_DETAIL_SUCCESS,
  GET_PRODUCT_DETAIL_FAIL,
  ADD_ORDER_SUCCESS,
  ADD_ORDER_FAIL,
  UPDATE_ORDER_SUCCESS,
  UPDATE_ORDER_FAIL,
  DELETE_ORDER_SUCCESS,
  DELETE_ORDER_FAIL,
  SET_SELECTED_SHOP,
  DICARD_SELECTED_SHOP,
  SHOWCHECKOUT_MODAL,
} from "./actionTypes"

const INIT_STATE = {
  products: [],
  product: {},
  checkoutModal: false,
  orders: [],
  cartData: {},
  customers: [],
  shops: [],
  error: {},
  selectedshop: JSON.parse(localStorage.getItem("shop")) || {},
}

const Ecommerce = (state = INIT_STATE, action) => {
  switch (action.type) {
    case SET_SELECTED_SHOP:
      localStorage.setItem("shop", JSON.stringify(action.payload))
      return {
        ...state,
        selectedshop: action.payload,
      }
    case DICARD_SELECTED_SHOP:
      localStorage.removeItem("shop")
      return {
        ...state,
        selectedshop: {},
      }

    case SHOWCHECKOUT_MODAL:
      return {
        ...state,
        checkoutModal: true,
        product: action.payload,
      }

    case GET_PRODUCTS_FAIL:
      return {
        ...state,
        error: action.payload,
      }

    case GET_PRODUCT_DETAIL_SUCCESS:
      return {
        ...state,
        product: action.payload,
      }

    case GET_PRODUCT_DETAIL_FAIL:
      return {
        ...state,
        error: action.payload,
      }

    case GET_ORDERS_SUCCESS:
      return {
        ...state,
        orders: action.payload,
      }

    case GET_ORDERS_FAIL:
      return {
        ...state,
        error: action.payload,
      }

    case ADD_ORDER_SUCCESS:
      return {
        ...state,
        orders: [...state.orders, action.payload],
      }

    case ADD_ORDER_FAIL:
      return {
        ...state,
        error: action.payload,
      }

    case UPDATE_ORDER_SUCCESS:
      return {
        ...state,
        orders: state.orders.map(order => (order.id.toString() === action.payload.id.toString() ? { order, ...action.payload } : order)),
      }

    case UPDATE_ORDER_FAIL:
      return {
        ...state,
        error: action.payload,
      }

    case DELETE_ORDER_SUCCESS:
      return {
        ...state,
        orders: state.orders.filter(order => order.id.toString() !== action.payload.id.toString()),
      }

    case DELETE_ORDER_FAIL:
      return {
        ...state,
        error: action.payload,
      }

    case GET_CUSTOMERS_SUCCESS:
      return {
        ...state,
        customers: action.payload,
      }

    case GET_CUSTOMERS_FAIL:
      return {
        ...state,
        error: action.payload,
      }

    case ADD_CUSTOMER_SUCCESS:
      return {
        ...state,
        customers: [...state.customers, action.payload],
      }

    case ADD_CUSTOMER_FAIL:
      return {
        ...state,
        error: action.payload,
      }

    case UPDATE_CUSTOMER_SUCCESS:
      return {
        ...state,
        customers: state.customers.map(customer => (customer.id.toString() === action.payload.id.toString() ? { customer, ...action.payload } : customer)),
      }

    case UPDATE_CUSTOMER_FAIL:
      return {
        ...state,
        error: action.payload,
      }

    case DELETE_CUSTOMER_SUCCESS:
      return {
        ...state,
        customers: state.customers.filter(customer => customer.id.toString() !== action.payload.id.toString()),
      }

    case DELETE_CUSTOMER_FAIL:
      return {
        ...state,
        error: action.payload,
      }

    case GET_SHOPS_SUCCESS:
      return {
        ...state,
        shops: action.payload,
      }

    case GET_SHOPS_FAIL:
      return {
        ...state,
        error: action.payload,
      }

    default:
      return state
  }
}

export default Ecommerce
