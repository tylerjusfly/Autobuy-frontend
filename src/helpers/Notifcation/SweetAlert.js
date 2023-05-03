import Swal from "sweetalert2"
import withReactContent from "sweetalert2-react-content"
const MySwal = withReactContent(Swal)

export const handleError = msg => {
  return MySwal.fire({
    text: msg || "Something went wrong!",
    icon: "error",
    showConfirmButton: false,
    timer: 3000,
  })
}

export const handleSuccess = msg => {
  return MySwal.fire({
    text: msg || "success!",
    icon: "success",
    showConfirmButton: false,
    timer: 3000,
  })
}
