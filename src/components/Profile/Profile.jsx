import "./Profile.css";
import SideBar from "../SideBar/SideBar";
import ClothesSection from "../ClothesSection/ClothesSection";

function Profile({ clothingItems }) {
  return (
    <main className="profile">
      <SideBar />
      <ClothesSection clothingItems={clothingItems} />
    </main>
  );
}

export default Profile;
