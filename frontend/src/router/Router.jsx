import { createBrowserRouter } from "react-router-dom"
import Dashboard from '../pages/Dashboard'
import Home from "../pages/Home"
import Login from "../pages/Login"
import Signup from "../pages/Signup"
import JobApplicationForm from "../pages/JobApplicationForm"
import ApplicationStatus from "../pages/ApplicationStatus"
import ApplicationReviewPortal from "../pages/Admin/ApplicationReviewPortal"
import UnProtected from "./UnProtected"
import ProtectedRoutes from "./ProtectedRoutes"
import ProtectedParent from "./ProtectedParent"

const Router = createBrowserRouter([
    {
        element: <ProtectedParent />,
        children: [
            {
                path: "/",
                element: <Home />,
                children: [
                    {
                        path: "/",
                        element: <Dashboard />
                    },
                    {
                        path: "/ApplicationReviewPortal",
                        element: <ApplicationReviewPortal />
                    },
                    {
                        element: <UnProtected />,
                        children: [
                            {
                                path: "/login",
                                element: <Login />
                            },
                            {
                                path: "/signup",
                                element: <Signup />
                            }
                        ]
                    },
                    {
                        element: <ProtectedRoutes allowedRole={["initiator"]} />,
                        children: [
                            {
                                path: "/job-application-form",
                                element: <JobApplicationForm />
                            },
                            {
                                path: "/application-status",
                                element: <ApplicationStatus />
                            }
                        ]
                    },
                    {
                        element: <ProtectedRoutes allowedRole={["approver", "reviewer"]} />,
                        children: [
                            {
                                path: "/ApplicationReviewPortal",
                                element: <ApplicationReviewPortal />
                            },
                            {
                                path: "/application-status",
                                element: <ApplicationStatus />
                            }
                        ]
                    }
                ]
            }
        ]
    }
])

export default Router