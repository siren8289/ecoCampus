import { RoomDetail } from "@/components/pages/room-detail/RoomDetail";

export default async function RoomPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
    const { id } = await params
  return <RoomDetail id={id} />;
}
