export const role = localStorage.getItem("role")
export const isAdmin = role === "Admin"
export const isUserOrBusiness = role === "user" || role === "business"

export const loggedInUserId = Number(localStorage.getItem('userId'))