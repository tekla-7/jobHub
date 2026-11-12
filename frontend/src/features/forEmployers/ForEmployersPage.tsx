import EmployerHero from "./components/EmployerHero";
import Steps from "./components/Steps";
import Features from "./components/Features";
import RolesTable from "./components/RoleTable";
import Faq from "./components/Faq";
import FinalCta from "./components/FinalCta";

export default function ForEmployersPage() {
    return (
        <>
            <EmployerHero />
            <Steps />
            <Features />
            <RolesTable />
            <Faq />
            <FinalCta />
        </>
    );
}
