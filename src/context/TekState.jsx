import react from "react";
import Context from "./Context";

const TekState = (props) => {


    const [user, setuser] = react.useState();
    const [profileroute, setprofileroute] = react.useState("/profile/default");


    return (
        <Context.Provider
            value={{
                user, setuser, profileroute, setprofileroute,


            }}
        >
            {props.children}
        </Context.Provider>
    );
};

export default TekState;