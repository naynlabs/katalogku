import { getAdminFeedbacks } from "@/lib/queries";
import FeedbackClient from "./FeedbackClient";

export default async function FeedbackPage() {
  const feedbacks = await getAdminFeedbacks();

  const serialized = feedbacks.map((f) => ({
    id: f.id,
    typeOfReport: f.typeOfReport,
    message: f.message,
    status: f.status,
    createdAt: f.createdAt.toISOString(),
    userName: f.user.name,
    userEmail: f.user.email,
  }));

  return <FeedbackClient feedbacks={serialized} />;
}
