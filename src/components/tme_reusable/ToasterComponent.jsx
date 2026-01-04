import { Toaster } from "react-hot-toast"

export const ToasterComponent = ({ duration }) => {
    return (
        <Toaster
            containerStyle={{ position: "absolute", top: "20px" }}
            reverseOrder={false}
            gutter={8}
            visibleToasts={3}
            toastOptions={{
                duration: duration,
                className: "toast",
                
                success: {
                    style: {
                        background: "rgba(159, 238, 210, .8)",
                        color: "#01A96C",
                        backdropFilter: "blur(3px)",
                        maxWidth: "600px",
                        width: "100%",
                        fontSize: "1rem",
                        textWrap: "nowrap",
                        textAlign: "center",
                        justifyContent: "center",
                        fontWeight: "500",
                    },
                },

                error: {
                    style: {
                        background: "rgba(255, 175, 158, .8)",
                        color: "#E45B40",
                        backdropFilter: "blur(3px)",
                        maxWidth: "600px",
                        width: "100%",
                        fontSize: "1rem",
                        textWrap: "nowrap",
                        textAlign: "center",
                        justifyContent: "center",
                        fontWeight: "500",
                    },
                },

                info: {
                    style: {
                        background: "rgba(255, 207, 159, .8)",
                        color: "#f07c24",
                        backdropFilter: "blur(3px)",
                        maxWidth: "600px",
                        width: "100%",
                        fontSize: "1rem",
                        textWrap: "nowrap",
                        textAlign: "center",
                        justifyContent: "center",
                        fontWeight: "500",
                    },
                },

                loading: {
                    style: {
                        background: "rgba(199, 213, 250, .8)",
                        color: "#2B67D4",
                        backdropFilter: "blur(3px)",
                        maxWidth: "600px",
                        width: "100%",
                        fontSize: "1rem",
                        textWrap: "nowrap",
                        textAlign: "center",
                        justifyContent: "center",
                        fontWeight: "500",
                    },
                },
            }}
        />
    )
}