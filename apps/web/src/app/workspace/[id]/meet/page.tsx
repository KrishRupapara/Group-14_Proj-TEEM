import WorkComponent from "../../components/WorkComponent";

export default function page({ params }: { params: { id: string } }) {
  return <WorkComponent wsID={params.id} type="Meet" />;
}
