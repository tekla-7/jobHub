import Hero from "./components/Hero";
import Categories from "./components/Categories";
import LatestJobs from "./components/LatestJobs";
import FeaturedCompanies from "./components/FeaturedCompanies";
import StatsRow from "./components/StatsRow";
import CtaBand from "./components/CtaBand";

export default function LandingPage() {
    return (<>
        <Hero/>
        <Categories />
        <LatestJobs />
        <FeaturedCompanies />
        <StatsRow />
        <CtaBand />
    </>)
}