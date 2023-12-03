import WorkComponent from "../../components/WorkComponent";

export default function page({ params }: { params: { id: string } }) {
  // console.log(params);
  return <WorkComponent wsID={params.id} type="Work" />;
}
