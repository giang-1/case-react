import NavBar from "../navbar/navbar";
import Footer from "./footer";
import Header from "./header";

export default function MainLayout({ children }) {
    return (
        <>
            <Header />
            {/* <NavBar /> */}
            {children}
            {/* <Footer /> */}
        </>
    )
}
