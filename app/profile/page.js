import { redirect } from "next/navigation";

export default function ProfilePage() {
  // Redirect to user's profile (you'll need to replace 'current-user' with actual username)
  redirect("/profile/current-user");
}
