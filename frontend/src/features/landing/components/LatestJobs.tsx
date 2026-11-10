import Section from "./Section";
import JobCard from "../../../shared/components/JobCard";
import {PATHS} from "../../../routes/paths";
import {useJobs} from "../queries/landing.queries";

export default function LatestJobs() {
     const {data:LATEST_JOBS=[]}=useJobs()

    return (
        <Section title="Latest opportunities" action={{ label: 'View all jobs', to: PATHS.jobs }}>
            <div className="divide-y divide-[#E4E7EC] overflow-hidden rounded-[10px] border border-[#E4E7EC] bg-white">
                {LATEST_JOBS.map((job) => <JobCard key={job._id} job={job} />)}
            </div>
        </Section>
    );
}
